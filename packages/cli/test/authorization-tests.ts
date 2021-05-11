import {expect, test} from '@oclif/test'
import {stringify} from '../src/utils'

export const testAuthorizationHeaderFlag = (args: string[], path: string, response: object) => {
  test
  .stdout()
  .stderr()
  .env({}, {clear: true})
  .command(args)
  .catch(/no access token provided/)
  .it('fails when no token flag provided')

  test
  .stdout()
  .env({}, {clear: true})
  .nock('https://redash.io', api => api
  .get(path)
  .query({page_size: '25', page: '1', q: null})
  .matchHeader('Authorization', 'token')
  .reply(200, response),
  )
  .command([...args, '-t', 'token'])
  .it('runs when token flag provided', ctx => {
    expect(ctx.stdout).to.contain(stringify(response))
  })

  test
  .stdout()
  .env({REDASH_TOKEN: 'token'}, {clear: true})
  .nock('https://redash.io', api => api
  .get(path)
  .query({page_size: '25', page: '1', q: null})
  .matchHeader('Authorization', 'token')
  .reply(200, response),
  )
  .command(args)
  .it('runs when token env var (REDASH_TOKEN) provided', ctx => {
    expect(ctx.stdout).to.contain(stringify(response))
  })
}
