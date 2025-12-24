import { Course, CourseData } from "../../models";

export class CourseDto {
    static fromDataToDomain(data: CourseData | CourseData[]): Course | Course[] {
        if (Array.isArray(data)) {
            return data.map(item => this.fromDataToDomain(item) as Course);
        }

        return new Course({ id: data.id, title: data.title, deletedAt: data.deletedAt });
    }

    static fromDomainToData(domain: Course | Course[]): CourseData | CourseData[] {
        if (Array.isArray(domain)) {
            return domain.map(item => this.fromDomainToData(item) as CourseData);
        }

        const data = new CourseData();
        data.id = domain.properties().id;
        data.title = domain.properties().title;
        data.deletedAt = domain.properties().deletedAt;
        return data;
    }
}