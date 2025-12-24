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

@Module({
  imports: [CourseModule, ScheduleModule, EnrollmentModule, PaymentModule, SessionModule, StudentModule, TeacherModule, UserModule, VideoModule, RoleModule, CertificateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
