import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  action: string;

  @IsInt()
  how_many: number;

  @IsString()
  unit: string;

  @IsInt()
  reward: number;

  @IsNotEmpty()
  @IsArray()
  days: [];
}
