<template>
  <div class="container">
    <Loading :active="loadingOverlay"></Loading>
    <h2 class="my-3">後台－產品列表</h2>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal(true)">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>

          <td class="text-right">
            <!-- {{ item.origin_price }} -->
            {{ $filters.currency(item.origin_price) }}
          </td>
          <td class="text-right">
            <!-- {{ item.price }} -->
            {{ $filters.currency(item.price) }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="openModal(false, item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelProductModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁 -->
    <Pagination :pages="pagination" @emit-pages="getAdminProducts"></Pagination>
  </div>
  <!-- Modal-新增修改 -->
  <ModalProduct
    :product-data="tempProduct"
    :is-new="isNew"
    @emit-update-product="updateProduct"
    ref="modalProduct"
  ></ModalProduct>
  <!-- Modal-刪除 -->
  <ModalDelete
    :product-data="tempProduct"
    @emit-delete-product="deleteProduct"
    ref="modalDelete"
  ></ModalDelete>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
import ModalProduct from '@/components/ModalProduct.vue'
import ModalDelete from '@/components/ModalDelete.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      loadingOverlay: false
    }
  },
  components: {
    Pagination,
    ModalProduct,
    ModalDelete
  },
  methods: {
    getAdminProducts (page = 1) {
      this.loadingOverlay = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`
        )
        .then((res) => {
          // console.log(res.data)
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.loadingOverlay = false
        })
        .catch((err) => {
          console.log(err.response.data)
          this.loadingOverlay = false
        })
    },
    updateProduct (productData) {
      // 狀態：新增產品
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      let status = '新增產品'
      // 狀態：修改產品
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${productData.id}`
        httpMethod = 'put'
        status = '更新產品'
      }
      this.$http[httpMethod](url, { data: productData })
        .then((res) => {
          // console.log(res.data)
          // alert(res.data.message)
          this.$httpMessageState(res, status)
          this.getAdminProducts()
          this.$refs.modalProduct.closeModal()
        })
        .catch((err) => {
          console.log(err.response.data)
          this.$httpMessageState(err.response, status)
        })
    },
    deleteProduct (id) {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`
        )
        .then((res) => {
          // console.log(res.data)
          alert(res.data.message)
          this.$refs.modalDelete.closeModal()
          this.getAdminProducts()
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.isNew = true
        this.tempProduct = {}
      } else {
        this.isNew = false
        this.tempProduct = { ...item }
      }
      this.$refs.modalProduct.openModal()
    },
    openDelProductModal (item) {
      this.$refs.modalDelete.openModal()
      this.tempProduct = item
    }
  },
  mounted () {
    this.getAdminProducts()
  }
}
</script>
