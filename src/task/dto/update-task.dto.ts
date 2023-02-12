import { IsArray, IsBoolean, IsInt, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  action: string;

  @IsInt()
  how_many: number;

  @IsString()
  unit: string;

  @IsInt()
  reward: number;

  @IsBoolean()
  done: boolean;

  @IsArray()
  days: [];
}
