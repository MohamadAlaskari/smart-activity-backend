export function welcomeEmailTemplate(username: string): string {
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2>Hello ${username} 👋</h2>
      <p>Welcome to <strong style="color: #4CAF50;">VibeDay</strong> – we're thrilled to have you on board!</p>
      <p>From personalized activity suggestions to helpful tips, <strong style="color: #4CAF50;">VibeDay</strong> is here to make your days more exciting and inspiring.</p>
      <p>If you ever need help or have questions, don't hesitate to reach out to us.</p>
      <br />
      <p>Enjoy the vibes!<br />
      The <strong style="color: #4CAF50;">VibeDay</strong> Team</p>
    </div>
  `;
}
