import { CourseData } from "../../features/courses/models"
import { DataSource } from "typeorm"
import * as path from "path"
import { ConfigService } from "@nestjs/config"
import { config } from "process"

export const databaseProviders = [
    {
        provide: "DATASOURCE",
        useFactory: async (configService: ConfigService) => {
            const dataSource = new DataSource({
                type: "mysql",
                host: configService.get<string>("DB_HOST") || "localhost",
                port: configService.get<number>("DB_PORT") || 3306,
                username: configService.get<string>("DB_USERNAME") || "user",
                password: configService.get<string>("DB_PASSWORD") || "12345",
                database: configService.get<string>("DB_NAME") || "db",
                //entities: [CourseData],
                entities: [path.join(__dirname, '../../features/**/models/*.entity{.ts,.js}')],
                synchronize: configService.get<boolean>("DB_SYNCHRONIZE") || true,
                logging: configService.get<boolean>("DB_LOGGING") || false,
            })

            return dataSource.initialize()
        },
        inject: [ConfigService]
    }
]