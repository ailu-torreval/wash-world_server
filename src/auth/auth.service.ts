import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientService } from '@client/client.service';
import { LoginUserDto } from '@auth/dto/loginUser.dto';
import { Client } from '@client/entities/client.entity';
import { ClientDto } from '@client/dto/client.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '@app/client/entities/role';


@Injectable()
export class AuthService {
  constructor(
    private readonly clientService: ClientService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginUserDto): Promise<string> {
    const user = await this.clientService.findByEmail(loginDto.email);
    console.log(user);

    const isUserValidated = await bcrypt.compare(loginDto.password, user.password);
    if (!user || !isUserValidated) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { username: user.email, id: user.id };
    return this.jwtService.sign(payload);
  }

  async signup(signupDto: ClientDto): Promise<Partial <Client>> {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(signupDto.password, salt);
  
      signupDto.password = hash;
      if(signupDto.firstname === 'Admin') {
        signupDto.role = Role.Admin;
      }
  
      const newUser = await this.clientService.create(signupDto);
  
      const { password, ...result } = newUser;
  
      return {...result, invoices: []};
      
  }
}
