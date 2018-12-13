const dateFormat = require('dateformat')
function formatDate(date: Date, format?: string): string {
  return format ? dateFormat(date, format) : dateFormat(date, 'mmm dS, yyyy')
}
export default formatDate
