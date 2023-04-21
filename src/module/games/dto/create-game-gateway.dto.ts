import { User } from '../../users/entities/user.entity';

export class CreateGameGatewayDto {
  name: string;
  uuid: string;
  user: User;
}
