export function resetPasswordSuccessTemplate(): string {
  return `
    <html>
      <head><title>Password Reset Successful</title></head>
      <body style="font-family:sans-serif; padding:2rem;">
        <h2 style="color: green;">✅ Password Updated</h2>
        <p>Your password has been successfully updated.</p>
        <p>You can now log in with your new password.</p>
      </body>
    </html>
  `;
}
