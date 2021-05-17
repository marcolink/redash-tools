import {verifyAllWhenMocksCalled, when} from 'jest-when'
import {queryClient} from "../src";
import {snapshot} from "../src/snapshot";
import {QueryClient, Redash} from "../src/types";

jest.mock('../src/snapshot', () => ({
    snapshot: jest.fn()
}))

jest.mock('node-fetch', () => {
    return jest.fn();
});

const fetch = require('node-fetch')

const mockManyResponse: Redash.RedashCollectionResult<Redash.Query> = {
    count: 0,
    page: 1,
    page_size: 1,
    results: [],
}

const mockOneResponse: Partial<Redash.Query> = {
    id: 23
}

const mockJobResponse: Redash.Job = {
    job: {
        id: 'job-id',
        status: 3,
        updated_at: '0000-00-00T23:00:45Z'
    }
}

const mockResultResponse: Redash.Result = {
    query_result: {
        data_source_id: 1,
        id: 2,
        query: '',
        query_hash: '',
        retrieved_at: '1980-02-02T23:00:45Z',
        runtime: 0.1234,
        data: {
            rows: [],
            columns: []
        }
    }
}

function createFetchMock(response: any) {
    const fetchMock = fetch as jest.MockedFunction<typeof fetch>;
    fetchMock.mockResolvedValue({
        json: () => Promise.resolve(response)
    })
}

describe('A queries client', () => {

    let client: QueryClient;

    beforeEach(() => {
        client = queryClient({token: 'xxx-token'})
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('has a set of functions', () => {
        expect(client.many).toEqual(expect.anything())
        expect(client.one).toEqual(expect.anything())
        expect(client.snapshot).toEqual(expect.anything())
        expect(client.job).toEqual(expect.anything())
    });

    it('defaults the host parameter', async () => {
        createFetchMock(mockManyResponse)
        await client.many({});
        expect(fetch).toHaveBeenCalledWith('https://redash.io/api/queries', {
            method: 'GET',
            headers: {'Content-Type': 'application/json', Authorization: 'xxx-token'}
        })
    })

    it('can override with a query scoped token', async () => {
        createFetchMock(mockManyResponse)
        await client.many({token: 'override-token'});
        expect(fetch).toHaveBeenCalledWith('https://redash.io/api/queries', {
            method: 'GET',
            headers: {'Content-Type': 'application/json', Authorization: 'override-token'}
        })
    })

    describe('with a "one" function', () => {
        beforeEach(() => {
            createFetchMock(mockOneResponse)
        })
        it('fires a single request', async () => {
            await client.one({id: 'query-id'});
            expect(fetch).toHaveBeenCalledTimes(1)
        })

        it('fires a request with default parameters', async () => {
            await client.one({id: 'test-id'});
            expect(fetch).toHaveBeenCalledWith('https://redash.io/api/queries/test-id', {
                method: 'GET',
                headers: {'Content-Type': 'application/json', Authorization: 'xxx-token'}
            })
        })

        it('returns a query response', async () => {
            const result = await client.one({id: 'test-id'});
            expect(result).toEqual(mockOneResponse)
        })
    })

    describe('with a "many" function', () => {
        beforeEach(() => {
            createFetchMock(mockManyResponse)
        })

        it('fires a single request', async () => {
            await client.many({});
            expect(fetch).toHaveBeenCalledTimes(1)
        })

        it('fires a request with default parameters', async () => {
            await client.many({});
            expect(fetch).toHaveBeenCalledWith('https://redash.io/api/queries', {
                method: 'GET',
                headers: {'Content-Type': 'application/json', Authorization: 'xxx-token'}
            })
        })

        it('returns a queries collection response', async () => {
            const result = await client.many({});
            expect(result).toEqual(mockManyResponse);
        })
    })

    describe('with a "job" function', () => {

        beforeEach(() => {
            createFetchMock(mockJobResponse)
        })

        it('fires a single request', async () => {
            await client.job({id: 'job-id'});
            expect(fetch).toHaveBeenCalledTimes(1)
        })

        it('fires a job request', async () => {
            await client.job({id: 'job-id'});
            expect(fetch).toHaveBeenCalledWith('https://redash.io/api/jobs/job-id', {
                method: 'GET',
                headers: {'Content-Type': 'application/json', Authorization: 'xxx-token'}
            })
        })

        it('returns a job response', async () => {
            const result = await client.job({id: 'job-id'});
            expect(result).toEqual(mockJobResponse)
        })
    })

    describe('with a "cachedResult" function', () => {
        beforeEach(() => {
            createFetchMock(mockResultResponse)
        })

        it('fires a single request', async () => {
            await client.cachedResult({id: 'job-id'});
            expect(fetch).toHaveBeenCalledTimes(1)
        })

        it('fires a result request', async () => {
            await client.cachedResult({id: 'result-id'});
            expect(fetch).toHaveBeenCalledWith('https://redash.io/api/queries/result-id/results', {
                method: 'GET',
                headers: {'Content-Type': 'application/json', Authorization: 'xxx-token'}
            })
        })

        it('returns a job response', async () => {
            const result = await client.cachedResult({id: 'result-id'});
            expect(result).toEqual(mockResultResponse)
        })
    })

    describe('with a "updatedResult" function', () => {

        it('returns up-to-date result', async () => {
            const fetchMock = fetch as jest.MockedFunction<typeof fetch>;
            fetchMock.mockResolvedValueOnce({
                json: () => Promise.resolve(mockResultResponse)
            })
            const result = await client.updatedResult({id: 'query-id', max_age: 1000});
            expect(result).toEqual(mockResultResponse)
        })

        it('wait polls and returns updated result', async () => {
            jest.clearAllMocks();

            const createJobMock = (partial?: object): Redash.Job => {
                return {
                    job: {
                        status: 1,
                        error: "",
                        id: "fb41ef5f-57a1-46b5-ada2-043dc57ffa38",
                        updated_at: '1980-02-02T23:00:45Z',
                        ...partial
                    }
                }
            }

            const createMockResponse = (response: any) => ({
                json: () => Promise.resolve(response)
            })

            const fetchMock = fetch as jest.MockedFunction<typeof fetch>;

            when(fetchMock)
                .calledWith('https://redash.io/api/queries/query-id/results?max_age=0', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', Authorization: 'xxx-token'}
                })
                .mockReturnValue(createMockResponse(createJobMock({status: 3, query_result_id: 23})))

                .calledWith('https://redash.io/api/jobs/fb41ef5f-57a1-46b5-ada2-043dc57ffa38', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', Authorization: 'xxx-token'}
                })
                .mockReturnValue(createMockResponse(createJobMock({status: 3, query_result_id: 23})))

                .calledWith('https://redash.io/api/query_results/23', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', Authorization: 'xxx-token'}
                })
                .mockReturnValue(createMockResponse(mockResultResponse))


            const result = await client.updatedResult({id: 'query-id', max_age: 0});

            verifyAllWhenMocksCalled()

            expect(result).toEqual(mockResultResponse)
        })
    })


    describe('with a "snapshot" function', () => {

        it('requests a query snapshot', async () => {
            await client.snapshot({queryId: '1', visualizationId: '1'});
            expect(snapshot).toHaveBeenCalledTimes(1)
        })

    })

});


