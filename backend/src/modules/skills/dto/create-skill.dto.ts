import { IsString, IsNotEmpty, IsInt, Min, Max, IsOptional } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsInt()
  @Min(0)
  @Max(100)
  level: number;

  @IsString()
  @IsOptional()
  icon?: string;
}
