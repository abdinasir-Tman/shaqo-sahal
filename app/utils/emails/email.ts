import { API } from "@/lib/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdinasirmursal2@gmail.com",
    pass: process.env.APP_PASS,
  },
});

const sendApplicationEmail = async (
  from: string,
  to: string,
  describe: string,
  appId: string
) => {
  let html: any = `<!DOCTYPE html>
<html>
<head>
    <title>Apply Job</title>
</head>
<body>
    <div style="text-align: center; padding: 20px; background-color: #f3f3f3;">
        
        <p style="color: #555; margin-bottom: 10px">${describe}</p>
        <a href="http://localhost:3000/dashboard/application/apply/${appId}" ><button style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; border: none; cursor: pointer;">Accepted</button></a>
    </div>
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
