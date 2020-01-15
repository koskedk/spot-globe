import { Model } from 'mongoose';
import { IRepository } from '../../application/common/repository.interface';

export abstract class BaseRepository<T> implements IRepository<T> {
  protected constructor(protected readonly model: Model<T>) {}

  create(entity: any): Promise<T> {
    const newModel = new this.model(entity);
    return newModel.save();
  }

  async createBatch(entity: any[]): Promise<number> {
    await this.model.create(entity);
    return entity.length;
  }

  async update(entity: any): Promise<T> {
    const id = entity._id;
    delete entity._id;
    const result = await this.model.updateOne({ _id: id }, entity);
    entity._id = id;
    return entity;
  }

  async get(tid: any): Promise<T> {
    const result = await this.model.findById(tid).exec();
    if (result) {
      return result.toObject();
    }
    return null;
  }

  async getAll(criteria?: any): Promise<T[]> {
    if (criteria) {
      return this.model.find(criteria).exec();
    }
    return this.model.find().exec();
  }

  getAllPaged(size: number, page: number, criteria?: any): Promise<T[]> {
    let query: any;

    if (criteria) {
      query = this.model.find(criteria);
    } else {
      query = this.model.find();
    }

    return query
      .skip(size * (page - 1))
      .limit(size)
      .exec();
  }

  async delete(tid: any) {
    await this.model.deleteOne({ _id: tid }).exec();
    return true;
  }

  async getCount(): Promise<number> {
    return await this.model.estimatedDocumentCount({});
  }

  getModel(): any {
    return this.model;
  }
}
