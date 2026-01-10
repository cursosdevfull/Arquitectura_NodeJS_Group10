import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateTeacherCommand } from "./create-teacher.command";
import { Inject } from "@nestjs/common";
import type { TeacherPort } from "../../ports";
import { Teacher, TeacherData } from "../../models";
import { TeacherDto } from "../dtos";

@CommandHandler(CreateTeacherCommand)
export class CreateTeacherCommandHandler implements ICommandHandler<CreateTeacherCommand> {
    constructor(@Inject('TeacherAdapter') private readonly adapter: TeacherPort) { }


    execute(command: CreateTeacherCommand): Promise<any> {
        const teacher = new Teacher(command);

        return this.adapter.save(TeacherDto.fromDomainToData(teacher) as TeacherData);
    }

}