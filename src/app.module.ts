import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [AuthModule, UsersModule, StatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
