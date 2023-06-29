import { IncomingMessage as y, createServer as k } from "node:http";
import w from "jsontypedef";
import R from "light-my-request";
import z from "raw-body";
import C from "ajv/dist/jtd.js";
const u = Symbol("kRoutes"), l = Symbol("kDispatcher"), d = Symbol("kServer"), p = Symbol("kRoute");
function O(e) {
  const a = new C(), i = /* @__PURE__ */ new Map(), f = () => {
  }, c = {
    [u]: i,
    [l](t, n) {
      const o = i.get(t.url), r = o?.handle;
      r ? v(t, o).then((s) => r(s, n)).then((s) => P(n, o, s)).catch((s) => x(n, s)) : j(n);
    },
    [p](t, n) {
      const {
        path: o,
        handle: r,
        parse: s,
        serialize: h
      } = typeof t == "function" ? t(this, w) : t, g = s && a.compileParser(s), S = h && a.compileSerializer(h), b = n ?? o;
      this[u].set(b, { parse: g, serialize: S, handle: r });
    },
    addHook: f,
    inject(t) {
      return new Promise((n, o) => {
        R(this[l], t, (r, s) => {
          if (r)
            return o(r);
          n(s);
        });
      });
    },
    decorate(t, n) {
      this[t] = n;
    },
    decorateRequest(t, n) {
      y.prototype[t] = n;
    },
    async register(t, n) {
      try {
        await t(this, n, (o) => {
          o && m(o);
        });
      } catch (o) {
        m(o);
      }
    },
    async listen(t) {
      return new Promise((n, o) => {
        this[d].listen(t, (r) => {
          if (r)
            return o(r);
          n();
        });
      });
    }
  };
  if (Array.isArray(e))
    for (const t of e)
      c[p](t.default ?? t, t.path);
  else
    for (const [t, n] of Object.entries(e))
      c[p](t, n);
  return c[d] = k(c[l]), c;
}
y.prototype.body = null;
function v(e, { parse: a }) {
  return new Promise((i, f) => {
    z(e, {
      length: e.headers["content-length"],
      limit: "1mb",
      encoding: "utf8"
    }, (c, t) => {
      if (c)
        return f(c);
      t && (e.body = (a ?? JSON.parse)(t)), i(e);
    });
  });
}
function P(e, a, i) {
  if (!i) {
    e.setHeader("Content-Type", "plain/text"), e.end("");
    return;
  }
  const f = a.serialize ? a.serialize(i) : JSON.stringify(i);
  e.writeHead(200, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(f)
  }), e.end(f);
}
function j(e) {
  e.statusCode = 404, e.end("");
}
function x(e, a) {
  const i = a.toString();
  e.statusCode = 500, e.writeHead(200, {
    "Content-Type": "text/plain",
    "Content-Length": Buffer.byteLength(i)
  }), e.end(i);
}
function m(e) {
  console.error(e), process.exit(1);
}
export {
  O as default
};
