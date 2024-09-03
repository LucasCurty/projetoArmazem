import {IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    id:string;
    name: string;

    avatar?: string
}