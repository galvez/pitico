
module.exports = (server, { object, string }) => ({
  path: '/parse',
  parse: object({
    foobar: string(),
  }),
  handle (req, res) {
    if (!req.body.foobar) {
      throw new Error('foobar missing')
    }
    return {
      foobar: req.body.foobar,
    }
  },
})
