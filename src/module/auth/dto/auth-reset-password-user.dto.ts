import { IsEmail, Matches } from 'class-validator';

export class AuthForgotPasswordUserDto {
  @IsEmail()
  email: string;
}
