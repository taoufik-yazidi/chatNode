const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');
const User = require('../model/User');
const transport = nodemailer.createTransport(sendgrid({

    auth: {
        api_key: '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'
    }

}));
exports.sendMail = (adressMail, key) => {
    console.log('hi im send mail method')
    transport.sendMail({
        to: adressMail,
        from: 'chat@Chat.com',
        subject: 'validation of your compte',
        html: key

    }).then(result => { console.log(result) }).catch(err => { console.log(err) })
}