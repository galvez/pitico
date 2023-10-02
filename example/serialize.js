
export const path = '/serialize'

export default (server, { object, string, boolean }) => ({
  parse: object({
    foobar: string()
  }),
  serialize: object({
    foobar: string(),
    something: boolean(),
  }),
  handle (req, res) {
    return {
      foobar: req.body.foobar,
      something: server.something,
    }
  },
})
