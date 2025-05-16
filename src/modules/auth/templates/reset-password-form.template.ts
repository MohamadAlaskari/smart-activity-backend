export function resetPasswordFormTemplate(token: string): string {
  return `
    <html>
      <head>
        <title>Reset Your VibeDay Password</title>
        <meta charset="UTF-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f6f6f6;
            padding: 2rem;
            color: #333;
          }
          .container {
            background-color: #fff;
            max-width: 400px;
            margin: auto;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
          }
          button:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>🔐 Reset Your VibeDay Password</h2>
          <p>Please enter your new password below.</p>
          <form method="POST" action="/auth/reset-password">
            <input type="hidden" name="token" value="${token}" />
            <div style="margin-bottom:1rem;">
              <label for="password">New Password:</label><br/>
              <input type="password" name="password" required minlength="6" style="width: 100%; padding: 0.5rem;"/>
            </div>
            <button type="submit">Reset Password</button>
          </form>
        </div>
      </body>
    </html>
  `;
}
