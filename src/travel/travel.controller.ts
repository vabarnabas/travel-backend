import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { Travel } from "@prisma/client";
import { TravelService } from "./travel.service";

@Controller("travels")
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Get()
  async finAll(): Promise<Travel[]> {
    return await this.travelService.findAll();
  }

  @Get(":id")
  async findSpecific(@Param("id") id: string): Promise<Travel> {
    return await this.travelService.findSpecific(id);
  }

  @Post()
  async create(@Body() input: Travel) {
    return await this.travelService.create(input);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() input: Travel) {
    return await this.travelService.update(input, id);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.travelService.remove(id);
  }
}
