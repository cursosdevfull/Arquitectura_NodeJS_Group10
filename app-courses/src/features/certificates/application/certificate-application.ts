import { CertificateAdapter } from '../adapters';
import { Certificate } from '../models';
import { CertificatePort } from '../ports';

export class CertificateApplication {
  private readonly adapter: CertificatePort;

  constructor() {
    this.adapter = new CertificateAdapter();
  }

  save(certificate: Certificate) {
    this.adapter.save(certificate);
  }

  getAll() {
    return this.adapter.getAll();
  }

  getOne(certificateId: number) {
    return this.adapter.getOne(certificateId);
  }

  getByPage(page: number) {
    return this.adapter.getByPage(page);
  }

  update(certificateId: number, certificate: Certificate) {
    this.adapter.update(certificateId, certificate);
  }

  delete(certificateId: number) {
    this.adapter.delete(certificateId);
  }
}
