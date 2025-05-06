export function welcomeEmailTemplate(username: string): string {
  return `
  <h2>Hello ${username} 👋</h2>
  <p>Thank you for signing up at Alaskari Design!</p>
  <p>We’re excited to have you on board and look forward to providing you with the best service.</p>
  <p>If you have any questions, feel free to reach out to us anytime.</p>
  <br />
  <p>Best regards,<br />The Alaskari Design Team</p>
  `;
}
