<br>

# JTDify [![NPM version](https://img.shields.io/npm/v/jtdify.svg?style=flat)](https://www.npmjs.com/package/jtdify) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)

This is a **tiny wrapper** for the Node.js standard library [`http`](https://nodejs.org/api/http.html) module.

## Features

- Ergonomic API for **defining JSON endpoints**
  - Along with their **request and response schemas**
  - Using [`jsontypedef`](https://github.com/galvez/jsontypedef) under the hood for setting types
- Minimal **compatibility with [Fastify](https://www.fastify.io/) plugins**
  - `decorate()` extends the server instance
  - `decorateRequest()` extends `http.IncomingMessage` directly
- [Ajv](https://ajv.js.org/)-optimized JSON parsing and validation based on [JTD schemas](https://jsontypedef.com/)
- [Ajv](https://ajv.js.org/)-optimized JSON serialization based on [JTD schemas](https://jsontypedef.com/)

## Limitations

It is a radically minimal server so a few contraints are embraced:

- **Only JSON** request payloads supported.
- **No URL parsing**, routing is just absolute paths in a `Map`.

## Install

```sh
npm i jtdify --save
```

## Usage

### **server.js**

```js
import JTDify from 'jtdify'

import * as serialize from './serialize.js'

const server = JTDify([parse, serialize])

await server.listen({ port: 3000 })
```

### **serialize.js**

```js

export const path = '/serialize'

export default (server, { object, string }) => ({
  parse: object({
    foobar: string()
  }),
  serialize: object({
    foobar: string(),
  }),
  handle (req, res) {
    return {
      foobar: req.body.foobar,
    }
  },
})
```

See [`jsontypedef`](https://github.com/galvez/jsontypedef) for the full list of helpers available for defining JTD types.

# License

MIT