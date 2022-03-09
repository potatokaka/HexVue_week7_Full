<template>
  <div class="container">
    <h2 class="my-3">後台－訂單管理</h2>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in orders" :key="item.id">
          <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
            <td>{{ item.create_at }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="product in item.products" :key="product.id">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">
              <!-- {{ item.total }} -->
              {{ $filters.currency(item.total) }}
            </td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updateOrder(item)"
                />
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="openOrderModal(item)"
                >
                  檢視
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openDelOrderModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <!-- 分頁 -->
    <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
  </div>
  <!-- modal-訂單 -->
  <ModalOrder
    :order-data="tempOrder"
    @emit-update-order="updateOrder"
    ref="modalOrder"
  ></ModalOrder>
  <!-- modal-刪除 -->
  <ModalDelete
    :product-data="tempOrder"
    @emit-delete-product="deleteOrder"
    ref="modalDelete"
  ></ModalDelete>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
import ModalOrder from '@/components/ModalOrder.vue'
import ModalDelete from '@/components/ModalDelete.vue'

export default {
  // inject: ['$filters'],
  components: {
    Pagination,
    ModalOrder,
    ModalDelete
  },
  data () {
    return {
      orders: [],
      pagination: {},
      tempOrder: {}
    }
  },
  methods: {
    getOrders (page = 1) {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
        )
        .then((res) => {
          // console.log(res.data)
          this.orders = res.data.orders
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    },
    updateOrder (orderData) {
      this.$http
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${orderData.id}`,
          { data: orderData }
        )
        .then((res) => {
          // console.log(res.data)
          alert(res.data.message)
          this.$refs.modalOrder.closeModal()
          this.getOrders()
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    },
    deleteOrder (id) {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${id}`
        )
        .then((res) => {
          // console.log(res.data)
          alert(res.data.message)
          this.$refs.modalDelete.closeModal()
          this.getOrders()
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    },
    openOrderModal (item) {
      this.tempOrder = { ...item }
      console.log(this.tempOrder)
      this.$refs.modalOrder.openModal()
    },
    openDelOrderModal (item) {
      this.tempOrder = item
      // console.log(this.tempOrder)
      this.$refs.modalDelete.openModal()
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
