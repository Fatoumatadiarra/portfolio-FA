import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  sujet?: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
