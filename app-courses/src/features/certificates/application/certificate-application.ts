import { Inject } from '@nestjs/common';
import { Certificate, CertificateData } from '../models';
import type { CertificatePort } from '../ports';
import { ApplicationBase } from '../../../core/generics/application';
import { CertificateDto } from './dtos';

export class CertificateApplication extends ApplicationBase<Certificate, CertificateData, CertificatePort> {
  constructor(@Inject('CertificateAdapter') adapter: CertificatePort) {
    super(adapter, CertificateDto.fromDomainToData, CertificateDto.fromDataToDomain);
  }
}
