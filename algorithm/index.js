const QuickSort = (aObject = [], sKey = '') => {
  if (aObject.length <= 1) return aObject
  let aLeft = []
  let aRight = []
  let oPivot = aObject.pop()

  for (let i = 0; i < aObject.length; i++) {
    if (!sKey) {
      if (aObject[i] <= oPivot) aLeft.push(aObject[i]); else aRight.push(aObject[i])
    } else {
      if (aObject[i][sKey] <= oPivot[sKey]) aLeft.push(aObject[i]); else aRight.push(aObject[i])
    }
  }
  return [].concat(QuickSort(aLeft, sKey), oPivot, QuickSort(aRight, sKey))
}

const charType = () => {
  const group = [ 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2 ]
  return group[parseInt(Math.random() * group.length)]
}
const charASCII = t => parseInt(Math.random() * (t === 0 ? 9 : 25))
const RandomString = l => {
  l = l || 32
  let result = ''
  for (let i = 0; i < l; i++) {
    const t = charType()
    const n = charASCII(t)
    result += t === 0 ? n.toString() : String.fromCharCode(t === 1 ? 97 + n : 65 + n)
  }
  return result
}
module.exports = {
  QuickSort,
  RandomString
}
