
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
