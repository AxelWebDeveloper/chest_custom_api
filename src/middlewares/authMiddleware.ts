import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'express-jwt';
import { GetVerificationKey } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';

import { IncomingHttpHeaders } from 'http';
import { JwtStrategy } from 'src/module/auth/jwt.strategy';
import { UsersService } from 'src/module/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private config: ConfigService,
    private readonly userService: UsersService,
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  extractTokenFromHeaders(headers: IncomingHttpHeaders): string | undefined {
    return headers.authorization?.split('Bearer ')[1];
  }

  async use(req: Request, res: Response, next: () => void) {
    const aws_user_pools_id = '6t0sm3rnchbmvppq13lu58nqho';
    const aws_cognito_region = 'us-east-1';

    const issuer = `https://cognito-idp.${aws_cognito_region}.amazonaws.com/${aws_user_pools_id}`;
    const jwksUri = `${issuer}/.well-known/jwks.json`;
    jwt.expressjwt({
      secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 60,
        jwksUri,
      }) as GetVerificationKey,
      issuer,
      algorithms: ['RS256'],
    })(req, res, async (err) => {
      if (err) {
        const status = err.status || 500;
        const message =
          err.message || 'Sorry we were unable to process your request.';
        return res.status(status).send({
          message,
        });
      }
      next();
    });
  }
}
