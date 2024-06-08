import { IsString } from 'class-validator';

export default class {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
