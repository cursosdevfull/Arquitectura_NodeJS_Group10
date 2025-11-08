import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    controllers: [AppController],
    providers: [
        { provide: "APP_SERVICE", useClass: AppService },
        //{ provide: AppService, useClass: AppService }
        AppService,
        { provide: "CURRENT_DATE", useValue: new Date() },
        {
            provide: "SHOW_DATE", useFactory: (paramDate: Date) => {
                const now = paramDate; // new Date();
                const today = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
                return today;
            }, inject: ["CURRENT_DATE"]

        }
    ],
})
export class AppModule { }