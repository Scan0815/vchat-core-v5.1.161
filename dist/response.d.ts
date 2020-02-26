export default class Response {
    static readonly TIMEOUT: Response;
    static readonly NETWORK_ERROR: Response;
    static parse(responseStr: string): Response;
    ok: boolean;
    code: number;
    reason: string;
    time: number;
    values: any;
    commands: Array<{
        command: string;
        id: string;
        values: any;
    }>;
    constructor(code?: number, reason?: string);
    toString(): string;
}
