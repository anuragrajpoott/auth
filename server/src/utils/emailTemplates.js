const appName = process.env.APP_NAME || "Your App";
const otpValidityNote = "This OTP is valid for 10 minutes.";

const baseTemplate = ({ title, greeting, message, otp, note }) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:40px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;padding:40px;">
                    <tr>
                        <td align="center">
                            <h1 style="margin:0;color:#2563eb;">${appName}</h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-top:30px;">
                            <h2 style="margin:0;color:#222;">${greeting}</h2>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-top:20px;color:#555;font-size:16px;line-height:1.6;">
                            ${message}
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:35px 0;">
                            <div
                                style="
                                    display:inline-block;
                                    padding:18px 35px;
                                    background:#eef4ff;
                                    border-radius:8px;
                                    color:#2563eb;
                                    font-size:32px;
                                    font-weight:bold;
                                    letter-spacing:8px;
                                "
                            >
                                ${otp}
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="color:#666;font-size:15px;">
                            ${note}
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-top:35px;color:#888;font-size:14px;">
                            If you didn't request this, you can safely ignore this email.
                        </td>
                    </tr>

                    <tr>
                        <td
                            style="
                                padding-top:35px;
                                border-top:1px solid #eee;
                                color:#999;
                                font-size:13px;
                                text-align:center;
                            "
                        >
                            © ${new Date().getFullYear()} ${appName}. All rights reserved.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

const emailTemplates = {
    verifyEmail: (name, otp) => ({
        subject: "Verify Your Email",
        html: baseTemplate({
            title: "Email Verification",
            greeting: `Hello ${name},`,
            message:
                "Thank you for registering. Use the OTP below to verify your email address.",
            otp,
            note: otpValidityNote,
        }),
    }),

    resetPassword: (name, otp) => ({
        subject: "Reset Your Password",
        html: baseTemplate({
            title: "Password Reset",
            greeting: `Hello ${name},`,
            message:
                "We received a request to reset your password. Use the OTP below to continue.",
            otp,
            note: otpValidityNote,
        }),
    }),
};

export default emailTemplates;