import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './features/courses/nestjs';
import { ScheduleModule } from './features/schedules/nestjs';
import { EnrollmentModule } from './features/enrollments/nestjs';
import { PaymentModule } from './features/payments/nestjs';
import { SessionModule } from './features/sessions/nestjs';
import { StudentModule } from './features/students/nestjs';
import { TeacherModule } from './features/teachers/nestjs';
import { UserModule } from './features/users/nestjs';
import { VideoModule } from './features/videos/nestjs';
import { RoleModule } from './features/roles/nestjs';
import { CertificateModule } from './features/certificates/nestjs';
import { AuthModule } from './features/auth/nestjs';
import { CqrsModule } from '@nestjs/cqrs';
import { StudentCreatedEventHandler } from './features/notifications/event-handlers';
import { StudentUpdatedEventHandler } from './features/notifications/event-handlers/student-updated.event-handler';
import { AuthenticationGuard } from './core/guards';
import { AuthorizationGuard } from './core/guards/authorization.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { environment } from './core/schemas/environment';

@Module({
  imports: [
    CourseModule,
    ScheduleModule,
    EnrollmentModule,
    PaymentModule,
    SessionModule,
    StudentModule,
    TeacherModule,
    UserModule,
    VideoModule,
    RoleModule,
    CertificateModule,
    AuthModule,
    CqrsModule.forRoot(),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 30,
        },
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environment]
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    StudentCreatedEventHandler,
    StudentUpdatedEventHandler,
    AuthenticationGuard,
    AuthorizationGuard,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
