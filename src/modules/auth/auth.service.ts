import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokentype, JWTPayloadTypes } from 'src/common/utils/types/types';

import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';
import { LoginDto } from './dto/login.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private readonly mailService: MailService,
    ) {}

    async register(registerDto: RegisterDto): Promise<AccessTokentype> {
        const createdUser = await this.usersService.create(registerDto);
        //  generate JWT Token
        const accessToken = await this.generateJWT({
            id: createdUser.id,
            username: createdUser.username,
            email: createdUser.email,
        });

        const baseUrl =
            this.configService.get<string>('FRONTEND_URL') ||
            'http://localhost:3000';

        await this.mailService.sendVerificationEmail(
            createdUser.email,
            accessToken,
            baseUrl,
        );

        return { accessToken };
    }
    async verifyEmailToken(token: string): Promise<{ message: string }> {
        try {
            const payload =
                await this.jwtService.verifyAsync<JWTPayloadTypes>(token);

            await this.usersService.update(payload.id, {
                isEmailVerified: true,
            });

            return { message: 'Email verified successfully' };
        } catch (error) {
            if (error instanceof Error && error.name === 'TokenExpiredError') {
                throw new BadRequestException('Verification token expired');
            }
            throw new UnauthorizedException('Invalid token');
        }
    }
    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isPasswordValid = await bcrypt.compare(
            loginDto.password,
            user.password,
        );
        if (!isPasswordValid)
            throw new UnauthorizedException('Invalid credentials');

        if (!user.isEmailVerified) {
            throw new UnauthorizedException(
                'Please verify your email before logging in',
            );
        }

        const token = await this.generateJWT({
            id: user.id,
            username: user.username,
            email: user.email,
        });

        // Sende E-Mail asynchron und ignoriere Fehler
        this.mailService
            .sendWelcomeEmail(user.email, user.username)
            .catch((err) => {
                console.warn('E-Mail-Versand fehlgeschlagen:', err.message);
            });
        return {
            accessToken: token,
        };
    }

    async getCurrentUser(id: string) {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        return user;
    }

    async requestPasswordReset({
        email,
    }: RequestPasswordResetDto): Promise<{ message: string }> {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new NotFoundException('User not found');

        const token = await this.generateJWT({
            id: user.id,
            email: user.email,
            username: user.username,
        });

        const baseUrl =
            this.configService.get<string>('FRONTEND_URL') ||
            'http://localhost:3000';
        const resetUrl = `${baseUrl}/auth/reset-password?token=${token}`;

        await this.mailService.sendPasswordResetEmail(user.email, resetUrl);

        return { message: 'Reset link sent to email' };
    }

    async resetPassword({
        token,
        password,
    }: ResetPasswordDto): Promise<{ message: string }> {
        try {
            const payload =
                await this.jwtService.verifyAsync<JWTPayloadTypes>(token);

            await this.usersService.update(payload.id, { password: password });

            return { message: 'Password updated successfully' };
        } catch {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }

    private async generateJWT(payload: JWTPayloadTypes): Promise<string> {
        return await this.jwtService.signAsync(payload);
    }
}
