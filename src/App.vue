<template>
  <Toast></Toast>
  <router-view />
</template>

<style lang="scss">
@import 'bootstrap/scss/bootstrap.scss';
// @import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
</style>
<script>
import Toast from '@/components/Toast.vue'
export default {
  components: {
    Toast
  }
}
</script>
