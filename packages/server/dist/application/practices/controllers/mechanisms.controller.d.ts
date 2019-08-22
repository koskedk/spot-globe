import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MechanismDto } from '../../../domain/practices/dtos/mechanism.dto';
export declare class MechanismsController {
    private readonly commandBus;
    private readonly queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    getMechanisms(): Promise<any>;
    createOrUpdateMechanism(mechanism: MechanismDto): Promise<any>;
    deleteMechanism(id: any): Promise<any>;
}
