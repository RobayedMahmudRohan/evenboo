import { IsEmail, IsString, MinLength, Matches, IsIn, IsNumberString, IsOptional, IsNotEmpty } from 'class-validator';

export class OrgData {
  @IsNotEmpty({ message: 'OrgId is required' })
  @IsNumberString()
  orgId: number;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z]+$/, {message: 'Name must contain only letters (no numbers or symbols)',})
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  @Matches(/@aiub\.edu$/, { message: 'Email must contain aiub.edu domain' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase character' })
  password: string;

  @IsNotEmpty({ message: 'Gender is required' })
  @IsString()
  @IsIn(['male', 'female'], { message: 'Gender must be either male or female' })
  gender: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsNumberString({}, { message: 'Phone number must contain only numbers' })
  @Matches(/^01\d{9}$/, { message: 'Phone number must be 11 digits and start with 01' })
  phoneNumber: string;

  @IsOptional()
  profilePicture?: string;
}