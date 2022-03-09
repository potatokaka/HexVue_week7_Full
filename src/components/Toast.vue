<template>
  <div
    class="toast-container position-fixed pe-3 top-0 end-0"
    style="z-index: 1500; margin-top: 60px"
  >
    <!-- <template v-if="messages.length > 0"> -->
    <div
      class="toast show"
      role="alert"
      v-for="(item, index) in messages"
      :key="`${index}-${item}`"
    >
      <div class="toast-header">
        <!--  小圓角矩形  -->
        <span
          :class="`bg-${item.style}`"
          class="p-2 rounded me-2 d-inline-block"
        ></span>
        <strong class="me-auto">{{ item.title }}</strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="clearToast(index)"
        ></button>
      </div>
      <div class="toast-body" v-if="item.content">{{ item.content }}</div>
    </div>
    <!-- </template> -->
  </div>
</template>
<script>
import emitter from '@/methods/emitter.js'
export default {
  data () {
    return {
      messages: []
    }
  },
  methods: {
    toastShow () {
      // 6秒後，把第一筆陣列資料刪除
      setTimeout(() => {
        this.messages.shift()
      }, 6000)
    },
    clearToast (index) {
      this.messages.splice(index, 1)
    }
  },
  mounted () {
    emitter.on('push-message', (message) => {
      const { style, title, content } = message
      this.messages.push({ style, title, content })
      this.toastShow()
    })
  }
}
</script>
