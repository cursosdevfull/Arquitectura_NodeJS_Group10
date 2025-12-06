import { Certificate } from '../models';

export interface CertificatePort {
  save(certificate: Certificate): void;
  getAll(): Certificate[];
  getOne(certificateId: number): Certificate | null;
  getByPage(page: number): Certificate[];
  update(certificateId: number, certificate: Certificate): void;
  delete(certificateId: number): void;
}
