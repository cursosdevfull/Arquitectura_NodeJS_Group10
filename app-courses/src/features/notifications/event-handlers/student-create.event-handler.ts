import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { StudentCreatedEvent } from "src/features/students/models/events/student-created.event";

@EventsHandler(StudentCreatedEvent)
export class StudentCreatedEventHandler implements IEventHandler<StudentCreatedEvent> {
    handle(event: StudentCreatedEvent) {
        console.log(`Student created: ${event.name} ${event.lastname} (${event.email}) from ${event.country}`);
        //throw new Error("Method not implemented for demo purposes.");
    }
}
