import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthConfig {
  public userPoolId = process.env.AWS_COGNITO_USERPOOL_ID;
  public userPoolWebClientId = process.env.AWS_COGNITO_CLIENTID;
  public region = process.env.AWS_COGNITO_REGION;
  public authority = `https://cognito-idp.${process.env.AWS_COGNITO_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USERPOOL_ID}`;
}
