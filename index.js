var Client = require('twilio')

var client
var fromNumber
var logger

exports.config = function config (_config, _logger) {
  logger = _logger

  var accountSid = _config.accountSid
  var authToken = _config.authToken
  fromNumber = _config.fromNumber
  client = Client(accountSid, authToken)
}

exports.sendMessage = function sendMessage (rec) {
  var body = rec.sms.body
  var toNumber = rec.sms.toNumber

  client.messages.create({
    body: body,
    to: toNumber,
    from: fromNumber
  }, function (err, message) {
    if (err) return logger.error(err)
    logger.debug('Successfully sent sms to: ' + toNumber)
  })
}
