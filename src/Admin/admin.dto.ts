import { IsString, IsEmail, IsNotEmpty, IsNumber, Length, Matches, IsNumberString } from 'class-validator';
export class userdata{
    @IsString()
    @IsNotEmpty()
    uname: string;

    @IsString()
    @IsNotEmpty()
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
    oname: string;

    @IsEmail()
    @IsNotEmpty()
    @Matches(/^[\w.+-]+@aiub\.edu$/, {message: 'Email must be a valid aiub.edu email address',})
    oemail: string;

    @IsString()
    @IsNotEmpty()
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