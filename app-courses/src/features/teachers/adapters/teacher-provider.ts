import { DataSource } from "typeorm";
import { TeacherData } from "../models";

export const teacherProviders = [
    {
        provide: "TEACHER_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TeacherData),
        inject: ["DATASOURCE"],
    }
]