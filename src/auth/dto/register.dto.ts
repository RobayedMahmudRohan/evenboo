import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

//PROJECT_EVENBOO-REGISTER_DTO
export class RegisterDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @MinLength(6)
  password: string;

  @MinLength(6)
  ConfirmPassword: string;
}
