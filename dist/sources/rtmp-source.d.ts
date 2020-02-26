import { Source } from './source';
export interface RtmpSource extends Source {
    /** the server address to load the stream from */
    app: string;
}
