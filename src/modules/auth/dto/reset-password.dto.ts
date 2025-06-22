import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'Reset token sent to email',
    })
    @IsString()
    token: string;

    @ApiProperty({
        example: 'newStrongPassword123',
        description: 'New password (min. 6 characters)',
    })
    @MinLength(6)
    password: string;
}
