import { IsEmail, IsString, MinLength, Matches, IsIn, IsNumberString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class OrgData {
  @IsNumber()
  orgId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Matches(/@aiub\.edu$/)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[A-Z])/)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['male', 'female'])
  gender: string;

  @IsNumberString({})
  @IsNotEmpty()
  @Matches(/^01\d{9}$/)
  phoneNumber: string;

  @IsOptional()
  profilePicture?: string;
}