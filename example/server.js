import Pitico from 'pitico'

import * as parse from './parse.js'
import * as serialize from './serialize.js'

const server = Pitico([parse, serialize, {
  path: '/empty',
  handle (_, res) {
    res.statusCode = 201
  }
}])

await server.listen({ port: 3000 })
