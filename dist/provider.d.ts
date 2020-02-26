export interface Provider {
    getSnapshot(): Promise<string | ArrayBuffer | Blob>;
    onError?(error: Error): void;
}
