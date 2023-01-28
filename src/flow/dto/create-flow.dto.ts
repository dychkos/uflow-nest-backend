import { IsString } from 'class-validator';

export class CreateFlowDto {
  @IsString()
  title: string;
}
