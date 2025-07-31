import { IsEmail, IsString, MinLength, Matches, IsIn, IsNumberString, IsOptional, isNumberString, IsNotEmpty } from 'class-validator';

export class OrgData {
  @IsNumberString()
  orgId: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z]+$/, {message: 'Name must contain only letters (no numbers or symbols)',})
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Matches(/@aiub\.edu$/, {message: 'Email must be a valid aiub.edu email address',})
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[A-Z])/, {message: 'Password must contain minimum 6 digit length and a Upper case.',})
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['male', 'female'], {message: 'Gender should be male or female.',})
  gender: string;

  @IsNumberString({})
  @IsNotEmpty()
  @Matches(/^01\d{9}$/, {message: 'Phone Number must contain 11 digits and starts with 01.',})
  phoneNumber: string;

  @IsOptional()
  profilePicture?: string;
}