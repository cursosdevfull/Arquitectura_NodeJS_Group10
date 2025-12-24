import { ResponseByPage } from "../response";

export interface PortBase<T> {
    save(item: T): Promise<void>;
    getAll(): Promise<T[]>;
    getOne(id: number): Promise<T | null>;
    getByPage(page: number, limit: number): Promise<ResponseByPage<T>>;
}