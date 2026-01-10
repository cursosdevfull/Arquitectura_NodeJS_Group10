import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { StudentUpdatedEvent } from "../../students/models/events/student-updated.event";

@EventsHandler(StudentUpdatedEvent)
export class StudentUpdatedEventHandler implements IEventHandler<StudentUpdatedEvent> {
    handle(event: StudentUpdatedEvent) {
        console.log(`Student updated: ${event.name} ${event.lastname} (${event.email}) from ${event.country}`);
    }
}
