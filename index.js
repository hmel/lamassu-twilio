var Client = require('twilio')

var client
var fromNumber
var toNumber

exports.NAME = 'Twilio'
exports.SUPPORTED_MODULES = []

exports.config = function config (_config) {
  var accountSid = _config.accountSid
  var authToken = _config.authToken
  fromNumber = _config.fromNumber
  toNumber = _config.toNumber
  client = Client(accountSid, authToken)
}

exports.sendMessage = function sendMessage (rec) {
  var body = rec.sms.body

  return new Promise(function (resolve, reject) {
    client.messages.create({
      body: body,
      to: toNumber,
      from: fromNumber
    }, function (err, message) {
      if (err) return reject(new Error(err.message))
      resolve()
    })
  })
}
