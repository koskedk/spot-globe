import { LocationSeeder } from './location.seeder';
import { PracticeSeeder } from './practice.seeder';
export declare class SeederModule {
    private readonly locationSeeder;
    private readonly practiceSeeder;
    constructor(locationSeeder: LocationSeeder, practiceSeeder: PracticeSeeder);
    seedData(): Promise<void>;
}
