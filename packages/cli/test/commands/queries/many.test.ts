import {testAuthorizationHeaderFlag} from '../../authorization-tests'

const emptyQueryCollectionResponse = {
  count: 0,
  page: 1,
  page_size: 1,
  results: [],
}

describe('command queries:many ', () => {
  testAuthorizationHeaderFlag(['query:many'], '/api/queries', emptyQueryCollectionResponse)
})
