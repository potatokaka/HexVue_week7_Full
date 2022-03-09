import emitter from '@/methods/emitter.js'

export default function (response, title = '更新') {
  // 如果回傳 success 是 trud 的話
  if (response.data.success) {
    emitter.emit('push-message', {
      style: 'success',
      title: `${title}成功`
    })
  } else {
    // 因為回傳訊息格式有字串、陣列二種格式，用三元運算子，統一格式成陣列
    const message =
      response.data.message === 'string'
        ? [response.data.message]
        : response.data.message
    emitter.emit('push-message', {
      style: 'danger',
      title: `${title}失敗`,
      // 這行會報錯？ Message.join is not a function
      content: message.join('、')
    })
  }
}
