import { PortBase } from "./port";

export abstract class ApplicationBase<Q, T, U extends PortBase<T>> {
    protected adapter: U;
    protected fromDomainToData: (domain: Q | Q[]) => T | T[];
    protected fromDataToDomain: (data: T | T[]) => Q | Q[];

    constructor(adapter: U, fromDomainToData: (domain: Q | Q[]) => T | T[], fromDataToDomain: (data: T | T[]) => Q | Q[]) {
        this.adapter = adapter;
        this.fromDomainToData = fromDomainToData;
        this.fromDataToDomain = fromDataToDomain;
    }

    async save(item: Q) {
        await this.adapter.save(this.fromDomainToData(item) as T);
    }

    async getAll(relations: string[] = []) {
        return await this.adapter.getAll(relations);
    }

    async getOne(id: number, relations: string[] = []) {
        const data = await this.adapter.getOne(id, relations);
        if (data) {
            return this.fromDataToDomain(data) as Q;
        } else {
            return null
        }

    }

    async getByPage(page: number, limit: number, relations: string[] = []) {
        const data = await this.adapter.getByPage(page, limit, relations);
        const response: any = Object.assign({}, data);
        response.records = this.fromDataToDomain(response.records) as Q[];
        return response;
    }
}