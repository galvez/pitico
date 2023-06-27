
module.exports = (server, { object, string }) => ({
  path: '/parse',
  parse: object({
    foobar: string(),
  }),
  handle (req, res) {
    return {
      foobar: req.body.foobar,
    }
  },
})
