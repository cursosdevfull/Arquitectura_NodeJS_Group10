import { DataSource } from "typeorm";
import { CourseData } from "../models";

export const courseProviders = [
    {
        provide: "COURSE_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CourseData),
        inject: ["DATASOURCE"],
    }
]