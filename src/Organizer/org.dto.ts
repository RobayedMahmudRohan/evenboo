import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  Matches,
} from 'class-validator';

export class OrgData {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  fullname: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase character',
  })
  @MaxLength(50)
  password: string;

  @IsOptional()
  @IsString()
  image?: string | null;
}

export class LoginData {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class UpdatePasswordData {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  newPassword: string;
}
