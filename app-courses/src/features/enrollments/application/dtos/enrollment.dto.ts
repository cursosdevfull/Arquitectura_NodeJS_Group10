import { ScheduleData } from "../../../schedules/models";
import { Enrollment, EnrollmentData } from "../../models";
import { StudentData } from "../../../students/models";

export class EnrollmentDto {
    static fromDataToDomain(data: EnrollmentData | EnrollmentData[]): Enrollment | Enrollment[] {
        if (Array.isArray(data)) {
            return data.map(item => this.fromDataToDomain(item) as Enrollment);
        }

        return new Enrollment({
            id: data.id,
            schedule: data.schedule,
            student: data.student,
            enrollmentDate: data.enrollmentDate
        });
    }

    static fromDomainToData(domain: Enrollment | Enrollment[]): EnrollmentData | EnrollmentData[] {
        if (Array.isArray(domain)) {
            return domain.map(item => this.fromDomainToData(item) as EnrollmentData);
        }

        const data = new EnrollmentData();
        data.id = domain.properties().id;
        data.schedule = domain.properties().schedule as ScheduleData;
        data.student = domain.properties().student as StudentData;
        data.enrollmentDate = domain.properties().enrollmentDate;
        data.deletedAt = domain.properties().deletedAt;
        return data;
    }
}