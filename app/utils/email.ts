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
  describe: string
) => {
  try {
    const mailOptions = {
      from,
      to,
      subject: "Job Application",
      html: describe,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("error at email send ", error);
  }
};

export default sendApplicationEmail;
