import { IsString, IsEmail, IsNotEmpty, IsNumber, Length, Matches, IsNumberString } from 'class-validator';
export class userdata{
    @IsString()
    @IsNotEmpty()
    uname: string;

    @IsString()
    @IsNotEmpty()
    fname: string;

    @IsString()
    @IsNotEmpty()
    @Length(6,32)
    password: string;

    @IsNumberString()
    @IsNotEmpty()
    @Matches(/^\d{11}$/)
    phonenumber: string;
}
export class organizerdata{
    @IsString()
    @IsNotEmpty()
    oname: string;

    @IsEmail()
    @IsNotEmpty()
    oemail: string;

    @IsString()
    @IsNotEmpty()
    ogender: string;

    @IsNumberString()
    @IsNotEmpty()
    @Matches(/^\d{11}$/)
    opnumber: string;

    @IsString()
    @IsNotEmpty()
    @Length(6,32)
    opassword: string;

}