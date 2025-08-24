import nodemailer from "nodemailer";
import User from "@/models/userModels";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // Create hashed token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // Save token in DB depending on type
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hr
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // ✅ Correct transporter variable
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ff3f0238030bd5", // your Mailtrap user
        pass: "39371dc727a11b", // your Mailtrap pass
      },
    });

    // Email content
    const mailOptions = {
      from: "ayushman@ayush.ai",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <p>
          Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
          to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
          <br />
          Or copy this link: ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>
      `,
    };

    // ✅ Now use the same transporter variable
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (err) {
    console.error("Error in sendEmail:", err);
    throw err;
  }
};
