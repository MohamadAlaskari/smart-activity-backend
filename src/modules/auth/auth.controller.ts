import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from 'src/modules/auth/auth.service';
import { Request, Response } from 'express';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JWTPayloadTypes } from 'src/common/utils/types/types';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { resetPasswordSuccessTemplate } from './templates/reset-success.template';
import { resetPasswordFormTemplate } from './templates/reset-password-form.template';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'User Registration',
    description:
      'Registriert einen neuen Benutzer und gibt ein JWT-Token zurück.',
  })
  @ApiResponse({
    status: 201,
    description: 'Benutzer erfolgreich registriert.',
  })
  @ApiResponse({
    status: 400,
    description: 'Ungültige Eingabedaten oder Benutzer existiert bereits.',
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @Get('verify-email')
  @ApiOperation({ summary: 'Verify email using a token sent by email' })
  @ApiQuery({
    name: 'token',
    required: true,
    description: 'JWT verification token',
  })
  @ApiResponse({ status: 200, description: 'Email verified successfully' })
  @ApiResponse({ status: 400, description: 'Verification token expired' })
  @ApiResponse({ status: 401, description: 'Invalid token' })
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmailToken(token);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({
    status: 200,
    description: 'Login successful, returns JWT token',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials or email not verified',
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('current-user')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get Current User',
    description:
      'Gibt die Informationen des aktuell authentifizierten Benutzers zurück.',
  })
  @ApiResponse({
    status: 200,
    description: 'Benutzerinformationen erfolgreich abgerufen.',
  })
  @ApiResponse({
    status: 401,
    description: 'Nicht autorisiert, JWT-Token fehlt oder ungültig.',
  })
  getCurrentUser(@CurrentUser() payload: JWTPayloadTypes) {
    return this.authService.getCurrentUser(payload.id);
  }

  @Post('request-reset')
  @ApiOperation({ summary: 'Request password reset link via email' })
  requestReset(@Body() dto: RequestPasswordResetDto) {
    return this.authService.requestPasswordReset(dto);
  }

  @Post('reset-password')
  async resetPasswordFromForm(@Req() req: Request, @Res() res: Response) {
    const { token, password } = req.body as { token: string; password: string };
    await this.authService.resetPassword({ token, password });

    res.setHeader('Content-Type', 'text/html');
    return res.send(resetPasswordSuccessTemplate());
  }

  @Get('reset-password')
  resetPasswordForm(@Query('token') token: string): string {
    return resetPasswordFormTemplate(token);
  }
}
