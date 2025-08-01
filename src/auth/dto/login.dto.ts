import { IsNotEmpty } from "class-validator";

export class LoginDto
{
    @IsNotEmpty()
    phoneOrEmail: string;

    @IsNotEmpty()
    password: string;
}