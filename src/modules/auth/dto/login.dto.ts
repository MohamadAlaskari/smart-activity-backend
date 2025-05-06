import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'E-Mail-Adresse des Benutzers',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Passwort des Benutzers',
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
