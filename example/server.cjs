const Pitico = require('pitico')

const parse = require('./parse.cjs')
const serialize = require('./serialize.cjs')

async function main () {
  const server = Pitico([parse, serialize])
  await server.listen({ port: 3000 })
}

main()
