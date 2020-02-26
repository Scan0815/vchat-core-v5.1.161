import { JpegTarget } from './jpeg-target';
import { RtmpTarget } from './rtmp-target';
export interface TargetSet {
    jpeg?: JpegTarget[];
    rtmp?: RtmpTarget[];
}
