import { ResponseByPage } from "../response";

export interface PortBase<T> {
    save(item: T): Promise<void>;
    getAll(relations: string[]): Promise<T[]>;
    getOne(id: number, relations: string[]): Promise<T | null>;
    getByPage(page: number, limit: number, relations: string[]): Promise<ResponseByPage<T>>;
}