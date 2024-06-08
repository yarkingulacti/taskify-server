import { IsNotEmpty, IsString } from 'class-validator';

export default class {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
