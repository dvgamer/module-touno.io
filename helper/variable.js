module.exports = {
  isDev: !(process.env.NODE_ENV === 'production'),
  isWin: process.platform === 'win32'
}
