const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

 /*function sendEmail(message) {
  return new Promise(async (res, rej) => {
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'asma.bellil1@esprit.tn',
              pass: '193JFT4536'
          }
      })
    })

      transporter.sendMail(message, function(err, info) {
          if (err) {
              rej(err)
          } else {
              res(info)
          }
      })
      let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    name: "smtp",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  })
} */

function sendEmail(message) {
  return new Promise((res, rej) => {
      const transporter = nodemailer.createTransport({
          service: 'hotmail',
          auth: {
              user: "asma.bellil@hotmail.com",
              pass: "193JFT123456789ab"
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
        from: "asma.bellil@hotmail.com",
        to: Email,
        subject: 'Reset Password',
        html: `
      <html>
      <body>
      <h3>Hello ${Firstname} </h3>
      <p>Reset your password here: <strong>${link}</strong></p>
      <p>Cheers,</p>
      <p>Our  Team</p>
      </body>
      </html>
      
    `
    }

    return sendEmail(message);
}