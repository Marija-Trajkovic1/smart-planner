import { IsNumber } from 'class-validator';

export class UpdatePriorityDto {
  @IsNumber()
  id: number;

  @IsNumber()
  priority: number;
}
