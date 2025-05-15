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
      this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';

    await this.mailService.sendVerificationEmail(
      createdUser.email,
      accessToken,
      baseUrl,
    );

    return { accessToken };
  }
  async verifyEmailToken(token: string): Promise<{ message: string }> {
    try {
      const payload = await this.jwtService.verifyAsync<JWTPayloadTypes>(token);

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

  async login(loginDto: LoginDto): Promise<AccessTokentype> {
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
    await this.mailService.sendWelcomeEmail(user.email, user.username);
    return { accessToken: token };
  }

  async getCurrentUser(id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }
  private async generateJWT(payload: JWTPayloadTypes): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
