const JTDify = require('../dist/jtdify.cjs')

const parse = require('./parse.js')
const serialize = require('./serialize.js')

async function main () {
  const server = JTDify([parse, serialize])
  await server.listen({ port: 3000 })
}

main()
