import { RtmpSource } from './rtmp-source';
import { Source } from './source';
export interface SourceSet {
    /** array defining the order in which the streams should be accessed; if not provided the vchat-player will chose the best fitting stream itself */
    preferredOrder?: string[];
    /** the source for a jpeg stream */
    jpeg?: Source[];
    /** the source for an mjpeg stream */
    mjpeg?: Source[];
    /** the source for HLS native / HLS.js */
    hls?: Source[];
    /** the source for RTMP */
    rtmp?: RtmpSource[];
    webrtc?: Source[];
    /** the stream url for an mp3 stream (in combination with a jpeg stream) */
    mp3?: Source[];
    /** the stream url for a ogg/vorbis stream (in combination with a jpeg stream) */
    vorbis?: Source[];
}
