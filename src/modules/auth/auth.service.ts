import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokentype, JWTPayloadTypes } from 'src/common/utils/types/types';

//import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';

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

  private async generateJWT(payload: JWTPayloadTypes): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
