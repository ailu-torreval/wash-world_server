import { Module } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { AuthController } from '@auth/auth.controller';
import { ClientModule } from '@client/client.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@auth/constants';
import { PassportModule } from '@nestjs/passport';
import { VenueService } from '@app/venue/venue.service';
import { VenueModule } from '@app/venue/venue.module';

@Module({
  imports: [ClientModule, PassportModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    // signOptions: { expiresIn: '60s' },
  }), VenueModule],  
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}