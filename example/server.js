import JTDify from '../dist/jtdify.esm.js'

import * as parse from './parse.js'
import * as serialize from './serialize.js'

const server = JTDify([parse, serialize])

await server.listen({ port: 3000 })
