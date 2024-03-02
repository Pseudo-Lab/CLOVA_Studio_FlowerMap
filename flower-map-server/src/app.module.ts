import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedsModule } from './modules/feeds/feeds.module';
import { FlowersModule } from './modules/flowers/flowers.module';
import { PhotosModule } from './modules/photos/photos.module';
import { LocationsModule } from './modules/locations/locations.module';
import { ConfigModule } from '@nestjs/config';
import { customConfig } from './config/custom.config';
import { CustomTypeOrmModule } from './config/custom-type-orm.module';

@Module({
  imports: [
    ConfigModule.forRoot(customConfig),
    CustomTypeOrmModule,
    FeedsModule,
    FlowersModule,
    PhotosModule,
    LocationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
