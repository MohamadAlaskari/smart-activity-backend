import { ApiProperty } from '@nestjs/swagger';

export class SuggestionResultDto {
  @ApiProperty({ example: 'Visit the art museum and join a creative workshop' })
  suggestion: string;

  @ApiProperty({ example: 'Culture' })
  category: string;

  @ApiProperty({ example: '2 hours' })
  estimatedDuration: string;

  @ApiProperty({ example: 'Kunsthalle Bremen' })
  location: string;

  @ApiProperty({ example: 'Wear something light and casual.' })
  clothingAdvice: string;
}
