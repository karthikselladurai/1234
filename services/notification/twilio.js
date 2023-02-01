// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// console.log(accountSid, authToken);
const client = require("twilio")(accountSid, authToken);

exports.sendSms = async () => {
    try {
        // console.log("start sms");
        await client.messages
            .create({
                body: "hi kdm",
                messagingServiceSid: 'MGc131b574bbcae394aac6c5ea9e9a1147',
                from:'+916381495541',
                to: '+919444829852'
            })
            .then(message => {
                console.log(">>>>>>>>>>>>>>>>", message)
                // return message.sid
            })
            //  next()
            //  .done()
            .catch((error) => {
                console.error(error);
            });
    } catch (err) {
        console.log("twilio error>>>>>>>>>>>>>>", err);
    }
}