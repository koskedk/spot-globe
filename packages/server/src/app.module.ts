import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LocationsModule } from './application/locations/locations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PracticesModule } from './application/practices/practices.module';
import { SeederModule } from './infrastructure/seeder/seeder.module';
import { CqrsModule } from '@nestjs/cqrs';
import { routes } from './routes';
import { RouterModule } from 'nest-router';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { MessagingModule } from './infrastructure/messging/messaging.module';

const cloudUrl = `mongodb+srv://livetest:maun@cluster0-v6fcj.mongodb.net/dwapiGlobe?retryWrites=true&w=majority`;
const localUrl = 'mongodb://localhost/dwapiGlobe';

@Module({
  imports: [
    ConfigModule,
    MessagingModule,
    RouterModule.forRoutes(routes),
    CqrsModule,
    DatabaseModule,
    LocationsModule,
    PracticesModule,
    SeederModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
