import { DynamicModule, Global, Module } from '@nestjs/common';
import { AesGcmService } from './aes-gcm.service';

@Global()
@Module({})
export class AesGcmModule {
  static forRoot(secretKey: string): DynamicModule {
    return {
      module: AesGcmModule,
      providers: [
        {
          provide: 'AES_SECRET_KEY',
          useValue: secretKey,
        },
        AesGcmService,
      ],
      exports: [
        'AES_SECRET_KEY',
        AesGcmService,
      ],
    };
  }
}
