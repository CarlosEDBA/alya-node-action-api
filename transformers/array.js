module.exports = function (obj, key) {
  if (Array.isArray(obj[key])) {
    obj[key] = JSON.stringify(obj[key])
  }
}