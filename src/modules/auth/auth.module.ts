import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { MailModule } from '../mail/mail.module';

@Global()
@Module({
    imports: [
        MailModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
                },
            }),
        }),
        UsersModule,
    ],
    exports: [JwtModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
