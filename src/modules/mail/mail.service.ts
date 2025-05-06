/*
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { MailOptions } from 'src/common/utils/types/types';
import { welcomeEmailTemplate } from './templates/welcome.template';
import { verificationEmailTemplate } from './templates/verification.template';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(options: MailOptions) {
    try {
      await this.mailerService.sendMail({
        from: `<no-reply@alaskaridesign.com>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException();
    }
  }

  async sendVerificationEmail(
    to: string,
    token: string,
    baseUrl: string,
  ): Promise<void> {
    const url = `${baseUrl}/auth/verify-email?token=${token}`;
    return this.sendMail({
      to,
      subject: 'Email Verification',
      html: verificationEmailTemplate(url),
    });
  }

  // TODO Send an Email to reset the Password
  // async sendPasswordResetEmail()

  // TODO send a Welcome Email
  async sendWelcomeEmail(to: string, username: string) {
    const html = welcomeEmailTemplate(username);
    await this.sendMail({
      to,
      subject: `Welcome to Alaskari Design!`,
      html,
    });
  }
}
*/
