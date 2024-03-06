
import { ConfigModuleOptions } from '@nestjs/config';

export const customConfig: ConfigModuleOptions = {
    isGlobal: true,
    envFilePath: '.env'
}