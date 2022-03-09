module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/HexVue_week7_Full/' // 資料夾路徑(gitHub 上 repo 的名稱)
      : '/'
}
