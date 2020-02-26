import { Provider } from './provider';
export declare class PicUpStream {
    private _maxFps;
    private _target;
    private _provider;
    private _socket;
    private _publishLoop;
    private _publishStopRequested;
    constructor(provider: Provider);
    publish(target: string, targetFps?: number): void;
    stop(): void;
    private _stopPublishLoop;
    private _publishWS;
    private _startPublishLoop;
    private _publishLoopCall;
    private _send;
}
