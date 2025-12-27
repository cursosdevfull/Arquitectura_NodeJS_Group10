import { ScheduleData } from "../../../schedules/models";
import { Payment, PaymentData } from "../../models";
import { StudentData } from "../../../students/models";

export class PaymentDto {
    static fromDataToDomain(data: PaymentData | PaymentData[]): Payment | Payment[] {
        if (Array.isArray(data)) {
            return data.map(item => this.fromDataToDomain(item) as Payment);
        }

        return new Payment({
            id: data.id,
            amount: data.amount,
            currency: data.currency,
            note: data.note,
            schedule: data.schedule,
            student: data.student,
            paymentDate: data.paymentDate
        });
    }

    static fromDomainToData(domain: Payment | Payment[]): PaymentData | PaymentData[] {
        if (Array.isArray(domain)) {
            return domain.map(item => this.fromDomainToData(item) as PaymentData);
        }

        const data = new PaymentData();
        data.id = domain.properties().id;
        data.amount = domain.properties().amount;
        data.currency = domain.properties().currency;
        data.note = domain.properties().note;
        data.schedule = domain.properties().schedule as ScheduleData;
        data.student = domain.properties().student as StudentData;
        data.paymentDate = domain.properties().paymentDate;
        data.deletedAt = domain.properties().deletedAt;
        return data;
    }
}