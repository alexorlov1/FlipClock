// node_modules/.pnpm/file+/node_modules/flipclock/dist/flipclock.es.js
var he = Object.defineProperty;
var de = (e, t, r) => t in e ? he(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r;
var w = (e, t, r) => (de(e, typeof t != "symbol" ? t + "" : t, r), r);
var ge = " ";
function ie() {
  function e(a) {
    function u(s) {
      return s === void 0 ? "" : typeof s != "string" ? u(s.toString()) : s.length === 1 ? s : Array.from(s);
    }
    function f(s) {
      if (Array.isArray(s)) {
        for (let i = 0; i < s.length; i++)
          s[i] = f(s[i]);
        return s;
      }
      return u(s);
    }
    return Array.from(f(a));
  }
  function t(a) {
    function u(f) {
      const s = [];
      let i = false, c = true;
      for (let n = 0; n < f.length; n++) {
        if (Array.isArray(f[n])) {
          s.push(u(f[n])), i = c = true;
          continue;
        }
        c && (s.push(""), c = false), s[s.length - 1] += f[n];
      }
      return i ? s : s[0];
    }
    return u(a);
  }
  function r(a) {
    function u(f) {
      if (!Array.isArray(f))
        return false;
      for (const s in f)
        if (!(typeof f[s] == "string" && f[s].length === 1)) {
          if (Array.isArray(f[s])) {
            if (!f[s].length)
              continue;
          } else
            return false;
          if (!u(f[s]))
            return false;
        }
      return true;
    }
    return u(a);
  }
  return {
    digitize: e,
    isDigitized: r,
    undigitize: t
  };
}
function me(e = 0, t) {
  return Array.from(Array(t).keys()).map((r) => r + e);
}
function q(e, t) {
  return me(
    e.charCodeAt(0),
    t.charCodeAt(0) + 1 - e.charCodeAt(0)
  ).map((a) => String.fromCharCode(a));
}
function ye(e) {
  const t = [];
  for (; e.length; ) {
    const r = Math.floor(
      Math.random() * e.length
    );
    t.push(...e.splice(r, 1));
  }
  return t;
}
function ve() {
  return [
    ...q("a", "z"),
    ...q("A", "Z"),
    ...q("0", "9"),
    ":",
    "-",
    ".",
    ",",
    "!",
    "?"
  ];
}
function Ae(e = {}) {
  const t = e.blacklist || [], r = e.whitelist || [], a = e.emptyChar || ge, u = typeof e.shuffle == "function" ? e.shuffle : e.shuffle ? ye : void 0;
  function f() {
    const l = (e == null ? void 0 : e.charset) || ve;
    return u ? u(l()) : l();
  }
  const s = f();
  function i(l) {
    const h = l.charCodeAt(0), b = s.map((D) => D.charCodeAt(0));
    return String.fromCharCode(
      b.reduce((D, v) => Math.abs(v - h) < Math.abs(D - h) ? v : D)
    );
  }
  function c(l, h = 1) {
    let b = [a, ...s, a, ...s];
    h < 0 && (b = b.reverse());
    let D = 1;
    l === void 0 ? l = a : b.includes(l) || (l = a, D = 0);
    const v = b.indexOf(l);
    return b.slice(
      v + D,
      b.indexOf(l, v + 1) + D
    ).splice(0, Math.abs(h));
  }
  function n(l, h, b = 1) {
    if (h === void 0 && l === a)
      return;
    if (typeof h == "string" && !s.includes(h))
      return h;
    if (l && (A(l) || h === l))
      return l;
    if (l && d(l))
      return i(l);
    const D = c(l, b);
    if (typeof h == "string" && D.includes(h))
      return h;
    if (!(h === void 0 && l && s.indexOf(D[b - 1]) < s.indexOf(l)))
      return D[b - 1];
  }
  function o(l, h, b = 1) {
    if (h === void 0 && l === a)
      return;
    if (typeof h == "string" && !s.includes(h))
      return h;
    if (l && (A(l) || h === l))
      return l;
    if (l && d(l))
      return i(l);
    const D = c(l, -b);
    if (typeof h == "string" && D.includes(h))
      return h;
    if (!(h === void 0 && l && s.indexOf(D[b - 1]) > s.indexOf(l)))
      return D[b - 1];
  }
  function d(l) {
    return t.includes(l);
  }
  function A(l) {
    return r.includes(l);
  }
  return {
    charset: s,
    chunk: c,
    emptyChar: a,
    isBlacklisted: d,
    isWhitelisted: A,
    next: n,
    prev: o
  };
}
function B(e) {
  const t = new Map(e);
  function r(u, f) {
    if (typeof u == "string" && f)
      t.set(u, f);
    else if (typeof u == "object")
      for (const s of Object.entries(u))
        t.set(s[0], s[1]);
  }
  function a(u) {
    if (Array.isArray(u))
      for (const f of u)
        t.delete(f);
    else
      t.delete(u);
  }
  return {
    map: t,
    define: r,
    unset: a
  };
}
function ht(e = {}) {
  const { map: t, define: r, unset: a } = B(Object.entries(e));
  function u(f) {
    const s = t.get(f);
    return typeof s == "function" ? s(f) : s === void 0 ? f : s;
  }
  return {
    map: t,
    define: r,
    translate: u,
    unset: a
  };
}
function we(e, t) {
  function r() {
    this.constructor = e;
  }
  r.prototype = t.prototype, e.prototype = new r();
}
function p(e, t, r, a) {
  var u = Error.call(this, e);
  return Object.setPrototypeOf && Object.setPrototypeOf(u, p.prototype), u.expected = t, u.found = r, u.location = a, u.name = "SyntaxError", u;
}
we(p, Error);
function H(e, t, r) {
  return r = r || " ", e.length > t ? e : (t -= e.length, r += r.repeat(t), e + r.slice(0, t));
}
p.prototype.format = function(e) {
  var t = "Error: " + this.message;
  if (this.location) {
    var r = null, a;
    for (a = 0; a < e.length; a++)
      if (e[a].source === this.location.source) {
        r = e[a].text.split(/\r\n|\n|\r/g);
        break;
      }
    var u = this.location.start, f = this.location.source && typeof this.location.source.offset == "function" ? this.location.source.offset(u) : u, s = this.location.source + ":" + f.line + ":" + f.column;
    if (r) {
      var i = this.location.end, c = H("", f.line.toString().length, " "), n = r[u.line - 1], o = u.line === i.line ? i.column : n.length + 1, d = o - u.column || 1;
      t += `
 --> ` + s + `
` + c + ` |
` + f.line + " | " + n + `
` + c + " | " + H("", u.column - 1, " ") + H("", d, "^");
    } else
      t += `
 at ` + s;
  }
  return t;
};
p.buildMessage = function(e, t) {
  var r = {
    literal: function(n) {
      return '"' + u(n.text) + '"';
    },
    class: function(n) {
      var o = n.parts.map(function(d) {
        return Array.isArray(d) ? f(d[0]) + "-" + f(d[1]) : f(d);
      });
      return "[" + (n.inverted ? "^" : "") + o.join("") + "]";
    },
    any: function() {
      return "any character";
    },
    end: function() {
      return "end of input";
    },
    other: function(n) {
      return n.description;
    }
  };
  function a(n) {
    return n.charCodeAt(0).toString(16).toUpperCase();
  }
  function u(n) {
    return n.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(o) {
      return "\\x0" + a(o);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(o) {
      return "\\x" + a(o);
    });
  }
  function f(n) {
    return n.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(o) {
      return "\\x0" + a(o);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(o) {
      return "\\x" + a(o);
    });
  }
  function s(n) {
    return r[n.type](n);
  }
  function i(n) {
    var o = n.map(s), d, A;
    if (o.sort(), o.length > 0) {
      for (d = 1, A = 1; d < o.length; d++)
        o[d - 1] !== o[d] && (o[A] = o[d], A++);
      o.length = A;
    }
    switch (o.length) {
      case 1:
        return o[0];
      case 2:
        return o[0] + " or " + o[1];
      default:
        return o.slice(0, -1).join(", ") + ", or " + o[o.length - 1];
    }
  }
  function c(n) {
    return n ? '"' + u(n) + '"' : "end of input";
  }
  return "Expected " + i(e) + " but " + c(t) + " found.";
};
function be(e, t) {
  t = t !== void 0 ? t : {};
  var r = {}, a = t.grammarSource, u = { start: Z }, f = Z, s = "[", i = "]", c = /^[[\]]/, n = K("[", false), o = K("]", false), d = ue(["[", "]"], false, false), A = fe(), l = function(g) {
    return g.length === 1 && typeof g[0] == "string" || g.length === 1 && Array.isArray(g[0]) ? g[0] : g;
  }, h = function(g) {
    return [g];
  }, b = function(g) {
    return g;
  }, D = function(g) {
    return g.flat(1).join("");
  }, v = 0, k = [{ line: 1, column: 1 }], C = 0, V = [], O = 0, L;
  if ("startRule" in t) {
    if (!(t.startRule in u))
      throw new Error(`Can't start parsing from rule "` + t.startRule + '".');
    f = u[t.startRule];
  }
  function K(g, m) {
    return { type: "literal", text: g, ignoreCase: m };
  }
  function ue(g, m, y) {
    return { type: "class", parts: g, inverted: m, ignoreCase: y };
  }
  function fe() {
    return { type: "any" };
  }
  function le() {
    return { type: "end" };
  }
  function Q(g) {
    var m = k[g], y;
    if (m)
      return m;
    for (y = g - 1; !k[y]; )
      y--;
    for (m = k[y], m = {
      line: m.line,
      column: m.column
    }; y < g; )
      e.charCodeAt(y) === 10 ? (m.line++, m.column = 1) : m.column++, y++;
    return k[g] = m, m;
  }
  function X(g, m, y) {
    var F = Q(g), $ = Q(m), x = {
      source: a,
      start: {
        offset: g,
        line: F.line,
        column: F.column
      },
      end: {
        offset: m,
        line: $.line,
        column: $.column
      }
    };
    return y && a && typeof a.offset == "function" && (x.start = a.offset(x.start), x.end = a.offset(x.end)), x;
  }
  function E(g) {
    v < C || (v > C && (C = v, V = []), V.push(g));
  }
  function oe(g, m, y) {
    return new p(
      p.buildMessage(g, m),
      g,
      m,
      y
    );
  }
  function Z() {
    var g, m;
    return g = v, m = R(), m !== r && (m = l(m)), g = m, g;
  }
  function R() {
    var g, m, y, F, $, x;
    for (g = v, m = [], y = Y(), y === r && (y = v, e.charCodeAt(v) === 91 ? (F = s, v++) : (F = r, O === 0 && E(n)), F !== r ? ($ = Y(), $ === r && ($ = R()), $ !== r ? (e.charCodeAt(v) === 93 ? (x = i, v++) : (x = r, O === 0 && E(o)), x !== r ? y = h($) : (v = y, y = r)) : (v = y, y = r)) : (v = y, y = r)); y !== r; )
      m.push(y), y = Y(), y === r && (y = v, e.charCodeAt(v) === 91 ? (F = s, v++) : (F = r, O === 0 && E(n)), F !== r ? ($ = Y(), $ === r && ($ = R()), $ !== r ? (e.charCodeAt(v) === 93 ? (x = i, v++) : (x = r, O === 0 && E(o)), x !== r ? y = h($) : (v = y, y = r)) : (v = y, y = r)) : (v = y, y = r));
    return m = b(m), g = m, g;
  }
  function Y() {
    var g, m, y;
    if (g = v, m = [], y = _(), y !== r)
      for (; y !== r; )
        m.push(y), y = _();
    else
      m = r;
    return m !== r && (m = D(m)), g = m, g;
  }
  function _() {
    var g, m, y;
    return g = v, m = v, O++, c.test(e.charAt(v)) ? (y = e.charAt(v), v++) : (y = r, O === 0 && E(d)), O--, y === r ? m = void 0 : (v = m, m = r), m !== r ? (e.length > v ? (y = e.charAt(v), v++) : (y = r, O === 0 && E(A)), y !== r ? (m = [m, y], g = m) : (v = g, g = r)) : (v = g, g = r), g;
  }
  if (L = f(), L !== r && v === e.length)
    return L;
  throw L !== r && v < e.length && E(le()), oe(
    V,
    C < e.length ? e.charAt(C) : null,
    C < e.length ? X(C, C + 1) : X(C, C)
  );
}
var De = be;
var Me = 7;
var $e = 864e5;
var xe = 36e5;
var Se = 6e4;
var Ce = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
var Fe = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun"
];
var ke = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var Oe = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
function Ne(e) {
  var c;
  const { map: t, define: r, unset: a } = B(Object.entries(
    Object.assign({
      A: (n) => n.getHours() < 12 ? "AM" : "PM",
      a: (n) => n.getHours() < 12 ? "am" : "pm",
      Q: (n) => Math.ceil((n.getMonth() + 1) / 3).toString(),
      YYYY: (n) => n.getFullYear().toString(),
      YY: (n) => M(n.getFullYear().toString().slice(2), 2),
      MMMM: (n) => ke[n.getMonth()],
      MMM: (n) => Oe[n.getMonth()],
      MM: (n) => M(n.getMonth() + 1, 2),
      M: (n) => String(n.getMonth() + 1),
      DDDD: (n) => Ce[n.getDay()],
      DDD: (n) => Fe[n.getDay()],
      DD: (n) => M(n.getDate(), 2),
      D: (n) => String(n.getDate()),
      HH: (n) => M(n.getHours(), 2),
      H: (n) => String(n.getHours()),
      hh: (n) => M(ee(n), 2),
      h: (n) => ee(n),
      mm: (n) => M(n.getMinutes(), 2),
      m: (n) => String(n.getMinutes()),
      ss: (n) => M(n.getSeconds(), 2),
      s: (n) => String(n.getSeconds()),
      vvvv: (n) => M(n.getMilliseconds(), 4),
      vvv: (n) => M(n.getMilliseconds(), 3),
      vv: (n) => M(n.getMilliseconds(), 2),
      v: (n) => String(n.getMilliseconds())
    }, e == null ? void 0 : e.formats)
  )), u = typeof (e == null ? void 0 : e.translate) == "function" ? e.translate : (c = e == null ? void 0 : e.translate) == null ? void 0 : c.translate, { digitize: f } = (e == null ? void 0 : e.digitizer) ?? ie();
  function s(n, o) {
    const d = new RegExp([...Ee(t)].join("|"), "g");
    return o.replace(d, (A) => {
      const l = t.get(A);
      if (!l)
        return A;
      const h = l(n);
      return (u == null ? void 0 : u(h)) ?? h;
    });
  }
  function i(n, o) {
    function d(A) {
      if (Array.isArray(A)) {
        for (const l of A) {
          const h = A.indexOf(l);
          Array.isArray(l) ? A.splice(h, 1, d(l)) : A.splice(h, 1, ...d(l));
        }
        return A;
      }
      return f(A);
    }
    return d(De(s(n, o)));
  }
  return { map: t, define: r, format: s, parse: i, unset: a };
}
function Ee(e) {
  return Array.from(e.keys()).sort((t, r) => t.length < r.length ? 1 : t.length > r.length ? -1 : 0);
}
function M(e, t) {
  return e === void 0 ? "" : (typeof e == "number" && (e = e.toString()), t < e.length ? e : Array(t - e.length + 1).join("0") + e);
}
function N(e, t) {
  const {
    years: r = 0,
    months: a = 0,
    weeks: u = 0,
    days: f = 0,
    hours: s = 0,
    minutes: i = 0,
    seconds: c = 0,
    milliseconds: n = 0
  } = t || {}, o = a || r ? Ie(e, a + r * 12) : new Date(e.getTime()), d = f || u ? pe(o, f + u * 7) : o, A = i + s * 60, h = (c + A * 60) * 1e3 + n;
  return new Date(d.getTime() + h);
}
function pe(e, t) {
  return isNaN(t) || !t || e.setDate(e.getDate() + t), e;
}
function Ie(e, t) {
  if (isNaN(t) || !t)
    return e;
  const r = e.getDate(), a = new Date(e.getTime());
  a.setMonth(e.getMonth() + t + 1, 0);
  const u = a.getDate();
  return r >= u ? a : (e.setFullYear(
    a.getFullYear(),
    a.getMonth(),
    r
  ), e);
}
function I(e, t) {
  const r = e.getTime() - t.getTime();
  return r < 0 ? -1 : r > 0 ? 1 : r;
}
function Te(e) {
  return e.setHours(23, 59, 59, 999), e;
}
function Le(e) {
  const t = e.getMonth();
  return e.setFullYear(e.getFullYear(), t + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function Ye(e) {
  const t = new Date(e);
  return Te(t).getTime() === Le(t).getTime();
}
function je(e, t) {
  return e.getFullYear() - t.getFullYear();
}
function ze(e, t) {
  const r = e.getFullYear() - t.getFullYear(), a = e.getMonth() - t.getMonth();
  return r * 12 + a;
}
function Ve(e, t) {
  const r = new Date(e), a = new Date(t), u = I(r, a), f = Math.abs(je(r, a));
  r.setFullYear(1584), a.setFullYear(1584);
  const s = I(r, a) === -u, i = u * (f - Number(s));
  return i === 0 ? 0 : i;
}
function Re(e, t) {
  const r = new Date(e), a = new Date(t), u = I(r, a), f = Math.abs(ze(r, a));
  if (f < 1)
    return 0;
  r.getMonth() === 1 && r.getDate() > 27 && r.setDate(30), r.setMonth(r.getMonth() - u * f);
  let s = I(r, a) === -u;
  Ye(r) && f === 1 && I(r, a) === 1 && (s = false);
  const i = u * (f - Number(s));
  return i === 0 ? 0 : i;
}
function qe(e, t) {
  return Math.floor(se(e, t) / Me);
}
function se(e, t) {
  return Math.floor(T(e, t) / $e);
}
function He(e, t) {
  return Math.floor(T(e, t) / xe);
}
function We(e, t) {
  return Math.floor(T(e, t) / Se);
}
function Pe(e, t) {
  return Math.floor(T(e, t) / 1e3);
}
function T(e, t) {
  return new Date(e).getTime() - new Date(t).getTime();
}
function ee(e) {
  const t = e.getHours() % 12;
  return String(t === 0 ? 12 : t);
}
function S(e) {
  var o, d, A;
  const { el: t, tagName: r, attrs: a, class: u, events: f, style: s } = e, i = t && "tagName" in t && ((o = t == null ? void 0 : t.tagName) == null ? void 0 : o.toLowerCase()) === r.toLowerCase() ? t : document.createElement(r);
  if (t && "attributes" in t && (t != null && t.attributes))
    for (const { name: l } of t.attributes)
      i.removeAttribute(l);
  if (a)
    for (const [l, h] of Object.entries(a))
      i.setAttribute(l, h);
  if (u) {
    const l = ae(u);
    l ? i.setAttribute("class", l) : i.removeAttribute("class");
  }
  if (s) {
    const l = Je(s);
    l ? i.setAttribute("style", l) : i.removeAttribute("style");
  }
  if (f)
    for (const l in f) {
      const h = f[l];
      h && i.addEventListener(l.replace(/^on/, ""), (b) => {
        h.apply(i, [b]);
      });
    }
  let { children: c } = e;
  typeof c == "function" && (c = c(i));
  const n = c == null ? void 0 : c.filter(
    (l) => typeof l == "string" || l instanceof Node
  );
  if (n && n.length) {
    for (let l = 0; l < n.length; l++) {
      const h = n[l], b = i.childNodes.item(l);
      b !== h && (i.childNodes[l] ? b.replaceWith(h) : i.append(h));
    }
    for (; i.childNodes.length > ((n == null ? void 0 : n.length) ?? 0); )
      (d = i.childNodes[i.childNodes.length - 1]) == null || d.remove();
  } else
    for (; i.childNodes.length; )
      (A = i.lastChild) == null || A.remove();
  return i;
}
function ae(e) {
  if (!e)
    return "";
  const t = [];
  if (typeof e == "string")
    t.push(e);
  else if (Array.isArray(e))
    t.push(...e);
  else if (e)
    for (const [r, a] of Object.entries(e))
      a && t.push(...r.split(" "));
  return t.join(" ");
}
function Je(e) {
  return typeof e == "string" ? e : Object.entries(e).map(([t, r]) => `${t}:${r}`).join(";");
}
function Be(e) {
  const { map: t, define: r, unset: a } = B(Object.entries(
    {
      Y: ["years", ({ years: i }, c) => M(i, c)],
      M: ["months", ({ months: i }, c) => M(i, c)],
      W: ["weeks", ({ weeks: i }, c) => M(i, c)],
      D: ["days", ({ days: i }, c) => M(i, c)],
      h: ["hours", ({ hours: i }, c) => M(i, c)],
      m: ["minutes", ({ minutes: i }, c) => M(i, c)],
      s: ["seconds", ({ seconds: i }, c) => M(i, c)],
      v: ["milliseconds", ({ milliseconds: i }, c) => M(i, c)]
    }
  )), u = {
    years: [
      (i, c) => Ve(i, c),
      (i, c) => N(i, { years: c })
    ],
    months: [
      (i, c) => Re(i, c),
      (i, c) => N(i, { months: c })
    ],
    weeks: [
      (i, c) => qe(i, c),
      (i, c) => N(i, { weeks: c })
    ],
    days: [
      (i, c) => se(i, c),
      (i, c) => N(i, { days: c })
    ],
    hours: [
      (i, c) => He(i, c),
      (i, c) => N(i, { hours: c })
    ],
    minutes: [
      (i, c) => We(i, c),
      (i, c) => N(i, { minutes: c })
    ],
    seconds: [
      (i, c) => Pe(i, c),
      (i, c) => N(i, { seconds: c })
    ],
    milliseconds: [
      (i, c) => T(i, c),
      (i, c) => N(i, { milliseconds: c })
    ]
  };
  function f(i, c, n) {
    const o = new RegExp(
      Array.from(t.keys()).map((h) => `${h}+`).join("|"),
      "g"
    ), d = n.match(o);
    if (!d)
      return n;
    const A = d.map((h) => t.get(h[0])).filter(Boolean), l = s(
      i,
      c,
      A.map(([h]) => h).flat(1)
    );
    return n.replace(o, (h) => {
      var v;
      const b = t.get(h[0]);
      if (!b)
        return h;
      const D = b[1](l, h.length);
      return ((v = e == null ? void 0 : e.translate) == null ? void 0 : v.call(e, D)) ?? D;
    });
  }
  function s(i, c, n) {
    const o = Object.keys(u), d = n ? n.sort((l, h) => o.indexOf(l) < o.indexOf(h) ? -1 : o.indexOf(l) < o.indexOf(h) ? 1 : 0) : o, [A] = d.map((l) => [l, u[l]]).reduce(([l, h], [b, [D, v]]) => {
      const k = D(c, h);
      return l[b] = k, [l, v(h, k)];
    }, [{}, new Date(i)]);
    return A;
  }
  return { map: t, define: r, duration: s, format: f, unset: a };
}
function Ue(e, t = 25) {
  let r;
  return function(...a) {
    clearTimeout(r), r = setTimeout(() => e.apply(this, a), t);
  };
}
var j;
function Ge(e) {
  let t = e;
  const r = [];
  function a() {
    return j && r.push(j), t;
  }
  function u(s) {
    t = s, r.forEach((i) => i());
  }
  function f() {
    return t = e, r.splice(0, r.length), t;
  }
  return [a, u, f];
}
function U(e) {
  j = e, e(), j = void 0;
}
function Ke(e) {
  const [t, r] = Ge(e);
  return new Proxy({ value: e }, {
    get() {
      return t();
    },
    set(a, u, f) {
      return a.value = f, r(f), true;
    }
  });
}
function dt(e) {
  return typeof e == "function" ? {
    get value() {
      return e();
    }
  } : {
    get value() {
      return e.get();
    },
    set value(t) {
      e.set(t);
    }
  };
}
function te(e, t, r, a) {
  typeof r == "function" ? (a = r, r = {}) : r || (r = {});
  const u = !r.backwards;
  function f(s, i) {
    if (z(i)) {
      s = Xe(s);
      const c = Math.max(i.length, s.length);
      for (let n = u ? 0 : c - 1; u ? n < c : n >= 0; u ? n++ : n--) {
        const o = s[n] ? f(s[n], i[n]) : f([], i[n]);
        s[n] ? s[n] = o : s.push(o);
      }
      for (let n = 0; n < s.length; n++)
        s[n] === void 0 && s.splice(n, 1);
      return s;
    }
    if (Ze(i)) {
      s = Qe(s);
      let c = 0;
      for (; c < s.length; ) {
        const n = u ? c : s.length - 1 - c, o = u ? c : i.length - 1 - c;
        s[n] = f(
          s[n],
          i[o]
        ), s[n] === void 0 ? s.splice(n, 1) : c++;
      }
      for (let n = u ? s.length : i.length - 1; u ? n < i.length : n >= s.length; u ? n++ : n--) {
        const o = f(void 0, i[n]);
        if (o === void 0)
          break;
        s.push(o);
      }
      return s;
    }
    return a ? a(W(s), i) : i === void 0 ? void 0 : W(s);
  }
  return f(e, t);
}
function W(e) {
  return Array.isArray(e) ? W(e[0]) : e;
}
function Qe(e) {
  return z(e) ? e.flat(1 / 0) : Array.isArray(e) ? e : e === void 0 ? [] : [e];
}
function Xe(e) {
  return z(e) ? e : Array.isArray(e) ? [e] : e === void 0 ? [[]] : [[e]];
}
function Ze(e) {
  return Array.isArray(e) && !z(e);
}
function z(e) {
  if (!Array.isArray(e) || !e.length)
    return false;
  for (const t in e)
    if (Array.isArray(e[t]))
      return true;
  return false;
}
function _e() {
  return { stop: true };
}
function et(e) {
  const t = [];
  return (...r) => {
    const [a] = r;
    let u = typeof a == "object" || Array.isArray(a) ? JSON.stringify(a) : a;
    const f = e(t, ...r);
    if (f && typeof f == "object" && "stop" in f && f.stop === true)
      return a;
    const s = f;
    let i = typeof s == "object" || Array.isArray(s) ? JSON.stringify(s) : s;
    return u !== i && t.push({
      from: a,
      to: s
    }), s;
  };
}
function P(e, t) {
  return et((r, ...a) => e(r, ...a) ? t(...a) : _e());
}
function gt(e, t) {
  return P((r, ...a) => r.length < e, t);
}
function tt(e) {
  const { charset: t, next: r, prev: a } = e != null && e.charset && "next" in e.charset ? e.charset : Ae(e == null ? void 0 : e.charset);
  function u(s, i, c = 1, n = false) {
    const o = {
      backwards: n,
      ...e == null ? void 0 : e.matchArray
    };
    return s.digits = te(
      s.digits,
      i.digits,
      o,
      P((d, A, l) => e != null && e.stopWhen ? e.stopWhen(d, A, l) : e != null && e.stopAfterChanges ? d.length < e.stopAfterChanges : true, (d, A) => d === A ? d : a(d ?? "", A, c))
    ), s;
  }
  function f(s, i, c = 1, n = false) {
    const o = {
      backwards: n,
      ...e == null ? void 0 : e.matchArray
    };
    return s.digits = te(
      s.digits,
      i.digits,
      o,
      P((d, A, l) => e != null && e.stopWhen ? e == null ? void 0 : e.stopWhen(d, A, l) : e != null && e.stopAfterChanges ? d.length < e.stopAfterChanges : true, (d, A) => d === A ? d : r(d, A, c))
    ), s;
  }
  return {
    charset: t,
    decrement: u,
    increment: f
  };
}
var rt = class {
  constructor() {
    w(this, "events", []);
  }
  /**
   * Emit an event.
   * 
   * @public
  */
  emit(t, ...r) {
    for (const a of this.events)
      a.key === t && a.fn(...r);
  }
  /**
   * Listen for an event. This returns a function to unwatch the event.
   * 
   * @public
   */
  on(t, r) {
    const a = () => {
      const u = this.events.findIndex((f) => f.key === t && f.fn === r);
      this.events.splice(u, 1);
    };
    return this.events.push({ key: t, fn: r, unwatch: a }), a;
  }
  /**
   * Listen for an event once.
   * 
   * @public
   */
  once(t, r) {
    const a = this.on(t, (...u) => {
      r(...u), a();
    });
    return a;
  }
  off(t, r) {
    for (const a of this.events)
      a.key === t && (!r || r === a.fn) && a.unwatch();
  }
  /**
   * Reset the event bus and remove all watchers.
   * 
   * @public
   */
  reset() {
    for (const { unwatch: t } of this.events)
      t();
  }
};
var G = class _G {
  /**
   * Instantiate the face value.
   * 
   * @public
   */
  constructor(t, r) {
    w(this, "$carryLength");
    w(this, "digitizer");
    w(this, "$value");
    this.digitizer = (r == null ? void 0 : r.digitizer) || ie(), this.$value = Ke(t), this.$carryLength = this.digits.length, U(() => {
      this.$carryLength = this.digits.length;
    });
  }
  /**
   * The carry length.
   * 
   * @public
   */
  get carryLength() {
    return this.$carryLength;
  }
  /**
   * The digitized value.
   * 
   * @public
   */
  get digits() {
    return this.digitizer.digitize(this.value);
  }
  /**
   * Set the value from a digitized value.
   * 
   * @public
   */
  set digits(t) {
    this.value = this.digitizer.undigitize(t);
  }
  /**
   * Get the minimum length.
   * 
   * @public
   */
  get minimumLength() {
    var t;
    return Math.max(
      this.carryLength || 0,
      ((t = this.digits) == null ? void 0 : t.flat().length) || 0
    );
  }
  /**
   * Get the length of the flattened digitized array.
   * 
   * @public
   */
  get length() {
    return this.digits.flat(1 / 0).length;
  }
  /**
   * Get the value.
   * 
   * @public
   */
  get value() {
    return this.$value.value;
  }
  /**
   * Set the value.
   * 
   * @public
   */
  set value(t) {
    this.$value.value = t;
  }
  /**
   * Compare the face value with the given subject.
   * 
   * @public
   */
  compare(t) {
    return JSON.stringify(this.value) === JSON.stringify(t == null ? void 0 : t.value);
  }
  /**
   * Create a new instance with the given value.
   * 
   * @public
   */
  copy(t, r = {}) {
    return new _G(t === void 0 ? this.value : t, Object.assign({
      digitizer: this.digitizer
    }, r));
  }
};
function ce(e, t) {
  return new G(e, t);
}
var J = class {
  /**
   * Create a new `Timer` instance.
   * 
   * @public
   */
  constructor(t = 1e3) {
    w(this, "$count", 0);
    w(this, "$handle");
    w(this, "interval");
    w(this, "$lastLoop");
    w(this, "$startDate");
    this.interval = t;
  }
  /**
   * Get the number of times the timer has ticked.
   * 
   * @public
   */
  get count() {
    return this.$count;
  }
  /**
   * The `elapsed` attribute.
   * 
   * @public
   */
  get elapsed() {
    return this.$startDate ? Math.max(0, Date.now() - this.$startDate.getTime()) : 0;
  }
  /**
   * The `elapsedSinceLastLoop` attribute.
   * 
   * @public
   */
  get elapsedSinceLastLoop() {
    return this.lastLoop ? Date.now() - this.lastLoop : this.lastLoop;
  }
  /**
   * Determines if the Timer is currently running.
   * 
   * @public
   */
  get isRunning() {
    return this.$handle !== void 0;
  }
  /**
   * Determines if the Timer is currently stopped.
   * 
   * @public
   */
  get isStopped() {
    return this.$handle === void 0;
  }
  /**
   * Get the last timestamp the timer looped.
   * 
   * @public
   */
  get lastLoop() {
    return this.$lastLoop || 0;
  }
  /**
   * Get the date object when the timer started.
   * 
   * @public
   */
  get started() {
    return this.$startDate;
  }
  /**
   * Resets the timer. If a callback is provided, re-start the clock.
   * 
   * @public
   */
  reset(t) {
    return this.stop(() => {
      this.$count = 0, this.$lastLoop = 0, this.start(t);
    }), this;
  }
  /**
   * Starts the timer.
   * 
   * @public
   */
  start(t) {
    this.$startDate = /* @__PURE__ */ new Date();
    const r = () => (Date.now() - this.lastLoop >= this.interval && (typeof t == "function" && t(this), this.$lastLoop = Date.now(), this.$count++), this.$handle = window.requestAnimationFrame(r), this);
    return r();
  }
  /**
   * Stops the timer.
   * 
   * @public
   */
  stop(t) {
    return this.isRunning && this.$handle && (window.cancelAnimationFrame(this.$handle), this.$handle = void 0, typeof t == "function" && t(this)), this;
  }
};
function mt(e = 1e3) {
  return new J(e);
}
var nt = class extends rt {
  /**
   * Construct the FlipClock.
   */
  constructor(r) {
    super();
    w(this, "autoStart", true);
    w(this, "el");
    w(this, "face");
    w(this, "theme");
    w(this, "timer");
    this.face = r.face, this.theme = r.theme, typeof r.autoStart == "boolean" && (this.autoStart = r.autoStart), this.timer = r.timer instanceof J ? r.timer : new J(r.timer), this.hook("afterCreate", this), r.el && this.mount(r.el);
  }
  get animationRate() {
    var r;
    return this.el ? parseInt((r = getComputedStyle(this.el)) == null ? void 0 : r.animationDuration.replace(/s$/, "")) * 1e3 : 0;
  }
  /**
   * Mount the clock instance to the DOM.
   * 
   * @public
   */
  mount(r) {
    return this.hook("beforeMount", this), this.el = r, U(() => {
      this.theme.render(this);
    }), this.hook("afterMount", this), this.autoStart && this.timer.isStopped && window.requestAnimationFrame(() => this.start()), this;
  }
  /**
   * Start the clock instance.
   * 
   * @public
   */
  start(r) {
    return this.hook("beforeStart", this), this.timer.start(() => {
      requestAnimationFrame(() => {
        this.hook("beforeInterval", this), this.face.interval(this), this.hook("afterInterval", this), typeof r == "function" && r(this);
      });
    }), this.hook("afterStart", this), this;
  }
  /**
   * Stop the clock instance.
   * 
   * @public
   */
  stop(r) {
    return this.hook("beforeStop", this), this.timer.stop(() => {
      typeof r == "function" && r(this), this.hook("afterStop", this);
    }), this;
  }
  /**
   * Toggle starting/stopping the clock instance.
   * 
   * @public
   */
  toggle(r) {
    return this.timer.isStopped ? this.start(r) : this.stop(r), this;
  }
  /**
   * Unmount the clock instance from the DOM.
   * 
   * @public
   */
  unmount() {
    var r, a;
    return this.hook("beforeUnmount", this), (a = (r = this.el) == null ? void 0 : r.parentElement) == null || a.removeChild(this.el), this.hook("afterUnmount", this), this;
  }
  /**
   * Dispatch the event and call the method that corresponds to given hook.
   * 
   * @protected
   */
  hook(r, ...a) {
    if (r in this.face && typeof this.face[r] == "function") {
      const u = this.face[r];
      u == null || u.apply(this.face, a);
    }
    if (r in this.theme && typeof this.theme[r] == "function") {
      const u = this.theme[r];
      u == null || u(...a);
    }
    this.emit(r, ...a);
  }
};
function yt(e) {
  return new nt(e);
}
var it = class {
  /**
   * Instantiate the clock face.
   * 
   * @public
   */
  constructor(t) {
    w(this, "direction", "auto");
    w(this, "sequencer");
    w(this, "skipChars");
    w(this, "value");
    w(this, "targetValue");
    t.skipChars && (this.skipChars = t.skipChars), t.direction && (this.direction = t.direction), this.sequencer = t.sequencer && "increment" in t.sequencer ? t.sequencer : tt(t.sequencer), this.value = t.value, this.targetValue = t.targetValue;
  }
  /**
   * The sequencer method to call.
   * 
   * @public
   */
  get backwards() {
    var t;
    return this.direction === "backwards" ? true : this.direction === "forwards" ? false : this.value.length >= (((t = this.targetValue) == null ? void 0 : t.length) ?? 0);
  }
  /**
   * This method is called with every interval, or every time the clock
   * should change, and handles the actual incrementing and decrementing the
   * clock's `FaceValue`.
   * 
   * @public
   */
  interval(t) {
    this.sequencer.increment(
      this.value,
      this.targetValue,
      this.skipChars,
      this.backwards
    ), this.value.compare(this.targetValue) && t.stop();
  }
  /**
   * Update the direction before the interval starts.
   * 
   * @internal
   */
  afterCreate(t) {
    U(() => {
      t.autoStart && t.timer.isStopped && this.value.value && t.start();
    });
  }
};
function vt(e) {
  return new it(e);
}
var st = class {
  /**
   * Instantiate the clock face.
   * 
   * @public
   */
  constructor(t) {
    w(this, "date");
    w(this, "value");
    w(this, "format", "[hh]:[mm]:[ss] [A]");
    w(this, "formatter");
    this.date = t == null ? void 0 : t.date, this.formatter = t != null && t.formatter && "format" in t.formatter ? t.formatter : Ne(t == null ? void 0 : t.formatter), t != null && t.format && (this.format = t.format), this.value = ce(this.formatter.parse(/* @__PURE__ */ new Date(), this.format));
  }
  /**
   * Format the face value to the current date/time.
   * 
   * @public
   */
  interval(t) {
    if (!this.date)
      this.value.value = this.formatter.parse(/* @__PURE__ */ new Date(), this.format);
    else {
      const r = /* @__PURE__ */ new Date();
      r.setTime(this.date.getTime() + t.timer.elapsed), this.value.value = this.formatter.parse(r, this.format);
    }
  }
};
function At(e) {
  return new st(e);
}
var at = class {
  /**
   * Instantiate the clock face.
   * 
   * @public
   */
  constructor(t) {
    w(this, "countdown", false);
    w(this, "step", 1);
    w(this, "targetValue");
    w(this, "value");
    this.value = t.value, this.targetValue = t.targetValue, typeof t.countdown == "boolean" && (this.countdown = t.countdown), typeof t.step == "number" && (this.step = t.step);
  }
  /**
   * Substract the face value by the given value.
   * 
   * @public
   */
  decrement(t = 1) {
    this.value.value = this.value.value - t;
  }
  /**
   * Add to the face value by the given value.
   * 
   * @public
   */
  increment(t = 1) {
    this.value.value = this.value.value + t;
  }
  /**
   * This method is called with every interval, or every time the clock
   * should change, and handles the actual incrementing and decrementing the
   * clock's `FaceValue`.
   * 
   * @public
   */
  interval(t) {
    this.countdown ? this.decrement() : this.increment(), this.value.compare(this.targetValue) && t.stop();
  }
};
function wt(e) {
  return new at(e);
}
var ct = class {
  /**
   * Instantiate a Clock face with a given value and attributes.
   * 
   * @public
   */
  constructor(t) {
    w(this, "end");
    w(this, "format");
    w(this, "formatter");
    w(this, "start");
    w(this, "value");
    this.start = t.start, this.end = t.end, this.format = t.format, this.formatter = t.formatter && "format" in t.formatter ? t.formatter : Be(t.formatter), this.value = ce(
      this.formatter.format(this.span.start, this.span.end, this.format)
    );
  }
  /**
   * Get the start and end date.
   * 
   * @public
   */
  get span() {
    return {
      start: this.start ?? /* @__PURE__ */ new Date(),
      end: this.end ?? /* @__PURE__ */ new Date()
    };
  }
  /**
   * Format the value with the new elapsed time.
   * 
   * @public
   */
  interval() {
    this.value.value = this.formatter.format(
      this.span.start,
      this.span.end,
      this.format
    );
  }
};
function bt(e) {
  return new ct(e);
}
function Dt(e = {}) {
  return {
    render: (t) => ut({
      el: t.el,
      labels: e.labels,
      dividers: e.dividers,
      value: t.face.value
    })
  };
}
function ut(e) {
  function t(f) {
    if (ne !== void 0)
      return f instanceof RegExp ? f : new RegExp(
        `[${(Array.isArray(f) ? f : [f]).join("|")}]`
      );
  }
  function r(f, s) {
    const i = t(s);
    return i ? f.match(i) : false;
  }
  function a(f, s, i) {
    if (Array.isArray(f)) {
      const c = typeof i == "string" || i == null ? void 0 : i.shift();
      return ft({
        el: s,
        label: typeof c == "string" ? c : void 0,
        children: (n) => f.map((o, d) => a(
          o,
          n == null ? void 0 : n.children.item(d),
          c
        ))
      });
    }
    return r(f, e.dividers) ? ne({
      el: s,
      value: f
    }) : lt({
      el: s,
      value: f
    });
  }
  const u = Array.isArray(e.labels) ? structuredClone(e.labels) : e.labels;
  return S({
    el: e.el,
    tagName: "div",
    class: {
      "flip-clock": true
    },
    children: e.value.digits.map((f, s) => {
      var i;
      return a(
        f,
        (i = e == null ? void 0 : e.el) == null ? void 0 : i.children.item(s),
        u
      );
    })
  });
}
function ft(e) {
  return S({
    el: e.el,
    tagName: "div",
    class: "flip-clock-group",
    children: (t) => [
      !!e.label && S({
        el: t.querySelector(".flip-clock-label"),
        tagName: "div",
        class: "flip-clock-label",
        children: [e.label]
      }),
      S({
        el: t.querySelector(".flip-clock-group-items"),
        tagName: "div",
        class: "flip-clock-group-items",
        children: e.children
      })
    ]
  });
}
function lt(e) {
  var u, f;
  const t = (u = e.el) == null ? void 0 : u.getAttribute("data-value"), r = S({
    el: e.el,
    tagName: "div",
    attrs: {
      "data-value": e.value
    },
    class: {
      "flip-clock-card": true,
      animate: ((f = e.el) == null ? void 0 : f.getAttribute("data-value")) !== e.value
    },
    events: {
      onanimationend() {
        a();
      }
    },
    children: (s) => {
      const i = re({
        el: s.children.item(0),
        value: e.value,
        class: "active"
      }), c = re({
        el: s.children.item(1),
        value: t,
        class: "before"
      });
      return [
        i,
        c
      ];
    }
  }), a = Ue(() => {
    r.classList.remove("animate");
  }, 100);
  return r;
}
function re(e) {
  return S({
    el: e.el,
    tagName: "div",
    class: {
      "flip-clock-card-item": true,
      [ae(e == null ? void 0 : e.class)]: !!(e != null && e.class)
    },
    children: (t) => [
      S({
        el: t.children.item(0),
        tagName: "div",
        class: "flip-clock-card-item-inner",
        children: (r) => [
          S({
            el: r.children.item(0),
            tagName: "div",
            class: "top",
            children: [(e == null ? void 0 : e.value) ?? " "]
          }),
          S({
            el: r.children.item(1),
            tagName: "div",
            class: "bottom",
            children: [(e == null ? void 0 : e.value) ?? " "]
          })
        ]
      })
    ]
  });
}
function ne(e) {
  return S({
    el: e.el,
    tagName: "div",
    class: "flip-clock-divider",
    children: (t) => [
      S({
        el: t.childNodes.item(0),
        tagName: "div",
        class: "flip-clock-divider-inner",
        children: [
          e.value
        ]
      })
    ]
  });
}
export {
  it as Alphanumeric,
  st as Clock,
  at as Counter,
  ge as EMPTY_CHAR,
  ct as ElapsedTime,
  rt as EventEmitter,
  G as FaceValue,
  nt as FlipClock,
  J as Timer,
  N as add,
  pe as addDays,
  Ie as addMonths,
  vt as alphanumeric,
  lt as card,
  re as cardItem,
  Xe as castDigitizedGroup,
  W as castDigitizedString,
  Qe as castDigitizedValues,
  q as characterRange,
  ae as classes,
  At as clock,
  I as compareAsc,
  dt as computed,
  wt as counter,
  Ge as createSignal,
  Fe as dayAbbreviations,
  Ce as days,
  Me as daysInWeek,
  Ue as debounce,
  ve as defaultCharset,
  ze as differenceInCalendarMonths,
  je as differenceInCalendarYears,
  se as differenceInDays,
  He as differenceInHours,
  T as differenceInMilliseconds,
  We as differenceInMinutes,
  Re as differenceInMonths,
  Pe as differenceInSeconds,
  qe as differenceInWeeks,
  Ve as differenceInYears,
  ne as divider,
  S as el,
  bt as elapsedTime,
  Te as endOfDay,
  Le as endOfMonth,
  ce as faceValue,
  ye as fisherYatesShuffle,
  yt as flipClock,
  ee as getTwelveHourFormat,
  ft as group,
  z as isDigitizedGroup,
  Ze as isDigitizedValues,
  Ye as isLastDayOfMonth,
  te as matchArrayStructure,
  $e as millisecondsInDay,
  xe as millisecondsInHour,
  Se as millisecondsInMinute,
  Oe as monthAbbreviations,
  ke as months,
  M as pad,
  me as range,
  Ke as ref,
  ut as render,
  Ee as sort,
  _e as stop,
  gt as stopAfterChanges,
  P as stopWhen,
  Je as style,
  Dt as theme,
  mt as timer,
  et as trackChanges,
  Ae as useCharset,
  Ne as useDateFormats,
  B as useDefinitionMap,
  ht as useDictionary,
  ie as useDigitizer,
  Be as useDurationFormats,
  tt as useSequencer,
  U as watchEffect
};
//# sourceMappingURL=flipclock.js.map
