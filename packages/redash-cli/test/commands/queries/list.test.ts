import {expect, test} from '@oclif/test'
import {Query, RedashCollectionResult} from '../../../src/types'
import {stringify} from '../../../src/utils'

const createResponseBody = (): RedashCollectionResult<Query> => ({
  count: 0,
  page: 1,
  page_size: 1,
  results: [],
})

describe('redash-cli queries:list', () => {
  test
  .stdout()
  .nock('https://redash.io', api => api
  .get('/api/queries')
  .query({page_size: '25', page: '1', q: null})
  .reply(200, createResponseBody())
  )
  .command(['queries:list', '-t', 'token-hash', '-n', 'https://redash.io'])
  .it('returns queries collection', ctx => {
    expect(ctx.stdout).to.contain(stringify(createResponseBody()))
  })
})
