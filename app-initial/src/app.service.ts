import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    getRandomPerson(): string {
        const people = ["Alice", "Bob", "Charlie", "Diana", "Ethan"];
        const randomIndex = Math.floor(Math.random() * people.length);
        return people[randomIndex];
    }
}