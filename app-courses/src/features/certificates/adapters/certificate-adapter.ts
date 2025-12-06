import { Certificate } from '../models';
import { CertificatePort } from '../ports';

export class CertificateAdapter implements CertificatePort {
  private certificates: Certificate[] = [];

  save(certificate: Certificate): void {
    this.certificates.push(certificate);
  }

  getAll(): Certificate[] {
    return this.certificates;
  }

  getOne(certificateId: number): Certificate | null {
    const certificate = this.certificates.find(
      (c) => c.properties().certificateId === certificateId,
    );
    return certificate || null;
  }

  getByPage(page: number): Certificate[] {
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.certificates.slice(startIndex, endIndex);
  }

  update(certificateId: number, certificate: Certificate): void {
    const index = this.certificates.findIndex(
      (c) => c.properties().certificateId === certificateId,
    );
    if (index !== -1) {
      this.certificates[index] = certificate;
    }
  }

  delete(certificateId: number): void {
    const index = this.certificates.findIndex(
      (c) => c.properties().certificateId === certificateId,
    );
    if (index !== -1) {
      this.certificates.splice(index, 1);
    }
  }
}
