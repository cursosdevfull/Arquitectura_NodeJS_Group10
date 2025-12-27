import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CertificateApplication } from '../application';
import { Certificate } from '../models';
import { CertificateCreateDto, CertificateUpdateDto } from './dtos';
import { IdDto, PageDto } from '../../../core/dtos';

@Controller('certificate')
export class CertificateController {
  constructor(
    @Inject('CertificateApplication')
    private readonly app: CertificateApplication,
  ) { }

  @Post()
  @HttpCode(200)
  async create(
    @Body()
    body: CertificateCreateDto,
  ) {
    const { schedule, student, dateEmission, key } = body;

    const certificate = new Certificate({
      schedule,
      student,
      dateEmission: new Date(dateEmission),
      key,
    });
    await this.app.save(certificate);

    return {
      message: 'Certificate created',
    };
  }

  @Get()
  async getAll() {
    return await this.app.getAll(["student", "schedule"]);
  }

  @Get('/page')
  async getByPage(@Query() query: PageDto) {
    const { currentPage, limit } = query;
    const certificates = await this.app.getByPage(currentPage, limit, ["student", "schedule"]);
    return certificates;
  }

  @Get(':id')
  async getOne(@Param() param: IdDto) {
    const { id } = param;
    return await this.app.getOne(id, ["student", "schedule"]);
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Param() param: IdDto, @Body() body: CertificateUpdateDto) {
    const { id } = param;
    const { dateEmission, student, schedule } = body;

    // Obtener certificate existente y crear uno actualizado
    const existingCertificate = await this.app.getOne(id, ["student", "schedule"]);
    if (!existingCertificate) {
      throw new Error('Certificate not found');
    }

    existingCertificate.update({ dateEmission: dateEmission ? new Date(dateEmission) : undefined, student, schedule })

    // Crear certificate actualizado (esto dependerá de cómo esté implementado Certificate)
    await this.app.save(existingCertificate);

    return {
      message: 'Certificate updated',
    };
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param() param: IdDto) {
    const { id } = param;
    const certificate = await this.app.getOne(id, ["student", "schedule"]);
    if (!certificate) {
      return {
        message: 'Certificate not found',
      };
    }

    certificate.delete();
    await this.app.save(certificate);

    return {
      message: 'Certificate deleted',
    };
  }
}
