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
  person: any,
  appId: string
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
    <h1 style="text-align: center; font-family: 'Lucida Sans'; padding: 10px">
      Interview Schedule
    </h1>
    <div
      style="display: flex; justify-content: space-around; padding-bottom: 10px; flex-direction: column; "
    >
      <h3
        style="font-family: 'Times New Roman', Times, serif; font-style: italic;padding-bottom: 10px;"
      >
        Job Title: <span style="font-size: medium">${person.jobTitle}</span> 
      </h3>
      <h3
        style="font-family: 'Times New Roman', Times, serif; font-style: italic"
      >
        Applier Name:
        <span style="font-size: medium">${person.name}</span>
      </h3>
    </div>

    <div style="padding-bottom: 10px">
      <h3 style="padding-bottom: 10px">Applier's Describtion</h3>
      <p>
        ${person.description}
      </p>
    </div>
    <main
      style="
        background-color: rgba(2, 2, 107, 0.905);
        width: 100%;
        height: 200px;
      "
    >
      <h4
        style="
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 10px 0px;
          color: white;
        "
      >
        Schedule the Interview
      </h4>
      ${`<input style="width: 90%; margin: 0px auto" type="date" name="date" id="" />`}
      <div
        style="
          display: flex;
          height: 60px;
          justify-content: center;
          align-items: center;
        "
      >
        <button
          style="
            padding: 8px 10px;
            border-radius: 0 15px 0 15px;
            border: none;
            margin-top: 15px;
            background-color: rgb(4, 156, 222);
            cursor: pointer;
          "
        >
          <a
            href="http://localhost:3000/redirects/apply/${appId}?to=${from}"
            style="color: white; text-decoration: none"
            >Schedule after 5 days</a
          >
        </button>
      </div>
    </main> 
    
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
