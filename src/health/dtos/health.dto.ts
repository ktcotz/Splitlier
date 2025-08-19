import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckResponseDto {
  @ApiProperty({ example: 'ok', description: 'API health status' })
  status: 'ok';

  @ApiProperty({
    example: '2025-08-10T12:34:56.789Z',
    description: 'Current server timestamp',
  })
  timestamp: string;
}
