// @ts-ignore
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdinasirmursal2@gmail.com",
    pass: process.env.APP_PASS,
  },
});

const sendInterviewEmail = async (from: string, to: string, meeting: any) => {
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
  <body style="font-family: Arial, sans-serif; margin: 20px; padding: 0; background-color: #f4f4f4; color: #333;">
    <div style="background-color: #fff; border: 1px solid #dedede; border-radius: 5px; padding: 20px; margin: 10px auto; max-width: 800px;">
        <h2 style="color: #007bff;">Meeting Appointment </h2>
        <p>Dear ${meeting.jobSeeker},</p>
        <p>Thank you for your interest in joining our team. We are pleased to invite you for a meeting to discuss your application further.</p>
        <div><strong>Job Position:</strong> ${meeting.jobTitle}</div>
        <div style="margin: 20px 0; padding: 20px; background-color: #e9ecef; border-radius: 5px;">
            <p><strong>Date:</strong> ${meeting.date}</p>
            <p><strong>Time:</strong> ${meeting.time}</p>
            <p><strong>Duration:</strong> ${meeting.timeDuration} m</p>
            <p><strong>Via:</strong> ${meeting.type} </p>
            <p><strong>Description:</strong> ${meeting.note}</p>
        </div>
        
       
        <div style="margin-top: 20px; text-align: center; font-size: 0.9em; color: #aaa;">
          ${meeting.companyName} | ${meeting.address}
        </div>
    </div>
</body>
 
</html>`;
  try {
    const mailOptions = {
      from,
      to,
      subject: "Job Interview",
      html: html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("error at email send ", error);
  }
};

export default sendInterviewEmail;
