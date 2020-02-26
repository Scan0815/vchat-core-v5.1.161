import { Target } from './target';
export interface JpegTarget extends Target {
    width: number;
    height: number;
    fps: number;
    quality: number;
}
