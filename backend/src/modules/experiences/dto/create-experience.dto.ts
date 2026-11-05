import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  entreprise: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  dateDebut: string;

  @IsString()
  @IsOptional()
  dateFin?: string;

  @IsArray()
  @IsString({ each: true })
  technologies: string[];
}
