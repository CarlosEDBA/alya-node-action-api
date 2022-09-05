module.exports = function (obj, key) {
  if (typeof obj[key] === 'object') {
    if (obj[key].label) {
      obj[key] = obj[key].value
    }
  }
}