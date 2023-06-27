import test from 'node:test'
import assert from 'node:assert'

import Pitico from './index.js'
import * as parse from './example/parse.js'
import * as serialize from './example/serialize.js'

const server = Pitico([parse, serialize])

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
