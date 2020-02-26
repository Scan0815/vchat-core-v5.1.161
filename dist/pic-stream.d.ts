export declare class PicStream {
    private counter;
    private lastFrame;
    private source;
    private pool;
    private timer;
    private handler;
    private target;
    private socket;
    private fileReader;
    private fallbackTimer;
    private useWS;
    private maxFps;
    constructor(target: {
        src: string;
    } | ((imageElement: HTMLImageElement) => void));
    play(source: string, fps?: number): void;
    stop(): void;
    private _playWS;
    private _play;
    private createLoader;
    private loadFrame;
}
