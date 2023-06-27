const Pitico = require('../dist/pitico.cjs')

const parse = require('./parse.js')
const serialize = require('./serialize.js')

async function main () {
  const server = Pitico([parse, serialize])
  await server.listen({ port: 3000 })
}

main()
