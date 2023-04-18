import { Injectable, NestMiddleware } from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';
import jwt_decode from 'jwt-decode';
import { decodedToken } from './decodedToken';
import { isUnauthorizedHttpException } from 'src/helper/errors';
import { AuthenticatedRequest } from 'src/interfaces/Request';
import { UsersService } from 'src/module/users/users.service';

@Injectable()
export class InjectUser implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  extractTokenFromHeaders(headers: IncomingHttpHeaders): string | undefined {
    return headers.authorization?.split('Bearer ')[1];
  }

  async use(
    req: AuthenticatedRequest,
    res: Response,
    next: () => void,
  ): Promise<void> {
    const token = this.extractTokenFromHeaders(req.headers);

    if (token !== undefined) {
      try {
        const decodedToken: decodedToken = await jwt_decode(token);
        req.uuid = decodedToken.sub;
      } catch (error) {
        throw isUnauthorizedHttpException();
      }
      const user = await this.usersService.getUserInfoFromAuthenticationId(
        req.uuid,
      );
      if (user) {
        req.user = user;
      }
    }
    next();
  }
}
