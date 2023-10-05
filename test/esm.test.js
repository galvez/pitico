import { test, beforeAll } from 'vitest'

import assert from 'node:assert'
import { EventEmitter } from 'node:events'

import Pino from 'pino'
import split from 'split2'

import { serializers } from '../logging.js'

import Pitico from '../dist/pitico.esm.js'
import * as parse from '../example/parse.js'
import * as serialize from '../example/serialize.js'

const { destination, emitter } = sink()

const logger = Pino({ serializers }, destination)
const server = Pitico([parse, serialize], { logger })

beforeAll(async () => {
  await server.ready()
})

test('should log requests', async (t) => {
  const [res, log] = await Promise.all([
    server.inject({
      method: 'POST',
      url: '/parse',
      payload: { foobar: 'foobar' }
    }),
    new Promise((resolve) => {
      emitter.on('data', (data) => {
        resolve(JSON.parse(data))
      })
    })
  ])
  assert.equal(log.req.url, '/parse')
  assert.equal(res.json().foobar, 'foobar')
})

test('should log and return 500 on errors', async (t) => {
  const [, [request, error]] = await Promise.all([
    server.inject({
      method: 'POST',
      url: '/parse',
      payload: { foobar: 123 }
    }),
    new Promise((resolve) => {
      let i = 0
      const logs = []
      emitter.on('data', (data) => {
        logs.push(JSON.parse(data))
        if (i++ === 1) {
          resolve(logs)
        }
      })
    })
  ])
  assert.equal(request.req.url, '/parse')
  assert.equal(error.err.type, 'TypeError')
})

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

function sink () {
  const ee = new EventEmitter()
  return {
    destination: split((data) => {
      ee.emit('data', data)
      return data
    }),
    emitter: ee
  }
}
