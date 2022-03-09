<template>
  <div class="container">
    <h2 class="mt-3">Coupon 管理</h2>
    <div class="text-end mt-4">
      <button
        class="btn btn-primary"
        type="button"
        @click="openCouponModal(true)"
      >
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in coupons" :key="`${item.title} + ${index}`">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ item.due_date }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openCouponModal(false, item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openDelCouponModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁 -->
    <Pagination :pages="pagination"></Pagination>
    <!-- modal 新增修改 -->
    <ModalCoupon
      :coupon-data="tempCoupon"
      :is-new="isNew"
      @emit-update-coupon="updateCoupon"
      ref="modalCoupon"
    ></ModalCoupon>
    <!-- modal 刪除 -->
    <ModalDelete
      :product-data="tempCoupon"
      @emit-delete-product="deleteCoupon"
      ref="modalDelete"
    ></ModalDelete>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
import ModalCoupon from '@/components/ModalCoupon.vue'
import ModalDelete from '@/components/ModalDelete.vue'

export default {
  components: {
    Pagination,
    ModalCoupon,
    ModalDelete
  },
  data () {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isNew: false
    }
  },
  methods: {
    getCoupons (page = 1) {
      //  'https://vue3-course-api.hexschool.io/v2/api/filter117/admin/coupons?page=1
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
        )
        .then((res) => {
          console.log(res.data)
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    },
    updateCoupon (item) {
      // 新增狀態
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`
      let httpMethod = 'post'
      // 修改狀態
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](url, { data: item })
        .then((res) => {
          console.log(res.data)
          this.getCoupons()
          this.$refs.modalCoupon.closeModal()
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    },
    deleteCoupon (id) {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`
        )
        .then((res) => {
          console.log(res.data)
          this.getCoupons()
          this.$refs.modalDelete.closeModal()
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    },
    openCouponModal (isNew, item) {
      if (isNew) {
        // 新增狀態
        this.tempCoupon = {
          // 預先設定 due_date 為當前時間(10位數 Timestamp)
          due_date: new Date().getTime() / 1000
        }
        this.isNew = true
      } else {
        // 修改狀態
        this.tempCoupon = { ...item }
        this.isNew = false
      }
      this.$refs.modalCoupon.openModal()
    },
    openDelCouponModal (item) {
      this.tempCoupon = item
      this.$refs.modalDelete.openModal()
    }
  },
  mounted () {
    this.getCoupons()
  }
}
</script>
