import { Controller, Get, Inject } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("app")
export class AppController {
    //constructor(@Inject("APP_SERVICE") private service: AppService) { }
    // constructor(@Inject(AppService) private service: AppService,) { }
    constructor(private service: AppService, @Inject("CURRENT_DATE") private currentDate: Date, @Inject("SHOW_DATE") private showDate: string) { }

    @Get("greeting")
    greeting(): string {
        return `Hello, ${this.service.getRandomPerson()}! Current date is: ${this.showDate}`;
    }
}