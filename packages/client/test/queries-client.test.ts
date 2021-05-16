import {Redash} from "../dist/types/redash";
import {request} from "../src/request";
import {snapshot} from "../src/snapshot";
import {queriesClient} from '../src';
import {QueriesClient} from "../src/types/common";

jest.mock('../src/request', () => ({
    request: jest.fn()
}))

jest.mock('../src/snapshot', () => ({
    snapshot: jest.fn()
}))

describe('A queries client', () => {

    let client: QueriesClient;

    beforeEach(() => {
        client = queriesClient({token: 'xxx-token'})
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('has a set of functions', () => {
        expect(client.list).toEqual(expect.anything())
        expect(client.get).toEqual(expect.anything())
        expect(client.snapshot).toEqual(expect.anything())
        expect(client.job).toEqual(expect.anything())
    });

    it('defaults the host parameter', async () => {
        await client.list({});
        expect(request).toHaveBeenCalledWith(expect.objectContaining({
            clientConfig: expect.objectContaining({host: 'https://redash.io'})
        }))
    })

    it('can override with a query scoped token', async () => {
        await client.list({token: 'query-token'});
        expect(request).toHaveBeenCalledWith(expect.objectContaining({
            clientConfig: expect.objectContaining({token: 'query-token'})
        }))
    })

    describe('with a list function', () => {

        it('fires a single request', async () => {
            await client.list({});
            expect(request).toHaveBeenCalledTimes(1)
        })

        it('fires a request with default parameters', async () => {
            await client.list({});
            expect(request).toHaveBeenCalledWith({
                clientConfig: {host: 'https://redash.io', token: 'xxx-token'},
                method: 'GET',
                path: '/queries',
                query: {}
            })
        })

        it('returns a queries collection response', async () => {
            const expected: Redash.RedashCollectionResult<Redash.Query> = {
                count: 0,
                page: 1,
                page_size: 1,
                results: [],
            }

            const r = request as jest.MockedFunction<typeof request>;
            r.mockResolvedValue(expected)

            const result = await client.list({});
            expect(result).toEqual(expected);
        })
    })

    describe('with a get function', () => {

        it('fires a single request', async () => {
            await client.get({id: 'query-id'});
            expect(request).toHaveBeenCalledTimes(1)
        })

        it('fires a request with default parameters', async () => {
            await client.get({id: 'query-id'});
            expect(request).toHaveBeenCalledWith({
                clientConfig: {host: 'https://redash.io', token: 'xxx-token'},
                method: 'GET',
                path: '/queries/query-id',
                query: {id: 'query-id'}
            })
        })

        it('returns a query response', async () => {
            const expected = {
                key: 'value',
            }

            const r = request as jest.MockedFunction<typeof request>;
            r.mockResolvedValue(expected)

            const result = await client.get({id: 'query-id'});
            expect(result).toEqual(expected);
        })
    })

    describe('with a snapshot function', () => {

        it('requests a query snapshot', async () => {
            await client.snapshot({queryId: '1', visualizationId: '1'});
            expect(snapshot).toHaveBeenCalledTimes(1)
        })

    })

});
