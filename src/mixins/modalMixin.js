import Modal from 'bootstrap/js/dist/modal'

export default {
  methods: {
    openModal () {
      this.bsModal.show()
    },
    closeModal () {
      this.bsModal.hide()
    }
  },
  mounted () {
    this.bsModal = new Modal(this.$refs.modal)
  }
}
