import { IncomingMessage as d, createServer as S } from "node:http";
import b from "jsontypedef";
import w from "light-my-request";
import z from "raw-body";
import j from "ajv/dist/jtd.js";
const h = Symbol("kRoutes"), f = Symbol("kDispatcher"), p = Symbol("kServer");
function D(e) {
  const c = new j(), r = /* @__PURE__ */ new Map(), i = {
    [h]: r,
    [f](t, n) {
      const o = r.get(t.url), s = o?.handle;
      s ? k(t, o).then((a) => s(a)).then((a) => v(n, o, a)).catch((a) => R(n, a)) : C(n);
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
      i.route(t.default ?? t, t.path);
  else
    for (const [t, n] of Object.entries(e))
      i.route(t, n);
  return i[p] = S(i[f]), i;
}
d.prototype.body = null;
function k(e, { parse: c }) {
  return new Promise((r, i) => {
    z(e, {
      length: e.headers["content-length"],
      limit: "1mb",
      encoding: "utf8"
    }, (t, n) => {
      if (t)
        return i(t);
      e.body = c(n), r(e);
    });
  });
}
function v(e, c, r) {
  const i = c.serialize ? c.serialize(r) : JSON.stringify(r);
  e.writeHead(200, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(i)
  }), e.end(i);
}
function C(e) {
  e.statusCode = 404, e.end("");
}
function R(e, c) {
  const r = c.toString();
  e.statusCode = 500, e.writeHead(200, {
    "Content-Type": "text/plain",
    "Content-Length": Buffer.byteLength(r)
  }), e.end(r);
}
function u(e) {
  console.error(e), process.exit(1);
}
export {
  D as default
};
