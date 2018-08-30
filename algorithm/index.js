const QuickSort = (aObject = [], sKey = '') => {
  if (aObject.length <= 1) return
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
  return ([]).concat(QuickSort(aLeft, sKey), oPivot, QuickSort(aRight, sKey))
}

module.exports = {
  QuickSort
}
