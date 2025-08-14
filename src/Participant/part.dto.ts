import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  Length,
  IsNumberString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsPhoneNumber,
  MinLength
} from 'class-validator';

export class userdata {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name must contain only alphabets' })
  uname: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/@.*\.xyz$/, { message: 'Email must be in .xyz domain' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 32)
  password: string;

  @IsNumberString()
  @Matches(/^\d{11}$/, { message: 'Phone number must be 11 digits' })
  phonenumber: string;

  @IsString()
  @Matches(/^\d{17}$/, { message: 'Invalid NID format' })
  nidnumber: string;
}
export class CreateUser2Dto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsNumber()
  phone: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
export class UpdatePhoneDto {
  @IsNumber()
  phone: number;
}

//For Project-Profile_Update_DTO
export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  phone?: string;
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}