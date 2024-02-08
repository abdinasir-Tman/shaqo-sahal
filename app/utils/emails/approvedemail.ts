// @ts-ignore
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdinasirmursal2@gmail.com",
    pass: process.env.APP_PASS,
  },
});

const approvedEmail = async (from: string, to: string, note: any) => {
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
     <p>Dear ${note?.jobSeeker},</p>
            <p style='margin-top:10px'>We are thrilled to inform you that your application for the position of <strong>${note?.jobTitle}</strong> at <strong>${note?.companyName}</strong> has been approved. Welcome to our team!</p>
            <p>Your skills and experience stood out among many impressive Job seekers, and we are excited about the potential you bring to our company.</p>
            <p>We will be sending you an official offer letter shortly, but in the meantime, please feel free to reach out if you have any questions or need further information.</p>
            <p>We look forward to working with you and seeing the great things we will accomplish together.</p>
            <p>Warm regards,</p>
            <p style='margin-top: 10px ; text-transform: capitalize;'><strong>from ${note?.companyName}'s HR Team</strong></p>
    
    
</body>
</html>`;
  try {
    const mailOptions = {
      from,
      to,
      subject: "Job Approved",
      html: html,
    };

    await transporter.sendMail(mailOptions);
    console.log("emait has sent successfully");
  } catch (error) {
    console.log("error at email send ", error);
  }
};

export default approvedEmail;
