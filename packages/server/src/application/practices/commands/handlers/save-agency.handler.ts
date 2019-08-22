import { SaveAgencyCommand } from '../save-agency.command';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Agency } from '../../../../domain/practices/agency';
import { plainToClass } from 'class-transformer';
import { Inject } from '@nestjs/common';
import { IAgencyRepository } from '../../../../domain/practices/agency-repository.interface';

@CommandHandler(SaveAgencyCommand)
export class SaveAgencyHandler implements ICommandHandler<SaveAgencyCommand> {
  constructor(
    @Inject('IAgencyRepository')
    private readonly agencyRepository: IAgencyRepository,
    private readonly publisher: EventPublisher) {
  }

  async execute(command: SaveAgencyCommand): Promise<any> {

    if (command._id && command._id !== '00000000-0000-0000-0000-000000000000') {
      return await this.updateAgency(command);
    }

    return await this.createAgency(command);
  }

  async createAgency(command: SaveAgencyCommand): Promise<any> {
    const newAgency = new Agency(command.name, command.display);
    const agency = await this.agencyRepository.create(newAgency);
    this.publisher.mergeObjectContext(newAgency).commit();
    return agency;
  }

  async updateAgency(command: SaveAgencyCommand): Promise<any> {
    const raw = await this.agencyRepository.get(command._id);
    if (raw) {
      const agencyToUpdate = plainToClass(Agency, raw);
      agencyToUpdate.changeDetails(command.name, command.display);
      const agency = await this.agencyRepository.update(agencyToUpdate);
      this.publisher.mergeObjectContext(agencyToUpdate).commit();
      return agency;
    }
  }
}
