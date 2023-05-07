import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsNotEmpty()
  fullname: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  doneTasks: number;

  @IsOptional()
  globalCoins: number;

  @IsOptional()
  earnedCoins: number;
}
