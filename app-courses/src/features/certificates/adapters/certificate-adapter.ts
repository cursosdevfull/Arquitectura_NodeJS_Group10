import { Inject } from '@nestjs/common';
import { AdapterBase } from '../../../core/generics/adapter';
import { Certificate } from '../models';
import { CertificatePort } from '../ports';
import { Repository } from 'typeorm';

export class CertificateAdapter extends AdapterBase<Certificate> implements CertificatePort {
  constructor(@Inject("CERTIFICATE_REPOSITORY") protected repository: Repository<Certificate>) {
    super(repository);
  }
}
