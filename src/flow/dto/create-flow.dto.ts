import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateFlowDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  chosen: boolean;
}
