import { Chat, getProtocols } from '../src/chat';
import { ChatConfig, ChatHandler } from '../src/definitions';
import { mock, instance, resetCalls, verify } from 'ts-mockito';
import fetch from 'node-fetch';
import { readFileSync } from 'fs';

describe('getProtocols', () => {
    it('returns default protocols if nothing is defined', () => {
        const protocols = getProtocols();

        expect(protocols).not.toEqual([]);
        expect(protocols).toContain('jpeg');
    });

    it('returns included protocols if no exludes are defined', () => {
        const includes = ['i1', 'i2', 'i3'];
        const protocols = getProtocols(includes);

        expect(protocols).toEqual(includes);
    });

    it('returns included protocols without the exluded', () => {
        const includes = ['i1', 'i2', 'i3'];
        const excludes = ['i2', 'i4'];
        const protocols = getProtocols(includes, excludes);

        expect(protocols).toEqual(['i1', 'i3']);
    });
});

describe('Chat', () => {
    let chat: Chat;
    let handlerSpyMock: ChatHandler;
    let handlerSpy: ChatHandler;

    beforeEach(async () => {
        const createChatUrl =
            'https://visit-x.net/interfaces/content/start.php?json=1&userID=1628124&ualias=UnitTestUser';

        const response = await fetch(createChatUrl, {
            method: 'GET',
            headers: {
                Authorization: 'Basic ' + btoa('vxtechnik:christoph')
            }
        });

        const createdChat = await response.json();

        const chatConfig: ChatConfig = {
            clientId: createdChat.clientId,
            host: createdChat.server,
            version: 'unit-test'
        };

        handlerSpyMock = mock<ChatHandler>();
        handlerSpy = instance(handlerSpyMock);

        chat = new Chat(chatConfig, handlerSpy);
        await chat.init();
    });

    describe('startUpstream', () => {
        it('returns expected jpegTargetSet', async () => {
            const targetSet = await chat.startUpstream();

            expect(targetSet.jpeg).toBeDefined();
            expect(targetSet.jpeg.length).toBeGreaterThanOrEqual(1);

            const jpegTargetSet = targetSet.jpeg[0];

            expect(jpegTargetSet).toBeDefined();
            expect(jpegTargetSet.stream).toMatch(/^http.*$/);
            expect(jpegTargetSet.width).toBeGreaterThan(0);
            expect(jpegTargetSet.height).toBeGreaterThan(0);
            expect(jpegTargetSet.fps).toBeGreaterThan(0);
            expect(jpegTargetSet.quality).toBeGreaterThan(0);
            expect(jpegTargetSet.quality).toBeLessThanOrEqual(1);
        });
    });

    describe('queryCharge', () => {
        it('returns ChargeInfo', async () => {
            const chargeInfo = await chat.getChargeInfo();

            expect(chargeInfo.available).toBeDefined();
            expect(chargeInfo.autoCharged).toBeGreaterThanOrEqual(0);
        });
    });

    // describe('sendMediaFile', () => {
    //     it('with image', async () => {
    //         const buffer = readFileSync('./test/data/test_image.jpeg');

    //         const testImage = new File([buffer], 'testFile');

    //         const result = await chat.sendMediaFile(
    //             testImage,
    //             'test_message_key'
    //         );

    //         expect(result.error).toBeNull();
    //         expect(result.successfull).toBe(true);
    //     });
    // });

    // describe('sendImage', () => {
    //     it('test', async () => {
    //         const buffer = readFileSync('./test/data/test_image.jpeg');

    //         const testImage = new File([buffer], 'testFile');

    //         const response = await chat.sendImageFile(testImage);

    //         expect(response.successfull).toBe(true);
    //     });
    // });

    describe('sendMessage', () => {
        it('test2', async () => {
            await chat.startText();

            const response = await chat.sendMessage('Test-Message');

            expect(response).toBeUndefined();
        });
    });

    describe('_handleUpdate', () => {
        describe('canSingle', () => {
            const setTrueCommand = {
                command: '',
                id: '',
                values: {
                    canSingle: '1'
                }
            };

            const setFalseCommand = {
                command: '',
                id: '',
                values: {
                    canSingle: '0'
                }
            };

            it('sets to true if canSingle="1" is received', () => {
                (chat as any)._handleUpdate(setTrueCommand);

                expect(chat.abilities.single).toBe(true);
            });

            it('sets to false if canSingle="0" is received', () => {
                (chat as any)._handleUpdate(setFalseCommand);

                expect(chat.abilities.single).toBe(false);
            });

            it('calls if switched from false to true', () => {
                (chat as any)._handleUpdate(setFalseCommand);

                resetCalls(handlerSpyMock);

                (chat as any)._handleUpdate(setTrueCommand);

                verify(handlerSpyMock.onAbilityUpdate('single', true)).once();
            });

            it('does not call if resetted', () => {
                (chat as any)._handleUpdate(setTrueCommand);
                resetCalls(handlerSpyMock);

                (chat as any)._handleUpdate(setTrueCommand);

                verify(handlerSpyMock.onAbilityUpdate('single', true)).never();
            });

            it('calls if switched from true to false', () => {
                (chat as any)._handleUpdate(setTrueCommand);
                resetCalls(handlerSpyMock);

                (chat as any)._handleUpdate(setFalseCommand);

                verify(handlerSpyMock.onAbilityUpdate('single', false)).once();
            });
        });

        describe('canText', () => {
            const setTrueCommand = {
                command: '',
                id: '',
                values: {
                    canText: '1'
                }
            };

            const setFalseCommand = {
                command: '',
                id: '',
                values: {
                    canText: '0'
                }
            };

            it('is set to true if canText="1" is received', () => {
                (chat as any)._handleUpdate(setTrueCommand);

                expect(chat.abilities.text).toBe(true);
            });

            it('is set to false if canText="0" is received', () => {
                (chat as any)._handleUpdate(setFalseCommand);

                expect(chat.abilities.text).toBe(false);
            });

            it('calls onAbilityUpdate if switched from false to true', () => {
                (chat as any)._handleUpdate(setFalseCommand);
                resetCalls(handlerSpyMock);

                (chat as any)._handleUpdate(setTrueCommand);

                verify(handlerSpyMock.onAbilityUpdate('text', true)).once();
            });

            it('does not call onAbilityUpdate if resetted', () => {
                (chat as any)._handleUpdate(setTrueCommand);
                resetCalls(handlerSpyMock);

                (chat as any)._handleUpdate(setTrueCommand);

                verify(handlerSpyMock.onAbilityUpdate('text', true)).never();
            });

            it('calls onAbilityUpdate if switched from true to false', () => {
                (chat as any)._handleUpdate(setTrueCommand);
                resetCalls(handlerSpyMock);

                (chat as any)._handleUpdate(setFalseCommand);

                verify(handlerSpyMock.onAbilityUpdate('text', false)).once();
            });
        });

        describe('isSingle', () => {
            const setTrueCommand = {
                command: '',
                id: '',
                values: {
                    isSingle: '1'
                }
            };

            const setFalseCommand = {
                command: '',
                id: '',
                values: {
                    isSingle: '0'
                }
            };

            it('sets to true if isSingle="1" is received', () => {
                (chat as any)._handleUpdate(setTrueCommand);

                expect(chat.singleMode).toBe(true);
            });

            it('sets to false if isSingle="0" is received', () => {
                (chat as any)._handleUpdate(setFalseCommand);

                expect(chat.singleMode).toBe(false);
            });

            it('calls onSingleModeUpdate if switched from false to true', () => {
                (chat as any)._handleUpdate(setFalseCommand);
                resetCalls(handlerSpyMock);

                (chat as any)._handleUpdate(setTrueCommand);

                verify(handlerSpyMock.onSingleModeUpdate(true)).once();
            });

            it('does not call onSingleModeUpdate if resetted', () => {
                (chat as any)._handleUpdate(setTrueCommand);
                resetCalls(handlerSpyMock);

                (chat as any)._handleUpdate(setTrueCommand);

                verify(handlerSpyMock.onSingleModeUpdate(true)).never();
            });

            it('calls onSingleModeUpdate if switched from true to false', () => {
                (chat as any)._handleUpdate(setTrueCommand);
                resetCalls(handlerSpyMock);

                (chat as any)._handleUpdate(setFalseCommand);

                verify(handlerSpyMock.onSingleModeUpdate(false)).once();
            });
        });

        describe('audioMuted', () => {
            const setTrueCommand = {
                command: '',
                id: '',
                values: {
                    audioMuted: '1'
                }
            };

            const setFalseCommand = {
                command: '',
                id: '',
                values: {
                    audioMuted: '0'
                }
            };

            it('sets to true if audioMuted="1" is received', () => {
                (chat as any)._handleUpdate(setTrueCommand);

                expect(chat.audioMuted).toBe(true);
            });

            it('sets to false if audioMuted="0" is received', () => {
                (chat as any)._handleUpdate(setFalseCommand);

                expect(chat.audioMuted).toBe(false);
            });

            it('calls onAudioMuteUpdate if switched from false to true', () => {
                (chat as any)._handleUpdate(setFalseCommand);
                resetCalls(handlerSpyMock);

                (chat as any)._handleUpdate(setTrueCommand);

                verify(handlerSpyMock.onAudioMuteUpdate(true)).once();
            });

            it('does not call onAudioMuteUpdate if resetted', () => {
                (chat as any)._handleUpdate(setTrueCommand);
                resetCalls(handlerSpyMock);

                (chat as any)._handleUpdate(setTrueCommand);

                verify(handlerSpyMock.onAudioMuteUpdate(true)).never();
            });

            it('calls onAudioMuteUpdate if switched from true to false', () => {
                (chat as any)._handleUpdate(setTrueCommand);
                resetCalls(handlerSpyMock);

                (chat as any)._handleUpdate(setFalseCommand);

                verify(handlerSpyMock.onAudioMuteUpdate(false)).once();
            });
        });

        describe('videolimit_rest', () => {
            const belowCommand = {
                command: '',
                id: '',
                values: {
                    videolimit_rest: '8',
                    below_threshold: '1'
                }
            };

            const aboveCommand = {
                command: '',
                id: '',
                values: {
                    videolimit_rest: '12',
                    below_threshold: '0'
                }
            };

            it('calls the onVideoLimitUpdate callback when below the threshold', () => {
                (chat as any)._handleUpdate(belowCommand);

                verify(
                    handlerSpyMock.onVideoLimitWarningUpdate(true, 8000)
                ).once();
            });

            it('calls the onVideoLimitUpdate callback when above the threshold', () => {
                (chat as any)._handleUpdate(aboveCommand);

                verify(
                    handlerSpyMock.onVideoLimitWarningUpdate(false, 12000)
                ).once();
            });
        });
    });
});
