import { Module } from '@nestjs/common';
import { ossProviders } from './oss.providers';

@Module({
  providers: [...ossProviders],
  exports: [...ossProviders],
})
export class OssModule { }
