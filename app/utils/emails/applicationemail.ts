// @ts-ignore
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdinasirmursal2@gmail.com",
    pass: process.env.APP_PASS,
  },
});

const sendApplicationEmail = async (from: string, to: string, app: any) => {
  let html: any = `
  <!DOCTYPE html>
<html>
<head>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f0f0f0;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; margin-top: 30px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <tr>
            <td align="center" style="padding: 40px 0 30px 0; background: #004B85; color: white;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 400;">Application Received</h1>
            </td>
        </tr>
        <tr>
            <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                    <tr>
                        <td style="color: #153643; font-family: Arial, sans-serif;">
                            <h2 style="font-size: 20px; margin-top: 0;">Dear ${app.jobSeeker},</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 30px 0;">
                            <p style="margin: 0;">Thank you for applying for the <strong>${app.jobTitle}</strong>  position with <strong>${app.companyName}.</strong> We have received your application and are impressed by your qualifications.</p>
                            <p style="margin: 20px 0;">We are currently in the process of reviewing applications and expect to schedule interviews within the next two weeks. If you are selected to continue to the interview stage, our hiring team will be in contact with you to provide further details and next steps.</p>
                            <p style="margin: 0;">We appreciate your interest in joining our team and your patience during the selection process.</p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#004B85" style="padding: 30px 30px; text-align: center; color: white; font-family: Arial, sans-serif; font-size: 14px;">
                <p style="margin: 0;">${app.companyName} | ${app.address}</p>
            </td>
        </tr>
    </table>
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

export default sendApplicationEmail;
