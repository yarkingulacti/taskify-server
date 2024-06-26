import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, Min, Max } from 'class-validator';

export default class {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => (value ? parseInt(value) : 5))
  @Min(1)
  @Max(100)
  take?: number;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => (value ? parseInt(value) : 0))
  @Min(0)
  skip?: number;
}
