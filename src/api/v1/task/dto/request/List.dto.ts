import { Type } from 'class-transformer';
import { IsOptional, IsString, Min, Max } from 'class-validator';

export default class {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @Max(100)
  take?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  skip?: number;
}
