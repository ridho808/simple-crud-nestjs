import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ProductModule,ConfigModule.forRoot({envFilePath:'.env',isGlobal:true})],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
