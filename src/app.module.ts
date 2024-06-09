import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './shared/guards/AuthGuard';
import { TypeOrmSettings } from './database/config.db';

@Module({
  imports: [TypeOrmSettings, AuthModule],
  providers: [{ provide: 'APP_GUARD', useClass: AuthGuard }],
})
export class AppModule {}
