
var accountSid = ''; // Your Account SID from www.twilio.com/console
var authToken = 'your_auth_token';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello from Node',
    to: '+',  // Text this number
    from: '+16785096160' // From a valid Twilio number
})
.then((message) => console.log(message.sid));
