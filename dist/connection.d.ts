import Response from './response';
export default class Connection {
    private clientId;
    private host;
    private servletUrl;
    private queue;
    private counter;
    private socket;
    private commandsHandler;
    private noopActive;
    private processedCommands;
    private ackCommands;
    private lastNoop;
    private useWS;
    private instanceId;
    private closing;
    constructor(clientId: string, host: string, servletUrl: string, forceLongPooling: boolean);
    send(action: string, params: any, callback: (response: Response) => any): void;
    startNoop(noopCommandsHandler: (r: Response) => void): void;
    close(): void;
    private openSocket;
    private fallback;
    private sendNoop;
    private noopResponseHandler;
    private sendOverSocket;
    private sendOverJsonp;
}
