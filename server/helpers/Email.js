const nodemailer = require("nodemailer");

// send mail
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASSWORD,
	},
});

const sendOTPEmail = async (email, otp) => {
	const mailOptions = {
		from: "Avijit Dey <no-reply@yourdomain.com>", // Add a no-reply email address
		to: email,
		subject: "Your OTP Code",
		html: `
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f4f7fa; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 30px;">
              <h2 style="color: #333; text-align: center;">Your OTP Code</h2>
              <p style="color: #555; font-size: 16px;">Hello,</p>
              <p style="color: #555; font-size: 16px;">
                We have received a request to verify your identity. Please use the following One-Time Password (OTP) to proceed:
              </p>
              <div style="background-color: #007bff; color: white; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; border-radius: 4px;">
                ${otp}
              </div>
              <p style="color: #555; font-size: 16px;">
                This OTP is valid for 5 minutes. If you didn't request this, you can safely ignore this message.
              </p>
              <p style="color: #555; font-size: 14px; text-align: center;">
                Thank you,<br>
                <strong>Avijit Dey</strong><br>
                <a href="mailto:deyavijit134@.com" style="color: #007bff;">Contact Support</a>
              </p>
            </div>
          </body>
        </html>
      `,
	};

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		throw new Error("Failed to send OTP email");
	}
};

export default sendOTPEmail;
