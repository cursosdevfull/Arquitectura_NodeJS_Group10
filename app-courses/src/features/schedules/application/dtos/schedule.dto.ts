import { CourseData } from "../../../courses/models";
import { Schedule, ScheduleData } from "../../models";
import { TeacherData } from "../../../teachers/models";

export class ScheduleDto {
    static fromDataToDomain(data: ScheduleData | ScheduleData[]): Schedule | Schedule[] {
        if (Array.isArray(data)) {
            return data.map(item => this.fromDataToDomain(item) as Schedule);
        }

        return new Schedule({
            id: data.id,
            course: data.course,
            teacher: data.teacher,
            imageUrl: data.imageUrl,
            duration: data.duration,
            resume: data.resume,
            goals: data.goals,
            syllabus: data.syllabus,
            requirements: data.requirements,
            frequency: data.frequency,
            start: data.start,
            rangeHours: data.rangeHours,
            slogan: data.slogan,
            title: data.title
        });
    }

    static fromDomainToData(domain: Schedule | Schedule[]): ScheduleData | ScheduleData[] {
        if (Array.isArray(domain)) {
            return domain.map(item => this.fromDomainToData(item) as ScheduleData);
        }

        const data = new ScheduleData();
        data.id = domain.properties().id;
        data.course = domain.properties().course as CourseData;
        data.teacher = domain.properties().teacher as TeacherData;
        data.imageUrl = domain.properties().imageUrl;
        data.duration = domain.properties().duration;
        data.resume = domain.properties().resume;
        data.goals = domain.properties().goals;
        data.syllabus = domain.properties().syllabus;
        data.requirements = domain.properties().requirements;
        data.frequency = domain.properties().frequency;
        data.start = domain.properties().start;
        data.rangeHours = domain.properties().rangeHours;
        data.slogan = domain.properties().slogan;
        data.title = domain.properties().title;
        data.deletedAt = domain.properties().deletedAt;
        return data;
    }
}