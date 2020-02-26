import { ExitCode } from './exit-code';
import { Source } from './sources/source';
import { SourceSet } from './sources/source-set';
export interface ChatConfig {
    /** the clientId returned by the server side chat initialization script */
    clientId: string;
    /** the server returned by the server side chat initialization script */
    host: string;
    /** the version of the vchat-player (for logging purposes) */
    playerVersion?: string;
    /** an optional string to overwrite the chat version (for logging purposes) */
    version: string;
    pauseSupport?: boolean;
    /** when set to true no additional unload listeners will be added to the window, i.e. vchat-core will not try itself to stop a chat when its parent window unloads (is closed) */
    ignoreUnload?: boolean;
    forceLongPooling?: boolean;
    controlServletURL?: string;
    initData?: string;
    messengerProperties?: any;
}
export interface StartStreamConfig {
    /** set to 'preview' if the chat has been started as a live preview (initial intent.preview is set to true) */
    type?: 'default' | 'preview';
    /** when set to true the audio stream will not be started (only for JPEG streams) */
    noAudio?: boolean;
    /** additional parameter passed to JPEG / MJPEG streams */
    width?: number;
    /** additional parameter passed to JPEG / MJPEG streams */
    height?: number;
    /** additional parameter passed to JPEG / MJPEG streams */
    resizeMode?: string;
    /** additional parameter passed to JPEG / MJPEG streams */
    maxFps?: number;
    /** if set to true the mobile playlist will be fetched for HLS streams */
    mobile?: boolean;
}
export interface SourceMetrics {
    protocol: string;
    source: Source;
    width?: number;
    height?: number;
    [key: string]: any;
}
export interface Intent {
    video: boolean;
    audio: boolean;
    text: boolean;
    preview: boolean;
}
export interface Limits {
    total: number;
    video: number;
    text: number;
    preview: number;
}
export interface Abilities {
    /** can the video stream be started */
    video: boolean;
    /** can the text stream be started (i.e. when set to false the guest can only be voyeur and can't change from the voyeur mode to the full video chat) */
    text: boolean;
    /** does the sender offer audio at all (microphone set up?) */
    audio: boolean;
    /** can a live preview be started */
    preview: boolean;
    /** can the guest start an upstream / cam 2 cam */
    upstream: boolean;
    /** can the guest activate the private chat mode */
    single: boolean;
    /** can the guest send a tip to the sender */
    tip: boolean;
}
export interface AdditionalCurrenciesChargeInfo {
    amounts: number[];
    currency: string;
}
export interface ChargeInfo {
    /** indicates whether or not the feature is available and activated by the guest */
    available: boolean;
    /** array with possible amounts in cent */
    amounts: number[];
    currency: string;
    additionalCurrencies: AdditionalCurrenciesChargeInfo[];
    /** amount of auto charge, if any */
    autoCharged: number;
}
export interface QueryKey {
    single: any;
    querysingle: any;
}
/**
 * WARN: subject of change
 */
export interface MessageKey {
    g_chat_host_micro_on: any;
    g_chat_host_micro_off: any;
    g_discount_client_once: any;
    g_discount_client: any;
}
export interface Query {
    key: keyof QueryKey;
    caption: string;
    text: string;
    timeout: number;
    choices: {
        name: string;
        value: string | number;
        def: boolean;
    }[];
    price?: number;
}
/** ChatHandler is a collection of callback functions called by certain events within the vchat-core. Feel free to implement the handler within the product to be able to act upon events of the vchat-core. */
export interface ChatHandler {
    /**
     * Triggered on chat stop.
     */
    onChatStop: (code: ExitCode, exitMessage?: string) => void;
    /**
     * Triggered when Chat is paused due to enabled one click payment when the time limit is hit
     */
    onChatPause?: () => void;
    /**
     * Triggered when the chat resumes due to a one click payment done after a previous pause.
     */
    onChatResume?: (sourceSet: SourceSet) => void;
    /**
     * handle incoming message
     */
    onMessage: (text: string, from?: string, key?: keyof MessageKey, params?: object) => void;
    /**
     * Triggered when a single ability is updated
     */
    onAbilityUpdate: (name: keyof Abilities, value: boolean) => void;
    /**
     * Triggered when a query (like "want to access single chat") is fired
     */
    onQuery: (query: Query) => void;
    onSingleModeUpdate: (value: boolean) => void;
    /**
     * Triggered on text chat mute / unmute
     */
    onTextMuteUpdate: (value: boolean) => void;
    /**
     * Triggered when host mutes / unmutes audio
     */
    onAudioMuteUpdate: (value: boolean) => void;
    /**
     * Triggered when (video) time limit is updated
     */
    onLimitUpdate?: (param: keyof Limits, value: number) => void;
    onVideoLimitWarningUpdate?: (belowThreshold: boolean, value: number) => void;
}
export interface ChatStopEvent extends Event {
    exitCode: ExitCode;
    exitMessage?: string;
}
export interface ChatResumeEvent extends Event {
    sourceSet: SourceSet;
}
export interface MessageEvent extends Event {
    text: string;
    from: string;
    key: string;
}
export interface QueryEvent extends Event {
    query: Query;
}
export interface ValueUpdateEvent extends Event {
    param: string;
    value: string | number;
}
export interface ChatEventMap {
    chatStop: ChatStopEvent;
    chatPause: Event;
    chatResume: ChatResumeEvent;
    message: MessageEvent;
    abilityUpdate: ValueUpdateEvent;
    query: QueryEvent;
    singleModeUpdate: ValueUpdateEvent;
    textMuteUpdate: ValueUpdateEvent;
    audioMuteUpdate: ValueUpdateEvent;
    limitUpdate: ValueUpdateEvent;
}
export interface UploadResult {
    successfull: boolean;
    error: string | null;
}
