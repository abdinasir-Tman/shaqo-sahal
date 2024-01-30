import { API } from "@/lib/config";
// @ts-ignore
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdinasirmursal2@gmail.com",
    pass: process.env.APP_PASS,
  },
});

const receivedjobemail = async (from: string, to: string, note: any) => {
  let html: any = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Job Opportunity at ${note.companyName}</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; line-height: 1.6; margin: 0; padding: 20px;">
    <div style="background-color: #ffffff; margin: 0 auto; max-width: 600px; padding: 20px;">
        <h2 style="color: #333;">New Job Opportunity at ${
          note.companyName
        } - Apply Now!</h2>
        <p>Dear ${note.jobSeeker},</p>
        <p>We are excited to share that a new career opportunity has become available at ${
          note.companyName
        }.</p>
        <h3 style="color: #333;">Job Title: ${note.jobTitle}</h3>
        <p>Location: ${note.location}<br>
        
        </p>
        
        <p>${note.description}</p>
        
        
        <p>To learn more about this role and to apply, please visit the job Detail on our website:</p>
        <p><a href="${`${API}/jobSeeker/applicant/${note.jobId}`}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">View Job and Apply</a></p>
        
    </div>
</body>
</html>

`;
  try {
    const mailOptions = {
      from,
      to,
      subject: "New Job Opportunity at " + note.companyName + " Apply Now",
      html: html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("error at email send ", error);
  }
};

export default receivedjobemail;
