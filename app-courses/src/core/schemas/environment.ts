import { parseEnv, z } from "znv";

export const environment = () => parseEnv(process.env, {
    PORT: z.coerce.number().default(3000),
    DB_HOST: z.string().default("localhost"),
    DB_PORT: z.coerce.number().default(3306),
    DB_USERNAME: z.string().default("user"),
    DB_PASSWORD: z.string().default("12345"),
    DB_NAME: z.string().default("db"),
    DB_SYNCHRONIZE: z.coerce.boolean().default(true),
    DB_LOGGING: z.coerce.boolean().default(false),
    JWT_ACCESS_SECRET: z.string().default("OXevGsnHbeJ0bVKwa0EM238EUsnB"),
    JWT_ACCESS_EXPIRATION: z.string().default("15m"),
    JWT_REFRESH_SECRET: z.string().default("ZQcGDy8diz5pEp9oql8hZ0nivN58"),
    JWT_REFRESH_EXPIRATION: z.string().default("7d"),
})