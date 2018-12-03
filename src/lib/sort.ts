const arraySort = require('array-sort')
function sort(items: Array<Object>, value: string | Array<string>) {
  return arraySort(items, value)
}

export default sort
