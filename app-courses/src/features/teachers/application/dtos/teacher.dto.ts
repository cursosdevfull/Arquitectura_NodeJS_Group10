import { Teacher, TeacherData } from "../../models";

export class TeacherDto {
    static fromDataToDomain(data: TeacherData | TeacherData[]): Teacher | Teacher[] {
        if (Array.isArray(data)) {
            return data.map(item => this.fromDataToDomain(item) as Teacher);
        }

        return new Teacher({
            id: data.id,
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            phone: data.phone,
            linkedIn: data.linkedIn,
            summary: data.summary,
            photoUrl: data.photoUrl,
            skills: data.skills
        });
    }

    static fromDomainToData(domain: Teacher | Teacher[]): TeacherData | TeacherData[] {
        if (Array.isArray(domain)) {
            return domain.map(item => this.fromDomainToData(item) as TeacherData);
        }

        const data = new TeacherData();
        data.id = domain.properties().id;
        data.name = domain.properties().name;
        data.lastname = domain.properties().lastname;
        data.email = domain.properties().email;
        data.phone = domain.properties().phone;
        data.linkedIn = domain.properties().linkedIn;
        data.summary = domain.properties().summary;
        data.photoUrl = domain.properties().photoUrl;
        data.skills = domain.properties().skills;
        data.deletedAt = domain.properties().deletedAt;
        return data;
    }
}