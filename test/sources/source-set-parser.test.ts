import { StartStreamConfig } from '../../src/definitions';
import { getSourceSet } from '../../src/sources/source-set-parser';

describe('SourceSetParser', () => {
    describe('getSourceSet', () => {
        let vv: any;

        const av = {};
        const config: StartStreamConfig = {};

        beforeEach(() => {
            vv = {
                dataURL: 'data_url',
                mediaJpegUrl: 'jpeg_url',
                mediaRtmpUrl: 'rtmp_app/112233'
            };
        });

        describe('with jpeg protocol defined in protocols', () => {
            it('and in vv returns SourceSet with expected jpeg property', () => {
                const result = getSourceSet(vv, av, config, ['jpeg']);

                expect(result.jpeg).toBeDefined();
                expect(result.jpeg[0].stream).toContain(vv.mediaJpegUrl);
            });

            it('but not in vv returns SourceSet with no jpeg property', () => {
                delete vv.mediaJpegUrl;
                const result = getSourceSet(vv, av, config, ['jpeg']);

                expect(result.jpeg).toBeUndefined();
            });
        });

        describe('with rtmp protocol defined in protocols', () => {
            it('and in vv returns SourceSet with expected rtmp property', () => {
                const result = getSourceSet(vv, av, config, ['rtmp']);

                expect(result.rtmp).toBeDefined();
                const rtmpSource = result.rtmp[0];

                expect(rtmpSource.app).toEqual('rtmp_app');
                expect(rtmpSource.stream).toEqual('112233');
            });

            it('but not in vv returns SourceSet with no rtmp property', () => {
                delete vv.mediaRtmpUrl;
                const result = getSourceSet(vv, av, config, ['rtmp']);

                expect(result.rtmp).toBeUndefined();
            });

            it('and defined in vv but unparsable returns SourceSet with no rtmp property', () => {
                vv.mediaRtmpUrl = 'UNPARSABLE';
                const result = getSourceSet(vv, av, config, ['rtmp']);

                expect(result.rtmp).toBeUndefined();
            });
        });

        it('with vv without mediaHlsUrl returns sourceset without hls', () => {
            vv = {
                dataURL: 'data_url',
                mediaJpegUrl: 'jpeg_url'
            };

            const result = getSourceSet(vv, av, config);

            expect(result.hls).toBeUndefined();
        });

        it('with vv with mediaHlsUrl returns sourceset without hls', () => {
            vv = {
                dataURL: 'data_url',
                mediaJpegUrl: 'jpeg_url',
                mediaHlsUrl: 'hlsUrl'
            };

            const result = getSourceSet(vv, av, config);

            expect(result.hls).toBeDefined();
        });
    });
});
