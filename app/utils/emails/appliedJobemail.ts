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

const sendAppliedJobemail = async (from: string, to: string, app: any) => {
  let html: any = `
  <!DOCTYPE html>
<html>
<head>
    <title>Job Application Received</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f4f4f4;
            padding: 20px;
            margin: 0;
        }
        .container {
            background-color: #ffffff;
            width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #007bff;
            color: #ffffff;
            padding: 10px;
            text-align: center;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: left;
            line-height: 1.6;
        }
        .footer {
            background-color: #333;
            color: #ffffff;
            text-align: center;
            padding: 10px;
            font-size: 12px;
        }
        a {
            color: #007bff;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            New Job Application Received
        </div>
        <div class="content">
            <p>Dear ${app.companyName},</p>
            <p>We are pleased to inform you that a new application has been submitted for the <strong>${
              app.jobTitle
            }</strong> position you posted. Here are the details of the job seeker:</p>
            <ul>
                <li><strong>Applicant Name: </strong> ${app.jobSeeker}</li>
                <li><strong>Email Address: </strong> ${app.email}</li>
                <li><strong>Cover Letter: </strong> ${app.coverLetter}</li>
            </ul>
            <p>To review the application and take further actions, please log in to your employer account:</p>
            <p><a href="${`${API}/dashboard/appliers?id=${app.jobId}`}">Click here to view the application</a></p>
            <p>Thank you for using shaqo-sahal.</p>
            
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} shaqo-sahal. All rights reserved.
        </div>
    </div>
</body>
</html>


  `;
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

export default sendAppliedJobemail;
