import { SeedReader } from './seed-reader';
import { County } from '../../domain/locations/county';
import { ILocationRepository } from '../../domain/locations/location-repository.interface';
export declare class LocationSeeder {
    private readonly reader;
    private readonly locationRepository;
    constructor(reader: SeedReader, locationRepository: ILocationRepository);
    load(): Promise<County[]>;
    seed(): Promise<number>;
}
