import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { User } from './users.entity.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  create(@Body() userData: Partial<User>) {
    return this.usersService.create(userData);
  }

  @Patch('profile/:id')
updateProfile(@Param('id') id: string, @Body() body: { name?: string; email?: string; password?: string }) {
  return this.usersService.updateProfile(+id, body);
}
@Delete(':id')
remove(@Param('id') id: string) {
  return this.usersService.remove(+id);
}

}