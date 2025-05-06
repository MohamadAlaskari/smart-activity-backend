import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('SMTP_HOST'),
          port: configService.get<number>('SMTP_PORT'),
          secure: false, //in Dev we use http that mean we don't want to use SSL but in production we use https the we have to use SSL
          auth: {
            user: configService.get<string>('SMTP_USER'),
            pass: configService.get<string>('SMTP_PASS'),
          },
        },
        defaults: {
          from: `"${configService.get<string>('SMTP_FROM_NAME')}" <${configService.get<string>('SMTP_USER')}>`,
        },
      }),
    }),
  ],
  providers: [],
  exports: [MailService],
})
export class MailModule {}
