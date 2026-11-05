import { IsString, IsArray, IsOptional } from 'class-validator';

export class UpdateExperienceDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  entreprise?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  dateDebut?: string;

  @IsString()
  @IsOptional()
  dateFin?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  technologies?: string[];
}
