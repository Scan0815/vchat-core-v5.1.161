export interface LogEntry {
    level: number;
    time: number;
    message: string;
    params: any[];
}
