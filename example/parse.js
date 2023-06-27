
export const path = '/parse'

export default (server, { object, string }) => ({
  parse: object({
    foobar: string(),
  }),
  handle (req, res) {
    return {
      foobar: req.body.foobar,
    }
  },
})
