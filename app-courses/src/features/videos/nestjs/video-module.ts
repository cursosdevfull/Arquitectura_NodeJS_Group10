import { Module } from '@nestjs/common';
import { VideoController } from './video-controller';
import { VideoApplication } from '../application';
import { VideoAdapter } from '../adapters';
import { DatabaseModule } from 'src/core/database/database.module';
import { videoProviders } from '../adapters/video-provider';

@Module({
    controllers: [VideoController],
    providers: [
        {
            provide: 'VideoApplication',
            useClass: VideoApplication,
        },
        {
            provide: 'VideoAdapter',
            useClass: VideoAdapter,
        },
        ...videoProviders
    ],
    imports: [DatabaseModule],
})
export class VideoModule { }