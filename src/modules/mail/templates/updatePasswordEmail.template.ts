export function updatePasswordEmailTemplate(url: string): string {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #4CAF50;">Reset Your Password</h2>
      <p>We received a request to reset your password for your <strong style="color: #4CAF50;">VibeDay</strong> account.</p>
      <p>If you made this request, please click the button below to set a new password:</p>
      <p>
        <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
      </p>
      <p>If the button doesn’t work, you can also click the following link:</p>
      <p style="word-break: break-all;">
        <a href="${url}">Click here to reset your password</a>
      </p>
      <p>If you didn’t request this, you can safely ignore this email – your password will remain unchanged.</p>
      <br />
      <p>Best regards,<br />
      The <strong style="color: #4CAF50;">VibeDay</strong> Team</p>
    </div>
  `;
}
