import { IsNumber } from 'class-validator';

export class FindFlowDto {
  @IsNumber()
  userId;
}
