import {expect, test} from '@oclif/test'
import {stringify} from '../../../src/utils'

const testAuthorizationHeaderFlag = (command: string, path: string, response: object) => {
  test
  .stdout()
  .nock('https://redash.io', api => api
  .get(path)
  .query(true)
  .matchHeader('Authorization', 'token-hash')
  .reply(200, '*'),
  )
  .command([command, '-t', 'token-hash'])
  .it('returns queries collection with api token set', ctx => {
    expect(ctx.stdout).to.contain(stringify(response))
  })

  test
  .stdout()
  .nock('https://redash.io', api => api
  .get(path)
  .query(true)
  .reply(200, '*'),
  )
  .command([command])
  .it('fails with no api token set', ctx => {
    expect(ctx.stdout).to.contain(stringify(response))
  })
}

describe('redash-cli queries:list', () => {
  testAuthorizationHeaderFlag('queries:list', '/api/queries', {
    count: 0,
    page: 1,
    page_size: 1,
    results: [],
  })
})
