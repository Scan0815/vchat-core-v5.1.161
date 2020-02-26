import { PicUpStream } from '../src/pic-up-stream';

describe('PicUpStream', () => {
    it('constructor', () => {
        const objectUnderTest = new PicUpStream(null);

        expect(objectUnderTest).toBeDefined();
    });
});
