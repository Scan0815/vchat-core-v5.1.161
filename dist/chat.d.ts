import { Abilities, ChargeInfo, ChatConfig, ChatEventMap, ChatHandler, Intent, Limits, SourceMetrics, StartStreamConfig, UploadResult } from './definitions';
import { SourceSet } from './sources/source-set';
import { TargetSet } from './targets/target-set';
import { Emoji } from './emoji';
import { Translations } from './translations';
export declare function getProtocols(included?: string[], excluded?: string[]): string[];
export declare class Chat implements EventTarget {
    addEventListener: <K extends keyof ChatEventMap>(type: K, listener: (this: Chat, ev: ChatEventMap[K]) => any, useCapture?: boolean) => void;
    removeEventListener: (type: string, listener?: EventListenerOrEventListenerObject, useCapture?: boolean) => void;
    dispatchEvent: (evt: Event) => boolean;
    host: {
        name: string;
        imageSrc: string;
    };
    /**
     * A target URL for uploading images within the chat.
     *
     * @deprecated Use the sendImage function instead of uploading directly to this url. Will be removed in later versions
     */
    uploadUrl: string;
    emojiList: Emoji[];
    translations: Translations;
    singleMode: boolean;
    /** When set to true the sender has his or her microphone muted via the sender software. */
    audioMuted: boolean;
    /** When set to true the sender has blocked the guest from writing. */
    textMuted: boolean;
    paused: boolean;
    /**
     * List (object) of abilities. All abilities are boolean values indicating whether or not the current stream offers a certain feature.
     */
    abilities: Abilities;
    private config;
    private handler;
    private connection;
    private pendingResume;
    private startStreamConfig;
    private queryingVideoPull;
    private queue;
    private initState;
    private protocols;
    private active;
    private uploadMediaUrl;
    constructor(config: ChatConfig, handler?: ChatHandler);
    init(): Promise<{
        intent: Intent;
        limits: Limits;
    }>;
    /**
     * Ends the chat with the given exitCode and closes the websocket connection, tears down the whole chat setup.
     * @param exitCode - the exitCode send to the server as the close reason
     */
    close(exitCode?: number): Promise<any>;
    /**
     * This starts the actual stream for the current chat and returns a list of sources that can be passed to a player.
     * @param config
     * @returns A set of sources available for the given configuration / chat.
     */
    startStream(config?: StartStreamConfig): Promise<SourceSet>;
    /**
     * Starts the text stream part of a chat. Text streams are part of LivePreviews and full video chats. If the text stream is not running but the video stream is, the guest is in voyeur mode.
     */
    startText(): Promise<any>;
    /**
     * Starts an upstream (cam 2 cam) part for the chat
     *
     * @returns a list of possible upstream targets
     */
    startUpstream(): Promise<TargetSet>;
    /**
     * Stops cam 2 cam
     */
    stopUpstream(): Promise<any>;
    /**
     * Starts the private chat mode
     */
    startSingle(): Promise<any>;
    /**
     * @deprecated use sendMediaFile
     */
    sendImageFormData(data: FormData): Promise<UploadResult>;
    0: any;
    /**
     * @deprecated use sendMediaFile
     */
    sendImageFile(file: File): Promise<UploadResult>;
    private sendFormData;
    /**
     * send media file. For blob upload use new File([blob], filename)
     * @param file
     * @param messageKey
     * @returns UploadResult
     */
    sendMediaFile(file: File, messageKey: string): Promise<UploadResult>;
    /**
     * Sends a message from the guest to the backend to be displayed in the chat window of the sender.
     *
     * @param text - The message send to the sender
     * @param messageKey
     */
    sendMessage(text: string, messageKey?: string): Promise<any>;
    /**
     *  Sends a response to a query (like a private chat request) where key is a string (indicating the actual query) and the value can be of any type.
     * @param key
     * @param response
     */
    sendQueryResponse(key: string, response: any): Promise<any>;
    /**
     * Triggers a tip with given amount (cents) on the backend. The remaining video time limit will be adjusted accordingly. The sender will be informed about the tip via a message in the chat window. The gift parameter is an optional string indicating a certain gift type (deprecated).
     *
     * @param amount
     * @param gift - @deprecated
     */
    sendTip(amount?: number, gift?: string): Promise<any>;
    /**
     * Sends the current audio state (muted / unmuted) to the backend to pass it on to the sender and inform him or her about whether or not the guest can actually hear them.
     *
     * @param enabled
     */
    sendAudioState(enabled: boolean): Promise<any>;
    /**
     * Sends an object to the backend for logging certain information.
     * @param metrics
     */
    sendMetrics(metrics: SourceMetrics | any): void;
    /**
     * Returns information about the one click payment feature
     */
    getChargeInfo(): Promise<ChargeInfo>;
    /**
     * Triggers a one click payment with the given amount (cents).
     *
     * @param amount - The amount to charge
     */
    sendCharge(amount: number): Promise<any>;
    private _closeUnload;
    private _close;
    private _noopCommandsHandler;
    private _processCommand;
    private _handleUpdate;
    private _pause;
    private _resume;
    private _sendCommand;
    private unloadHandler;
    private _getLimit;
}
