// 千分數＋ NT$符號
export function currency (num) {
  const parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `NT$${parts.join('.')}`
}

// 日期 Timestamp -> YYYY/MM/DD
export function date (timestamp) {
  const localDate = new Date(timestamp * 1000)
  return localDate.toLocaleDateString('zh-Hans-CN')
}
