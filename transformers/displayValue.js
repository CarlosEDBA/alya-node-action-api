module.exports = function (obj, key) {
  if (typeof obj[key] === 'object') {
    if (obj[key].display !== undefined) {
      obj[key] = obj[key].value
    }
  }
}