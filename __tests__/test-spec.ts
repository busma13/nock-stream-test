const nock = require('nock');
const path = require('path');
const fs = require('fs');
const got = require('got');

async function upload(stream) {
    try {
        const response =  await got['post']('http://example.dev/assets', {
            resolveBodyOnly: true,
            throwHttpErrors: true,
            body: stream
        });
        return response;
    } catch (err) {
        if (err) {
            throw err.response;
        }
        
        throw err;
    }
}

describe('Test', () => {
    let scope;

    beforeEach(() => {
        scope = nock('http://example.dev');
    });

    afterEach(() => {
        nock.cleanAll();
    });

    describe('->upload', () => {
        describe('when called with a stream', () => {
            const testFilePath = path.join(__dirname, 'test.txt');
            const contents = fs.readFileSync(testFilePath, 'utf-8');
            const idResponse = { _id: 'some-asset-id' };

            beforeEach(() => {
                scope.post('/assets')
                    .reply(200, idResponse);
            });

            it('should resolve the json result', async () => {
                const stream = fs.createReadStream(testFilePath);
                const results = await upload(stream);
                expect(JSON.parse(results)).toEqual(idResponse);
            }, 20000);
        });
    });
});
