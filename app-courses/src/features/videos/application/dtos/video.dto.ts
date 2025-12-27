import { SessionData } from "../../../sessions/models";
import { Video, VideoData } from "../../models";

export class VideoDto {
    static fromDataToDomain(data: VideoData | VideoData[]): Video | Video[] {
        if (Array.isArray(data)) {
            return data.map(item => this.fromDataToDomain(item) as Video);
        }

        return new Video({
            id: data.id,
            session: data.session,
            videoUrl: data.videoUrl
        });
    }

    static fromDomainToData(domain: Video | Video[]): VideoData | VideoData[] {
        if (Array.isArray(domain)) {
            return domain.map(item => this.fromDomainToData(item) as VideoData);
        }

        const data = new VideoData();
        data.id = domain.properties().id;
        data.session = domain.properties().session as SessionData;
        data.videoUrl = domain.properties().videoUrl;
        data.deletedAt = domain.properties().deletedAt;
        return data;
    }
}