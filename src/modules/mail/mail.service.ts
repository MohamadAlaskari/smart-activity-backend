import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { MailOptions } from './types/mailOptions.type';
import { welcomeEmailTemplate } from './templates/welcome.template';
import { verificationEmailTemplate } from './templates/verification.template';
import { updatePasswordEmailTemplate } from './templates/updatePasswordEmail.template';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendMail(options: MailOptions) {
        try {
            await this.mailerService.sendMail({
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
            subject: `You're almost in! Confirm your VibeDay email ✨`,
            html: verificationEmailTemplate(url),
        });
    }

    async sendPasswordResetEmail(to: string, resetUrl: string) {
        const subject = 'Reset your VibeDay password';
        const html = updatePasswordEmailTemplate(resetUrl);

        await this.mailerService.sendMail({
            to,
            subject,
            html,
        });
    }

    async sendWelcomeEmail(to: string, username: string) {
        const html = welcomeEmailTemplate(username);
        await this.sendMail({
            to,
            subject: `Welcome to VibeDay, ${username}! Let’s get started 🌟`,
            html,
        });
    }
}
