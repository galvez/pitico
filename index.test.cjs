const test = require('node:test')
const assert = require('node:assert')

const Pitico = require('./dist/pitico.cjs')

const parse = require('./example/parse.cjs')
const serialize = require('./example/serialize.cjs')

const server = Pitico([parse, serialize])

test('should parse JSON requests', async (t) => {
  await server.ready()
  const res = await server.inject({
    method: 'POST',
    url: '/parse',
    payload: { foobar: 'foobar' }
  })
  assert.equal(res.json().foobar, 'foobar')
})

test('should serialize JSON requests', async (t) => {
  await server.ready()
  const res = await server.inject({
    method: 'POST',
    url: '/serialize',
    payload: { foobar: 'foobar' }
  })
  assert.equal(res.json().foobar, 'foobar')
})
