// @ts-ignore
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdinasirmursal2@gmail.com",
    pass: process.env.APP_PASS,
  },
});

const sendApplicationEmail = async (from: string, to: string) => {
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
      Thank you for applying this job we'll contact you later
    </h3>
    
    
</body>
</html>`;
  try {
    const mailOptions = {
      from,
      to,
      subject: "Job Application",
      html: html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("error at email send ", error);
  }
};

export default sendApplicationEmail;
