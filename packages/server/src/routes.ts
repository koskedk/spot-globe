import { Routes } from 'nest-router';
import { PracticesModule } from './application/practices/practices.module';
import { LocationsModule } from './application/locations/locations.module';

export const routes: Routes = [
  {
    path: 'api/v1/practices',
    module: PracticesModule,
  },
  {
    path: 'api/v1/locations',
    module: LocationsModule,
  },
];
