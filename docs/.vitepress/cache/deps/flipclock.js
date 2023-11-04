// node_modules/.pnpm/file+/node_modules/flipclock/dist/flipclock.es.js
var me = Object.defineProperty;
var ve = (e, t, r) => t in e ? me(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r;
var b = (e, t, r) => (ve(e, typeof t != "symbol" ? t + "" : t, r), r);
function ye(e, t) {
  function r() {
    this.constructor = e;
  }
  r.prototype = t.prototype, e.prototype = new r();
}
function E(e, t, r, n) {
  var f = Error.call(this, e);
  return Object.setPrototypeOf && Object.setPrototypeOf(f, E.prototype), f.expected = t, f.found = r, f.location = n, f.name = "SyntaxError", f;
}
ye(E, Error);
function W(e, t, r) {
  return r = r || " ", e.length > t ? e : (t -= e.length, r += r.repeat(t), e + r.slice(0, t));
}
E.prototype.format = function(e) {
  var t = "Error: " + this.message;
  if (this.location) {
    var r = null, n;
    for (n = 0; n < e.length; n++)
      if (e[n].source === this.location.source) {
        r = e[n].text.split(/\r\n|\n|\r/g);
        break;
      }
    var f = this.location.start, c = this.location.source && typeof this.location.source.offset == "function" ? this.location.source.offset(f) : f, a = this.location.source + ":" + c.line + ":" + c.column;
    if (r) {
      var s = this.location.end, g = W("", c.line.toString().length, " "), i = r[f.line - 1], u = f.line === s.line ? s.column : i.length + 1, d = u - f.column || 1;
      t += `
 --> ` + a + `
` + g + ` |
` + c.line + " | " + i + `
` + g + " | " + W("", f.column - 1, " ") + W("", d, "^");
    } else
      t += `
 at ` + a;
  }
  return t;
};
E.buildMessage = function(e, t) {
  var r = {
    literal: function(i) {
      return '"' + f(i.text) + '"';
    },
    class: function(i) {
      var u = i.parts.map(function(d) {
        return Array.isArray(d) ? c(d[0]) + "-" + c(d[1]) : c(d);
      });
      return "[" + (i.inverted ? "^" : "") + u.join("") + "]";
    },
    any: function() {
      return "any character";
    },
    end: function() {
      return "end of input";
    },
    other: function(i) {
      return i.description;
    }
  };
  function n(i) {
    return i.charCodeAt(0).toString(16).toUpperCase();
  }
  function f(i) {
    return i.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(u) {
      return "\\x0" + n(u);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(u) {
      return "\\x" + n(u);
    });
  }
  function c(i) {
    return i.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(u) {
      return "\\x0" + n(u);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(u) {
      return "\\x" + n(u);
    });
  }
  function a(i) {
    return r[i.type](i);
  }
  function s(i) {
    var u = i.map(a), d, y;
    if (u.sort(), u.length > 0) {
      for (d = 1, y = 1; d < u.length; d++)
        u[d - 1] !== u[d] && (u[y] = u[d], y++);
      u.length = y;
    }
    switch (u.length) {
      case 1:
        return u[0];
      case 2:
        return u[0] + " or " + u[1];
      default:
        return u.slice(0, -1).join(", ") + ", or " + u[u.length - 1];
    }
  }
  function g(i) {
    return i ? '"' + f(i) + '"' : "end of input";
  }
  return "Expected " + s(e) + " but " + g(t) + " found.";
};
function Ae(e, t) {
  t = t !== void 0 ? t : {};
  var r = {}, n = t.grammarSource, f = { start: ee }, c = ee, a = "[", s = "]", g = /^[[\]]/, i = X("[", false), u = X("]", false), d = oe(["[", "]"], false, false), y = he(), l = function(o) {
    return () => o;
  }, v = function(o) {
    return re(o);
  }, w = function(o) {
    return () => o;
  }, D = function(o) {
    return re(o);
  }, C = function(o) {
    return o.flat(1).filter(Boolean);
  }, A = 0, O = [{ line: 1, column: 1 }], x = 0, H = [], N = 0, j;
  if ("startRule" in t) {
    if (!(t.startRule in f))
      throw new Error(`Can't start parsing from rule "` + t.startRule + '".');
    c = f[t.startRule];
  }
  function X(o, h) {
    return { type: "literal", text: o, ignoreCase: h };
  }
  function oe(o, h, m) {
    return { type: "class", parts: o, inverted: h, ignoreCase: m };
  }
  function he() {
    return { type: "any" };
  }
  function de() {
    return { type: "end" };
  }
  function Z(o) {
    var h = O[o], m;
    if (h)
      return h;
    for (m = o - 1; !O[m]; )
      m--;
    for (h = O[m], h = {
      line: h.line,
      column: h.column
    }; m < o; )
      e.charCodeAt(m) === 10 ? (h.line++, h.column = 1) : h.column++, m++;
    return O[o] = h, h;
  }
  function _(o, h, m) {
    var M = Z(o), S = Z(h), T = {
      source: n,
      start: {
        offset: o,
        line: M.line,
        column: M.column
      },
      end: {
        offset: h,
        line: S.line,
        column: S.column
      }
    };
    return m && n && typeof n.offset == "function" && (T.start = n.offset(T.start), T.end = n.offset(T.end)), T;
  }
  function p(o) {
    A < x || (A > x && (x = A, H = []), H.push(o));
  }
  function ge(o, h, m) {
    return new E(
      E.buildMessage(o, h),
      o,
      h,
      m
    );
  }
  function ee() {
    var o, h, m, M;
    for (o = A, h = [], m = A, M = L(), M !== r && (M = l(M)), m = M, m === r && (m = z()); m !== r; )
      h.push(m), m = A, M = L(), M !== r && (M = l(M)), m = M, m === r && (m = z());
    return h = v(h), o = h, o;
  }
  function z() {
    var o, h, m, M, S;
    if (o = A, e.charCodeAt(A) === 91 ? (h = a, A++) : (h = r, N === 0 && p(i)), h !== r) {
      if (m = [], M = A, S = L(), S !== r && (S = w(S)), M = S, M === r && (M = z()), M !== r)
        for (; M !== r; )
          m.push(M), M = A, S = L(), S !== r && (S = w(S)), M = S, M === r && (M = z());
      else
        m = r;
      m !== r ? (e.charCodeAt(A) === 93 ? (M = s, A++) : (M = r, N === 0 && p(u)), M !== r ? o = D(m) : (A = o, o = r)) : (A = o, o = r);
    } else
      A = o, o = r;
    return o;
  }
  function L() {
    var o, h, m;
    if (o = A, h = [], m = te(), m !== r)
      for (; m !== r; )
        h.push(m), m = te();
    else
      h = r;
    return h !== r && (h = C(h)), o = h, o;
  }
  function te() {
    var o, h, m;
    return o = A, h = A, N++, g.test(e.charAt(A)) ? (m = e.charAt(A), A++) : (m = r, N === 0 && p(d)), N--, m === r ? h = void 0 : (A = h, h = r), h !== r ? (e.length > A ? (m = e.charAt(A), A++) : (m = r, N === 0 && p(y)), m !== r ? (h = [h, m], o = h) : (A = o, o = r)) : (A = o, o = r), o;
  }
  function re(o) {
    for (const h of o)
      typeof h == "function" && o.splice(o.indexOf(h), 1, ...h());
    return o;
  }
  if (j = c(), j !== r && A === e.length)
    return j;
  throw j !== r && A < e.length && p(de()), ge(
    H,
    x < e.length ? e.charAt(x) : null,
    x < e.length ? _(x, x + 1) : _(x, x)
  );
}
var we = Ae;
var be = " ";
function ue() {
  function e(n) {
    if (n === void 0)
      return [];
    if (typeof n == "string")
      return n.match(/\[|\]/) ? we(n) : Array.from(n);
    if (typeof n == "number")
      return Array.from(n.toString());
    for (const f of n) {
      const c = n.indexOf(f), a = e(f);
      a !== void 0 && (typeof f == "string" ? n.splice(c, 1, ...a) : n.splice(c, 1, a));
    }
    return n.filter(Boolean) ?? [];
  }
  function t(n) {
    function f(c) {
      const a = [];
      let s = false, g = true;
      for (let i = 0; i < c.length; i++) {
        if (Array.isArray(c[i])) {
          a.push(f(c[i])), s = g = true;
          continue;
        }
        g && (a.push(""), g = false), a[a.length - 1] += c[i];
      }
      return s ? a : a[0];
    }
    return f(n);
  }
  function r(n) {
    function f(c) {
      if (!Array.isArray(c))
        return false;
      for (const a in c)
        if (!(typeof c[a] == "string" && c[a].length === 1)) {
          if (Array.isArray(c[a])) {
            if (!c[a].length)
              continue;
          } else
            return false;
          if (!f(c[a]))
            return false;
        }
      return true;
    }
    return f(n);
  }
  return {
    digitize: e,
    isDigitized: r,
    undigitize: t
  };
}
function De(e = 0, t) {
  return Array.from(Array(t).keys()).map((r) => r + e);
}
function P(e, t) {
  return De(
    e.charCodeAt(0),
    t.charCodeAt(0) + 1 - e.charCodeAt(0)
  ).map((n) => String.fromCharCode(n));
}
function Me(e) {
  const t = [];
  for (; e.length; ) {
    const r = Math.floor(
      Math.random() * e.length
    );
    t.push(...e.splice(r, 1));
  }
  return t;
}
function $e() {
  return [
    ...P("a", "z"),
    ...P("A", "Z"),
    ...P("0", "9"),
    ":",
    "-",
    ".",
    ",",
    "!",
    "?"
  ];
}
function xe(e = {}) {
  const t = e.blacklist || [], r = e.whitelist || [], n = e.emptyChar || be, f = typeof e.shuffle == "function" ? e.shuffle : e.shuffle ? Me : void 0;
  function c() {
    const l = (e == null ? void 0 : e.charset) || $e;
    return f ? f(l()) : l();
  }
  const a = c();
  function s(l) {
    const v = l.charCodeAt(0), w = a.map((D) => D.charCodeAt(0));
    return String.fromCharCode(
      w.reduce((D, C) => Math.abs(C - v) < Math.abs(D - v) ? C : D)
    );
  }
  function g(l, v = 1) {
    let w = [n, ...a, n, ...a];
    v < 0 && (w = w.reverse());
    let D = 1;
    l === void 0 ? l = n : w.includes(l) || (l = n, D = 0);
    const C = w.indexOf(l);
    return w.slice(
      C + D,
      w.indexOf(l, C + 1) + D
    ).splice(0, Math.abs(v));
  }
  function i(l, v, w = 1) {
    if (v === void 0 && l === n)
      return;
    if (typeof v == "string" && !a.includes(v))
      return v;
    if (l && (y(l) || v === l))
      return l;
    if (l && d(l))
      return s(l);
    const D = g(l, w);
    if (typeof v == "string" && D.includes(v))
      return v;
    if (!(v === void 0 && l && a.indexOf(D[w - 1]) < a.indexOf(l)))
      return D[w - 1];
  }
  function u(l, v, w = 1) {
    if (v === void 0 && l === n)
      return;
    if (typeof v == "string" && !a.includes(v))
      return v;
    if (l && (y(l) || v === l))
      return l;
    if (l && d(l))
      return s(l);
    const D = g(l, -w);
    if (typeof v == "string" && D.includes(v))
      return v;
    if (!(v === void 0 && l && a.indexOf(D[w - 1]) > a.indexOf(l)))
      return D[w - 1];
  }
  function d(l) {
    return t.includes(l);
  }
  function y(l) {
    return r.includes(l);
  }
  return {
    charset: a,
    chunk: g,
    emptyChar: n,
    isBlacklisted: d,
    isWhitelisted: y,
    next: i,
    prev: u
  };
}
function G(e) {
  const t = new Map(e);
  function r(f, c) {
    if (typeof f == "string" && c)
      t.set(f, c);
    else if (typeof f == "object")
      for (const a of Object.entries(f))
        t.set(a[0], a[1]);
  }
  function n(f) {
    if (Array.isArray(f))
      for (const c of f)
        t.delete(c);
    else
      t.delete(f);
  }
  return {
    map: t,
    define: r,
    unset: n
  };
}
function gt(e = {}) {
  const { map: t, define: r, unset: n } = G(Object.entries(e));
  function f(c) {
    const a = t.get(c);
    return typeof a == "function" ? a(c) : a === void 0 ? c : a;
  }
  return {
    map: t,
    define: r,
    translate: f,
    unset: n
  };
}
var Se = 7;
var Ce = 864e5;
var Fe = 36e5;
var ke = 6e4;
var Oe = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
var Ne = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun"
];
var Ee = [
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
var pe = [
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
function Te(e) {
  var a;
  const { map: t, define: r, unset: n } = G(Object.entries(
    Object.assign({
      A: (s) => s.getHours() < 12 ? "AM" : "PM",
      a: (s) => s.getHours() < 12 ? "am" : "pm",
      Q: (s) => Math.ceil((s.getMonth() + 1) / 3).toString(),
      YYYY: (s) => s.getFullYear().toString(),
      YY: (s) => $(s.getFullYear().toString().slice(2), 2),
      MMMM: (s) => Ee[s.getMonth()],
      MMM: (s) => pe[s.getMonth()],
      MM: (s) => $(s.getMonth() + 1, 2),
      M: (s) => String(s.getMonth() + 1),
      DDDD: (s) => Oe[s.getDay()],
      DDD: (s) => Ne[s.getDay()],
      DD: (s) => $(s.getDate(), 2),
      D: (s) => String(s.getDate()),
      HH: (s) => $(s.getHours(), 2),
      H: (s) => String(s.getHours()),
      hh: (s) => $(ne(s), 2),
      h: (s) => ne(s),
      mm: (s) => $(s.getMinutes(), 2),
      m: (s) => String(s.getMinutes()),
      ss: (s) => $(s.getSeconds(), 2),
      s: (s) => String(s.getSeconds()),
      vvvv: (s) => $(s.getMilliseconds(), 4),
      vvv: (s) => $(s.getMilliseconds(), 3),
      vv: (s) => $(s.getMilliseconds(), 2),
      v: (s) => String(s.getMilliseconds())
    }, e == null ? void 0 : e.formats)
  )), f = typeof (e == null ? void 0 : e.translate) == "function" ? e.translate : (a = e == null ? void 0 : e.translate) == null ? void 0 : a.translate;
  (e == null ? void 0 : e.digitizer) ?? ue();
  function c(s, g) {
    const i = new RegExp([...Ie(t)].join("|"), "g");
    return g.replace(i, (u) => {
      const d = t.get(u);
      if (!d)
        return u;
      const y = d(s);
      return (f == null ? void 0 : f(y)) ?? y;
    });
  }
  return { map: t, define: r, format: c, unset: n };
}
function Ie(e) {
  return Array.from(e.keys()).sort((t, r) => t.length < r.length ? 1 : t.length > r.length ? -1 : 0);
}
function $(e, t) {
  return e === void 0 ? "" : (typeof e == "number" && (e = e.toString()), t < e.length ? e : Array(t - e.length + 1).join("0") + e);
}
function k(e, t) {
  const {
    years: r = 0,
    months: n = 0,
    weeks: f = 0,
    days: c = 0,
    hours: a = 0,
    minutes: s = 0,
    seconds: g = 0,
    milliseconds: i = 0
  } = t || {}, u = n || r ? Ye(e, n + r * 12) : new Date(e.getTime()), d = c || f ? Ve(u, c + f * 7) : u, y = s + a * 60, v = (g + y * 60) * 1e3 + i;
  return new Date(d.getTime() + v);
}
function Ve(e, t) {
  return isNaN(t) || !t || e.setDate(e.getDate() + t), e;
}
function Ye(e, t) {
  if (isNaN(t) || !t)
    return e;
  const r = e.getDate(), n = new Date(e.getTime());
  n.setMonth(e.getMonth() + t + 1, 0);
  const f = n.getDate();
  return r >= f ? n : (e.setFullYear(
    n.getFullYear(),
    n.getMonth(),
    r
  ), e);
}
function I(e, t) {
  const r = e.getTime() - t.getTime();
  return r < 0 ? -1 : r > 0 ? 1 : r;
}
function je(e) {
  return e.setHours(23, 59, 59, 999), e;
}
function ze(e) {
  const t = e.getMonth();
  return e.setFullYear(e.getFullYear(), t + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function Le(e) {
  const t = new Date(e);
  return je(t).getTime() === ze(t).getTime();
}
function Re(e, t) {
  return e.getFullYear() - t.getFullYear();
}
function qe(e, t) {
  const r = e.getFullYear() - t.getFullYear(), n = e.getMonth() - t.getMonth();
  return r * 12 + n;
}
function He(e, t) {
  const r = new Date(e), n = new Date(t), f = I(r, n), c = Math.abs(Re(r, n));
  r.setFullYear(1584), n.setFullYear(1584);
  const a = I(r, n) === -f, s = f * (c - Number(a));
  return s === 0 ? 0 : s;
}
function We(e, t) {
  const r = new Date(e), n = new Date(t), f = I(r, n), c = Math.abs(qe(r, n));
  if (c < 1)
    return 0;
  r.getMonth() === 1 && r.getDate() > 27 && r.setDate(30), r.setMonth(r.getMonth() - f * c);
  let a = I(r, n) === -f;
  Le(r) && c === 1 && I(r, n) === 1 && (a = false);
  const s = f * (c - Number(a));
  return s === 0 ? 0 : s;
}
function Pe(e, t) {
  return Math.floor(fe(e, t) / Se);
}
function fe(e, t) {
  return Math.floor(Y(e, t) / Ce);
}
function Je(e, t) {
  return Math.floor(Y(e, t) / Fe);
}
function Be(e, t) {
  return Math.floor(Y(e, t) / ke);
}
function Ue(e, t) {
  return Math.floor(Y(e, t) / 1e3);
}
function Y(e, t) {
  return new Date(e).getTime() - new Date(t).getTime();
}
function ne(e) {
  const t = e.getHours() % 12;
  return String(t === 0 ? 12 : t);
}
function F(e) {
  var u, d, y;
  const { el: t, tagName: r, attrs: n, class: f, events: c, style: a } = e, s = t && "tagName" in t && ((u = t == null ? void 0 : t.tagName) == null ? void 0 : u.toLowerCase()) === r.toLowerCase() ? t : document.createElement(r);
  if (t && "attributes" in t && (t != null && t.attributes))
    for (const { name: l } of t.attributes)
      s.removeAttribute(l);
  if (n)
    for (const [l, v] of Object.entries(n))
      s.setAttribute(l, v);
  if (f) {
    const l = ce(f);
    l ? s.setAttribute("class", l) : s.removeAttribute("class");
  }
  if (a) {
    const l = Ge(a);
    l ? s.setAttribute("style", l) : s.removeAttribute("style");
  }
  if (c)
    for (const l in c) {
      const v = c[l];
      v && s.addEventListener(l.replace(/^on/, ""), (w) => {
        v.apply(s, [w]);
      });
    }
  let { children: g } = e;
  typeof g == "function" && (g = g(s));
  const i = g == null ? void 0 : g.filter(
    (l) => typeof l == "string" || l instanceof Node
  );
  if (i && i.length) {
    for (let l = 0; l < i.length; l++) {
      const v = i[l], w = s.childNodes.item(l);
      w !== v && (s.childNodes[l] ? w.replaceWith(v) : s.append(v));
    }
    for (; s.childNodes.length > ((i == null ? void 0 : i.length) ?? 0); )
      (d = s.childNodes[s.childNodes.length - 1]) == null || d.remove();
  } else
    for (; s.childNodes.length; )
      (y = s.lastChild) == null || y.remove();
  return s;
}
function ce(e) {
  if (!e)
    return "";
  const t = [];
  if (typeof e == "string")
    t.push(e);
  else if (Array.isArray(e))
    t.push(...e);
  else if (e)
    for (const [r, n] of Object.entries(e))
      n && t.push(...r.split(" "));
  return t.join(" ");
}
function Ge(e) {
  return typeof e == "string" ? e : Object.entries(e).map(([t, r]) => `${t}:${r}`).join(";");
}
function Ke(e) {
  var g;
  const { map: t, define: r, unset: n } = G(Object.entries(
    {
      Y: ["years", ({ years: i }, u) => $(i, u)],
      M: ["months", ({ months: i }, u) => $(i, u)],
      W: ["weeks", ({ weeks: i }, u) => $(i, u)],
      D: ["days", ({ days: i }, u) => $(i, u)],
      h: ["hours", ({ hours: i }, u) => $(i, u)],
      m: ["minutes", ({ minutes: i }, u) => $(i, u)],
      s: ["seconds", ({ seconds: i }, u) => $(i, u)],
      v: ["milliseconds", ({ milliseconds: i }, u) => $(i, u)]
    }
  )), f = {
    years: [
      (i, u) => He(i, u),
      (i, u) => k(i, { years: u })
    ],
    months: [
      (i, u) => We(i, u),
      (i, u) => k(i, { months: u })
    ],
    weeks: [
      (i, u) => Pe(i, u),
      (i, u) => k(i, { weeks: u })
    ],
    days: [
      (i, u) => fe(i, u),
      (i, u) => k(i, { days: u })
    ],
    hours: [
      (i, u) => Je(i, u),
      (i, u) => k(i, { hours: u })
    ],
    minutes: [
      (i, u) => Be(i, u),
      (i, u) => k(i, { minutes: u })
    ],
    seconds: [
      (i, u) => Ue(i, u),
      (i, u) => k(i, { seconds: u })
    ],
    milliseconds: [
      (i, u) => Y(i, u),
      (i, u) => k(i, { milliseconds: u })
    ]
  }, c = typeof (e == null ? void 0 : e.translate) == "function" ? e.translate : (g = e == null ? void 0 : e.translate) == null ? void 0 : g.translate;
  function a(i, u, d) {
    const y = new RegExp(
      Array.from(t.keys()).map((D) => `${D}+`).join("|"),
      "g"
    ), l = d.match(y);
    if (!l)
      return d;
    const v = l.map((D) => t.get(D[0])).filter(Boolean), w = s(
      i,
      u,
      v.map(([D]) => D).flat(1)
    );
    return d.replace(y, (D) => {
      const C = t.get(D[0]);
      if (!C)
        return D;
      const A = C[1](w, D.length);
      return (c == null ? void 0 : c(A)) ?? A;
    });
  }
  function s(i, u, d) {
    const y = Object.keys(f), l = d ? d.sort((w, D) => y.indexOf(w) < y.indexOf(D) ? -1 : y.indexOf(w) < y.indexOf(D) ? 1 : 0) : y, [v] = l.map((w) => [w, f[w]]).reduce(([w, D], [C, [A, O]]) => {
      const x = A(u, D);
      return w[C] = x, [w, O(D, x)];
    }, [{}, new Date(i)]);
    return v;
  }
  return { map: t, define: r, duration: s, format: a, unset: n };
}
function Qe(e, t = 25) {
  let r;
  return function(...n) {
    clearTimeout(r), r = setTimeout(() => e.apply(this, n), t);
  };
}
var R;
function Xe(e) {
  let t = e;
  const r = [];
  function n() {
    return R && r.push(R), t;
  }
  function f(a) {
    t = a, r.forEach((s) => s());
  }
  function c() {
    return t = e, r.splice(0, r.length), t;
  }
  return [n, f, c];
}
function q(e) {
  R = e, e(), R = void 0;
}
function le(e) {
  const [t, r] = Xe(e);
  return new Proxy({ value: e }, {
    get() {
      return t();
    },
    set(n, f, c) {
      return n.value = c, r(c), true;
    }
  });
}
function mt(e) {
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
function ie(e, t, r, n) {
  typeof r == "function" ? (n = r, r = {}) : r || (r = {});
  const f = !r.backwards;
  function c(a, s) {
    if (V(s)) {
      a = _e(a);
      const g = Math.max(s.length, a.length);
      for (let i = f ? 0 : g - 1; f ? i < g : i >= 0; f ? i++ : i--) {
        const u = a[i] ? c(a[i], s[i]) : c([], s[i]);
        a[i] ? a[i] = u : a.push(u);
      }
      for (let i = 0; i < a.length; i++)
        a[i] === void 0 && a.splice(i, 1);
      return a;
    }
    if (Array.isArray(s) && !V(s)) {
      a = Ze(a);
      let g = 0;
      for (; g < a.length; ) {
        const i = f ? g : a.length - 1 - g, u = f ? g : s.length - 1 - g;
        a[i] = c(
          a[i],
          s[u]
        ), a[i] === void 0 ? a.splice(i, 1) : g++;
      }
      for (let i = f ? a.length : s.length - 1; f ? i < s.length : i >= a.length; f ? i++ : i--) {
        const u = c(void 0, s[i]);
        if (u === void 0)
          break;
        a.push(u);
      }
      return a;
    }
    return n ? n(J(a), s) : s === void 0 ? void 0 : J(a);
  }
  return c(e, t);
}
function J(e) {
  return Array.isArray(e) ? J(e[0]) : e;
}
function Ze(e) {
  return V(e) ? e.flat(1 / 0) : Array.isArray(e) ? e : e === void 0 ? [] : [e];
}
function _e(e) {
  return V(e) ? e : Array.isArray(e) ? [e] : e === void 0 ? [[]] : [[e]];
}
function vt(e) {
  return Array.isArray(e) && !V(e);
}
function V(e) {
  if (!Array.isArray(e) || !e.length)
    return false;
  for (const t in e)
    if (Array.isArray(e[t]))
      return true;
  return false;
}
function et(e) {
  function t(r, n = 0) {
    for (const f of r)
      Array.isArray(f) ? n += t(f, n) : n += f.length;
    return n;
  }
  return t(e);
}
function tt() {
  return { stop: true };
}
function rt(e) {
  const t = [];
  return (...r) => {
    const [n] = r;
    let f = typeof n == "object" || Array.isArray(n) ? JSON.stringify(n) : n;
    const c = e(t, ...r);
    if (c && typeof c == "object" && "stop" in c && c.stop === true)
      return n;
    const a = c;
    let s = typeof a == "object" || Array.isArray(a) ? JSON.stringify(a) : a;
    return f !== s && t.push({
      from: n,
      to: a
    }), a;
  };
}
function B(e, t) {
  return rt((r, ...n) => e(r, ...n) ? t(...n) : tt());
}
function yt(e, t) {
  return B((r, ...n) => r.length < e, t);
}
function nt(e) {
  const { charset: t, next: r, prev: n } = e != null && e.charset && "next" in e.charset ? e.charset : xe(e == null ? void 0 : e.charset);
  function f(a, s, g = 1, i = false) {
    const u = {
      backwards: i,
      ...e == null ? void 0 : e.matchArray
    };
    return a.digits = ie(
      a.digits,
      s.digits,
      u,
      B((d, y, l) => e != null && e.stopWhen ? e.stopWhen(d, y, l) : e != null && e.stopAfterChanges ? d.length < e.stopAfterChanges : true, (d, y) => d === y ? d : n(d ?? "", y, g))
    ), a;
  }
  function c(a, s, g = 1, i = false) {
    const u = {
      backwards: i,
      ...e == null ? void 0 : e.matchArray
    };
    return a.digits = ie(
      a.digits,
      s.digits,
      u,
      B((d, y, l) => e != null && e.stopWhen ? e == null ? void 0 : e.stopWhen(d, y, l) : e != null && e.stopAfterChanges ? d.length < e.stopAfterChanges : true, (d, y) => d === y ? d : r(d, y, g))
    ), a;
  }
  return {
    charset: t,
    decrement: f,
    increment: c
  };
}
var it = class {
  constructor() {
    b(this, "events", []);
  }
  /**
   * Emit an event.
   * 
   * @public
  */
  emit(t, ...r) {
    for (const n of this.events)
      n.key === t && n.fn(...r);
  }
  /**
   * Listen for an event. This returns a function to unwatch the event.
   * 
   * @public
   */
  on(t, r) {
    const n = () => {
      const f = this.events.findIndex((c) => c.key === t && c.fn === r);
      this.events.splice(f, 1);
    };
    return this.events.push({ key: t, fn: r, unwatch: n }), n;
  }
  /**
   * Listen for an event once.
   * 
   * @public
   */
  once(t, r) {
    const n = this.on(t, (...f) => {
      r(...f), n();
    });
    return n;
  }
  off(t, r) {
    for (const n of this.events)
      n.key === t && (!r || r === n.fn) && n.unwatch();
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
var K = class _K {
  /**
   * Instantiate the face value.
   * 
   * @public
   */
  constructor(t, r) {
    b(this, "digitizer");
    b(this, "$value");
    this.digitizer = (r == null ? void 0 : r.digitizer) || ue(), this.$value = le(t);
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
   * Get the length of the flattened digitized array.
   * 
   * @public
   */
  get length() {
    return et(this.digits);
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
    return new _K(t === void 0 ? this.value : t, Object.assign({
      digitizer: this.digitizer
    }, r));
  }
};
function Q(e, t) {
  return new K(e, t);
}
var U = class {
  /**
   * Create a new `Timer` instance.
   * 
   * @public
   */
  constructor(t = 1e3) {
    b(this, "$count", 0);
    b(this, "$handle");
    b(this, "interval");
    b(this, "$lastLoop");
    b(this, "$startDate");
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
function At(e = 1e3) {
  return new U(e);
}
var st = class extends it {
  /**
   * Construct the FlipClock.
   */
  constructor(r) {
    super();
    b(this, "autoStart", true);
    b(this, "el");
    b(this, "face");
    b(this, "theme");
    b(this, "timer");
    this.face = r.face, this.theme = r.theme, typeof r.autoStart == "boolean" && (this.autoStart = r.autoStart), this.timer = r.timer instanceof U ? r.timer : new U(r.timer), this.hook("afterCreate", this), r.el && this.mount(r.el);
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
    return this.hook("beforeMount", this), this.el = r, q(() => {
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
    var r, n;
    return this.hook("beforeUnmount", this), (n = (r = this.el) == null ? void 0 : r.parentElement) == null || n.removeChild(this.el), this.hook("afterUnmount", this), this;
  }
  /**
   * Dispatch the event and call the method that corresponds to given hook.
   * 
   * @protected
   */
  hook(r, ...n) {
    if (r in this.face && typeof this.face[r] == "function") {
      const f = this.face[r];
      f == null || f.apply(this.face, n);
    }
    if (r in this.theme && typeof this.theme[r] == "function") {
      const f = this.theme[r];
      f == null || f(...n);
    }
    this.emit(r, ...n);
  }
};
function wt(e) {
  return new st(e);
}
var at = class {
  /**
   * Instantiate the clock face.
   * 
   * @public
   */
  constructor(t) {
    b(this, "direction", "auto");
    b(this, "sequencer");
    b(this, "skipChars");
    b(this, "value");
    b(this, "targetValue");
    t.skipChars && (this.skipChars = t.skipChars), t.direction && (this.direction = t.direction), this.sequencer = t.sequencer && "increment" in t.sequencer ? t.sequencer : nt(t.sequencer), this.value = t.value, this.targetValue = t.targetValue ?? this.value.copy();
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
   * The face's current value.
   * 
   * @public
   */
  faceValue() {
    return this.value;
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
    q(() => {
      t.autoStart && t.timer.isStopped && this.value.value && t.start();
    });
  }
};
function bt(e) {
  return new at(e);
}
var ut = class {
  /**
   * Instantiate the clock face.
   * 
   * @public
   */
  constructor(t) {
    b(this, "date");
    b(this, "value");
    b(this, "format", "[hh]:[mm]:[ss] [A]");
    b(this, "formatter");
    this.date = le(t == null ? void 0 : t.date), this.formatter = t != null && t.formatter && "format" in t.formatter ? t.formatter : Te(t == null ? void 0 : t.formatter), t != null && t.format && (this.format = t.format);
    const r = () => {
      var n;
      return this.formatter.format(((n = this.date) == null ? void 0 : n.value) ?? /* @__PURE__ */ new Date(), this.format);
    };
    this.value = Q(""), q(() => {
      this.value.value = r();
    });
  }
  /**
   * The face's current value.
   * 
   * @public
   */
  faceValue() {
    return this.value;
  }
  /**
   * Format the face value to the current date/time.
   * 
   * @public
   */
  interval(t) {
    var r;
    if (!((r = this.date) != null && r.value))
      this.value.value = this.formatter.format(/* @__PURE__ */ new Date(), this.format);
    else {
      const n = /* @__PURE__ */ new Date();
      n.setTime(this.date.value.getTime() + t.timer.elapsed), this.value.value = this.formatter.format(n, this.format);
    }
  }
};
function Dt(e) {
  return new ut(e);
}
var ft = class {
  /**
   * Instantiate the clock face.
   * 
   * @public
   */
  constructor(t) {
    b(this, "countdown", false);
    b(this, "step", 1);
    b(this, "formattedValue");
    b(this, "targetValue");
    b(this, "value");
    b(this, "format");
    b(this, "formatter");
    this.value = t.value, this.targetValue = t.targetValue, this.format = t.format, this.formatter = t.formatter, this.formattedValue = Q(""), q(() => {
      this.formattedValue.value = this.formattedString;
    }), typeof t.countdown == "boolean" && (this.countdown = t.countdown), typeof t.step == "number" && (this.step = t.step);
  }
  /**
   * Get the number as a formatted string.
   * 
   * @public
   */
  get formattedString() {
    return this.formatter ? this.formatter.format(this.value.value) : this.format ? this.format(this.value.value) : this.value.value.toString();
  }
  /**
  * The face's current value.
   * 
   * @public
   */
  faceValue() {
    return this.formattedValue;
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
function Mt(e) {
  return new ft(e);
}
var ct = class {
  /**
   * Instantiate a Clock face with a given value and attributes.
   * 
   * @public
   */
  constructor(t) {
    b(this, "end");
    b(this, "format");
    b(this, "formatter");
    b(this, "start");
    b(this, "value");
    this.start = t.start, this.end = t.end, this.format = t.format, this.formatter = t.formatter && "format" in t.formatter ? t.formatter : Ke(t.formatter), this.value = Q(
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
   * The face's current value.
   * 
   * @public
   */
  faceValue() {
    return this.value;
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
function $t(e) {
  return new ct(e);
}
function xt(e = {}) {
  return {
    render: (t) => lt({
      el: t.el,
      labels: e.labels,
      dividers: e.dividers,
      value: t.face.faceValue()
    })
  };
}
function lt(e) {
  function t(c) {
    if (ae !== void 0)
      return c instanceof RegExp ? c : new RegExp(
        `[${(Array.isArray(c) ? c : [c]).join("|")}]`
      );
  }
  function r(c, a) {
    const s = t(a);
    return s ? c.match(s) : false;
  }
  function n(c, a, s) {
    if (Array.isArray(c)) {
      const g = typeof s == "string" || s == null ? void 0 : s.shift();
      return ot({
        el: a,
        label: typeof g == "string" ? g : void 0,
        children: (i) => c.map((u, d) => n(
          u,
          i == null ? void 0 : i.children.item(d),
          g
        ))
      });
    }
    return r(c, e.dividers) ? ae({
      el: a,
      value: c
    }) : ht({
      el: a,
      value: c
    });
  }
  const f = Array.isArray(e.labels) ? structuredClone(e.labels) : e.labels;
  return F({
    el: e.el,
    tagName: "div",
    class: {
      "flip-clock": true
    },
    children: e.value.digits.map((c, a) => {
      var s;
      return n(
        c,
        (s = e == null ? void 0 : e.el) == null ? void 0 : s.children.item(a),
        f
      );
    })
  });
}
function ot(e) {
  return F({
    el: e.el,
    tagName: "div",
    class: "flip-clock-group",
    children: (t) => [
      !!e.label && F({
        el: t.querySelector(".flip-clock-label"),
        tagName: "div",
        class: "flip-clock-label",
        children: [e.label]
      }),
      F({
        el: t.querySelector(".flip-clock-group-items"),
        tagName: "div",
        class: "flip-clock-group-items",
        children: e.children
      })
    ]
  });
}
function ht(e) {
  var f, c;
  const t = (f = e.el) == null ? void 0 : f.getAttribute("data-value"), r = F({
    el: e.el,
    tagName: "div",
    attrs: {
      "data-value": e.value
    },
    class: {
      "flip-clock-card": true,
      animate: ((c = e.el) == null ? void 0 : c.getAttribute("data-value")) !== e.value
    },
    events: {
      onanimationend() {
        n();
      }
    },
    children: (a) => {
      const s = se({
        el: a.children.item(0),
        value: e.value,
        class: "active"
      }), g = se({
        el: a.children.item(1),
        value: t,
        class: "before"
      });
      return [
        s,
        g
      ];
    }
  }), n = Qe(() => {
    r.classList.remove("animate");
  }, 100);
  return r;
}
function se(e) {
  return F({
    el: e.el,
    tagName: "div",
    class: {
      "flip-clock-card-item": true,
      [ce(e == null ? void 0 : e.class)]: !!(e != null && e.class)
    },
    children: (t) => [
      F({
        el: t.children.item(0),
        tagName: "div",
        class: "flip-clock-card-item-inner",
        children: (r) => [
          F({
            el: r.children.item(0),
            tagName: "div",
            class: "top",
            children: [(e == null ? void 0 : e.value) ?? " "]
          }),
          F({
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
function ae(e) {
  return F({
    el: e.el,
    tagName: "div",
    class: "flip-clock-divider",
    children: (t) => [
      F({
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
var St = {
  body: {
    background: "red"
  }
};
function Ct() {
}
export {
  at as Alphanumeric,
  ut as Clock,
  ft as Counter,
  be as EMPTY_CHAR,
  ct as ElapsedTime,
  it as EventEmitter,
  K as FaceValue,
  st as FlipClock,
  U as Timer,
  k as add,
  Ve as addDays,
  Ye as addMonths,
  bt as alphanumeric,
  ht as card,
  se as cardItem,
  _e as castDigitizedGroup,
  J as castDigitizedString,
  Ze as castDigitizedValues,
  P as characterRange,
  ce as classes,
  Dt as clock,
  I as compareAsc,
  mt as computed,
  et as count,
  Mt as counter,
  Xe as createSignal,
  St as css,
  Ne as dayAbbreviations,
  Oe as days,
  Se as daysInWeek,
  Qe as debounce,
  $e as defaultCharset,
  qe as differenceInCalendarMonths,
  Re as differenceInCalendarYears,
  fe as differenceInDays,
  Je as differenceInHours,
  Y as differenceInMilliseconds,
  Be as differenceInMinutes,
  We as differenceInMonths,
  Ue as differenceInSeconds,
  Pe as differenceInWeeks,
  He as differenceInYears,
  ae as divider,
  F as el,
  $t as elapsedTime,
  je as endOfDay,
  ze as endOfMonth,
  Q as faceValue,
  Me as fisherYatesShuffle,
  wt as flipClock,
  ne as getTwelveHourFormat,
  ot as group,
  V as isDigitizedGroup,
  vt as isDigitizedValues,
  Le as isLastDayOfMonth,
  ie as matchArrayStructure,
  Ce as millisecondsInDay,
  Fe as millisecondsInHour,
  ke as millisecondsInMinute,
  pe as monthAbbreviations,
  Ee as months,
  $ as pad,
  De as range,
  le as ref,
  lt as render,
  Ie as sort,
  tt as stop,
  yt as stopAfterChanges,
  B as stopWhen,
  Ge as style,
  Ct as test,
  xt as theme,
  At as timer,
  rt as trackChanges,
  xe as useCharset,
  Te as useDateFormats,
  G as useDefinitionMap,
  gt as useDictionary,
  ue as useDigitizer,
  Ke as useDurationFormats,
  nt as useSequencer,
  q as watchEffect
};
//# sourceMappingURL=flipclock.js.map
