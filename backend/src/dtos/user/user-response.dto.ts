import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserResponseDto{
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;
}