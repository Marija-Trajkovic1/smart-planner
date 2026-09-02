import { IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePriorityItemDto {
  @IsNumber()
  id: number;

  @IsNumber()
  priority: number;
}