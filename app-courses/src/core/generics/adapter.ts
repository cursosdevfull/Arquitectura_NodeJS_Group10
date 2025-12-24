import { Repository } from "typeorm";
import { ResponseByPage } from "../response";

export abstract class AdapterBase<T extends { id: number }> {
    constructor(protected repository: Repository<T>) { }

    async save(item: T): Promise<void> {
        await this.repository.save(item);
    }

    async getAll(): Promise<T[]> {
        return await this.repository.find();
    }

    async getOne(id: number): Promise<T | null> {
        const item = await this.repository.findOne({ where: { id } as any })

        return item || null;
    }

    async getByPage(page: number, limit: number): Promise<ResponseByPage<T>> {
        const pageSize = limit;
        const startIndex = (page - 1) * pageSize;

        const records = await this.repository.find({ skip: startIndex, take: pageSize + 1 });
        const hasMore = records.length === pageSize + 1;

        return {
            records: hasMore ? records.slice(0, -1) : records,
            currentPage: page,
            hasMore,
        };
    }
}