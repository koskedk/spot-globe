export interface IRepository<T> {
    create(entity: any): Promise<T>;
    createBatch(entity: any[]): Promise<number>;
    update(entity: any): Promise<T>;
    get(tid: any): Promise<T>;
    getAll(criteria?: any): Promise<T[]>;
    delete(tid: any): Promise<boolean>;
    getCount(): Promise<number>;
    getModel(): any;
}
