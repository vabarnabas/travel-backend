import { Module } from "@nestjs/common";
import { TravelService } from "./travel.service";
import { TravelController } from "./travel.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [TravelService],
  controllers: [TravelController],
})
export class TravelModule {}
