import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async finAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(":id")
  async findSpecific(@Param("id") id: string): Promise<User> {
    return await this.userService.findSpecific(id);
  }

  @Post()
  async create(@Body() input: User) {
    return await this.userService.create(input);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() input: User) {
    return await this.userService.update(input, id);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.userService.remove(id);
  }
}
