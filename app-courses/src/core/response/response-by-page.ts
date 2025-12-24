export type ResponseByPage<T> = {
    records: T[];
    //totalRecords: number;
    currentPage: number;
    hasMore: boolean;
    //totalPages: number;
};