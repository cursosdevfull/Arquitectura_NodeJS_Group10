export class CertificateData {
  certificateId: number;
  scheduleId: number;
  studentId: number;
  dateEmission: Date;
  key: string;
  deletedAt: Date | undefined;
}
