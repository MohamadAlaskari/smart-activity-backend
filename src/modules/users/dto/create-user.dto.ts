import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDateString,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'John', description: 'User first name' })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'User last name' })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ example: 'johndoe', description: 'Unique username' })
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        example: 'user@example.com',
        description: 'User email address',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'strongPassword123',
        description: 'User password (min. 6 characters)',
    })
    @MinLength(6)
    password: string;

    @ApiProperty({
        required: false,
        default: false,
        description: 'Indicates if the email has been verified',
    })
    @IsOptional()
    @IsBoolean()
    isEmailVerified?: boolean;

    @ApiProperty({
        example: '1997-05-15',
        required: false,
        description: 'User birth date (optional)',
    })
    @IsOptional()
    @IsDateString()
    dateOfBirth?: string;
    @ApiProperty({
        required: false,
        default: true,
        description: 'Indicates if it is the user’s first login',
    })
    @IsOptional()
    @IsBoolean()
    isFirstLogin?: boolean;
}
