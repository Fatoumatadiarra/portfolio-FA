import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

export class UpdateSkillDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  level?: number;

  @IsString()
  @IsOptional()
  icon?: string;
}
