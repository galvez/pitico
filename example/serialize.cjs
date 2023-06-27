module.exports = (server, { object, string }) => ({
  path: '/serialize',
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
