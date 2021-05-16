import {testAuthorizationHeaderFlag} from '../../authorization-tests'

const emptyQueryCollectionResponse = {
  count: 0,
  page: 1,
  page_size: 1,
  results: [],
}

describe('command queries:snapshot ', () => {
  testAuthorizationHeaderFlag(['queries:snapshot', 'id', 'visualization', '/my-path'], '/api/queries', emptyQueryCollectionResponse)
})
