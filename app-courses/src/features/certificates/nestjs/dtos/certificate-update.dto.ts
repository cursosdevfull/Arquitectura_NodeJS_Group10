import { IsOptional, IsString, IsDateString } from 'class-validator';

export class CertificateUpdateDto {
    @IsOptional()
    @IsDateString()
    dateEmission?: string;

    @IsOptional()
    @IsString()
    key?: string;
}