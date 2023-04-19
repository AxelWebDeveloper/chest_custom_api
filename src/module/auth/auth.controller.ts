import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthConfirmPasswordUserDto } from './dto/auth-confirm-reset-password.dto';
import { AuthForgotPasswordUserDto } from './dto/auth-reset-password-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    registerRequest: {
      password: string;
      email: string;
    },
  ) {
    return await this.authService.registerUser(registerRequest);
  }

  @Post('login')
  async login(
    @Body() authenticateRequest: { email: string; password: string },
  ) {
    try {
      return await this.authService.authenticateUser(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('confirm')
  async confirm(
    @Body() confirmUser: { email: string; confirmationCode: string },
  ) {
    try {
      return await this.authService.confirmUser(confirmUser);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('/forgot-password')
  @UsePipes(ValidationPipe)
  async forgotPassword(
    @Body() authForgotPasswordUserDto: AuthForgotPasswordUserDto,
  ) {
    return await this.authService.forgotUserPassword(authForgotPasswordUserDto);
  }

  @Post('/confirm-password')
  @UsePipes(ValidationPipe)
  async confirmPassword(
    @Body() authConfirmPasswordUserDto: AuthConfirmPasswordUserDto,
  ) {
    return await this.authService.confirmUserPassword(
      authConfirmPasswordUserDto,
    );
  }
}
