import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, Min } from 'class-validator';

class PaginationResponseMetadata {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  currentPage: number;

  @IsNotEmpty()
  @IsNumber()
  totalPages: number;

  @IsNotEmpty()
  @IsNumber()
  currentPageSize: number;

  @IsNotEmpty()
  @IsNumber()
  totalItemsCount: number;
}

export class PaginationResponse<T> {
  @IsArray()
  items: T[];

  @IsNotEmpty()
  @Type(() => PaginationResponseMetadata)
  meta: PaginationResponseMetadata;
}
