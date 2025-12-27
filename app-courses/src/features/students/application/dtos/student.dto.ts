import { Student, StudentData } from "../../models";

export class StudentDto {
    static fromDataToDomain(data: StudentData | StudentData[]): Student | Student[] {
        if (Array.isArray(data)) {
            return data.map(item => this.fromDataToDomain(item) as Student);
        }

        return new Student({
            id: data.id,
            name: data.name,
            lastname: data.lastname,
            nickname: data.nickname,
            country: data.country
        });
    }

    static fromDomainToData(domain: Student | Student[]): StudentData | StudentData[] {
        if (Array.isArray(domain)) {
            return domain.map(item => this.fromDomainToData(item) as StudentData);
        }

        const data = new StudentData();
        data.id = domain.properties().id;
        data.name = domain.properties().name;
        data.lastname = domain.properties().lastname;
        data.nickname = domain.properties().nickname;
        data.country = domain.properties().country;
        data.deletedAt = domain.properties().deletedAt;
        return data;
    }
}