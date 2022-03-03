<template>
  <div class="modal" tabindex="-1" ref="modalDelete">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">刪除 {{ productData.title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除 <strong>{{ productData.title }}</strong> (刪除後將無法恢復)
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="$emit('emitDeleteProduct', productData.id)"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: ['productData'],
  emits: ['emitDeleteProduct'],
  data () {
    return {
      bsModal: ''
    }
  },
  methods: {
    openModal (item) {
      this.bsModal.show()
    },
    closeModal () {
      this.bsModal.hide()
    }
    // emitDeleteProduct () {
    //   this.$emit('emit-delete', this.productData.id)
    // }
  },
  mounted () {
    this.bsModal = new Modal(this.$refs.modalDelete)
  }
}
</script>
