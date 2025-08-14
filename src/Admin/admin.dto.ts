import { IsString, IsEmail, IsNotEmpty, IsNumber, Length, Matches, IsNumberString, IsIn, IsOptional, IsBoolean, IsInt, Min, isNotEmpty } from 'class-validator';
export class userdata{
    @IsString()
    @IsNotEmpty()
    uname: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Za-z]+$/, {message: 'Name must contain only letters (no numbers or symbols)',})
    fname: string;

    @IsEmail()
    @IsNotEmpty()
    @Matches(/^[\w.+-]+@aiub\.edu$/, {message: 'Email must be a valid aiub.edu email address',})
    uemail: string;

    @IsString()
    @IsNotEmpty()
    @Length(6,32)
    @Matches(/^(?=.*[A-Z]).*$/, {message: 'Password must contain at least one uppercase letter',})
    password: string;

    @IsNumberString()
    @IsNotEmpty()
    @Matches(/^01\d{9}$/, {message: 'Phone number must start with 01 and be 11 digits long',})
    phonenumber: string;
}
export class organizerdata{
    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Za-z]+$/, {message: 'Name must contain only letters (no numbers or symbols)',})
    oname: string;

    @IsEmail()
    @IsNotEmpty()
    @Matches(/^[\w.+-]+@aiub\.edu$/, {message: 'Email must be a valid aiub.edu email address',})
    oemail: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['Male', 'Female'], {message: 'Gender should be Male or Female.',})
    ogender: string;

    @IsNumberString()
    @IsNotEmpty()
    @Matches(/^01\d{9}$/, {message: 'Phone number must start with 01 and be 11 digits long',})
    opnumber: string;

    @IsString()
    @IsNotEmpty()
    @Length(6,32)
    @Matches(/^(?=.*[A-Z]).*$/, {message: 'Password must contain at least one uppercase letter',})
    opassword: string;

}
export class CreateOrganizerDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

