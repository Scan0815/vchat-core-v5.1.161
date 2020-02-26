import { ChatHandler, Query } from './definitions';
import { ExitCode } from './exit-code';
import { SourceSet } from './sources/source-set';
export declare class Handler implements ChatHandler {
    private et;
    constructor(et: EventTarget);
    onChatStop(exitCode: ExitCode, exitMessage?: string): void;
    onChatPause: () => void;
    onChatPauseHandler(): void;
    onChatResume(sourceSet: SourceSet): void;
    onMessage(text: string, from: string, key: string, params: object): void;
    onAbilityUpdate(name: string, value: boolean): void;
    onQuery(query: Query): void;
    onSingleModeUpdate(value: boolean): void;
    onTextMuteUpdate(value: boolean): void;
    onAudioMuteUpdate(value: boolean): void;
    onLimitUpdate(param: string, value: number): void;
    private dispatch;
}
