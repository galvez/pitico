import Pino from 'pino'

export const serializers = {
  req (req) {
    return {
      method: req.method,
      url: req.url,
      version: req.headers && req.headers['accept-version'],
      hostname: req.host,
      remoteAddress: req.socket.remoteAddress,
      remotePort: req.socket ? req.socket.remotePort : undefined
    }
  },
  err: Pino.stdSerializers.err,
  res (res) {
    return {
      statusCode: res.statusCode
    }
  }
}
