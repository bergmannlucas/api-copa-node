const sendgrid = require('@sendgrid/mail');
const config = require('../config');

sendgrid.setApiKey(config.sendgridKey);

exports.send = async (to, subject, body) => {
  sendgrid.send({
    to,
    from: 'hello@lucas.com',
    subject,
    html: body,
  });
};
