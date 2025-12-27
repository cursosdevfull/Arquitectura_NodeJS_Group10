import { ScheduleData } from "../../../schedules/models";
import { Certificate, CertificateData } from "../../models";
import { StudentData } from "../../../students/models";

export class CertificateDto {
    static fromDataToDomain(data: CertificateData | CertificateData[]): Certificate | Certificate[] {
        if (Array.isArray(data)) {
            return data.map(item => this.fromDataToDomain(item) as Certificate);
        }

        return new Certificate({ id: data.id, schedule: data.schedule, student: data.student, dateEmission: data.dateEmission, key: data.key, deletedAt: data.deletedAt });
    }

    static fromDomainToData(domain: Certificate | Certificate[]): CertificateData | CertificateData[] {
        if (Array.isArray(domain)) {
            return domain.map(item => this.fromDomainToData(item) as CertificateData);
        }

        const data = new CertificateData();
        data.id = domain.properties().id;
        data.schedule = domain.properties().schedule as ScheduleData;
        data.student = domain.properties().student as StudentData;
        data.dateEmission = domain.properties().dateEmission;
        data.key = domain.properties().key;
        data.deletedAt = domain.properties().deletedAt;
        return data;
    }
}