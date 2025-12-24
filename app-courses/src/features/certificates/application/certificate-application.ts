import { Inject } from '@nestjs/common';
import { Certificate } from '../models';
import type { CertificatePort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';

export class CertificateApplication extends ApplicationBase<Certificate, CertificatePort> {
  constructor(@Inject('CertificateAdapter') adapter: CertificatePort) {
    super(adapter);
  }
}
