import { IncomingMessage as d, createServer as S } from "node:http";
import b from "jsontypedef";
import w from "light-my-request";
import z from "raw-body";
import j from "ajv/dist/jtd.js";
const h = Symbol("kRoutes"), f = Symbol("kDispatcher"), p = Symbol("kServer");
function D(e) {
  const c = new j(), i = /* @__PURE__ */ new Map(), r = {
    [h]: i,
    [f](t, n) {
      const o = i.get(t.url), s = o?.handle;
      s ? k(t, o).then((a) => s(a, n)).then((a) => v(n, o, a)).catch((a) => P(n, a)) : C(n);
    },
    route(t, n) {
      const {
        path: o,
        handle: s,
        parse: a,
        serialize: l
      } = typeof t == "function" ? t(this, b) : t, m = a && c.compileParser(a), y = l && c.compileSerializer(l), g = n ?? o;
      this[h].set(g, { parse: m, serialize: y, handle: s });
    },
    inject(t) {
      return new Promise((n, o) => {
        w(this[f], t, (s, a) => {
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
      d.prototype[t] = n;
    },
    async register(t, n) {
      try {
        await t(this, n, (o) => {
          o && u(o);
        });
      } catch (o) {
        u(o);
      }
    },
    async listen(t) {
      return new Promise((n, o) => {
        this[p].listen(t, (s) => {
          if (s)
            return o(s);
          n();
        });
      });
    }
  };
  if (Array.isArray(e))
    for (const t of e)
      r.route(t.default ?? t, t.path);
  else
    for (const [t, n] of Object.entries(e))
      r.route(t, n);
  return r[p] = S(r[f]), r;
}
d.prototype.body = null;
function k(e, { parse: c }) {
  return new Promise((i, r) => {
    z(e, {
      length: e.headers["content-length"],
      limit: "1mb",
      encoding: "utf8"
    }, (t, n) => {
      if (t)
        return r(t);
      e.body = c(n), i(e);
    });
  });
}
function v(e, c, i) {
  const r = c.serialize ? c.serialize(i) : JSON.stringify(i);
  e.writeHead(200, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(r)
  }), e.end(r);
}
function C(e) {
  e.statusCode = 404, e.end("");
}
function P(e, c) {
  const i = c.toString();
  e.statusCode = 500, e.writeHead(200, {
    "Content-Type": "text/plain",
    "Content-Length": Buffer.byteLength(i)
  }), e.end(i);
}
function u(e) {
  console.error(e), process.exit(1);
}
export {
  D as default
};
