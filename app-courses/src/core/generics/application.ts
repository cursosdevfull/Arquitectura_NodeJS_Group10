import { PortBase } from "./port";

export abstract class ApplicationBase<Q, T, U extends PortBase<T>> {
    protected adapter: U;

    constructor(adapter: U) {
        this.adapter = adapter;
    }

    async save(item: Q) {
        await this.adapter.save(item);
    }

    async getAll() {
        return await this.adapter.getAll();
    }

    async getOne(id: number) {
        return await this.adapter.getOne(id);
    }

    async getByPage(page: number, limit: number) {
        return await this.adapter.getByPage(page, limit);
    }
}