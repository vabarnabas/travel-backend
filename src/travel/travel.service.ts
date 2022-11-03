import { ForbiddenException, Injectable } from "@nestjs/common";
import { Travel } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TravelService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Travel[]> {
    return this.prismaService.travel.findMany({
      include: { traveler: { select: { displayName: true } } },
    });
  }

  async findSpecific(id: string): Promise<Travel> {
    const travels = await this.prismaService.travel.findMany({
      where: {
        id: { equals: id },
      },
      include: { traveler: { select: { displayName: true } } },
    });

    if (travels.length === 0) throw new ForbiddenException("Access denied.");

    return travels[0];
  }

  async create(input: Travel) {
    if (
      !input.city ||
      !input.country ||
      !input.startDate ||
      !input.endDate ||
      !input.rating
    ) {
      throw new ForbiddenException("Access denied.");
    }

    return await this.prismaService.travel.create({
      data: input,
      include: { traveler: { select: { displayName: true } } },
    });
  }

  async update(input: Travel, id: string) {
    const travel = await this.prismaService.travel.findUnique({
      where: {
        id: id,
      },
    });

    if (!travel) throw new ForbiddenException("Access denied.");

    return await this.prismaService.travel.update({
      where: { id: travel.id },
      data: input,
      include: { traveler: { select: { displayName: true } } },
    });
  }

  async remove(id: string) {
    const travel = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!travel) throw new ForbiddenException("Access denied.");

    return await this.prismaService.user.delete({
      where: { id: travel.id },
    });
  }
}
