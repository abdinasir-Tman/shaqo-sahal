// @ts-ignore
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdinasirmursal2@gmail.com",
    pass: process.env.APP_PASS,
  },
});

const rejectionEmail = async (
  from: string,
  to: string,
  note: string,
  sub: string
) => {
  let html: any = `<!DOCTYPE html>
<html>
  <head> <title>Apply job</title>
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
    </style>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Shaqo sahal</title>
  
  </head>
  <body>
    <h3 style="text-align: center; font-family: 'Lucida Sans'; padding: 10px">
      ${note}
    </h3>
    
    
</body>
</html>`;
  try {
    const mailOptions = {
      from,
      to,
      subject: sub,
      html: html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("error at email send ", error);
  }
};

export default rejectionEmail;
