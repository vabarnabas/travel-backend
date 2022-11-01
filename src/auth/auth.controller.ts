import { Body, Controller, Get, Post } from "@nestjs/common";
import { GetCurrentUser } from "src/common/decorators";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private prismaService: PrismaService,
  ) {}

  // @Public()
  @Post("/local/signin")
  signInLocal(@Body() dto: AuthDTO) {
    return this.authService.signInLocal(dto);
  }

  // @UseGuards(AtGuard)
  @Post("/logout")
  logout(@GetCurrentUser("id") id: string) {
    return this.authService.logout(id);
  }

  // @Public()
  // @UseGuards(RtGuard)
  @Post("/refresh")
  refresh(
    @GetCurrentUser("id") id: string,
    @GetCurrentUser("refreshToken") refreshToken: string,
  ) {
    return this.authService.refresh(id, refreshToken);
  }

  @Get("/current")
  currentUser(@GetCurrentUser("id") id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }
}
