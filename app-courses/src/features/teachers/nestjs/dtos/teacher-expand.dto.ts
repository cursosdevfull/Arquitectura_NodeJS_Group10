import { IsArray, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class TeacherExpandDto {
    @IsOptional()
    @Transform(({ value }) => {
        // Si es un string, convertirlo a array
        if (typeof value === 'string') {
            return [value];
        }
        // Si es un array, devolverlo como está
        if (Array.isArray(value)) {
            return value;
        }
        // Si es undefined o null, devolver array vacío
        return [];
    })
    @IsArray()
    @IsString({ each: true })
    expand?: string[]
}