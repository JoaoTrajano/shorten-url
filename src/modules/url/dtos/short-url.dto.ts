import { ApiProperty } from '@nestjs/swagger';

export class ShortURLDTO {
  @ApiProperty()
  url: string;
}
