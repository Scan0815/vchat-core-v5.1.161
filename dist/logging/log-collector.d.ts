import { LogEntry } from './log-entry';
import { Logger } from './logger';
export declare class LogCollector implements Logger {
    static readonly LOG = 10;
    static readonly WARN = 20;
    static readonly ERROR = 30;
    private logEntries;
    private logger;
    constructor(l?: Logger);
    clear(): void;
    readonly logs: LogEntry[];
    log(message?: any, ...params: any[]): void;
    warn(message?: any, ...params: any[]): void;
    error(message?: any, ...params: any[]): void;
    exportToStr(minLevel?: number, entries?: number): string;
    private static GetLogEventDateAsString;
    private static getLogLevelAsString;
    private static getLogMethodByLevel;
    private push;
}
