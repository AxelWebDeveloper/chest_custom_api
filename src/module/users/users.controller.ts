import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enum/roles.enum';
import { AuthenticatedRequest } from 'src/interfaces/Request';
import { noFirebasseUUID, noUserExistsHttpException } from 'src/helper/errors';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @ApiBearerAuth('JWT-auth')
  // @Roles(Role.RH)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.SALARY)
  async findAll(@Req() req: AuthenticatedRequest) {
    if (!req.uuid) throw noFirebasseUUID();

    return await this.usersService.findAll();
  }

  @Get('me')
  @ApiBearerAuth('JWT-auth')
  findCurrentUser(@Req() req: AuthenticatedRequest) {
    if (!req.uuid) throw noFirebasseUUID();
    if (!req.user) throw noUserExistsHttpException();

    try {
      return this.usersService.getUserInfoFromAuthenticationId(req.uuid);
    } catch (error) {
      throw new HttpException('ERROR', 501);
    }
  }

  @Get('email')
  findOneByEmail(@Req() req: AuthenticatedRequest) {
    if (!req.uuid) throw noFirebasseUUID();
    if (!req.user) throw noUserExistsHttpException();
    return this.usersService.findOneByEmail(req.user.email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
