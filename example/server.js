import Pitico from 'pitico'

import * as parse from './parse.js'
import * as serialize from './serialize.js'

const server = Pitico([parse, serialize])

await server.listen({ port: 3000 })
