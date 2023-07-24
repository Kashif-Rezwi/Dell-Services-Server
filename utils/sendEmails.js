const nodemailer = require("nodemailer");

const sendEmails = async (data) => {
  try {
    const { email, otp } = data;
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: "kashifrezwi850@gmail.com",
        pass: "9NwDpkfYK6BA0cV5",
      },
    });

    const info = await transporter.sendMail({
      from: '"JMD-Server" <jmd-server@gmail.com>',
      to: email,
      subject: "OTP Verification",
      text: "Hello world?",
      html: `<b>Your account Verification OTP is ${otp}.</b>`,
    });

    return info;
  } catch (error) {
    console.log({ error });
  }
};

module.exports = { sendEmails };
