import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CURRENT_USER_KEY } from '../utils/constants';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JWTPayloadTypes } from 'src/common/utils/types/types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('access denied, no token provided');
    }
    try {
      const payload: JWTPayloadTypes = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>('JWT_SECRET'),
        },
      );
      console.log('Decoded Token:', payload);
      request[CURRENT_USER_KEY] = payload;
    } catch {
      throw new UnauthorizedException('access denied, invalid token');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
