import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { UsersService } from '../users/users.service';
import { AuthConfig } from './auth.config';
import { AuthConfirmPasswordUserDto } from './dto/auth-confirm-reset-password.dto';
import { AuthForgotPasswordUserDto } from './dto/auth-reset-password-user.dto';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
  constructor(
    private readonly authConfig: AuthConfig,
    private readonly userService: UsersService,
  ) {
    const UserPoolId =
      this.authConfig.userPoolId === undefined
        ? 'us-east-1_nn3NwIbde'
        : this.authConfig.userPoolId;
    const ClientId =
      this.authConfig.userPoolWebClientId === undefined
        ? '6t0sm3rnchbmvppq13lu58nqho'
        : this.authConfig.userPoolWebClientId;

    const config = { UserPoolId, ClientId };

    this.userPool = new CognitoUserPool(config);
  }

  async registerUser(registerRequest: { email: string; password: string }) {
    const { email, password } = registerRequest;
    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        email,
        password,
        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        [],
        async (err, result) => {
          if (!result) {
            reject(err);
          } else {
            const newUser = { ...registerRequest, ...{ uuid: result.userSub } };
            await this.userService.create(newUser);
            resolve(newUser);
          }
        },
      );
    });
  }

  authenticateUser(user: { email: string; password: string }) {
    const { email, password } = user;

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  confirmUser(user: { email: string; confirmationCode: string }) {
    const { email, confirmationCode } = user;

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(
        confirmationCode,
        true,
        function (err, result) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        },
      );
    });
  }

  async forgotUserPassword(
    authForgotPasswordUserDto: AuthForgotPasswordUserDto,
  ) {
    const { email } = authForgotPasswordUserDto;

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const userCognito = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      userCognito.forgotPassword({
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async confirmUserPassword(
    authConfirmPasswordUserDto: AuthConfirmPasswordUserDto,
  ) {
    const { email, confirmationCode, newPassword } = authConfirmPasswordUserDto;

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const userCognito = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      userCognito.confirmPassword(confirmationCode, newPassword, {
        onSuccess: async () => {
          resolve({ status: 'success' });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}
