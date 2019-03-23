import arraySort from 'array-sort'
function sort(items: Array<object>, value: string | Array<string>) {
  return arraySort(items, value)
}

export default sort
