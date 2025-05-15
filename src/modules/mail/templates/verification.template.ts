export function verificationEmailTemplate(url: string): string {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #4CAF50;">Welcome to VibeDay!</h2>
      <p>Thank you for joining VibeDay. To activate your account, please confirm your email address:</p>
      <p>
        <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px;">
          Confirm Email
        </a>
      </p>
        <p>If the button doesn’t work, you can also copy and paste the following URL into your browser:</p>
      <p style="word-break: break-all;"><a href="${url}">Click here to confirm your email</a></p>
      <p>If you did not create an account with VibeDay, you can safely ignore this message.</p>
      <br/>
      <p>Best regards,<br/>The <strong>VibeDay</strong> Team</p>
    </div>
  `;
}
