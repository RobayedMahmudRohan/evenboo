import
{
    IsEmail,
    IsNotEmpty,
    Matches,
    MinLength,
    IsString,
} from 'class-validator';

export class RegisterDto
{
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