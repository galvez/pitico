import { IncomingMessage as K, createServer as te } from "node:http";
import ne from "jsontypedef";
import ie from "light-my-request";
import se from "raw-body";
import oe from "ajv/dist/jtd.js";
var ae = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function le(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var D = { exports: {} };
/*!
 * forwarded
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
var fe = ue;
function ue(e) {
  if (!e)
    throw new TypeError("argument req is required");
  var i = de(e.headers["x-forwarded-for"] || ""), n = ce(e), a = [n].concat(i);
  return a;
}
function ce(e) {
  return e.socket ? e.socket.remoteAddress : e.connection.remoteAddress;
}
function de(e) {
  for (var i = e.length, n = [], a = e.length, c = e.length - 1; c >= 0; c--)
    switch (e.charCodeAt(c)) {
      case 32:
        a === i && (a = i = c);
        break;
      case 44:
        a !== i && n.push(e.substring(a, i)), a = i = c;
        break;
      default:
        a = c;
        break;
    }
  return a !== i && n.push(e.substring(a, i)), n;
}
var F = { exports: {} };
F.exports;
(function(e) {
  (function() {
    var i, n, a, c, p, m, w, h, l;
    n = {}, h = this, e !== null && e.exports ? e.exports = n : h.ipaddr = n, w = function(r, t, o, s) {
      var u, f;
      if (r.length !== t.length)
        throw new Error("ipaddr: cannot match CIDR for objects with different lengths");
      for (u = 0; s > 0; ) {
        if (f = o - s, f < 0 && (f = 0), r[u] >> f !== t[u] >> f)
          return !1;
        s -= o, u += 1;
      }
      return !0;
    }, n.subnetMatch = function(r, t, o) {
      var s, u, f, d, v;
      o == null && (o = "unicast");
      for (f in t)
        for (d = t[f], d[0] && !(d[0] instanceof Array) && (d = [d]), s = 0, u = d.length; s < u; s++)
          if (v = d[s], r.kind() === v[0].kind() && r.match.apply(r, v))
            return f;
      return o;
    }, n.IPv4 = function() {
      function r(t) {
        var o, s, u;
        if (t.length !== 4)
          throw new Error("ipaddr: ipv4 octet count should be 4");
        for (o = 0, s = t.length; o < s; o++)
          if (u = t[o], !(0 <= u && u <= 255))
            throw new Error("ipaddr: ipv4 octet should fit in 8 bits");
        this.octets = t;
      }
      return r.prototype.kind = function() {
        return "ipv4";
      }, r.prototype.toString = function() {
        return this.octets.join(".");
      }, r.prototype.toNormalizedString = function() {
        return this.toString();
      }, r.prototype.toByteArray = function() {
        return this.octets.slice(0);
      }, r.prototype.match = function(t, o) {
        var s;
        if (o === void 0 && (s = t, t = s[0], o = s[1]), t.kind() !== "ipv4")
          throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");
        return w(this.octets, t.octets, 8, o);
      }, r.prototype.SpecialRanges = {
        unspecified: [[new r([0, 0, 0, 0]), 8]],
        broadcast: [[new r([255, 255, 255, 255]), 32]],
        multicast: [[new r([224, 0, 0, 0]), 4]],
        linkLocal: [[new r([169, 254, 0, 0]), 16]],
        loopback: [[new r([127, 0, 0, 0]), 8]],
        carrierGradeNat: [[new r([100, 64, 0, 0]), 10]],
        private: [[new r([10, 0, 0, 0]), 8], [new r([172, 16, 0, 0]), 12], [new r([192, 168, 0, 0]), 16]],
        reserved: [[new r([192, 0, 0, 0]), 24], [new r([192, 0, 2, 0]), 24], [new r([192, 88, 99, 0]), 24], [new r([198, 51, 100, 0]), 24], [new r([203, 0, 113, 0]), 24], [new r([240, 0, 0, 0]), 4]]
      }, r.prototype.range = function() {
        return n.subnetMatch(this, this.SpecialRanges);
      }, r.prototype.toIPv4MappedAddress = function() {
        return n.IPv6.parse("::ffff:" + this.toString());
      }, r.prototype.prefixLengthFromSubnetMask = function() {
        var t, o, s, u, f, d, v;
        for (v = {
          0: 8,
          128: 7,
          192: 6,
          224: 5,
          240: 4,
          248: 3,
          252: 2,
          254: 1,
          255: 0
        }, t = 0, f = !1, o = s = 3; s >= 0; o = s += -1)
          if (u = this.octets[o], u in v) {
            if (d = v[u], f && d !== 0)
              return null;
            d !== 8 && (f = !0), t += d;
          } else
            return null;
        return 32 - t;
      }, r;
    }(), a = "(0?\\d+|0x[a-f0-9]+)", c = {
      fourOctet: new RegExp("^" + a + "\\." + a + "\\." + a + "\\." + a + "$", "i"),
      longValue: new RegExp("^" + a + "$", "i")
    }, n.IPv4.parser = function(r) {
      var t, o, s, u, f;
      if (o = function(d) {
        return d[0] === "0" && d[1] !== "x" ? parseInt(d, 8) : parseInt(d);
      }, t = r.match(c.fourOctet))
        return function() {
          var d, v, y, b;
          for (y = t.slice(1, 6), b = [], d = 0, v = y.length; d < v; d++)
            s = y[d], b.push(o(s));
          return b;
        }();
      if (t = r.match(c.longValue)) {
        if (f = o(t[1]), f > 4294967295 || f < 0)
          throw new Error("ipaddr: address outside defined range");
        return function() {
          var d, v;
          for (v = [], u = d = 0; d <= 24; u = d += 8)
            v.push(f >> u & 255);
          return v;
        }().reverse();
      } else
        return null;
    }, n.IPv6 = function() {
      function r(t, o) {
        var s, u, f, d, v, y;
        if (t.length === 16)
          for (this.parts = [], s = u = 0; u <= 14; s = u += 2)
            this.parts.push(t[s] << 8 | t[s + 1]);
        else if (t.length === 8)
          this.parts = t;
        else
          throw new Error("ipaddr: ipv6 part count should be 8 or 16");
        for (y = this.parts, f = 0, d = y.length; f < d; f++)
          if (v = y[f], !(0 <= v && v <= 65535))
            throw new Error("ipaddr: ipv6 part should fit in 16 bits");
        o && (this.zoneId = o);
      }
      return r.prototype.kind = function() {
        return "ipv6";
      }, r.prototype.toString = function() {
        return this.toNormalizedString().replace(/((^|:)(0(:|$))+)/, "::");
      }, r.prototype.toRFC5952String = function() {
        var t, o, s, u, f;
        for (u = /((^|:)(0(:|$)){2,})/g, f = this.toNormalizedString(), t = 0, o = -1; s = u.exec(f); )
          s[0].length > o && (t = s.index, o = s[0].length);
        return o < 0 ? f : f.substring(0, t) + "::" + f.substring(t + o);
      }, r.prototype.toByteArray = function() {
        var t, o, s, u, f;
        for (t = [], f = this.parts, o = 0, s = f.length; o < s; o++)
          u = f[o], t.push(u >> 8), t.push(u & 255);
        return t;
      }, r.prototype.toNormalizedString = function() {
        var t, o, s;
        return t = function() {
          var u, f, d, v;
          for (d = this.parts, v = [], u = 0, f = d.length; u < f; u++)
            o = d[u], v.push(o.toString(16));
          return v;
        }.call(this).join(":"), s = "", this.zoneId && (s = "%" + this.zoneId), t + s;
      }, r.prototype.toFixedLengthString = function() {
        var t, o, s;
        return t = function() {
          var u, f, d, v;
          for (d = this.parts, v = [], u = 0, f = d.length; u < f; u++)
            o = d[u], v.push(o.toString(16).padStart(4, "0"));
          return v;
        }.call(this).join(":"), s = "", this.zoneId && (s = "%" + this.zoneId), t + s;
      }, r.prototype.match = function(t, o) {
        var s;
        if (o === void 0 && (s = t, t = s[0], o = s[1]), t.kind() !== "ipv6")
          throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");
        return w(this.parts, t.parts, 16, o);
      }, r.prototype.SpecialRanges = {
        unspecified: [new r([0, 0, 0, 0, 0, 0, 0, 0]), 128],
        linkLocal: [new r([65152, 0, 0, 0, 0, 0, 0, 0]), 10],
        multicast: [new r([65280, 0, 0, 0, 0, 0, 0, 0]), 8],
        loopback: [new r([0, 0, 0, 0, 0, 0, 0, 1]), 128],
        uniqueLocal: [new r([64512, 0, 0, 0, 0, 0, 0, 0]), 7],
        ipv4Mapped: [new r([0, 0, 0, 0, 0, 65535, 0, 0]), 96],
        rfc6145: [new r([0, 0, 0, 0, 65535, 0, 0, 0]), 96],
        rfc6052: [new r([100, 65435, 0, 0, 0, 0, 0, 0]), 96],
        "6to4": [new r([8194, 0, 0, 0, 0, 0, 0, 0]), 16],
        teredo: [new r([8193, 0, 0, 0, 0, 0, 0, 0]), 32],
        reserved: [[new r([8193, 3512, 0, 0, 0, 0, 0, 0]), 32]]
      }, r.prototype.range = function() {
        return n.subnetMatch(this, this.SpecialRanges);
      }, r.prototype.isIPv4MappedAddress = function() {
        return this.range() === "ipv4Mapped";
      }, r.prototype.toIPv4Address = function() {
        var t, o, s;
        if (!this.isIPv4MappedAddress())
          throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");
        return s = this.parts.slice(-2), t = s[0], o = s[1], new n.IPv4([t >> 8, t & 255, o >> 8, o & 255]);
      }, r.prototype.prefixLengthFromSubnetMask = function() {
        var t, o, s, u, f, d, v;
        for (v = {
          0: 16,
          32768: 15,
          49152: 14,
          57344: 13,
          61440: 12,
          63488: 11,
          64512: 10,
          65024: 9,
          65280: 8,
          65408: 7,
          65472: 6,
          65504: 5,
          65520: 4,
          65528: 3,
          65532: 2,
          65534: 1,
          65535: 0
        }, t = 0, f = !1, o = s = 7; s >= 0; o = s += -1)
          if (u = this.parts[o], u in v) {
            if (d = v[u], f && d !== 0)
              return null;
            d !== 16 && (f = !0), t += d;
          } else
            return null;
        return 128 - t;
      }, r;
    }(), p = "(?:[0-9a-f]+::?)+", l = "%[0-9a-z]{1,}", m = {
      zoneIndex: new RegExp(l, "i"),
      native: new RegExp("^(::)?(" + p + ")?([0-9a-f]+)?(::)?(" + l + ")?$", "i"),
      transitional: new RegExp("^((?:" + p + ")|(?:::)(?:" + p + ")?)" + (a + "\\." + a + "\\." + a + "\\." + a) + ("(" + l + ")?$"), "i")
    }, i = function(r, t) {
      var o, s, u, f, d, v;
      if (r.indexOf("::") !== r.lastIndexOf("::"))
        return null;
      for (v = (r.match(m.zoneIndex) || [])[0], v && (v = v.substring(1), r = r.replace(/%.+$/, "")), o = 0, s = -1; (s = r.indexOf(":", s + 1)) >= 0; )
        o++;
      if (r.substr(0, 2) === "::" && o--, r.substr(-2, 2) === "::" && o--, o > t)
        return null;
      for (d = t - o, f = ":"; d--; )
        f += "0:";
      return r = r.replace("::", f), r[0] === ":" && (r = r.slice(1)), r[r.length - 1] === ":" && (r = r.slice(0, -1)), t = function() {
        var y, b, P, I;
        for (P = r.split(":"), I = [], y = 0, b = P.length; y < b; y++)
          u = P[y], I.push(parseInt(u, 16));
        return I;
      }(), {
        parts: t,
        zoneId: v
      };
    }, n.IPv6.parser = function(r) {
      var t, o, s, u, f, d, v;
      if (m.native.test(r))
        return i(r, 8);
      if ((u = r.match(m.transitional)) && (v = u[6] || "", t = i(u[1].slice(0, -1) + v, 6), t.parts)) {
        for (d = [parseInt(u[2]), parseInt(u[3]), parseInt(u[4]), parseInt(u[5])], o = 0, s = d.length; o < s; o++)
          if (f = d[o], !(0 <= f && f <= 255))
            return null;
        return t.parts.push(d[0] << 8 | d[1]), t.parts.push(d[2] << 8 | d[3]), {
          parts: t.parts,
          zoneId: t.zoneId
        };
      }
      return null;
    }, n.IPv4.isIPv4 = n.IPv6.isIPv6 = function(r) {
      return this.parser(r) !== null;
    }, n.IPv4.isValid = function(r) {
      try {
        return new this(this.parser(r)), !0;
      } catch {
        return !1;
      }
    }, n.IPv4.isValidFourPartDecimal = function(r) {
      return !!(n.IPv4.isValid(r) && r.match(/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){3}$/));
    }, n.IPv6.isValid = function(r) {
      var t;
      if (typeof r == "string" && r.indexOf(":") === -1)
        return !1;
      try {
        return t = this.parser(r), new this(t.parts, t.zoneId), !0;
      } catch {
        return !1;
      }
    }, n.IPv4.parse = function(r) {
      var t;
      if (t = this.parser(r), t === null)
        throw new Error("ipaddr: string is not formatted like ip address");
      return new this(t);
    }, n.IPv6.parse = function(r) {
      var t;
      if (t = this.parser(r), t.parts === null)
        throw new Error("ipaddr: string is not formatted like ip address");
      return new this(t.parts, t.zoneId);
    }, n.IPv4.parseCIDR = function(r) {
      var t, o, s;
      if ((o = r.match(/^(.+)\/(\d+)$/)) && (t = parseInt(o[2]), t >= 0 && t <= 32))
        return s = [this.parse(o[1]), t], Object.defineProperty(s, "toString", {
          value: function() {
            return this.join("/");
          }
        }), s;
      throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range");
    }, n.IPv4.subnetMaskFromPrefixLength = function(r) {
      var t, o, s;
      if (r = parseInt(r), r < 0 || r > 32)
        throw new Error("ipaddr: invalid IPv4 prefix length");
      for (s = [0, 0, 0, 0], o = 0, t = Math.floor(r / 8); o < t; )
        s[o] = 255, o++;
      return t < 4 && (s[t] = Math.pow(2, r % 8) - 1 << 8 - r % 8), new this(s);
    }, n.IPv4.broadcastAddressFromCIDR = function(r) {
      var t, o, s, u, f;
      try {
        for (t = this.parseCIDR(r), s = t[0].toByteArray(), f = this.subnetMaskFromPrefixLength(t[1]).toByteArray(), u = [], o = 0; o < 4; )
          u.push(parseInt(s[o], 10) | parseInt(f[o], 10) ^ 255), o++;
        return new this(u);
      } catch {
        throw new Error("ipaddr: the address does not have IPv4 CIDR format");
      }
    }, n.IPv4.networkAddressFromCIDR = function(r) {
      var t, o, s, u, f;
      try {
        for (t = this.parseCIDR(r), s = t[0].toByteArray(), f = this.subnetMaskFromPrefixLength(t[1]).toByteArray(), u = [], o = 0; o < 4; )
          u.push(parseInt(s[o], 10) & parseInt(f[o], 10)), o++;
        return new this(u);
      } catch {
        throw new Error("ipaddr: the address does not have IPv4 CIDR format");
      }
    }, n.IPv6.parseCIDR = function(r) {
      var t, o, s;
      if ((o = r.match(/^(.+)\/(\d+)$/)) && (t = parseInt(o[2]), t >= 0 && t <= 128))
        return s = [this.parse(o[1]), t], Object.defineProperty(s, "toString", {
          value: function() {
            return this.join("/");
          }
        }), s;
      throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range");
    }, n.isValid = function(r) {
      return n.IPv6.isValid(r) || n.IPv4.isValid(r);
    }, n.parse = function(r) {
      if (n.IPv6.isValid(r))
        return n.IPv6.parse(r);
      if (n.IPv4.isValid(r))
        return n.IPv4.parse(r);
      throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format");
    }, n.parseCIDR = function(r) {
      try {
        return n.IPv6.parseCIDR(r);
      } catch {
        try {
          return n.IPv4.parseCIDR(r);
        } catch {
          throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format");
        }
      }
    }, n.fromByteArray = function(r) {
      var t;
      if (t = r.length, t === 4)
        return new n.IPv4(r);
      if (t === 16)
        return new n.IPv6(r);
      throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address");
    }, n.process = function(r) {
      var t;
      return t = this.parse(r), t.kind() === "ipv6" && t.isIPv4MappedAddress() ? t.toIPv4Address() : t;
    };
  }).call(ae);
})(F);
var pe = F.exports;
/*!
 * proxy-addr
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 */
D.exports = ge;
D.exports.all = Y;
D.exports.compile = Z;
var he = fe, Q = pe, ve = /^[0-9]+$/, S = Q.isValid, A = Q.parse, $ = {
  linklocal: ["169.254.0.0/16", "fe80::/10"],
  loopback: ["127.0.0.1/8", "::1/128"],
  uniquelocal: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "fc00::/7"]
};
function Y(e, i) {
  var n = he(e);
  if (!i)
    return n;
  typeof i != "function" && (i = Z(i));
  for (var a = 0; a < n.length - 1; a++)
    i(n[a], a) || (n.length = a + 1);
  return n;
}
function Z(e) {
  if (!e)
    throw new TypeError("argument is required");
  var i;
  if (typeof e == "string")
    i = [e];
  else if (Array.isArray(e))
    i = e.slice();
  else
    throw new TypeError("unsupported trust argument");
  for (var n = 0; n < i.length; n++)
    e = i[n], Object.prototype.hasOwnProperty.call($, e) && (e = $[e], i.splice.apply(i, [n, 1].concat(e)), n += e.length - 1);
  return me(we(i));
}
function we(e) {
  for (var i = new Array(e.length), n = 0; n < e.length; n++)
    i[n] = ye(e[n]);
  return i;
}
function me(e) {
  var i = e.length;
  return i === 0 ? Ie : i === 1 ? Pe(e[0]) : ke(e);
}
function ye(e) {
  var i = e.lastIndexOf("/"), n = i !== -1 ? e.substring(0, i) : e;
  if (!S(n))
    throw new TypeError("invalid IP address: " + n);
  var a = A(n);
  i === -1 && a.kind() === "ipv6" && a.isIPv4MappedAddress() && (a = a.toIPv4Address());
  var c = a.kind() === "ipv6" ? 128 : 32, p = i !== -1 ? e.substring(i + 1, e.length) : null;
  if (p === null ? p = c : ve.test(p) ? p = parseInt(p, 10) : a.kind() === "ipv4" && S(p) ? p = be(p) : p = null, p <= 0 || p > c)
    throw new TypeError("invalid range on address: " + e);
  return [a, p];
}
function be(e) {
  var i = A(e), n = i.kind();
  return n === "ipv4" ? i.prefixLengthFromSubnetMask() : null;
}
function ge(e, i) {
  if (!e)
    throw new TypeError("req argument is required");
  if (!i)
    throw new TypeError("trust argument is required");
  var n = Y(e, i), a = n[n.length - 1];
  return a;
}
function Ie() {
  return !1;
}
function ke(e) {
  return function(n) {
    if (!S(n))
      return !1;
    for (var a = A(n), c, p = a.kind(), m = 0; m < e.length; m++) {
      var w = e[m], h = w[0], l = h.kind(), r = w[1], t = a;
      if (p !== l) {
        if (l === "ipv4" && !a.isIPv4MappedAddress())
          continue;
        c || (c = l === "ipv4" ? a.toIPv4Address() : a.toIPv4MappedAddress()), t = c;
      }
      if (t.match(h, r))
        return !0;
    }
    return !1;
  };
}
function Pe(e) {
  var i = e[0], n = i.kind(), a = n === "ipv4", c = e[1];
  return function(m) {
    if (!S(m))
      return !1;
    var w = A(m), h = w.kind();
    if (h !== n) {
      if (a && !w.isIPv4MappedAddress())
        return !1;
      w = a ? w.toIPv4Address() : w.toIPv4MappedAddress();
    }
    return w.match(i, c);
  };
}
var j = { exports: {} };
function xe(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return '"[Circular]"';
  }
}
var ze = Ee;
function Ee(e, i, n) {
  var a = n && n.stringify || xe, c = 1;
  if (typeof e == "object" && e !== null) {
    var p = i.length + c;
    if (p === 1)
      return e;
    var m = new Array(p);
    m[0] = a(e);
    for (var w = 1; w < p; w++)
      m[w] = a(i[w]);
    return m.join(" ");
  }
  if (typeof e != "string")
    return e;
  var h = i.length;
  if (h === 0)
    return e;
  for (var l = "", r = 1 - c, t = -1, o = e && e.length || 0, s = 0; s < o; ) {
    if (e.charCodeAt(s) === 37 && s + 1 < o) {
      switch (t = t > -1 ? t : 0, e.charCodeAt(s + 1)) {
        case 100:
        case 102:
          if (r >= h || i[r] == null)
            break;
          t < s && (l += e.slice(t, s)), l += Number(i[r]), t = s + 2, s++;
          break;
        case 105:
          if (r >= h || i[r] == null)
            break;
          t < s && (l += e.slice(t, s)), l += Math.floor(Number(i[r])), t = s + 2, s++;
          break;
        case 79:
        case 111:
        case 106:
          if (r >= h || i[r] === void 0)
            break;
          t < s && (l += e.slice(t, s));
          var u = typeof i[r];
          if (u === "string") {
            l += "'" + i[r] + "'", t = s + 2, s++;
            break;
          }
          if (u === "function") {
            l += i[r].name || "<anonymous>", t = s + 2, s++;
            break;
          }
          l += a(i[r]), t = s + 2, s++;
          break;
        case 115:
          if (r >= h)
            break;
          t < s && (l += e.slice(t, s)), l += String(i[r]), t = s + 2, s++;
          break;
        case 37:
          t < s && (l += e.slice(t, s)), l += "%", t = s + 2, s++, r--;
          break;
      }
      ++r;
    }
    ++s;
  }
  return t === -1 ? e : (t < o && (l += e.slice(t)), l);
}
const B = ze;
j.exports = g;
const x = $e().console || {}, Se = {
  mapHttpRequest: E,
  mapHttpResponse: E,
  wrapRequestSerializer: C,
  wrapResponseSerializer: C,
  wrapErrorSerializer: C,
  req: E,
  res: E,
  err: H,
  errWithCause: H
};
function O(e, i) {
  return e === "silent" ? 1 / 0 : i.levels.values[e];
}
const V = Symbol("pino.logFuncs"), M = Symbol("pino.hierarchy"), Oe = {
  error: "log",
  fatal: "error",
  warn: "error",
  info: "log",
  debug: "log",
  trace: "log"
};
function G(e, i) {
  const n = {
    logger: i,
    parent: e[M]
  };
  i[M] = n;
}
function Ae(e, i, n) {
  const a = {};
  i.forEach((c) => {
    a[c] = n[c] ? n[c] : x[c] || x[Oe[c] || "log"] || z;
  }), e[V] = a;
}
function je(e, i) {
  return Array.isArray(e) ? e.filter(function(a) {
    return a !== "!stdSerializers.err";
  }) : e === !0 ? Object.keys(i) : !1;
}
function g(e) {
  e = e || {}, e.browser = e.browser || {};
  const i = e.browser.transmit;
  if (i && typeof i.send != "function")
    throw Error("pino: transmit option must have a send function");
  const n = e.browser.write || x;
  e.browser.write && (e.browser.asObject = !0);
  const a = e.serializers || {}, c = je(e.browser.serialize, a);
  let p = e.browser.serialize;
  Array.isArray(e.browser.serialize) && e.browser.serialize.indexOf("!stdSerializers.err") > -1 && (p = !1);
  const m = Object.keys(e.customLevels || {}), w = ["error", "fatal", "warn", "info", "debug", "trace"].concat(m);
  typeof n == "function" && w.forEach(function(f) {
    n[f] = n;
  }), (e.enabled === !1 || e.browser.disabled) && (e.level = "silent");
  const h = e.level || "info", l = Object.create(n);
  l.log || (l.log = z), Ae(l, w, n), G({}, l), Object.defineProperty(l, "levelVal", {
    get: t
  }), Object.defineProperty(l, "level", {
    get: o,
    set: s
  });
  const r = {
    transmit: i,
    serialize: c,
    asObject: e.browser.asObject,
    levels: w,
    timestamp: Fe(e)
  };
  l.levels = Re(e), l.level = h, l.setMaxListeners = l.getMaxListeners = l.emit = l.addListener = l.on = l.prependListener = l.once = l.prependOnceListener = l.removeListener = l.removeAllListeners = l.listeners = l.listenerCount = l.eventNames = l.write = l.flush = z, l.serializers = a, l._serialize = c, l._stdErrSerialize = p, l.child = u, i && (l._logEvent = T());
  function t() {
    return O(this.level, this);
  }
  function o() {
    return this._level;
  }
  function s(f) {
    if (f !== "silent" && !this.levels.values[f])
      throw Error("unknown level " + f);
    this._level = f, k(this, r, l, "error"), k(this, r, l, "fatal"), k(this, r, l, "warn"), k(this, r, l, "info"), k(this, r, l, "debug"), k(this, r, l, "trace"), m.forEach((d) => {
      k(this, r, l, d);
    });
  }
  function u(f, d) {
    if (!f)
      throw new Error("missing bindings for child Pino");
    d = d || {}, c && f.serializers && (d.serializers = f.serializers);
    const v = d.serializers;
    if (c && v) {
      var y = Object.assign({}, a, v), b = e.browser.serialize === !0 ? Object.keys(y) : c;
      delete f.serializers, R([f], b, y, this._stdErrSerialize);
    }
    function P(N) {
      this._childLevel = (N._childLevel | 0) + 1, this.bindings = f, y && (this.serializers = y, this._serialize = b), i && (this._logEvent = T(
        [].concat(N._logEvent.bindings, f)
      ));
    }
    P.prototype = this;
    const I = new P(this);
    return G(this, I), I.level = this.level, I;
  }
  return l;
}
function Re(e) {
  const i = e.customLevels || {}, n = Object.assign({}, g.levels.values, i), a = Object.assign({}, g.levels.labels, Ce(i));
  return {
    values: n,
    labels: a
  };
}
function Ce(e) {
  const i = {};
  return Object.keys(e).forEach(function(n) {
    i[e[n]] = n;
  }), i;
}
g.levels = {
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
g.stdSerializers = Se;
g.stdTimeFunctions = Object.assign({}, { nullTime: q, epochTime: ee, unixTime: Ve, isoTime: Ne });
function Le(e) {
  const i = [];
  e.bindings && i.push(e.bindings);
  let n = e[M];
  for (; n.parent; )
    n = n.parent, n.logger.bindings && i.push(n.logger.bindings);
  return i.reverse();
}
function k(e, i, n, a) {
  if (e[a] = O(e.level, n) > O(a, n) ? z : n[V][a], !i.transmit && e[a] === z)
    return;
  e[a] = Me(e, i, n, a);
  const c = Le(e);
  c.length !== 0 && (e[a] = _e(c, e[a]));
}
function _e(e, i) {
  return function() {
    return i.apply(this, [...e, ...arguments]);
  };
}
function Me(e, i, n, a) {
  return function(c) {
    return function() {
      const m = i.timestamp(), w = new Array(arguments.length), h = Object.getPrototypeOf && Object.getPrototypeOf(this) === x ? x : this;
      for (var l = 0; l < w.length; l++)
        w[l] = arguments[l];
      if (i.serialize && !i.asObject && R(w, this._serialize, this.serializers, this._stdErrSerialize), i.asObject ? c.call(h, Te(this, a, w, m)) : c.apply(h, w), i.transmit) {
        const r = i.transmit.level || e._level, t = n.levels.values[r], o = n.levels.values[a];
        if (o < t)
          return;
        De(this, {
          ts: m,
          methodLevel: a,
          methodValue: o,
          transmitLevel: r,
          transmitValue: n.levels.values[i.transmit.level || e._level],
          send: i.transmit.send,
          val: O(e._level, n)
        }, w);
      }
    };
  }(e[V][a]);
}
function Te(e, i, n, a) {
  e._serialize && R(n, e._serialize, e.serializers, e._stdErrSerialize);
  const c = n.slice();
  let p = c[0];
  const m = {};
  a && (m.time = a), m.level = e.levels.values[i];
  let w = (e._childLevel | 0) + 1;
  if (w < 1 && (w = 1), p !== null && typeof p == "object") {
    for (; w-- && typeof c[0] == "object"; )
      Object.assign(m, c.shift());
    p = c.length ? B(c.shift(), c) : void 0;
  } else
    typeof p == "string" && (p = B(c.shift(), c));
  return p !== void 0 && (m.msg = p), m;
}
function R(e, i, n, a) {
  for (const c in e)
    if (a && e[c] instanceof Error)
      e[c] = g.stdSerializers.err(e[c]);
    else if (typeof e[c] == "object" && !Array.isArray(e[c]))
      for (const p in e[c])
        i && i.indexOf(p) > -1 && p in n && (e[c][p] = n[p](e[c][p]));
}
function De(e, i, n) {
  const a = i.send, c = i.ts, p = i.methodLevel, m = i.methodValue, w = i.val, h = e._logEvent.bindings;
  R(
    n,
    e._serialize || Object.keys(e.serializers),
    e.serializers,
    e._stdErrSerialize === void 0 ? !0 : e._stdErrSerialize
  ), e._logEvent.ts = c, e._logEvent.messages = n.filter(function(l) {
    return h.indexOf(l) === -1;
  }), e._logEvent.level.label = p, e._logEvent.level.value = m, a(p, e._logEvent, w), e._logEvent = T(h);
}
function T(e) {
  return {
    ts: 0,
    messages: [],
    bindings: e || [],
    level: { label: "", value: 0 }
  };
}
function H(e) {
  const i = {
    type: e.constructor.name,
    msg: e.message,
    stack: e.stack
  };
  for (const n in e)
    i[n] === void 0 && (i[n] = e[n]);
  return i;
}
function Fe(e) {
  return typeof e.timestamp == "function" ? e.timestamp : e.timestamp === !1 ? q : ee;
}
function E() {
  return {};
}
function C(e) {
  return e;
}
function z() {
}
function q() {
  return !1;
}
function ee() {
  return Date.now();
}
function Ve() {
  return Math.round(Date.now() / 1e3);
}
function Ne() {
  return new Date(Date.now()).toISOString();
}
function $e() {
  function e(i) {
    return typeof i < "u" && i;
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
j.exports.default = g;
j.exports.pino = g;
var Be = j.exports;
const re = /* @__PURE__ */ le(Be), Ge = {
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
  err: re.stdSerializers.err,
  res(e) {
    return {
      statusCode: e.statusCode
    };
  }
}, J = Symbol("kRoutes"), L = Symbol("kDispatcher"), W = Symbol("kServer"), _ = Symbol("kRoute"), U = Symbol("kReady");
function qe(e, i = {}) {
  const n = new oe(), a = /* @__PURE__ */ new Map(), c = () => {
  };
  let p = i.logger;
  !p && p !== !1 && (p = re({ serializers: Ge }));
  const m = { log: p }, w = {
    [J]: a,
    [L](h, l) {
      const r = a.get(h.url), t = r?.handle;
      t ? He.call(m, h, l, r).then((o) => t(o, l)).then((o) => Je(l, r, o)).catch((o) => Ue(h, l, o, p)) : We(l);
    },
    async [_](h, l) {
      const {
        path: r,
        handle: t,
        parse: o,
        serialize: s
      } = typeof h == "function" ? await h(this, ne) : h, u = o && n.compileParser(o), f = s && n.compileSerializer(s), d = l ?? r;
      this[J].set(d, { parse: u, serialize: f, handle: t });
    },
    addHook: c,
    inject(h) {
      return new Promise((l, r) => {
        ie(this[L], h, (t, o) => {
          if (t)
            return r(t);
          l(o);
        });
      });
    },
    decorate(h, l) {
      this[h] = l;
    },
    decorateRequest(h, l) {
      K.prototype[h] = l;
    },
    async register(h, l) {
      try {
        await h(this, l, (r) => {
          r && X(r);
        });
      } catch (r) {
        X(r);
      }
    },
    async listen(h) {
      return await this.ready(), new Promise((l, r) => {
        this[W].listen(h, (t) => {
          if (t)
            return r(t);
          l();
        });
      });
    },
    async ready() {
      if (this[U])
        return;
      const h = [];
      if (Array.isArray(e))
        for (const l of e)
          h.push(w[_](l.default ?? l, l.path));
      else
        for (const [l, r] of Object.entries(e))
          h.push(w[_](l, r));
      await Promise.all(h), this[U] = !0;
    }
  };
  return w[W] = te(w[L]), w;
}
K.prototype.body = null;
function He(e, i, { parse: n }) {
  return new Promise((a, c) => {
    se(e, {
      length: e.headers["content-length"],
      limit: "1mb",
      encoding: "utf8"
    }, (p, m) => {
      if (p)
        return c(p);
      m && (e.body = (n ?? JSON.parse)(m)), this.log.info({ req: e, res: i }), a(e);
    });
  });
}
function Je(e, i, n) {
  if (!n) {
    e.setHeader("Content-Type", "plain/text"), e.end("");
    return;
  }
  const a = i.serialize ? i.serialize(n) : JSON.stringify(n);
  e.writeHead(200, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(a)
  }), e.end(a);
}
function We(e) {
  e.statusCode = 404, e.end("");
}
function Ue(e, i, n, a) {
  i.writeHead(500, {
    "Content-Type": "text/plain",
    "Content-Length": 0
  }), i.end(""), a.error({ err: n, req: e, res: i });
}
function X(e) {
  console.error(e), process.exit(1);
}
export {
  qe as default
};
