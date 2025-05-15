export function resetPasswordFormTemplate(token: string): string {
  return `
    <html>
      <head><title>Reset Password</title></head>
      <body style="font-family:sans-serif; padding:2rem;">
        <h2>Set a New Password</h2>
        <form method="POST" action="/auth/reset-password">
          <input type="hidden" name="token" value="${token}" />
          <div style="margin-bottom:1rem;">
            <label for="password">New Password:</label><br/>
            <input type="password" name="password" required minlength="6"/>
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </body>
    </html>
  `;
}
