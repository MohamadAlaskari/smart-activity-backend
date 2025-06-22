import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransportMode } from '../enums/directions-mode.enum';

export class GetDirectionsDto {
    @ApiProperty({
        description: 'Origin location (e.g., current position)',
        example: 'Berlin',
    })
    @IsString()
    origin: string;

    @ApiProperty({
        description: 'Destination location',
        example: 'Botanical Garden, Berlin',
    })
    @IsString()
    destination: string;

    @ApiProperty({
        description: 'Mode of transportation',
        example: TransportMode.WALKING,
        enum: TransportMode,
        default: TransportMode.DRIVING,
    })
    @IsEnum(TransportMode)
    mode: TransportMode;
}
