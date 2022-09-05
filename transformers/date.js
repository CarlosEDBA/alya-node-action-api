module.exports = function (obj, key) {
  if (typeof obj[key] === 'object') {
    if (obj[key].type === 'date') {
      obj[key] = obj[key].value
    }
  }
}