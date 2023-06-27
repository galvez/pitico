import test from 'node:test'
import assert from 'node:assert'

import JTDify from './index.js'
import * as parse from './example/parse.js'
import * as serialize from './example/serialize.js'

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
