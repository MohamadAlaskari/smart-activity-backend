export function resetPasswordSuccessTemplate(): string {
  return `
    <html>
      <head>
        <title>VibeDay – Password Reset Successful</title>
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
            text-align: center;
          }
          h2 {
            color: #4CAF50;
          }
          a {
            display: inline-block;
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          }
          a:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>✅ Password Updated</h2>
          <p>Your password has been successfully reset.</p>
          <p>You can now log in to your <strong>VibeDay</strong> account.</p>
        </div>
      </body>
    </html>
  `;
}
