import { IncomingMessage as m, createServer as b } from "node:http";
import w from "jsontypedef";
import k from "light-my-request";
import R from "raw-body";
import z from "ajv/dist/jtd.js";
const h = Symbol("kRoutes"), f = Symbol("kDispatcher"), u = Symbol("kServer"), l = Symbol("kRoute");
function N(e) {
  const c = new z(), i = /* @__PURE__ */ new Map(), r = {
    [h]: i,
    [f](t, n) {
      const o = i.get(t.url), s = o?.handle;
      s ? C(t, o).then((a) => s(a, n)).then((a) => v(n, o, a)).catch((a) => j(n, a)) : P(n);
    },
    [l](t, n) {
      const {
        path: o,
        handle: s,
        parse: a,
        serialize: p
      } = typeof t == "function" ? t(this, w) : t, y = a && c.compileParser(a), g = p && c.compileSerializer(p), S = n ?? o;
      this[h].set(S, { parse: y, serialize: g, handle: s });
    },
    inject(t) {
      return new Promise((n, o) => {
        k(this[f], t, (s, a) => {
          if (s)
            return o(s);
          n(a);
        });
      });
    },
    decorate(t, n) {
      this[t] = n;
    },
    decorateRequest(t, n) {
      m.prototype[t] = n;
    },
    async register(t, n) {
      try {
        await t(this, n, (o) => {
          o && d(o);
        });
      } catch (o) {
        d(o);
      }
    },
    async listen(t) {
      return new Promise((n, o) => {
        this[u].listen(t, (s) => {
          if (s)
            return o(s);
          n();
        });
      });
    }
  };
  if (Array.isArray(e))
    for (const t of e)
      r[l](t.default ?? t, t.path);
  else
    for (const [t, n] of Object.entries(e))
      r[l](t, n);
  return r[u] = b(r[f]), r;
}
m.prototype.body = null;
function C(e, { parse: c }) {
  return new Promise((i, r) => {
    R(e, {
      length: e.headers["content-length"],
      limit: "1mb",
      encoding: "utf8"
    }, (t, n) => {
      if (t)
        return r(t);
      n && (e.body = (c ?? JSON.parse)(n)), i(e);
    });
  });
}
function v(e, c, i) {
  if (!i) {
    e.setHeader("Content-Type", "plain/text"), e.end("");
    return;
  }
  const r = c.serialize ? c.serialize(i) : JSON.stringify(i);
  e.writeHead(200, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(r)
  }), e.end(r);
}
function P(e) {
  e.statusCode = 404, e.end("");
}
function j(e, c) {
  const i = c.toString();
  e.statusCode = 500, e.writeHead(200, {
    "Content-Type": "text/plain",
    "Content-Length": Buffer.byteLength(i)
  }), e.end(i);
}
function d(e) {
  console.error(e), process.exit(1);
}
export {
  N as default
};
