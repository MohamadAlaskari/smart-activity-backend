export function verificationEmailTemplate(url: string): string {
  return `
        <h3>Hello!</h3>
        <p>Please click the link below to verify your email address:</p>
        <a href="${url}">${url}</a>
        <p>If you did not request this, you can safely ignore this email.</p>
        <br/>
        <p>Best regards,<br/>The Alaskari Tech Team</p>
      `;
}
