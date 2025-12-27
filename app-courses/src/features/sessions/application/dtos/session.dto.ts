import { ScheduleData } from "../../../schedules/models";
import { Session, SessionData } from "../../models";

export class SessionDto {
    static fromDataToDomain(data: SessionData | SessionData[]): Session | Session[] {
        if (Array.isArray(data)) {
            return data.map(item => this.fromDataToDomain(item) as Session);
        }

        return new Session({
            id: data.id,
            schedule: data.schedule,
            sessionDate: data.sessionDate,
            hours: data.hours
        });
    }

    static fromDomainToData(domain: Session | Session[]): SessionData | SessionData[] {
        if (Array.isArray(domain)) {
            return domain.map(item => this.fromDomainToData(item) as SessionData);
        }

        const data = new SessionData();
        data.id = domain.properties().id;
        data.schedule = domain.properties().schedule as ScheduleData;
        data.sessionDate = domain.properties().sessionDate;
        data.hours = domain.properties().hours;
        data.deletedAt = domain.properties().deletedAt;
        return data;
    }
}