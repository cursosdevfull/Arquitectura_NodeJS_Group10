import { CourseData } from "../../features/courses/models"
import { DataSource } from "typeorm"
import * as path from "path"

export const databaseProviders = [
    {
        provide: "DATASOURCE",
        useFactory: async () => {
            const dataSource = new DataSource({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "user",
                password: "12345",
                database: "db",
                //entities: [CourseData],
                entities: [path.join(__dirname, '../../features/**/models/*.entity{.ts,.js}')],
                synchronize: true,
            })

            return dataSource.initialize()
        }
    }
]