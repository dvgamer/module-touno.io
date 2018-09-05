let charType = () => {
  let group = [ 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2 ]
  return group[parseInt(Math.random() * group.length)]
}
let charASCII = t => parseInt(Math.random() * (t === 0 ? 9 : 25))

module.exports = {
  isDev: !(process.env.NODE_ENV === 'production'),
  isWin: process.platform === 'win32',
  randString: l => {
    l = l || 32
    let result = ''
    for (let i = 0; i < l; i++) {
      let t = charType()
      let n = charASCII(t)
      result += t === 0 ? n.toString() : String.fromCharCode(t === 1 ? 97 + n : 65 + n)
    }
    return result
  }
}
