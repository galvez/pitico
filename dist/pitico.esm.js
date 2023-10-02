import { IncomingMessage as g, createServer as k } from "node:http";
import R from "jsontypedef";
import z from "light-my-request";
import P from "raw-body";
import v from "ajv/dist/jtd.js";
const u = Symbol("kRoutes"), p = Symbol("kDispatcher"), d = Symbol("kServer"), h = Symbol("kRoute"), y = Symbol("kReady");
function T(n) {
  const a = new v(), i = /* @__PURE__ */ new Map(), l = () => {
  }, c = {
    [u]: i,
    [p](t, e) {
      const o = i.get(t.url), r = o?.handle;
      r ? C(t, o).then((s) => r(s, e)).then((s) => j(e, o, s)).catch((s) => H(e, s)) : x(e);
    },
    async [h](t, e) {
      const {
        path: o,
        handle: r,
        parse: s,
        serialize: f
      } = typeof t == "function" ? await t(this, R) : t, S = s && a.compileParser(s), w = f && a.compileSerializer(f), b = e ?? o;
      this[u].set(b, { parse: S, serialize: w, handle: r });
    },
    addHook: l,
    inject(t) {
      return new Promise((e, o) => {
        z(this[p], t, (r, s) => {
          if (r)
            return o(r);
          e(s);
        });
      });
    },
    decorate(t, e) {
      this[t] = e;
    },
    decorateRequest(t, e) {
      g.prototype[t] = e;
    },
    async register(t, e) {
      try {
        await t(this, e, (o) => {
          o && m(o);
        });
      } catch (o) {
        m(o);
      }
    },
    async listen(t) {
      return await this.ready(), new Promise((e, o) => {
        this[d].listen(t, (r) => {
          if (r)
            return o(r);
          e();
        });
      });
    },
    async ready() {
      if (this[y])
        return;
      const t = [];
      if (Array.isArray(n))
        for (const e of n)
          t.push(c[h](e.default ?? e, e.path));
      else
        for (const [e, o] of Object.entries(n))
          t.push(c[h](e, o));
      await Promise.all(t), this[y] = !0;
    }
  };
  return c[d] = k(c[p]), c;
}
g.prototype.body = null;
function C(n, { parse: a }) {
  return new Promise((i, l) => {
    P(n, {
      length: n.headers["content-length"],
      limit: "1mb",
      encoding: "utf8"
    }, (c, t) => {
      if (c)
        return l(c);
      t && (n.body = (a ?? JSON.parse)(t)), i(n);
    });
  });
}
function j(n, a, i) {
  if (!i) {
    n.setHeader("Content-Type", "plain/text"), n.end("");
    return;
  }
  const l = a.serialize ? a.serialize(i) : JSON.stringify(i);
  n.writeHead(200, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(l)
  }), n.end(l);
}
function x(n) {
  n.statusCode = 404, n.end("");
}
function H(n, a) {
  const i = a.toString();
  n.writeHead(500, {
    "Content-Type": "text/plain",
    "Content-Length": Buffer.byteLength(i)
  }), n.end(i);
}
function m(n) {
  console.error(n), process.exit(1);
}
export {
  T as default
};
