import { Module, Global } from '@nestjs/common';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';

@Global()
@Module({
  controllers: [PasswordController],
  providers: [PasswordService],
  exports: [PasswordService],
})
export class PasswordModule { }
