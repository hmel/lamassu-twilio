var Client = require('twilio')
var R = require('ramda')

var client
var fromNumber
var toNumber

exports.NAME = 'Twilio'
exports.SUPPORTED_MODULES = []

var BAD_NUMBER_CODES = [21201, 21202, 21211, 21214, 21216, 21217, 21219, 21408,
  21610, 21612, 21614, 21608]

exports.config = function config (_config) {
  var accountSid = _config.accountSid
  var authToken = _config.authToken
  fromNumber = _config.fromNumber
  toNumber = _config.toNumber
  client = Client(accountSid, authToken)
}

exports.sendMessage = function sendMessage (rec) {
  var body = rec.sms.body
  const _toNumber = rec.sms.toNumber || toNumber
  return new Promise(function (resolve, reject) {
    client.messages.create({
      body: body,
      to: _toNumber,
      from: fromNumber
    }, function (err, message) {
      if (!err) return resolve()

      if (R.contains(err.code, BAD_NUMBER_CODES)) {
        var badNumberError = new Error(err.message)
        badNumberError.name = 'BadNumberError'
        return reject(badNumberError)
      }

      return reject(new Error(err.message))
    })
  })
}
