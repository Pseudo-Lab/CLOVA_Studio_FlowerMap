import { Module } from '@nestjs/common';
import { FeedsModule } from './modules/feeds/feeds.module';
import { FlowersModule } from './modules/flowers/flowers.module';
import { LocationsModule } from './modules/locations/locations.module';
import { ConfigModule } from '@nestjs/config';
import { customConfig } from './config/custom.config';
import { CustomTypeOrmModule } from './config/custom-type-orm.module';
import { ImagesModule } from './modules/images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot(customConfig),
    CustomTypeOrmModule,
    FeedsModule,
    FlowersModule,
    LocationsModule,
    ImagesModule
  ],
})
export class AppModule { }
