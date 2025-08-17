import { IsNotEmpty } from 'class-validator';

//PROJECT_EVENBOO-LOGIN_DTO
export class LoginDto {
  @IsNotEmpty()
  phoneOrEmail: string;

  @IsNotEmpty()
  password: string;
}
