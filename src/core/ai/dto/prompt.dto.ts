import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class PromptDto {
    @ApiProperty({
        description: 'Prompt to be sent to the AI',
        example: 'What can I do today in Bremen with good weather?',
    })
    @IsString()
    @MinLength(3)
    prompt: string;
}
