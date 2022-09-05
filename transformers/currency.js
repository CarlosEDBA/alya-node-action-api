module.exports = function (obj, key) {
  if (typeof obj[key] === 'object') {
    if (obj[key].currency) {
      obj[key] = JSON.stringify(obj[key])
    }
  }
}