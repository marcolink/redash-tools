import {expect, test} from '@oclif/test'
import {stringify} from '../../../src/utils'

const emptyQueryCollectionResponse = {
  count: 0,
  page: 1,
  page_size: 1,
  results: [],
}

const testAuthorizationHeaderFlag = (command: string, path: string, response: object) => {
  test
  .stdout()
  .env({}, {clear: true})
  .nock('https://redash.io', api => api
  .get(path)
  .query({page_size: '25', page: '1', q: null})
  .matchHeader('Authorization', 'token-hash')
  .reply(200, response),
  )
  .command([command, '-t', 'token-hash'])
  .it('returns queries collection with api token set', ctx => {
    expect(ctx.stdout).to.contain(stringify(response))
  })
}

describe('redash-cli queries:list', () => {
  testAuthorizationHeaderFlag('queries:list', '/api/queries', emptyQueryCollectionResponse)
})
