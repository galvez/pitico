import { IncomingMessage as $, createServer as K } from "node:http";
import Q from "jsontypedef";
import X from "light-my-request";
import Y from "raw-body";
import Z from "ajv/dist/jtd.js";
function q(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var S = { exports: {} };
function ee(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return '"[Circular]"';
  }
}
var te = ne;
function ne(e, t, r) {
  var i = r && r.stringify || ee, s = 1;
  if (typeof e == "object" && e !== null) {
    var u = t.length + s;
    if (u === 1)
      return e;
    var h = new Array(u);
    h[0] = i(e);
    for (var f = 1; f < u; f++)
      h[f] = i(t[f]);
    return h.join(" ");
  }
  if (typeof e != "string")
    return e;
  var l = t.length;
  if (l === 0)
    return e;
  for (var n = "", o = 1 - s, a = -1, d = e && e.length || 0, c = 0; c < d; ) {
    if (e.charCodeAt(c) === 37 && c + 1 < d) {
      switch (a = a > -1 ? a : 0, e.charCodeAt(c + 1)) {
        case 100:
        case 102:
          if (o >= l || t[o] == null)
            break;
          a < c && (n += e.slice(a, c)), n += Number(t[o]), a = c + 2, c++;
          break;
        case 105:
          if (o >= l || t[o] == null)
            break;
          a < c && (n += e.slice(a, c)), n += Math.floor(Number(t[o])), a = c + 2, c++;
          break;
        case 79:
        case 111:
        case 106:
          if (o >= l || t[o] === void 0)
            break;
          a < c && (n += e.slice(a, c));
          var p = typeof t[o];
          if (p === "string") {
            n += "'" + t[o] + "'", a = c + 2, c++;
            break;
          }
          if (p === "function") {
            n += t[o].name || "<anonymous>", a = c + 2, c++;
            break;
          }
          n += i(t[o]), a = c + 2, c++;
          break;
        case 115:
          if (o >= l)
            break;
          a < c && (n += e.slice(a, c)), n += String(t[o]), a = c + 2, c++;
          break;
        case 37:
          a < c && (n += e.slice(a, c)), n += "%", a = c + 2, c++, o--;
          break;
      }
      ++o;
    }
    ++c;
  }
  return a === -1 ? e : (a < d && (n += e.slice(a)), n);
}
const D = te;
S.exports = m;
const w = ye().console || {}, re = {
  mapHttpRequest: k,
  mapHttpResponse: k,
  wrapRequestSerializer: _,
  wrapResponseSerializer: _,
  wrapErrorSerializer: _,
  req: k,
  res: k,
  err: N,
  errWithCause: N
};
function O(e, t) {
  return e === "silent" ? 1 / 0 : t.levels.values[e];
}
const P = Symbol("pino.logFuncs"), A = Symbol("pino.hierarchy"), ie = {
  error: "log",
  fatal: "error",
  warn: "error",
  info: "log",
  debug: "log",
  trace: "log"
};
function M(e, t) {
  const r = {
    logger: t,
    parent: e[A]
  };
  t[A] = r;
}
function se(e, t, r) {
  const i = {};
  t.forEach((s) => {
    i[s] = r[s] ? r[s] : w[s] || w[ie[s] || "log"] || g;
  }), e[P] = i;
}
function oe(e, t) {
  return Array.isArray(e) ? e.filter(function(i) {
    return i !== "!stdSerializers.err";
  }) : e === !0 ? Object.keys(t) : !1;
}
function m(e) {
  e = e || {}, e.browser = e.browser || {};
  const t = e.browser.transmit;
  if (t && typeof t.send != "function")
    throw Error("pino: transmit option must have a send function");
  const r = e.browser.write || w;
  e.browser.write && (e.browser.asObject = !0);
  const i = e.serializers || {}, s = oe(e.browser.serialize, i);
  let u = e.browser.serialize;
  Array.isArray(e.browser.serialize) && e.browser.serialize.indexOf("!stdSerializers.err") > -1 && (u = !1);
  const h = Object.keys(e.customLevels || {}), f = ["error", "fatal", "warn", "info", "debug", "trace"].concat(h);
  typeof r == "function" && f.forEach(function(b) {
    r[b] = r;
  }), (e.enabled === !1 || e.browser.disabled) && (e.level = "silent");
  const l = e.level || "info", n = Object.create(r);
  n.log || (n.log = g), se(n, f, r), M({}, n), Object.defineProperty(n, "levelVal", {
    get: a
  }), Object.defineProperty(n, "level", {
    get: d,
    set: c
  });
  const o = {
    transmit: t,
    serialize: s,
    asObject: e.browser.asObject,
    levels: f,
    timestamp: be(e)
  };
  n.levels = ae(e), n.level = l, n.setMaxListeners = n.getMaxListeners = n.emit = n.addListener = n.on = n.prependListener = n.once = n.prependOnceListener = n.removeListener = n.removeAllListeners = n.listeners = n.listenerCount = n.eventNames = n.write = n.flush = g, n.serializers = i, n._serialize = s, n._stdErrSerialize = u, n.child = p, t && (n._logEvent = C());
  function a() {
    return O(this.level, this);
  }
  function d() {
    return this._level;
  }
  function c(b) {
    if (b !== "silent" && !this.levels.values[b])
      throw Error("unknown level " + b);
    this._level = b, y(this, o, n, "error"), y(this, o, n, "fatal"), y(this, o, n, "warn"), y(this, o, n, "info"), y(this, o, n, "debug"), y(this, o, n, "trace"), h.forEach((v) => {
      y(this, o, n, v);
    });
  }
  function p(b, v) {
    if (!b)
      throw new Error("missing bindings for child Pino");
    v = v || {}, s && b.serializers && (v.serializers = b.serializers);
    const R = v.serializers;
    if (s && R) {
      var z = Object.assign({}, i, R), F = e.browser.serialize === !0 ? Object.keys(z) : s;
      delete b.serializers, j([b], F, z, this._stdErrSerialize);
    }
    function x(V) {
      this._childLevel = (V._childLevel | 0) + 1, this.bindings = b, z && (this.serializers = z, this._serialize = F), t && (this._logEvent = C(
        [].concat(V._logEvent.bindings, b)
      ));
    }
    x.prototype = this;
    const E = new x(this);
    return M(this, E), E.level = this.level, E;
  }
  return n;
}
function ae(e) {
  const t = e.customLevels || {}, r = Object.assign({}, m.levels.values, t), i = Object.assign({}, m.levels.labels, le(t));
  return {
    values: r,
    labels: i
  };
}
function le(e) {
  const t = {};
  return Object.keys(e).forEach(function(r) {
    t[e[r]] = r;
  }), t;
}
m.levels = {
  values: {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10
  },
  labels: {
    10: "trace",
    20: "debug",
    30: "info",
    40: "warn",
    50: "error",
    60: "fatal"
  }
};
m.stdSerializers = re;
m.stdTimeFunctions = Object.assign({}, { nullTime: G, epochTime: W, unixTime: me, isoTime: ve });
function ce(e) {
  const t = [];
  e.bindings && t.push(e.bindings);
  let r = e[A];
  for (; r.parent; )
    r = r.parent, r.logger.bindings && t.push(r.logger.bindings);
  return t.reverse();
}
function y(e, t, r, i) {
  if (e[i] = O(e.level, r) > O(i, r) ? g : r[P][i], !t.transmit && e[i] === g)
    return;
  e[i] = fe(e, t, r, i);
  const s = ce(e);
  s.length !== 0 && (e[i] = ue(s, e[i]));
}
function ue(e, t) {
  return function() {
    return t.apply(this, [...e, ...arguments]);
  };
}
function fe(e, t, r, i) {
  return function(s) {
    return function() {
      const h = t.timestamp(), f = new Array(arguments.length), l = Object.getPrototypeOf && Object.getPrototypeOf(this) === w ? w : this;
      for (var n = 0; n < f.length; n++)
        f[n] = arguments[n];
      if (t.serialize && !t.asObject && j(f, this._serialize, this.serializers, this._stdErrSerialize), t.asObject ? s.call(l, he(this, i, f, h)) : s.apply(l, f), t.transmit) {
        const o = t.transmit.level || e._level, a = r.levels.values[o], d = r.levels.values[i];
        if (d < a)
          return;
        de(this, {
          ts: h,
          methodLevel: i,
          methodValue: d,
          transmitLevel: o,
          transmitValue: r.levels.values[t.transmit.level || e._level],
          send: t.transmit.send,
          val: O(e._level, r)
        }, f);
      }
    };
  }(e[P][i]);
}
function he(e, t, r, i) {
  e._serialize && j(r, e._serialize, e.serializers, e._stdErrSerialize);
  const s = r.slice();
  let u = s[0];
  const h = {};
  i && (h.time = i), h.level = e.levels.values[t];
  let f = (e._childLevel | 0) + 1;
  if (f < 1 && (f = 1), u !== null && typeof u == "object") {
    for (; f-- && typeof s[0] == "object"; )
      Object.assign(h, s.shift());
    u = s.length ? D(s.shift(), s) : void 0;
  } else
    typeof u == "string" && (u = D(s.shift(), s));
  return u !== void 0 && (h.msg = u), h;
}
function j(e, t, r, i) {
  for (const s in e)
    if (i && e[s] instanceof Error)
      e[s] = m.stdSerializers.err(e[s]);
    else if (typeof e[s] == "object" && !Array.isArray(e[s]))
      for (const u in e[s])
        t && t.indexOf(u) > -1 && u in r && (e[s][u] = r[u](e[s][u]));
}
function de(e, t, r) {
  const i = t.send, s = t.ts, u = t.methodLevel, h = t.methodValue, f = t.val, l = e._logEvent.bindings;
  j(
    r,
    e._serialize || Object.keys(e.serializers),
    e.serializers,
    e._stdErrSerialize === void 0 ? !0 : e._stdErrSerialize
  ), e._logEvent.ts = s, e._logEvent.messages = r.filter(function(n) {
    return l.indexOf(n) === -1;
  }), e._logEvent.level.label = u, e._logEvent.level.value = h, i(u, e._logEvent, f), e._logEvent = C(l);
}
function C(e) {
  return {
    ts: 0,
    messages: [],
    bindings: e || [],
    level: { label: "", value: 0 }
  };
}
function N(e) {
  const t = {
    type: e.constructor.name,
    msg: e.message,
    stack: e.stack
  };
  for (const r in e)
    t[r] === void 0 && (t[r] = e[r]);
  return t;
}
function be(e) {
  return typeof e.timestamp == "function" ? e.timestamp : e.timestamp === !1 ? G : W;
}
function k() {
  return {};
}
function _(e) {
  return e;
}
function g() {
}
function G() {
  return !1;
}
function W() {
  return Date.now();
}
function me() {
  return Math.round(Date.now() / 1e3);
}
function ve() {
  return new Date(Date.now()).toISOString();
}
function ye() {
  function e(t) {
    return typeof t < "u" && t;
  }
  try {
    return typeof globalThis < "u" || Object.defineProperty(Object.prototype, "globalThis", {
      get: function() {
        return delete Object.prototype.globalThis, this.globalThis = this;
      },
      configurable: !0
    }), globalThis;
  } catch {
    return e(self) || e(window) || e(this) || {};
  }
}
S.exports.default = m;
S.exports.pino = m;
var pe = S.exports;
const U = /* @__PURE__ */ q(pe), we = {
  req(e) {
    return {
      method: e.method,
      url: e.url,
      version: e.headers && e.headers["accept-version"],
      hostname: e.host,
      remoteAddress: e.socket.remoteAddress,
      remotePort: e.socket ? e.socket.remotePort : void 0
    };
  },
  err: U.stdSerializers.err,
  res(e) {
    return {
      statusCode: e.statusCode
    };
  }
}, H = Symbol("kRoutes"), L = Symbol("kDispatcher"), B = Symbol("kServer"), T = Symbol("kRoute"), I = Symbol("kReady");
function Te(e, t = {}) {
  const r = new Z(), i = /* @__PURE__ */ new Map(), s = () => {
  };
  let u = t.logger;
  !u && u !== !1 && (u = U({ serializers: we, level: t.logLevel ?? "info" }));
  const h = { log: u }, f = {
    [H]: i,
    [L](l, n) {
      const o = i.get(l.url), a = o?.handle;
      a ? ge.call(h, l, n, o).then((d) => a(d, n)).then((d) => ze(n, o, d)).catch((d) => Oe(l, n, d, u)) : ke(n);
    },
    async [T](l, n) {
      const {
        path: o,
        handle: a,
        parse: d,
        serialize: c
      } = typeof l == "function" ? await l(this, Q) : l, p = d && r.compileParser(d), b = c && r.compileSerializer(c), v = n ?? o;
      this[H].set(v, { parse: p, serialize: b, handle: a });
    },
    addHook: s,
    inject(l) {
      return new Promise((n, o) => {
        X(this[L], l, (a, d) => {
          if (a)
            return o(a);
          n(d);
        });
      });
    },
    decorate(l, n) {
      this[l] = n;
    },
    decorateRequest(l, n) {
      $.prototype[l] = n;
    },
    async register(l, n) {
      try {
        await l(this, n, (o) => {
          o && J(o);
        });
      } catch (o) {
        J(o);
      }
    },
    async listen(l) {
      return await this.ready(), new Promise((n, o) => {
        this[B].listen(l, (a) => {
          if (a)
            return o(a);
          n();
        });
      });
    },
    async ready() {
      if (this[I])
        return;
      const l = [];
      if (Array.isArray(e))
        for (const n of e)
          l.push(f[T](n.default ?? n, n.path));
      else
        for (const [n, o] of Object.entries(e))
          l.push(f[T](n, o));
      await Promise.all(l), this[I] = !0;
    }
  };
  return f[B] = K(f[L]), f;
}
$.prototype.body = null;
function ge(e, t, { parse: r }) {
  return new Promise((i, s) => {
    Y(e, {
      length: e.headers["content-length"],
      limit: "1mb",
      encoding: "utf8"
    }, (u, h) => {
      if (u)
        return s(u);
      if (h)
        if (r)
          e.body = r(h), e.body || this.log?.error({
            req: e,
            res: t,
            err: new Error(`Ajv parsing error: ${r.message} at ${r.position}`)
          });
        else
          try {
            e.body = JSON.parse(h);
          } catch {
            e.body = void 0;
          }
      this.log?.info?.({ req: e, res: t }), i(e);
    });
  });
}
function ze(e, t, r) {
  if (!r) {
    e.setHeader("Content-Type", "plain/text"), e.end("");
    return;
  }
  const i = t.serialize ? t.serialize(r) : JSON.stringify(r);
  e.writeHead(200, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(i)
  }), e.end(i);
}
function ke(e) {
  e.statusCode = 404, e.end("");
}
function Oe(e, t, r, i) {
  t.writeHead(500, {
    "Content-Type": "text/plain",
    "Content-Length": 0
  }), t.end(""), i.error?.({ err: r, req: e, res: t });
}
function J(e) {
  console.error(e), process.exit(1);
}
export {
  Te as default
};
