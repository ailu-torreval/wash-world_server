import { Controller, Get, Post, Body, Request, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { LoginUserDto } from '@auth/dto/loginUser.dto';
import { AuthGuard } from '@auth/auth.guard';
import { ClientDto } from '@client/dto/client.dto';
import { Client } from '@client/entities/client.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() signInDto: LoginUserDto) {
    return this.authService.login(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req): Partial<Client> {
    const { password, ...result } = req.user;
    return result;
  }

  @Post('signup')
  signup(@Body() signupDto: ClientDto) {
    return this.authService.signup(signupDto);
  }

}
