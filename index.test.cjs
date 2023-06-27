const test = require('node:test')
const assert = require('node:assert')

const JTDify = require('./dist/jtdify.cjs')

const parse = require('./example/parse.cjs')
const serialize = require('./example/serialize.cjs')

const server = JTDify([parse, serialize])

test('should parse JSON requests', async (t) => {
  const res = await server.inject({
    method: 'POST',
    url: '/parse',
    payload: { foobar: 'foobar' }
  })
  assert.equal(res.json().foobar, 'foobar')
})

test('should serialize JSON requests', async (t) => {
  const res = await server.inject({
    method: 'POST',
    url: '/serialize',
    payload: { foobar: 'foobar' }
  })
  assert.equal(res.json().foobar, 'foobar')
})
