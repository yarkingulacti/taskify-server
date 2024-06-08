import { Transform } from 'class-transformer';
import { IsOptional, IsString, Min, Max } from 'class-validator';

export default class {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Min(0)
  @Max(100)
  @Transform(({ value }) => parseInt(value, 10))
  take?: number;

  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10))
  skip?: number;
}
