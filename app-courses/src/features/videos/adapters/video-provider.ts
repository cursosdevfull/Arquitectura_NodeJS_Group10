import { DataSource } from "typeorm";
import { VideoData } from "../models";

export const videoProviders = [
    {
        provide: "VIDEO_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(VideoData),
        inject: ["DATASOURCE"],
    }
]