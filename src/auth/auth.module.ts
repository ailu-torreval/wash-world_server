import { Module } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { AuthController } from '@auth/auth.controller';
import { ClientModule } from '@client/client.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@auth/constants';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [ClientModule, PassportModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    // signOptions: { expiresIn: '60s' },
  })],  
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}