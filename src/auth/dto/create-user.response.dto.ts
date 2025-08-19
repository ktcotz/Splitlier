import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  @ApiProperty({ example: 1, description: 'ID created user' })
  id: number;

  @ApiProperty({ example: 'alice@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'Alice', description: 'User first name' })
  firstName: string;

  @ApiProperty({
    example: '2025-08-19T12:34:56.789Z',
    description: 'Date when user was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-08-19T12:34:56.789Z',
    description: 'Date when user was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: 'jwt.refresh.token',
    description: 'JWT refresh token',
  })
  refreshToken: string;
}
