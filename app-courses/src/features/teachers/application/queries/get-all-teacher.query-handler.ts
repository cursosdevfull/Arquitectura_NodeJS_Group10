import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllTeacherQuery } from "./get-all-teacher.query";
import { Inject } from "@nestjs/common";
import type { TeacherPort } from "../../ports";

@QueryHandler(GetAllTeacherQuery)
export class GetAllTeacherQueryHandler implements IQueryHandler<GetAllTeacherQuery> {
    constructor(@Inject('TeacherAdapter') private readonly adapter: TeacherPort) { }

    execute(query: GetAllTeacherQuery): Promise<any> {
        return this.adapter.getAll(query.expand || []);
    }
}