import { IsNull, Repository } from "typeorm";
import { ResponseByPage } from "../response";

export abstract class AdapterBase<T extends { id: number, deletedAt: Date | undefined }> {
    constructor(protected repository: Repository<T>) { }

    async save(item: T): Promise<void> {
        await this.repository.save(item);
    }

    async getAll(relations: string[] = []): Promise<T[]> {
        return await this.repository.find({ where: { deletedAt: IsNull() } as any, relations });
    }

    async getOne(id: number, relations: string[] = []): Promise<T | null> {
        const item = await this.repository.findOne({ where: { id, deletedAt: IsNull() } as any, relations });
        return item || null;
    }

    async getByPage(page: number, limit: number, relations: string[] = []): Promise<ResponseByPage<T>> {
        const pageSize = limit;
        const startIndex = (page - 1) * pageSize;

        const records = await this.repository.find({ skip: startIndex, take: pageSize + 1, relations, where: { deletedAt: IsNull() } as any });
        const hasMore = records.length === pageSize + 1;

        return {
            records: hasMore ? records.slice(0, -1) : records,
            currentPage: page,
            hasMore,
        };
    }
}