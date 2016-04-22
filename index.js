var Client = require('twilio')

var client
var fromNumber

exports.NAME = 'Twilio'
exports.SUPPORTED_MODULES = []

exports.config = function config (_config) {
  var accountSid = _config.accountSid
  var authToken = _config.authToken
  fromNumber = _config.fromNumber
  client = Client(accountSid, authToken)
}

exports.sendMessage = function sendMessage (rec) {
  var body = rec.sms.body
  var toNumber = rec.sms.toNumber

  return new Promise(function (resolve, reject) {
    client.messages.create({
      body: body,
      to: toNumber,
      from: fromNumber
    }, function (err, message) {
      if (err) return reject(err)
      resolve()
    })
  })
}
