import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { CertificateData } from '../models';
import { CertificatePort } from '../ports';
import { Repository } from 'typeorm';

export class CertificateAdapter extends AdapterBase<CertificateData> implements CertificatePort {
  constructor(@Inject("CERTIFICATE_REPOSITORY") protected repository: Repository<CertificateData>) {
    super(repository);
  }
}
