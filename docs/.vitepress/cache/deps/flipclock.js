// node_modules/.pnpm/file+/node_modules/flipclock/dist/flipclock.es.js
var he = Object.defineProperty;
var de = (e, t, n) => t in e ? he(e, t, { enumerable: true, configurable: true, writable: true, value: n }) : e[t] = n;
var w = (e, t, n) => (de(e, typeof t != "symbol" ? t + "" : t, n), n);
var ge = " ";
function ie() {
  function e(s) {
    function f(i) {
      return i === void 0 ? "" : typeof i != "string" ? f(i.toString()) : i.length === 1 ? i : Array.from(i);
    }
    function c(i) {
      if (Array.isArray(i)) {
        for (let r = 0; r < i.length; r++)
          i[r] = c(i[r]);
        return i;
      }
      return f(i);
    }
    return Array.from(c(s));
  }
  function t(s) {
    function f(c) {
      const i = [];
      let r = false, a = true;
      for (let u = 0; u < c.length; u++) {
        if (Array.isArray(c[u])) {
          i.push(f(c[u])), r = a = true;
          continue;
        }
        a && (i.push(""), a = false), i[i.length - 1] += c[u];
      }
      return r ? i : i[0];
    }
    return f(s);
  }
  function n(s) {
    function f(c) {
      if (!Array.isArray(c))
        return false;
      for (const i in c)
        if (!(typeof c[i] == "string" && c[i].length === 1)) {
          if (Array.isArray(c[i])) {
            if (!c[i].length)
              continue;
          } else
            return false;
          if (!f(c[i]))
            return false;
        }
      return true;
    }
    return f(s);
  }
  return {
    digitize: e,
    isDigitized: n,
    undigitize: t
  };
}
function me(e = 0, t) {
  return Array.from(Array(t).keys()).map((n) => n + e);
}
function q(e, t) {
  return me(
    e.charCodeAt(0),
    t.charCodeAt(0) + 1 - e.charCodeAt(0)
  ).map((s) => String.fromCharCode(s));
}
function ye(e) {
  const t = [];
  for (; e.length; ) {
    const n = Math.floor(
      Math.random() * e.length
    );
    t.push(...e.splice(n, 1));
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
  const t = e.blacklist || [], n = e.whitelist || [], s = e.emptyChar || ge, f = typeof e.shuffle == "function" ? e.shuffle : e.shuffle ? ye : void 0;
  function c() {
    const l = (e == null ? void 0 : e.charset) || ve;
    return f ? f(l()) : l();
  }
  const i = c();
  function r(l) {
    const h = l.charCodeAt(0), b = i.map((D) => D.charCodeAt(0));
    return String.fromCharCode(
      b.reduce((D, v) => Math.abs(v - h) < Math.abs(D - h) ? v : D)
    );
  }
  function a(l, h = 1) {
    let b = [s, ...i, s, ...i];
    h < 0 && (b = b.reverse());
    let D = 1;
    l === void 0 ? l = s : b.includes(l) || (l = s, D = 0);
    const v = b.indexOf(l);
    return b.slice(
      v + D,
      b.indexOf(l, v + 1) + D
    ).splice(0, Math.abs(h));
  }
  function u(l, h, b = 1) {
    if (h === void 0 && l === s)
      return;
    if (typeof h == "string" && !i.includes(h))
      return h;
    if (l && (A(l) || h === l))
      return l;
    if (l && d(l))
      return r(l);
    const D = a(l, b);
    if (typeof h == "string" && D.includes(h))
      return h;
    if (!(h === void 0 && l && i.indexOf(D[b - 1]) < i.indexOf(l)))
      return D[b - 1];
  }
  function o(l, h, b = 1) {
    if (h === void 0 && l === s)
      return;
    if (typeof h == "string" && !i.includes(h))
      return h;
    if (l && (A(l) || h === l))
      return l;
    if (l && d(l))
      return r(l);
    const D = a(l, -b);
    if (typeof h == "string" && D.includes(h))
      return h;
    if (!(h === void 0 && l && i.indexOf(D[b - 1]) > i.indexOf(l)))
      return D[b - 1];
  }
  function d(l) {
    return t.includes(l);
  }
  function A(l) {
    return n.includes(l);
  }
  return {
    charset: i,
    chunk: a,
    emptyChar: s,
    isBlacklisted: d,
    isWhitelisted: A,
    next: u,
    prev: o
  };
}
function B(e) {
  const t = new Map(e);
  function n(f, c) {
    if (typeof f == "string" && c)
      t.set(f, c);
    else if (typeof f == "object")
      for (const i of Object.entries(f))
        t.set(i[0], i[1]);
  }
  function s(f) {
    if (Array.isArray(f))
      for (const c of f)
        t.delete(c);
    else
      t.delete(f);
  }
  return {
    map: t,
    define: n,
    unset: s
  };
}
function dt(e = {}) {
  const { map: t, define: n, unset: s } = B(Object.entries(e));
  function f(c) {
    const i = t.get(c);
    return typeof i == "function" ? i(c) : i === void 0 ? c : i;
  }
  return {
    map: t,
    define: n,
    translate: f,
    unset: s
  };
}
function we(e, t) {
  function n() {
    this.constructor = e;
  }
  n.prototype = t.prototype, e.prototype = new n();
}
function p(e, t, n, s) {
  var f = Error.call(this, e);
  return Object.setPrototypeOf && Object.setPrototypeOf(f, p.prototype), f.expected = t, f.found = n, f.location = s, f.name = "SyntaxError", f;
}
we(p, Error);
function H(e, t, n) {
  return n = n || " ", e.length > t ? e : (t -= e.length, n += n.repeat(t), e + n.slice(0, t));
}
p.prototype.format = function(e) {
  var t = "Error: " + this.message;
  if (this.location) {
    var n = null, s;
    for (s = 0; s < e.length; s++)
      if (e[s].source === this.location.source) {
        n = e[s].text.split(/\r\n|\n|\r/g);
        break;
      }
    var f = this.location.start, c = this.location.source && typeof this.location.source.offset == "function" ? this.location.source.offset(f) : f, i = this.location.source + ":" + c.line + ":" + c.column;
    if (n) {
      var r = this.location.end, a = H("", c.line.toString().length, " "), u = n[f.line - 1], o = f.line === r.line ? r.column : u.length + 1, d = o - f.column || 1;
      t += `
 --> ` + i + `
` + a + ` |
` + c.line + " | " + u + `
` + a + " | " + H("", f.column - 1, " ") + H("", d, "^");
    } else
      t += `
 at ` + i;
  }
  return t;
};
p.buildMessage = function(e, t) {
  var n = {
    literal: function(u) {
      return '"' + f(u.text) + '"';
    },
    class: function(u) {
      var o = u.parts.map(function(d) {
        return Array.isArray(d) ? c(d[0]) + "-" + c(d[1]) : c(d);
      });
      return "[" + (u.inverted ? "^" : "") + o.join("") + "]";
    },
    any: function() {
      return "any character";
    },
    end: function() {
      return "end of input";
    },
    other: function(u) {
      return u.description;
    }
  };
  function s(u) {
    return u.charCodeAt(0).toString(16).toUpperCase();
  }
  function f(u) {
    return u.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(o) {
      return "\\x0" + s(o);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(o) {
      return "\\x" + s(o);
    });
  }
  function c(u) {
    return u.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(o) {
      return "\\x0" + s(o);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(o) {
      return "\\x" + s(o);
    });
  }
  function i(u) {
    return n[u.type](u);
  }
  function r(u) {
    var o = u.map(i), d, A;
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
  function a(u) {
    return u ? '"' + f(u) + '"' : "end of input";
  }
  return "Expected " + r(e) + " but " + a(t) + " found.";
};
function be(e, t) {
  t = t !== void 0 ? t : {};
  var n = {}, s = t.grammarSource, f = { start: Z }, c = Z, i = "[", r = "]", a = /^[[\]]/, u = K("[", false), o = K("]", false), d = ue(["[", "]"], false, false), A = fe(), l = function(g) {
    return g.length === 1 && typeof g[0] == "string" || g.length === 1 && Array.isArray(g[0]) ? g[0] : g;
  }, h = function(g) {
    return [g];
  }, b = function(g) {
    return g;
  }, D = function(g) {
    return g.flat(1).join("");
  }, v = 0, O = [{ line: 1, column: 1 }], C = 0, V = [], k = 0, j;
  if ("startRule" in t) {
    if (!(t.startRule in f))
      throw new Error(`Can't start parsing from rule "` + t.startRule + '".');
    c = f[t.startRule];
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
    var m = O[g], y;
    if (m)
      return m;
    for (y = g - 1; !O[y]; )
      y--;
    for (m = O[y], m = {
      line: m.line,
      column: m.column
    }; y < g; )
      e.charCodeAt(y) === 10 ? (m.line++, m.column = 1) : m.column++, y++;
    return O[g] = m, m;
  }
  function X(g, m, y) {
    var F = Q(g), $ = Q(m), x = {
      source: s,
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
    return y && s && typeof s.offset == "function" && (x.start = s.offset(x.start), x.end = s.offset(x.end)), x;
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
    return g = v, m = R(), m !== n && (m = l(m)), g = m, g;
  }
  function R() {
    var g, m, y, F, $, x;
    for (g = v, m = [], y = L(), y === n && (y = v, e.charCodeAt(v) === 91 ? (F = i, v++) : (F = n, k === 0 && E(u)), F !== n ? ($ = L(), $ === n && ($ = R()), $ !== n ? (e.charCodeAt(v) === 93 ? (x = r, v++) : (x = n, k === 0 && E(o)), x !== n ? y = h($) : (v = y, y = n)) : (v = y, y = n)) : (v = y, y = n)); y !== n; )
      m.push(y), y = L(), y === n && (y = v, e.charCodeAt(v) === 91 ? (F = i, v++) : (F = n, k === 0 && E(u)), F !== n ? ($ = L(), $ === n && ($ = R()), $ !== n ? (e.charCodeAt(v) === 93 ? (x = r, v++) : (x = n, k === 0 && E(o)), x !== n ? y = h($) : (v = y, y = n)) : (v = y, y = n)) : (v = y, y = n));
    return m = b(m), g = m, g;
  }
  function L() {
    var g, m, y;
    if (g = v, m = [], y = _(), y !== n)
      for (; y !== n; )
        m.push(y), y = _();
    else
      m = n;
    return m !== n && (m = D(m)), g = m, g;
  }
  function _() {
    var g, m, y;
    return g = v, m = v, k++, a.test(e.charAt(v)) ? (y = e.charAt(v), v++) : (y = n, k === 0 && E(d)), k--, y === n ? m = void 0 : (v = m, m = n), m !== n ? (e.length > v ? (y = e.charAt(v), v++) : (y = n, k === 0 && E(A)), y !== n ? (m = [m, y], g = m) : (v = g, g = n)) : (v = g, g = n), g;
  }
  if (j = c(), j !== n && v === e.length)
    return j;
  throw j !== n && v < e.length && E(le()), oe(
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
var Oe = [
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
var ke = [
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
  const { map: t, define: n, unset: s } = B(Object.entries(
    Object.assign({
      A: (r) => r.getHours() < 12 ? "AM" : "PM",
      a: (r) => r.getHours() < 12 ? "am" : "pm",
      Q: (r) => Math.ceil((r.getMonth() + 1) / 3).toString(),
      YYYY: (r) => r.getFullYear().toString(),
      YY: (r) => M(r.getFullYear().toString().slice(2), 2),
      MMMM: (r) => Oe[r.getMonth()],
      MMM: (r) => ke[r.getMonth()],
      MM: (r) => M(r.getMonth() + 1, 2),
      M: (r) => String(r.getMonth() + 1),
      DDDD: (r) => Ce[r.getDay()],
      DDD: (r) => Fe[r.getDay()],
      DD: (r) => M(r.getDate(), 2),
      D: (r) => String(r.getDate()),
      HH: (r) => M(r.getHours(), 2),
      H: (r) => String(r.getHours()),
      hh: (r) => M(ee(r), 2),
      h: (r) => ee(r),
      mm: (r) => M(r.getMinutes(), 2),
      m: (r) => String(r.getMinutes()),
      ss: (r) => M(r.getSeconds(), 2),
      s: (r) => String(r.getSeconds()),
      vvvv: (r) => M(r.getMilliseconds(), 4),
      vvv: (r) => M(r.getMilliseconds(), 3),
      vv: (r) => M(r.getMilliseconds(), 2),
      v: (r) => String(r.getMilliseconds())
    }, e == null ? void 0 : e.formats)
  )), { digitize: f } = (e == null ? void 0 : e.digitizer) ?? ie();
  function c(r, a) {
    const u = new RegExp([...Ee(t)].join("|"), "g");
    return a.replace(u, (o) => {
      var l;
      const d = t.get(o);
      if (!d)
        return o;
      const A = d(r);
      return ((l = e == null ? void 0 : e.translate) == null ? void 0 : l.call(e, A)) ?? A;
    });
  }
  function i(r, a) {
    function u(o) {
      if (Array.isArray(o)) {
        for (const d of o) {
          const A = o.indexOf(d);
          Array.isArray(d) ? o.splice(A, 1, u(d)) : o.splice(A, 1, ...u(d));
        }
        return o;
      }
      return f(o);
    }
    return u(De(c(r, a)));
  }
  return { map: t, define: n, format: c, parse: i, unset: s };
}
function Ee(e) {
  return Array.from(e.keys()).sort((t, n) => t.length < n.length ? 1 : t.length > n.length ? -1 : 0);
}
function M(e, t) {
  return e === void 0 ? "" : (typeof e == "number" && (e = e.toString()), t < e.length ? e : Array(t - e.length + 1).join("0") + e);
}
function N(e, t) {
  const {
    years: n = 0,
    months: s = 0,
    weeks: f = 0,
    days: c = 0,
    hours: i = 0,
    minutes: r = 0,
    seconds: a = 0,
    milliseconds: u = 0
  } = t || {}, o = s || n ? Ie(e, s + n * 12) : new Date(e.getTime()), d = c || f ? pe(o, c + f * 7) : o, A = r + i * 60, h = (a + A * 60) * 1e3 + u;
  return new Date(d.getTime() + h);
}
function pe(e, t) {
  return isNaN(t) || !t || e.setDate(e.getDate() + t), e;
}
function Ie(e, t) {
  if (isNaN(t) || !t)
    return e;
  const n = e.getDate(), s = new Date(e.getTime());
  s.setMonth(e.getMonth() + t + 1, 0);
  const f = s.getDate();
  return n >= f ? s : (e.setFullYear(
    s.getFullYear(),
    s.getMonth(),
    n
  ), e);
}
function I(e, t) {
  const n = e.getTime() - t.getTime();
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function Te(e) {
  return e.setHours(23, 59, 59, 999), e;
}
function je(e) {
  const t = e.getMonth();
  return e.setFullYear(e.getFullYear(), t + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function Le(e) {
  const t = new Date(e);
  return Te(t).getTime() === je(t).getTime();
}
function Ye(e, t) {
  return e.getFullYear() - t.getFullYear();
}
function ze(e, t) {
  const n = e.getFullYear() - t.getFullYear(), s = e.getMonth() - t.getMonth();
  return n * 12 + s;
}
function Ve(e, t) {
  const n = new Date(e), s = new Date(t), f = I(n, s), c = Math.abs(Ye(n, s));
  n.setFullYear(1584), s.setFullYear(1584);
  const i = I(n, s) === -f, r = f * (c - Number(i));
  return r === 0 ? 0 : r;
}
function Re(e, t) {
  const n = new Date(e), s = new Date(t), f = I(n, s), c = Math.abs(ze(n, s));
  if (c < 1)
    return 0;
  n.getMonth() === 1 && n.getDate() > 27 && n.setDate(30), n.setMonth(n.getMonth() - f * c);
  let i = I(n, s) === -f;
  Le(n) && c === 1 && I(n, s) === 1 && (i = false);
  const r = f * (c - Number(i));
  return r === 0 ? 0 : r;
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
  const { el: t, tagName: n, attrs: s, class: f, events: c, style: i } = e, r = t && "tagName" in t && ((o = t == null ? void 0 : t.tagName) == null ? void 0 : o.toLowerCase()) === n.toLowerCase() ? t : document.createElement(n);
  if (t && "attributes" in t && (t != null && t.attributes))
    for (const { name: l } of t.attributes)
      r.removeAttribute(l);
  if (s)
    for (const [l, h] of Object.entries(s))
      r.setAttribute(l, h);
  if (f) {
    const l = ae(f);
    l ? r.setAttribute("class", l) : r.removeAttribute("class");
  }
  if (i) {
    const l = Je(i);
    l ? r.setAttribute("style", l) : r.removeAttribute("style");
  }
  if (c)
    for (const l in c) {
      const h = c[l];
      h && r.addEventListener(l.replace(/^on/, ""), (b) => {
        h.apply(r, [b]);
      });
    }
  let { children: a } = e;
  typeof a == "function" && (a = a(r));
  const u = a == null ? void 0 : a.filter(
    (l) => typeof l == "string" || l instanceof Node
  );
  if (u && u.length) {
    for (let l = 0; l < u.length; l++) {
      const h = u[l], b = r.childNodes.item(l);
      b !== h && (r.childNodes[l] ? b.replaceWith(h) : r.append(h));
    }
    for (; r.childNodes.length > ((u == null ? void 0 : u.length) ?? 0); )
      (d = r.childNodes[r.childNodes.length - 1]) == null || d.remove();
  } else
    for (; r.childNodes.length; )
      (A = r.lastChild) == null || A.remove();
  return r;
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
    for (const [n, s] of Object.entries(e))
      s && t.push(...n.split(" "));
  return t.join(" ");
}
function Je(e) {
  return typeof e == "string" ? e : Object.entries(e).map(([t, n]) => `${t}:${n}`).join(";");
}
function Be(e) {
  const { map: t, define: n, unset: s } = B(Object.entries(
    {
      Y: ["years", ({ years: r }, a) => M(r, a)],
      M: ["months", ({ months: r }, a) => M(r, a)],
      w: ["weeks", ({ weeks: r }, a) => M(r, a)],
      d: ["days", ({ days: r }, a) => M(r, a)],
      h: ["hours", ({ hours: r }, a) => M(r, a)],
      m: ["minutes", ({ minutes: r }, a) => M(r, a)],
      s: ["seconds", ({ seconds: r }, a) => M(r, a)],
      v: ["milliseconds", ({ milliseconds: r }, a) => M(r, a)]
    }
  )), f = {
    years: [
      (r, a) => Ve(r, a),
      (r, a) => N(r, { years: a })
    ],
    months: [
      (r, a) => Re(r, a),
      (r, a) => N(r, { months: a })
    ],
    weeks: [
      (r, a) => qe(r, a),
      (r, a) => N(r, { weeks: a })
    ],
    days: [
      (r, a) => se(r, a),
      (r, a) => N(r, { days: a })
    ],
    hours: [
      (r, a) => He(r, a),
      (r, a) => N(r, { hours: a })
    ],
    minutes: [
      (r, a) => We(r, a),
      (r, a) => N(r, { minutes: a })
    ],
    seconds: [
      (r, a) => Pe(r, a),
      (r, a) => N(r, { seconds: a })
    ],
    milliseconds: [
      (r, a) => T(r, a),
      (r, a) => N(r, { milliseconds: a })
    ]
  };
  function c(r, a, u) {
    const o = new RegExp(
      Array.from(t.keys()).map((h) => `${h}+`).join("|"),
      "g"
    ), d = u.match(o);
    if (!d)
      return u;
    const A = d.map((h) => t.get(h[0])).filter(Boolean), l = i(
      r,
      a,
      A.map(([h]) => h).flat(1)
    );
    return u.replace(o, (h) => {
      var v;
      const b = t.get(h[0]);
      if (!b)
        return h;
      const D = b[1](l, h.length);
      return ((v = e == null ? void 0 : e.translate) == null ? void 0 : v.call(e, D)) ?? D;
    });
  }
  function i(r, a, u) {
    const o = Object.keys(f), d = u ? u.sort((l, h) => o.indexOf(l) < o.indexOf(h) ? -1 : o.indexOf(l) < o.indexOf(h) ? 1 : 0) : o, [A] = d.map((l) => [l, f[l]]).reduce(([l, h], [b, [D, v]]) => {
      const O = D(a, h);
      return l[b] = O, [l, v(h, O)];
    }, [{}, new Date(r)]);
    return A;
  }
  return { map: t, define: n, duration: i, format: c, unset: s };
}
function Ue(e, t = 25) {
  let n;
  return function(...s) {
    clearTimeout(n), n = setTimeout(() => e.apply(this, s), t);
  };
}
var Y;
function Ge(e) {
  let t = e;
  const n = [];
  function s() {
    return Y && n.push(Y), t;
  }
  function f(i) {
    t = i, n.forEach((r) => r());
  }
  function c() {
    return t = e, n.splice(0, n.length), t;
  }
  return [s, f, c];
}
function U(e) {
  Y = e, e(), Y = void 0;
}
function Ke(e) {
  const [t, n] = Ge(e);
  return new Proxy({ value: e }, {
    get() {
      return t();
    },
    set(s, f, c) {
      return s.value = c, n(c), true;
    }
  });
}
function gt(e) {
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
function te(e, t, n, s) {
  typeof n == "function" ? (s = n, n = {}) : n || (n = {});
  const f = !n.backwards;
  function c(i, r) {
    if (z(r)) {
      i = Xe(i);
      const a = Math.max(r.length, i.length);
      for (let u = f ? 0 : a - 1; f ? u < a : u >= 0; f ? u++ : u--) {
        const o = i[u] ? c(i[u], r[u]) : c([], r[u]);
        i[u] ? i[u] = o : i.push(o);
      }
      for (let u = 0; u < i.length; u++)
        i[u] === void 0 && i.splice(u, 1);
      return i;
    }
    if (Ze(r)) {
      i = Qe(i);
      let a = 0;
      for (; a < i.length; ) {
        const u = f ? a : i.length - 1 - a, o = f ? a : r.length - 1 - a;
        i[u] = c(
          i[u],
          r[o]
        ), i[u] === void 0 ? i.splice(u, 1) : a++;
      }
      for (let u = f ? i.length : r.length - 1; f ? u < r.length : u >= i.length; f ? u++ : u--) {
        const o = c(void 0, r[u]);
        if (o === void 0)
          break;
        i.push(o);
      }
      return i;
    }
    return s ? s(W(i), r) : r === void 0 ? void 0 : W(i);
  }
  return c(e, t);
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
  return (...n) => {
    const [s] = n;
    let f = typeof s == "object" || Array.isArray(s) ? JSON.stringify(s) : s;
    const c = e(t, ...n);
    if (c && typeof c == "object" && "stop" in c && c.stop === true)
      return s;
    const i = c;
    let r = typeof i == "object" || Array.isArray(i) ? JSON.stringify(i) : i;
    return f !== r && t.push({
      from: s,
      to: i
    }), i;
  };
}
function P(e, t) {
  return et((n, ...s) => e(n, ...s) ? t(...s) : _e());
}
function mt(e, t) {
  return P((n, ...s) => n.length < e, t);
}
function tt(e) {
  const { charset: t, next: n, prev: s } = e != null && e.charset && "next" in e.charset ? e.charset : Ae(e == null ? void 0 : e.charset);
  function f(i, r, a = 1, u = false) {
    const o = {
      backwards: u,
      ...e == null ? void 0 : e.matchArray
    };
    return i.digits = te(
      i.digits,
      r.digits,
      o,
      P((d, A, l) => e != null && e.stopWhen ? e.stopWhen(d, A, l) : e != null && e.stopAfterChanges ? d.length < e.stopAfterChanges : true, (d, A) => d === A ? d : s(d ?? "", A, a))
    ), i;
  }
  function c(i, r, a = 1, u = false) {
    const o = {
      backwards: u,
      ...e == null ? void 0 : e.matchArray
    };
    return i.digits = te(
      i.digits,
      r.digits,
      o,
      P((d, A, l) => e != null && e.stopWhen ? e == null ? void 0 : e.stopWhen(d, A, l) : e != null && e.stopAfterChanges ? d.length < e.stopAfterChanges : true, (d, A) => d === A ? d : n(d, A, a))
    ), i;
  }
  return {
    charset: t,
    decrement: f,
    increment: c
  };
}
var rt = class {
  constructor() {
    w(this, "events", []);
  }
  /**
   * Emit an event.
  */
  emit(t, ...n) {
    for (const s of this.events)
      s.key === t && s.fn(...n);
  }
  /**
   * Listen for an event.
   */
  on(t, n) {
    const s = () => {
      const f = this.events.findIndex((c) => c.key === t && c.fn === n);
      this.events.splice(f, 1);
    };
    return this.events.push({ key: t, fn: n, unwatch: s }), s;
  }
  /**
   * Listen for an event once.
   */
  once(t, n) {
    const s = this.on(t, (...f) => {
      n(...f), s();
    });
  }
  off(t, n) {
    for (const s of this.events)
      s.key === t && (!n || n === s.fn) && s.unwatch();
  }
  /**
   * Unwatch and remove all the events.
   */
  unwatch() {
    for (const { unwatch: t } of this.events)
      t();
  }
};
var G = class _G {
  /**
   * Instantiate the face value.
   */
  constructor(t, n) {
    w(this, "$carryLength");
    w(this, "digitizer");
    w(this, "$value");
    this.digitizer = (n == null ? void 0 : n.digitizer) || ie(), this.$value = Ke(t), this.$carryLength = this.digits.length, U(() => {
      this.$carryLength = this.digits.length;
    });
  }
  get carryLength() {
    return this.$carryLength;
  }
  get digits() {
    return this.digitizer.digitize(this.value);
  }
  set digits(t) {
    this.value = this.digitizer.undigitize(t);
  }
  get minimumLength() {
    var t;
    return Math.max(
      this.carryLength || 0,
      ((t = this.digits) == null ? void 0 : t.flat().length) || 0
    );
  }
  get length() {
    return this.digits.flat(1 / 0).length;
  }
  get value() {
    return this.$value.value;
  }
  set value(t) {
    this.$value.value = t;
  }
  /**
   * Compare the face value with the given subject.
   */
  compare(t) {
    return JSON.stringify(this.value) === JSON.stringify(t.value);
  }
  /**
   * Create a new instance with the given value.
   */
  copy(t, n = {}) {
    return new _G(t === void 0 ? this.value : t, Object.assign({
      digitizer: this.digitizer
    }, n));
  }
};
function ce(e, t) {
  return new G(e, t);
}
var J = class {
  /**
   * Create a new `Timer` instance.
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
   */
  get count() {
    return this.$count;
  }
  /**
   * The `elapsed` attribute.
   */
  get elapsed() {
    return this.$startDate ? Math.max(0, Date.now() - this.$startDate.getTime()) : 0;
  }
  /**
   * The `elapsedSinceLastLoop` attribute.
   */
  get elapsedSinceLastLoop() {
    return this.lastLoop ? Date.now() - this.lastLoop : this.lastLoop;
  }
  /**
   * Determines if the Timer is currently running.
   */
  get isRunning() {
    return this.$handle !== void 0;
  }
  /**
   * Determines if the Timer is currently stopped.
   */
  get isStopped() {
    return this.$handle === void 0;
  }
  /**
   * Get the last timestamp the timer looped.
   */
  get lastLoop() {
    return this.$lastLoop || 0;
  }
  /**
   * Get the date object when the timer started.
   */
  get started() {
    return this.$startDate;
  }
  /**
   * Resets the timer. If a callback is provided, re-start the clock.
   */
  reset(t) {
    return this.stop(() => {
      this.$count = 0, this.$lastLoop = 0, this.start(t);
    }), this;
  }
  /**
   * Starts the timer.
   */
  start(t) {
    this.$startDate = /* @__PURE__ */ new Date();
    const n = () => (Date.now() - this.lastLoop >= this.interval && (typeof t == "function" && t(this), this.$lastLoop = Date.now(), this.$count++), this.$handle = window.requestAnimationFrame(n), this);
    return n();
  }
  /**
   * Stops the timer.
   */
  stop(t) {
    return this.isRunning && this.$handle && (window.cancelAnimationFrame(this.$handle), this.$handle = void 0, typeof t == "function" && t(this)), this;
  }
};
function yt(e = 1e3) {
  return new J(e);
}
function nt(e = {}) {
  return {
    render: (t) => it({
      el: t.el,
      labels: e.labels,
      dividers: e.dividers,
      value: t.face.value
    })
  };
}
function it(e) {
  function t(c) {
    if (ne !== void 0)
      return c instanceof RegExp ? c : new RegExp(
        `[${(Array.isArray(c) ? c : [c]).join("|")}]`
      );
  }
  function n(c, i) {
    const r = t(i);
    return r ? c.match(r) : false;
  }
  function s(c, i, r) {
    if (Array.isArray(c)) {
      const a = typeof r == "string" || r == null ? void 0 : r.shift();
      return st({
        el: i,
        label: typeof a == "string" ? a : void 0,
        children: (u) => c.map((o, d) => s(
          o,
          u == null ? void 0 : u.children.item(d),
          a
        ))
      });
    }
    return n(c, e.dividers) ? ne({
      el: i,
      value: c
    }) : at({
      el: i,
      value: c
    });
  }
  const f = Array.isArray(e.labels) ? structuredClone(e.labels) : e.labels;
  return S({
    el: e.el,
    tagName: "div",
    class: {
      "flip-clock": true
    },
    children: e.value.digits.map((c, i) => {
      var r;
      return s(
        c,
        (r = e == null ? void 0 : e.el) == null ? void 0 : r.children.item(i),
        f
      );
    })
  });
}
function st(e) {
  return S({
    el: e.el,
    tagName: "div",
    class: "flip-clock-group",
    children: (t) => [
      !!e.label && S({
        el: t.querySelector(".flip-clock-label"),
        tagName: "div",
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
function at(e) {
  var f, c;
  const t = (f = e.el) == null ? void 0 : f.getAttribute("data-value"), n = S({
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
        s();
      }
    },
    children: (i) => {
      const r = re({
        el: i.children.item(0),
        value: e.value,
        class: "active"
      }), a = re({
        el: i.children.item(1),
        value: t,
        class: "before"
      });
      return [
        r,
        a
      ];
    }
  }), s = Ue(() => {
    n.classList.remove("animate");
  }, 100);
  return n;
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
        children: (n) => [
          S({
            el: n.children.item(0),
            tagName: "div",
            class: "top",
            children: [(e == null ? void 0 : e.value) ?? " "]
          }),
          S({
            el: n.children.item(1),
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
var ct = class {
  /**
   * Construct the FlipClock.
   */
  constructor(t) {
    w(this, "autoStart", true);
    w(this, "el");
    w(this, "emitter");
    w(this, "face");
    w(this, "theme");
    w(this, "timer");
    this.face = t.face, this.theme = t.theme ?? nt(), this.emitter = t.emitter || new rt(), typeof t.autoStart == "boolean" && (this.autoStart = t.autoStart), this.timer = t.timer instanceof J ? t.timer : new J(t.timer), this.hook("afterCreate", this), t.el && this.mount(t.el);
  }
  get animationRate() {
    var t;
    return this.el ? parseInt((t = getComputedStyle(this.el)) == null ? void 0 : t.animationDuration.replace(/s$/, "")) * 1e3 : 0;
  }
  /**
   * Mount the clock instance to the DOM.
   */
  mount(t) {
    return this.hook("beforeMount", this), this.el = t, U(() => {
      this.theme.render(this);
    }), this.hook("afterMount", this), this.autoStart && this.timer.isStopped && window.requestAnimationFrame(() => this.start()), this;
  }
  /**
   * Start the clock instance.
   */
  start(t) {
    return this.hook("beforeStart", this), this.timer.start(() => {
      requestAnimationFrame(() => {
        this.hook("beforeInterval", this), this.face.interval(this), this.hook("afterInterval", this), typeof t == "function" && t(this);
      });
    }), this.hook("afterStart", this), this;
  }
  /**
   * Stop the clock instance.
   */
  stop(t) {
    return this.hook("beforeStop", this), this.timer.stop(() => {
      typeof t == "function" && t(this), this.hook("afterStop", this);
    }), this;
  }
  /**
   * Toggle starting/stopping the clock instance.
   */
  toggle(t) {
    return this.timer.isStopped ? this.start(t) : this.stop(t), this;
  }
  /**
   * Unmount the clock instance from the DOM.
   */
  unmount() {
    var t, n;
    return this.hook("beforeUnmount", this), (n = (t = this.el) == null ? void 0 : t.parentElement) == null || n.removeChild(this.el), this.hook("afterUnmount", this), this;
  }
  /**
   * Dispatch the event and call the method that corresponds to given hook.
   */
  hook(t, ...n) {
    if (t in this.face && typeof this.face[t] == "function") {
      const s = this.face[t];
      s == null || s.apply(this.face, n);
    }
    if (t in this.theme && typeof this.theme[t] == "function") {
      const s = this.theme[t];
      s == null || s(...n);
    }
    this.emitter.emit(t, ...n);
  }
};
function vt(e) {
  return new ct(e);
}
var ut = class {
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
   * @internal
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
function At(e) {
  return new ut(e);
}
var ft = class {
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
   * @internal
   */
  interval(t) {
    if (!this.date)
      this.value.value = this.formatter.parse(/* @__PURE__ */ new Date(), this.format);
    else {
      const n = /* @__PURE__ */ new Date();
      n.setTime(this.date.getTime() + t.timer.elapsed), this.value.value = this.formatter.parse(n, this.format);
    }
  }
};
function wt(e) {
  return new ft(e);
}
var lt = class {
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
   * @internal
   */
  interval() {
    this.countdown ? this.decrement() : this.increment();
  }
};
function bt(e) {
  return new lt(e);
}
var ot = class {
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
   * @internal
   */
  interval() {
    this.value.value = this.formatter.format(this.span.start, this.span.end, this.format);
  }
};
function Dt(e) {
  return new ot(e);
}
export {
  ut as Alphanumeric,
  ft as Clock,
  lt as Counter,
  ge as EMPTY_CHAR,
  ot as ElapsedTime,
  rt as EventEmitter,
  G as FaceValue,
  ct as FlipClock,
  J as Timer,
  N as add,
  pe as addDays,
  Ie as addMonths,
  At as alphanumeric,
  Xe as castDigitizedGroup,
  W as castDigitizedString,
  Qe as castDigitizedValues,
  q as characterRange,
  ae as classes,
  wt as clock,
  I as compareAsc,
  gt as computed,
  bt as counter,
  Ge as createSignal,
  Fe as dayAbbreviations,
  Ce as days,
  Me as daysInWeek,
  Ue as debounce,
  ve as defaultCharset,
  ze as differenceInCalendarMonths,
  Ye as differenceInCalendarYears,
  se as differenceInDays,
  He as differenceInHours,
  T as differenceInMilliseconds,
  We as differenceInMinutes,
  Re as differenceInMonths,
  Pe as differenceInSeconds,
  qe as differenceInWeeks,
  Ve as differenceInYears,
  S as el,
  Dt as elapsedTime,
  Te as endOfDay,
  je as endOfMonth,
  ce as faceValue,
  ye as fisherYatesShuffle,
  vt as flipClock,
  ee as getTwelveHourFormat,
  z as isDigitizedGroup,
  Ze as isDigitizedValues,
  Le as isLastDayOfMonth,
  te as matchArrayStructure,
  $e as millisecondsInDay,
  xe as millisecondsInHour,
  Se as millisecondsInMinute,
  ke as monthAbbreviations,
  Oe as months,
  M as pad,
  me as range,
  Ke as ref,
  Ee as sort,
  _e as stop,
  mt as stopAfterChanges,
  P as stopWhen,
  Je as style,
  nt as theme,
  yt as timer,
  et as trackChanges,
  Ae as useCharset,
  Ne as useDateFormats,
  B as useDefinitionMap,
  dt as useDictionary,
  ie as useDigitizer,
  Be as useDurationFormats,
  tt as useSequencer,
  U as watchEffect
};
//# sourceMappingURL=flipclock.js.map
