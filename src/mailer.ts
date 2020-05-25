import * as nodemailer from 'nodemailer';
import * as fs from 'fs';

export const sendEmail=async () => {

  const transporter = nodemailer.createTransport({
    service: 'gmail', // hostname
    secure: true, // TLS requires secureConnection to be false
    port: 465, // port for secure SMTP
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASS // generated ethereal password
    },

  });

  const mailOptions = {
    from: 'testninalogdts@gmail.com', // sender address
    to: 'testninalogdts@gmail.com', // list of receivers
    subject: 'Products report', // Subject line
    html: '<p>Find here attached report</p>', // plain text body
    attachments: [
      {
        filename: 'myreport.csv',
        content: fs.createReadStream('file.csv'),
      }
    ]
  };

  try {
    const res = await transporter.sendMail(mailOptions);
  } catch (errorko) {
    console.error('ERRRRRORRRRRRRR', errorko);
  }

}
