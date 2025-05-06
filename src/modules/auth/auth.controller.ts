import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/modules/auth/auth.service';

import { RegisterDto } from './dto/register.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /*
  //@HttpCode(200)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    summary: 'User Login',
    description: 'Authentifiziert den Benutzer und gibt ein JWT-Token zurück.',
  })
  @ApiResponse({
    status: 200,
    description: 'Erfolgreiche Authentifizierung mit Token.',
  })
  @ApiResponse({ status: 401, description: 'Ungültige Anmeldeinformationen.' })
  login(@Body() loginDto: LoginDto) {
    return '';
    // return this.authService.login(loginDto);
  }
*/
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
  /*
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
    */
  /*
  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    // return this.authService.verifyEmail(token);
  }*/
}
