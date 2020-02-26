export interface Logger {
    log: (message?: any, ...optionalParams: any[]) => void;
    warn: (message?: any, ...optionalParams: any[]) => void;
    error: (message?: any, ...optionalParams: any[]) => void;
}
export declare let logger: Logger;
export declare function setLogger(value: Logger): void;
