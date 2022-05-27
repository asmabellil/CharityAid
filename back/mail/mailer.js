const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

function sendEmail(message) {
  return new Promise((res, rej) => {
      const transporter = nodemailer.createTransport({
          service: 'hotmail',
          auth: {
              user: "association369@outlook.fr",
              pass: "AB123456789+"
          }
      })

      transporter.sendMail(message, function(err, info) {
          if (err) {
              rej("Erreur" + err)
          } else {
              res("sent" + info)
          }
      })
  })
}

exports.SendResetPasswordEmail = (Email ,Firstname, id,link) => {
    const message = {
        from: "association369@outlook.fr",
        to: Email,
        subject: 'Reset Password',
        html: `
      <html>
      <body>
      <h3>Hello ${Firstname} </h3>
      <p>Reset your password here: <strong>${link}</strong></p>
      <p>Our  Team</p>
      </body>
      </html>
      
    `
    }

    return sendEmail(message);
}