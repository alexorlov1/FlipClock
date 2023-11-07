// node_modules/.pnpm/file+/node_modules/flipclock/dist/flipclock.es.js
var Ae = Object.defineProperty;
var xe = (e, t, r) => t in e ? Ae(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r;
var b = (e, t, r) => (xe(e, typeof t != "symbol" ? t + "" : t, r), r);
function De(e, t) {
  function r() {
    this.constructor = e;
  }
  r.prototype = t.prototype, e.prototype = new r();
}
function I(e, t, r, n) {
  var s = Error.call(this, e);
  return Object.setPrototypeOf && Object.setPrototypeOf(s, I.prototype), s.expected = t, s.found = r, s.location = n, s.name = "SyntaxError", s;
}
De(I, Error);
function _(e, t, r) {
  return r = r || " ", e.length > t ? e : (t -= e.length, r += r.repeat(t), e + r.slice(0, t));
}
I.prototype.format = function(e) {
  var t = "Error: " + this.message;
  if (this.location) {
    var r = null, n;
    for (n = 0; n < e.length; n++)
      if (e[n].source === this.location.source) {
        r = e[n].text.split(/\r\n|\n|\r/g);
        break;
      }
    var s = this.location.start, f = this.location.source && typeof this.location.source.offset == "function" ? this.location.source.offset(s) : s, o = this.location.source + ":" + f.line + ":" + f.column;
    if (r) {
      var i = this.location.end, h = _("", f.line.toString().length, " "), a = r[s.line - 1], c = s.line === i.line ? i.column : a.length + 1, m = c - s.column || 1;
      t += `
 --> ` + o + `
` + h + ` |
` + f.line + " | " + a + `
` + h + " | " + _("", s.column - 1, " ") + _("", m, "^");
    } else
      t += `
 at ` + o;
  }
  return t;
};
I.buildMessage = function(e, t) {
  var r = {
    literal: function(a) {
      return '"' + s(a.text) + '"';
    },
    class: function(a) {
      var c = a.parts.map(function(m) {
        return Array.isArray(m) ? f(m[0]) + "-" + f(m[1]) : f(m);
      });
      return "[" + (a.inverted ? "^" : "") + c.join("") + "]";
    },
    any: function() {
      return "any character";
    },
    end: function() {
      return "end of input";
    },
    other: function(a) {
      return a.description;
    }
  };
  function n(a) {
    return a.charCodeAt(0).toString(16).toUpperCase();
  }
  function s(a) {
    return a.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(c) {
      return "\\x0" + n(c);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(c) {
      return "\\x" + n(c);
    });
  }
  function f(a) {
    return a.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(c) {
      return "\\x0" + n(c);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(c) {
      return "\\x" + n(c);
    });
  }
  function o(a) {
    return r[a.type](a);
  }
  function i(a) {
    var c = a.map(o), m, y;
    if (c.sort(), c.length > 0) {
      for (m = 1, y = 1; m < c.length; m++)
        c[m - 1] !== c[m] && (c[y] = c[m], y++);
      c.length = y;
    }
    switch (c.length) {
      case 1:
        return c[0];
      case 2:
        return c[0] + " or " + c[1];
      default:
        return c.slice(0, -1).join(", ") + ", or " + c[c.length - 1];
    }
  }
  function h(a) {
    return a ? '"' + s(a) + '"' : "end of input";
  }
  return "Expected " + i(e) + " but " + h(t) + " found.";
};
function ke(e, t) {
  t = t !== void 0 ? t : {};
  var r = {}, n = t.grammarSource, s = { start: ae }, f = ae, o = "[", i = "]", h = /^[[\]]/, a = re("[", false), c = re("]", false), m = ye(["[", "]"], false, false), y = be(), l = function(u) {
    return () => u;
  }, v = function(u) {
    return oe(u);
  }, w = function(u) {
    return () => u;
  }, A = function(u) {
    return oe(u);
  }, $ = function(u) {
    return u.flat(1).filter(Boolean);
  }, p = 0, N = [{ line: 1, column: 1 }], k = 0, J = [], O = 0, H;
  if ("startRule" in t) {
    if (!(t.startRule in s))
      throw new Error(`Can't start parsing from rule "` + t.startRule + '".');
    f = s[t.startRule];
  }
  function re(u, d) {
    return { type: "literal", text: u, ignoreCase: d };
  }
  function ye(u, d, g) {
    return { type: "class", parts: u, inverted: d, ignoreCase: g };
  }
  function be() {
    return { type: "any" };
  }
  function pe() {
    return { type: "end" };
  }
  function ne(u) {
    var d = N[u], g;
    if (d)
      return d;
    for (g = u - 1; !N[g]; )
      g--;
    for (d = N[g], d = {
      line: d.line,
      column: d.column
    }; g < u; )
      e.charCodeAt(g) === 10 ? (d.line++, d.column = 1) : d.column++, g++;
    return N[u] = d, d;
  }
  function ie(u, d, g) {
    var x = ne(u), M = ne(d), j = {
      source: n,
      start: {
        offset: u,
        line: x.line,
        column: x.column
      },
      end: {
        offset: d,
        line: M.line,
        column: M.column
      }
    };
    return g && n && typeof n.offset == "function" && (j.start = n.offset(j.start), j.end = n.offset(j.end)), j;
  }
  function T(u) {
    p < k || (p > k && (k = p, J = []), J.push(u));
  }
  function we(u, d, g) {
    return new I(
      I.buildMessage(u, d),
      u,
      d,
      g
    );
  }
  function ae() {
    var u, d, g, x;
    for (u = p, d = [], g = p, x = R(), x !== r && (x = l(x)), g = x, g === r && (g = L()); g !== r; )
      d.push(g), g = p, x = R(), x !== r && (x = l(x)), g = x, g === r && (g = L());
    return d = v(d), u = d, u;
  }
  function L() {
    var u, d, g, x, M;
    if (u = p, e.charCodeAt(p) === 91 ? (d = o, p++) : (d = r, O === 0 && T(a)), d !== r) {
      if (g = [], x = p, M = R(), M !== r && (M = w(M)), x = M, x === r && (x = L()), x !== r)
        for (; x !== r; )
          g.push(x), x = p, M = R(), M !== r && (M = w(M)), x = M, x === r && (x = L());
      else
        g = r;
      g !== r ? (e.charCodeAt(p) === 93 ? (x = i, p++) : (x = r, O === 0 && T(c)), x !== r ? u = A(g) : (p = u, u = r)) : (p = u, u = r);
    } else
      p = u, u = r;
    return u;
  }
  function R() {
    var u, d, g;
    if (u = p, d = [], g = se(), g !== r)
      for (; g !== r; )
        d.push(g), g = se();
    else
      d = r;
    return d !== r && (d = $(d)), u = d, u;
  }
  function se() {
    var u, d, g;
    return u = p, d = p, O++, h.test(e.charAt(p)) ? (g = e.charAt(p), p++) : (g = r, O === 0 && T(m)), O--, g === r ? d = void 0 : (p = d, d = r), d !== r ? (e.length > p ? (g = e.charAt(p), p++) : (g = r, O === 0 && T(y)), g !== r ? (d = [d, g], u = d) : (p = u, u = r)) : (p = u, u = r), u;
  }
  function oe(u) {
    for (const d of u)
      typeof d == "function" && u.splice(u.indexOf(d), 1, ...d());
    return u;
  }
  if (H = f(), H !== r && p === e.length)
    return H;
  throw H !== r && p < e.length && T(pe()), we(
    J,
    k < e.length ? e.charAt(k) : null,
    k < e.length ? ie(k, k + 1) : ie(k, k)
  );
}
var Me = ke;
var $e = " ";
function Se() {
  function e(r) {
    if (r === void 0)
      return [];
    if (typeof r == "string")
      return r.match(/\[|\]/) ? Me(r) : Array.from(r);
    if (typeof r == "number")
      return Array.from(r.toString());
    for (const n of r) {
      const s = r.indexOf(n), f = e(n);
      typeof n == "string" ? r.splice(s, 1, ...f) : r.splice(s, 1, f);
    }
    return r.filter(Boolean);
  }
  function t(r) {
    function n(s) {
      if (!Array.isArray(s))
        return false;
      for (const f in s)
        if (!(typeof s[f] == "string" && s[f].length === 1)) {
          if (Array.isArray(s[f])) {
            if (!s[f].length)
              continue;
          } else
            return false;
          if (!n(s[f]))
            return false;
        }
      return true;
    }
    return n(r);
  }
  return {
    digitize: e,
    isDigitized: t
  };
}
function Ce(e = 0, t) {
  return Array.from(Array(t).keys()).map((r) => r + e);
}
function B(e, t) {
  return Ce(
    e.charCodeAt(0),
    t.charCodeAt(0) + 1 - e.charCodeAt(0)
  ).map((n) => String.fromCharCode(n));
}
function Fe(e) {
  const t = [];
  for (; e.length; ) {
    const r = Math.floor(
      Math.random() * e.length
    );
    t.push(...e.splice(r, 1));
  }
  return t;
}
function Ne() {
  return [
    ...B("a", "z"),
    ...B("A", "Z"),
    ...B("0", "9"),
    ":",
    "-",
    ".",
    ",",
    "!",
    "?"
  ];
}
function Oe(e = {}) {
  const t = e.blacklist || [], r = e.whitelist || [], n = e.emptyChar || $e, s = typeof e.shuffle == "function" ? e.shuffle : e.shuffle ? Fe : void 0;
  function f() {
    const l = (e == null ? void 0 : e.charset) || Ne;
    return s ? s(l()) : l();
  }
  const o = f();
  function i(l) {
    const v = l.charCodeAt(0), w = o.map((A) => A.charCodeAt(0));
    return String.fromCharCode(
      w.reduce((A, $) => Math.abs($ - v) < Math.abs(A - v) ? $ : A)
    );
  }
  function h(l, v = 1) {
    let w = [n, ...o, n, ...o];
    v < 0 && (w = w.reverse());
    let A = 1;
    l === void 0 ? l = n : w.includes(l) || (l = n, A = 0);
    const $ = w.indexOf(l);
    return w.slice(
      $ + A,
      w.indexOf(l, $ + 1) + A
    ).splice(0, Math.abs(v));
  }
  function a(l, v, w = 1) {
    if (v === void 0 && l === n)
      return;
    if (typeof v == "string" && !o.includes(v))
      return v;
    if (l && (y(l) || v === l))
      return l;
    if (l && m(l))
      return i(l);
    const A = h(l, w);
    if (typeof v == "string" && A.includes(v))
      return v;
    if (!(v === void 0 && l && o.indexOf(A[w - 1]) < o.indexOf(l)))
      return A[w - 1];
  }
  function c(l, v, w = 1) {
    if (v === void 0 && l === n)
      return;
    if (typeof v == "string" && !o.includes(v))
      return v;
    if (l && (y(l) || v === l))
      return l;
    if (l && m(l))
      return i(l);
    const A = h(l, -w);
    if (typeof v == "string" && A.includes(v))
      return v;
    if (!(v === void 0 && l && o.indexOf(A[w - 1]) > o.indexOf(l)))
      return A[w - 1];
  }
  function m(l) {
    return t.includes(l);
  }
  function y(l) {
    return r.includes(l);
  }
  return {
    charset: o,
    chunk: h,
    emptyChar: n,
    isBlacklisted: m,
    isWhitelisted: y,
    next: a,
    prev: c
  };
}
function Q(e) {
  const t = new Map(e);
  function r(s, f) {
    if (typeof s == "string" && f)
      t.set(s, f);
    else if (typeof s == "object")
      for (const o of Object.entries(s))
        t.set(o[0], o[1]);
  }
  function n(s) {
    if (Array.isArray(s))
      for (const f of s)
        t.delete(f);
    else
      t.delete(s);
  }
  return {
    map: t,
    define: r,
    unset: n
  };
}
function Dt(e = {}) {
  const { map: t, define: r, unset: n } = Q(Object.entries(e));
  function s(f) {
    const o = t.get(f);
    return typeof o == "function" ? o(f) : o === void 0 ? f : o;
  }
  return {
    map: t,
    define: r,
    translate: s,
    unset: n
  };
}
var Ie = 7;
var Ee = 864e5;
var Te = 36e5;
var je = 6e4;
var ze = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
var Ve = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun"
];
var Ye = [
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
var He = [
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
function Le(e) {
  var o;
  const { map: t, define: r, unset: n } = Q(Object.entries(
    Object.assign({
      A: (i) => i.getHours() < 12 ? "AM" : "PM",
      a: (i) => i.getHours() < 12 ? "am" : "pm",
      Q: (i) => Math.ceil((i.getMonth() + 1) / 3).toString(),
      YYYY: (i) => i.getFullYear().toString(),
      YY: (i) => D(i.getFullYear().toString().slice(2), 2),
      MMMM: (i) => Ye[i.getMonth()],
      MMM: (i) => He[i.getMonth()],
      MM: (i) => D(i.getMonth() + 1, 2),
      M: (i) => String(i.getMonth() + 1),
      DDDD: (i) => ze[i.getDay()],
      DDD: (i) => Ve[i.getDay()],
      DD: (i) => D(i.getDate(), 2),
      D: (i) => String(i.getDate()),
      HH: (i) => D(i.getHours(), 2),
      H: (i) => String(i.getHours()),
      hh: (i) => D(ce(i), 2),
      h: (i) => ce(i),
      mm: (i) => D(i.getMinutes(), 2),
      m: (i) => String(i.getMinutes()),
      ss: (i) => D(i.getSeconds(), 2),
      s: (i) => String(i.getSeconds()),
      vvvv: (i) => D(i.getMilliseconds(), 4),
      vvv: (i) => D(i.getMilliseconds(), 3),
      vv: (i) => D(i.getMilliseconds(), 2),
      v: (i) => String(i.getMilliseconds())
    }, e == null ? void 0 : e.formats)
  )), s = typeof (e == null ? void 0 : e.translate) == "function" ? e.translate : (o = e == null ? void 0 : e.translate) == null ? void 0 : o.translate;
  function f(i, h) {
    const a = new RegExp([...Re(t)].join("|"), "g");
    return h.replace(a, (c) => {
      const m = t.get(c);
      if (!m)
        return c;
      const y = m(i);
      return (s == null ? void 0 : s(y)) ?? y;
    });
  }
  return { map: t, define: r, format: f, unset: n };
}
function Re(e) {
  return Array.from(e.keys()).sort((t, r) => t.length < r.length ? 1 : t.length > r.length ? -1 : 0);
}
function D(e, t) {
  return e === void 0 ? "" : (typeof e == "number" && (e = e.toString()), t < e.length ? e : Array(t - e.length + 1).join("0") + e);
}
function C(e, t) {
  const {
    years: r = 0,
    months: n = 0,
    weeks: s = 0,
    days: f = 0,
    hours: o = 0,
    minutes: i = 0,
    seconds: h = 0,
    milliseconds: a = 0
  } = t || {}, c = n || r ? We(e, n + r * 12) : new Date(e.getTime()), m = f || s ? qe(c, f + s * 7) : c, y = i + o * 60, v = (h + y * 60) * 1e3 + a;
  return new Date(m.getTime() + v);
}
function qe(e, t) {
  return isNaN(t) || !t || e.setDate(e.getDate() + t), e;
}
function We(e, t) {
  if (isNaN(t) || !t)
    return e;
  const r = e.getDate(), n = new Date(e.getTime());
  n.setMonth(e.getMonth() + t + 1, 0);
  const s = n.getDate();
  return r >= s ? n : (e.setFullYear(
    n.getFullYear(),
    n.getMonth(),
    r
  ), e);
}
function z(e, t) {
  const r = e.getTime() - t.getTime();
  return r < 0 ? -1 : r > 0 ? 1 : r;
}
function Pe(e) {
  return e.setHours(23, 59, 59, 999), e;
}
function Je(e) {
  const t = e.getMonth();
  return e.setFullYear(e.getFullYear(), t + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function _e(e) {
  const t = new Date(e);
  return Pe(t).getTime() === Je(t).getTime();
}
function Be(e, t) {
  return e.getFullYear() - t.getFullYear();
}
function Xe(e, t) {
  const r = e.getFullYear() - t.getFullYear(), n = e.getMonth() - t.getMonth();
  return r * 12 + n;
}
function Ue(e, t) {
  const r = new Date(e), n = new Date(t), s = z(r, n), f = Math.abs(Be(r, n));
  r.setFullYear(1584), n.setFullYear(1584);
  const o = z(r, n) === -s, i = s * (f - Number(o));
  return i === 0 ? 0 : i;
}
function Ge(e, t) {
  const r = new Date(e), n = new Date(t), s = z(r, n), f = Math.abs(Xe(r, n));
  if (f < 1)
    return 0;
  r.getMonth() === 1 && r.getDate() > 27 && r.setDate(30), r.setMonth(r.getMonth() - s * f);
  let o = z(r, n) === -s;
  _e(r) && f === 1 && z(r, n) === 1 && (o = false);
  const i = s * (f - Number(o));
  return i === 0 ? 0 : i;
}
function Ke(e, t) {
  return Math.floor(he(e, t) / Ie);
}
function he(e, t) {
  return Math.floor(Y(e, t) / Ee);
}
function Ze(e, t) {
  return Math.floor(Y(e, t) / Te);
}
function Qe(e, t) {
  return Math.floor(Y(e, t) / je);
}
function de(e, t) {
  return Math.floor(Y(e, t) / 1e3);
}
function Y(e, t) {
  return new Date(e).getTime() - new Date(t).getTime();
}
function ce(e) {
  const t = e.getHours() % 12;
  return String(t === 0 ? 12 : t);
}
function S(e) {
  var c, m, y;
  const { el: t, tagName: r, attrs: n, class: s, events: f, style: o } = e, i = t && "tagName" in t && ((c = t == null ? void 0 : t.tagName) == null ? void 0 : c.toLowerCase()) === r.toLowerCase() ? t : document.createElement(r);
  if (t && "attributes" in t && (t != null && t.attributes))
    for (const { name: l } of t.attributes)
      i.removeAttribute(l);
  if (n)
    for (const [l, v] of Object.entries(n))
      i.setAttribute(l, v);
  if (s) {
    const l = me(s);
    l ? i.setAttribute("class", l) : i.removeAttribute("class");
  }
  if (o && i.setAttribute("style", et(o)), f)
    for (const l in f) {
      const v = f[l];
      i.addEventListener(l.replace(/^on/, ""), (w) => {
        v.apply(i, [w]);
      });
    }
  let { children: h } = e;
  typeof h == "function" && (h = h(i));
  const a = h == null ? void 0 : h.filter(
    (l) => typeof l == "string" || l instanceof Node
  );
  if (a && a.length) {
    for (let l = 0; l < a.length; l++) {
      const v = a[l], w = i.childNodes.item(l);
      w !== v && (i.childNodes[l] ? w.replaceWith(v) : i.append(v));
    }
    for (; i.childNodes.length > (a == null ? void 0 : a.length); )
      (m = i.childNodes[i.childNodes.length - 1]) == null || m.remove();
  } else
    for (; i.childNodes.length; )
      (y = i.lastChild) == null || y.remove();
  return i;
}
function me(e) {
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
function et(e) {
  return typeof e == "string" ? e : Object.entries(e).map(([t, r]) => `${t}:${r}`).join(";");
}
function tt(e) {
  var h;
  const { map: t, define: r, unset: n } = Q(Object.entries(
    {
      Y: ["years", ({ years: a }, c) => D(a, c)],
      M: ["months", ({ months: a }, c) => D(a, c)],
      W: ["weeks", ({ weeks: a }, c) => D(a, c)],
      D: ["days", ({ days: a }, c) => D(a, c)],
      h: ["hours", ({ hours: a }, c) => D(a, c)],
      m: ["minutes", ({ minutes: a }, c) => D(a, c)],
      s: ["seconds", ({ seconds: a }, c) => D(a, c)],
      v: ["milliseconds", ({ milliseconds: a }, c) => D(a, c)]
    }
  )), s = {
    years: [
      (a, c) => Ue(a, c),
      (a, c) => C(a, { years: c })
    ],
    months: [
      (a, c) => Ge(a, c),
      (a, c) => C(a, { months: c })
    ],
    weeks: [
      (a, c) => Ke(a, c),
      (a, c) => C(a, { weeks: c })
    ],
    days: [
      (a, c) => he(a, c),
      (a, c) => C(a, { days: c })
    ],
    hours: [
      (a, c) => Ze(a, c),
      (a, c) => C(a, { hours: c })
    ],
    minutes: [
      (a, c) => Qe(a, c),
      (a, c) => C(a, { minutes: c })
    ],
    seconds: [
      (a, c) => de(a, c),
      (a, c) => C(a, { seconds: c })
    ],
    milliseconds: [
      (a, c) => Y(a, c),
      (a, c) => C(a, { milliseconds: c })
    ]
  }, f = typeof (e == null ? void 0 : e.translate) == "function" ? e.translate : (h = e == null ? void 0 : e.translate) == null ? void 0 : h.translate;
  function o(a, c, m) {
    const y = new RegExp(
      Array.from(t.keys()).map((A) => `${A}+`).join("|"),
      "g"
    ), l = m.match(y);
    if (!l)
      return m;
    const v = l.map((A) => t.get(A[0])).filter(Boolean), w = i(
      a,
      c,
      v.map(([A]) => A).flat(1)
    );
    return m.replace(y, (A) => {
      const $ = t.get(A[0]);
      if (!$)
        return A;
      const p = $[1](w, A.length);
      return (f == null ? void 0 : f(p)) ?? p;
    });
  }
  function i(a, c, m) {
    const y = Object.keys(s), l = m ? m.sort((w, A) => y.indexOf(w) < y.indexOf(A) ? -1 : y.indexOf(w) < y.indexOf(A) ? 1 : 0) : y, [v] = l.map((w) => [w, s[w]]).reduce(([w, A], [$, [p, N]]) => {
      const k = p(c, A);
      return w[$] = k, [w, N(A, k)];
    }, [{}, new Date(a)]);
    return v;
  }
  return { map: t, define: r, duration: i, format: o, unset: n };
}
function rt(e, t = 25) {
  let r;
  return function(...n) {
    clearTimeout(r), r = setTimeout(() => e.apply(this, n), t);
  };
}
var W;
function nt(e) {
  let t = e;
  const r = [];
  function n() {
    return W && r.push(W), t;
  }
  function s(o) {
    t = o, r.forEach((i) => i());
  }
  function f() {
    return t = e, r.splice(0, r.length), t;
  }
  return [n, s, f];
}
function E(e) {
  W = e, e(), W = void 0;
}
function F(e) {
  const [t, r] = nt(e);
  return new Proxy({ value: e }, {
    get() {
      return t();
    },
    set(n, s, f) {
      return n.value = f, r(f), true;
    }
  });
}
function it(e) {
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
function fe(e, t, r, n) {
  typeof r == "function" ? (n = r, r = {}) : r || (r = {});
  const s = !r.backwards;
  function f(o, i) {
    if (P(i)) {
      o = st(o);
      const h = Math.max(i.length, o.length);
      for (let a = s ? 0 : h - 1; s ? a < h : a >= 0; s ? a++ : a--) {
        const c = o[a] ? f(o[a], i[a]) : f([], i[a]);
        o[a] ? o[a] = c : o.push(c);
      }
      for (let a = 0; a < o.length; a++)
        o[a] === void 0 && o.splice(a, 1);
      return o;
    }
    if (Array.isArray(i) && !P(i)) {
      o = at(o);
      let h = 0;
      for (; h < o.length; ) {
        const a = s ? h : o.length - 1 - h, c = s ? h : i.length - 1 - h;
        o[a] = f(
          o[a],
          i[c]
        ), o[a] === void 0 ? o.splice(a, 1) : h++;
      }
      for (let a = s ? o.length : i.length - 1; s ? a < i.length : a >= o.length; s ? a++ : a--) {
        const c = f(void 0, i[a]);
        if (c === void 0)
          break;
        o.push(c);
      }
      return o;
    }
    return n ? n(U(o), i) : i === void 0 ? void 0 : U(o);
  }
  return f(e, t);
}
function U(e) {
  return Array.isArray(e) ? U(e[0]) : e;
}
function at(e) {
  return P(e) ? e.flat(1 / 0) : Array.isArray(e) ? e : e === void 0 ? [] : [e];
}
function st(e) {
  return P(e) ? e : Array.isArray(e) ? [e] : e === void 0 ? [[]] : [[e]];
}
function P(e) {
  if (!Array.isArray(e) || !e.length)
    return false;
  for (const t in e)
    if (Array.isArray(e[t]))
      return true;
  return false;
}
function ot(e) {
  function t(r, n = 0) {
    for (const s of r)
      Array.isArray(s) ? n += t(s) : n += s.length;
    return n;
  }
  return t(e);
}
function ct() {
  return { stop: true };
}
function ft(e) {
  const t = [];
  return (...r) => {
    const [n] = r;
    let s = typeof n == "object" || Array.isArray(n) ? JSON.stringify(n) : n;
    const f = e(t, ...r);
    if (f && typeof f == "object" && "stop" in f && f.stop === true)
      return n;
    const o = f;
    let i = typeof o == "object" || Array.isArray(o) ? JSON.stringify(o) : o;
    return s !== i && t.push({
      from: n,
      to: o
    }), o;
  };
}
function G(e, t) {
  return ft((r, ...n) => e(r, ...n) ? t(...n) : ct());
}
function kt(e, t) {
  return G((r, ...n) => r.length < e, t);
}
function lt(e) {
  const { charset: t, next: r, prev: n } = e != null && e.charset && "next" in e.charset ? e.charset : Oe(e == null ? void 0 : e.charset);
  function s(o, i, h = 1, a = false) {
    const c = {
      backwards: a,
      ...e == null ? void 0 : e.matchArray
    };
    return o.digits = fe(
      o.digits,
      i.digits,
      c,
      G((m, y, l) => e != null && e.stopWhen ? e.stopWhen(m, y, l) : e != null && e.stopAfterChanges ? m.length < e.stopAfterChanges : true, (m, y) => m === y ? m : n(m ?? "", y, h))
    ), o;
  }
  function f(o, i, h = 1, a = false) {
    const c = {
      backwards: a,
      ...e == null ? void 0 : e.matchArray
    };
    return o.digits = fe(
      o.digits,
      i.digits,
      c,
      G((m, y, l) => e != null && e.stopWhen ? e == null ? void 0 : e.stopWhen(m, y, l) : e != null && e.stopAfterChanges ? m.length < e.stopAfterChanges : true, (m, y) => m === y ? m : r(m, y, h))
    ), o;
  }
  return {
    charset: t,
    decrement: s,
    increment: f
  };
}
var ut = class {
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
      const s = this.events.findIndex((f) => f.key === t && f.fn === r);
      this.events.splice(s, 1);
    };
    return this.events.push({ key: t, fn: r, unwatch: n }), n;
  }
  /**
   * Listen for an event once.
   * 
   * @public
   */
  once(t, r) {
    const n = this.on(t, (...s) => {
      r(...s), n();
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
    this.events = [];
  }
};
var ee = class _ee {
  /**
   * Instantiate the face value.
   * 
   * @public
   */
  constructor(t, r) {
    b(this, "digitizer");
    b(this, "$value");
    b(this, "$digits");
    this.digitizer = (r == null ? void 0 : r.digitizer) || Se(), this.$value = F(t), this.$digits = F(this.digitizer.digitize(t));
  }
  /**
   * The digitized value.
   * 
   * @public
   */
  get digits() {
    return this.$digits.value;
  }
  /**
   * Set the digits from a `DigitizedValue`. It's possible the digits differ
   * than the value, if a sequencer or something else is iterating on the
   * digits.
   * 
   * @public
   */
  set digits(t) {
    this.$digits.value = t;
  }
  /**
   * Get the length of the flattened digitized array.
   * 
   * @public
   */
  get length() {
    return ot(this.$digits.value);
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
    this.$value.value = t, this.$digits.value = this.digitizer.digitize(t);
  }
  /**
   * Compare the face value with the given subject.
   * 
   * @public
   */
  compare(t) {
    return JSON.stringify(this.digits) === JSON.stringify(t == null ? void 0 : t.digits);
  }
  /**
   * Create a new instance with the given value.
   * 
   * @public
   */
  copy(t, r = {}) {
    return new _ee(t === void 0 ? this.value : t, Object.assign({
      digitizer: this.digitizer
    }, r));
  }
};
function te(e, t) {
  return new ee(e, t);
}
var K = class {
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
function Mt(e = 1e3) {
  return new K(e);
}
var ht = class extends ut {
  /**
   * Construct the FlipClock.
   * 
   * @public
   */
  constructor(r) {
    super();
    b(this, "autoStart", true);
    b(this, "el");
    b(this, "face");
    b(this, "theme");
    b(this, "timer");
    this.face = r.face, this.theme = r.theme, typeof r.autoStart == "boolean" && (this.autoStart = r.autoStart), this.timer = r.timer instanceof K ? r.timer : new K(r.timer), this.hook("afterCreate", this), r.el && this.mount(r.el);
  }
  /**
   * Get the animation rate of the clock.
   * 
   * @public
   */
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
    return this.hook("beforeMount", this), this.el = r, E(() => {
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
      const s = this.face[r];
      s == null || s.apply(this.face, n);
    }
    if (r in this.theme && typeof this.theme[r] == "function") {
      const s = this.theme[r];
      s == null || s(...n);
    }
    this.emit(r, ...n);
  }
};
function $t(e) {
  return new ht(e);
}
var dt = class {
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
    t.skipChars && (this.skipChars = t.skipChars), t.direction && (this.direction = t.direction), this.sequencer = t.sequencer && "increment" in t.sequencer ? t.sequencer : lt(t.sequencer), this.value = t.value, this.targetValue = t.targetValue ?? this.value.copy();
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
    E(() => {
      t.autoStart && t.timer.isStopped && this.targetValue.value && t.start();
    });
  }
};
function St(e) {
  return new dt(e);
}
var mt = class {
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
    this.date = F(t == null ? void 0 : t.date), this.formatter = t != null && t.formatter && "format" in t.formatter ? t.formatter : Le(t == null ? void 0 : t.formatter), t != null && t.format && (this.format = t.format);
    const r = () => {
      var n;
      return this.formatter.format(((n = this.date) == null ? void 0 : n.value) ?? /* @__PURE__ */ new Date(), this.format);
    };
    this.value = te(""), E(() => {
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
function Ct(e) {
  return new mt(e);
}
var gt = class {
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
    this.value = t.value, this.targetValue = t.targetValue, this.format = t.format, this.formatter = t.formatter, this.formattedValue = te(""), E(() => {
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
function Ft(e) {
  return new gt(e);
}
var vt = class {
  /**
   * Instantiate a Clock face with a given value and attributes.
   * 
   * @public
   */
  constructor(t) {
    b(this, "current");
    b(this, "end");
    b(this, "format");
    b(this, "formatter");
    b(this, "start");
    b(this, "value");
    this.start = F(t.start ?? /* @__PURE__ */ new Date()), this.current = F(new Date(this.start.value)), this.end = F(t.end ?? this.start.value), this.format = t.format, this.formatter = t.formatter && "format" in t.formatter ? t.formatter : tt(t.formatter), this.value = te(""), E(() => {
      this.value.value = this.formatter.format(
        this.current.value,
        this.end.value,
        this.format
      );
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
   * Format the value with the new elapsed time.
   * 
   * @public
   */
  interval(t) {
    this.current.value.setTime(
      this.start.value.getTime() + t.timer.elapsed
    ), this.current.value = this.current.value, de(this.end.value, this.current.value) <= 0 && t.stop();
  }
};
function Nt(e) {
  return new vt(e);
}
function Ot(e = {}) {
  return {
    render: (t) => yt({
      css: e.css,
      dividers: e.dividers,
      el: t.el,
      labels: e.labels,
      value: t.face.faceValue()
    })
  };
}
function yt(e) {
  var f;
  function t(o) {
    if (ue !== void 0)
      return o instanceof RegExp ? o : new RegExp(
        `[${(Array.isArray(o) ? o : [o]).join("|")}]`
      );
  }
  function r(o, i) {
    const h = t(i);
    return h ? o.match(h) : false;
  }
  function n(o, i, h) {
    if (Array.isArray(o)) {
      const a = typeof h == "string" || h == null ? void 0 : h.shift();
      return bt({
        el: i,
        label: typeof a == "string" ? a : void 0,
        children: (c) => o.map((m, y) => n(
          m,
          c == null ? void 0 : c.children.item(y),
          a
        ))
      });
    }
    return r(o, e.dividers) ? ue({
      el: i,
      value: o
    }) : pt({
      el: i,
      value: o
    });
  }
  const s = Array.isArray(e.labels) ? structuredClone(e.labels) : e.labels;
  return S({
    el: e.el,
    tagName: "div",
    class: {
      "flip-clock": true,
      [((f = e.css) == null ? void 0 : f.hash.value) ?? ""]: !!e.css
    },
    children: e.value.digits.map((o, i) => {
      var h;
      return n(
        o,
        (h = e == null ? void 0 : e.el) == null ? void 0 : h.children.item(i),
        s
      );
    })
  });
}
function bt(e) {
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
function pt(e) {
  var s;
  const t = (s = e.el) == null ? void 0 : s.getAttribute("data-value"), r = S({
    el: e.el,
    tagName: "div",
    attrs: {
      "data-value": e.value
    },
    class: {
      "flip-clock-card": true,
      animate: t !== e.value
    },
    events: {
      onanimationend() {
        n();
      }
    },
    children: (f) => {
      const o = le({
        el: f.children.item(0),
        value: e.value,
        class: "active"
      }), i = le({
        el: f.children.item(1),
        value: t,
        class: "before"
      });
      return [
        o,
        i
      ];
    }
  }), n = rt(() => {
    r.classList.remove("animate");
  }, 100);
  return r;
}
function le(e) {
  return S({
    el: e.el,
    tagName: "div",
    class: {
      "flip-clock-card-item": true,
      [me(e == null ? void 0 : e.class)]: !!(e != null && e.class)
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
function ue(e) {
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
function wt() {
  const e = document.querySelector("style#__flipclock__");
  if (e && e instanceof HTMLStyleElement)
    return e;
  const t = document.createElement("style");
  return t.id = "__flipclock__", document.head.appendChild(t), t;
}
var X = {};
var q = {};
function Z(e, t) {
  for (const r in t)
    typeof e[r] == "object" && typeof t[r] == "object" ? e[r] = Z(
      e[r],
      t[r]
    ) : e[r] = t[r];
  return e;
}
function ge(e) {
  const t = F(e), r = it(() => {
    const s = ve(t.value);
    if (X[s])
      return X[s];
    const f = At(s);
    return X[s] = f, f;
  });
  E(() => {
    typeof document == "object" && (q[r.value] || (q[r.value] = V(t.value, `.${r.value}`)), wt().innerHTML = Object.values(q).join(""));
  });
  const n = {
    css: t,
    hash: r,
    merge(s) {
      return t.value = Z(t.value, s), n;
    },
    extend(s) {
      return ge(Z(t.value, s));
    },
    toRaw() {
      return V(t.value, " ");
    },
    toString() {
      return q[r.value];
    }
  };
  return n;
}
function V(e, t) {
  let r = "", n = "", s = "";
  for (let f in e) {
    let o = e[f];
    f[0] == "@" ? f[1] == "i" ? r = f + " " + o + ";" : f[1] == "f" ? n += V(o, f) : n += f + "{" + V(o, f[1] == "k" ? "" : t) + "}" : typeof o == "object" ? n += V(
      o,
      t ? (
        // Go over the selector and replace the matching multiple selectors if any
        t.replace(/([^,])+/g, (i) => f.replace(/(^:.*)|([^,])+/g, (h) => /&/.test(h) ? h.replace(/&/g, i) : i ? i + " " + h : h))
      ) : f
    ) : o != null && (f = /^--/.test(f) ? f : f.replace(/[A-Z]/g, "-$&").toLowerCase(), s += f + ":" + o + ";");
  }
  return r + (t && s ? t + "{" + s + "}" : s) + n;
}
function ve(e) {
  if (typeof e == "object") {
    let t = "";
    for (let r in e)
      t += r + ve(e[r]);
    return t;
  } else
    return e;
}
function At(e) {
  let t = 0, r = 11;
  for (; t < e.length; )
    r = 101 * r + e.charCodeAt(t++) >>> 0;
  return "fc" + r;
}
var It = ge({
  "&.flip-clock": {
    "--border-radius": ".75rem",
    "--width": "1em",
    "--height": "1.45em",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSize: "4.5em",
    userSelect: "none",
    textAlign: "center",
    position: "relative",
    width: "100%",
    display: "inline-flex",
    boxSizing: "border-box",
    alignItems: "flex-end",
    gap: ".25rem"
  },
  ".flip-clock-label": {
    fontSize: "1rem",
    marginBottom: ".5rem"
  },
  ".flip-clock-meridium": {
    lineHeight: "1em",
    top: "50%",
    left: "100%",
    flex: "0",
    width: "auto",
    textTransform: "uppercase",
    fontWeight: "200",
    transform: "translate(.5em, -50%)"
  },
  ".flip-clock-divider": {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "serif",
    color: "#333",
    ".flip-clock-divider-inner": {
      fontSize: "1.25em"
    }
  },
  ".flip-clock-group": {
    display: "flex",
    flexDirection: "column",
    "+ .flip-clock-group": {
      marginLeft: "1rem"
    },
    ".flip-clock-group-items": {
      display: "flex",
      alignItems: "stretch",
      gap: ".25rem"
    }
  },
  ".flip-clock-card": {
    width: "var(--width)",
    height: "var(--height)",
    position: "relative",
    borderRadius: "var(--border-radius)",
    boxShadow: "0 1.5px 3px rgba(0, 0, 0, 0.24), 0 3px 8px rgba(0, 0, 0, 0.05)",
    fontWeight: "bold",
    color: "#ccc",
    flexShrink: 0,
    "&:not(.animate)": {
      ".active .flip-clock-card-item-inner": {
        zIndex: "4"
      },
      ".flip-clock-card-item-inner": {
        ".top, .bottom": {
          "&:after": {
            display: "none"
          }
        }
      }
    },
    ".flip-clock-card-item-inner": {
      position: "absolute",
      width: "100%",
      height: "100%",
      "&:first-child": {
        zIndex: "2"
      },
      ".top, .bottom": {
        width: "100%",
        height: "50%",
        overflow: "hidden",
        position: "relative",
        fontSize: "1em",
        background: "#333",
        boxShadow: "inset 0 0 .2em rgba(0,0,0,.5)",
        "&:after": {
          content: '" "',
          display: "block",
          position: "absolute",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
          overflow: "hidden"
        },
        "&:before": {
          content: '" "',
          display: "block",
          width: "100%",
          height: "1px",
          position: "absolute"
        }
      },
      ".top": {
        borderRadius: "var(--border-radius) var(--border-radius) 0 0",
        lineHeight: "var(--height)",
        "&:after": {
          borderRadius: "var(--border-radius) var(--border-radius) 0 0"
        },
        "&:before": {
          background: "#333",
          opacity: ".4",
          bottom: "0"
        }
      },
      ".bottom": {
        borderRadius: "0 0 var(--border-radius) var(--border-radius)",
        lineHeight: "0",
        "&:after": {
          borderRadius: "0 0 var(--border-radius) var(--border-radius)"
        },
        "&:before": {
          background: "#ccc",
          opacity: ".1"
        }
      }
    },
    "&.animate": {
      animationDuration: "250ms",
      animationDelay: "250ms",
      ".flip-clock-card-item-inner": {
        perspective: "15em"
      },
      ".top, .bottom, .active, .active > div, .before, .before > div": {
        animationDelay: "inherit",
        animationFillMode: "forwards",
        animationDuration: "inherit",
        animationTimingFunction: "inherit",
        "&:after": {
          animationDuration: "inherit",
          animationFillMode: "inherit"
        }
      },
      ".before": {
        animationDelay: "0s",
        animationTimingFunction: "ease-in",
        ".top": {
          animationName: "flip-clock-top"
        },
        ".top:after, .bottom:after": {
          animationName: "flip-clock-show-shadow"
        }
      },
      ".active": {
        animationTimingFunction: "ease-out",
        "& > div": {
          animationName: "flip-clock-indexing"
        },
        ".top:after, .bottom:after": {
          animationName: "flip-clock-hide-shadow"
        },
        ".bottom": {
          animationName: "flip-clock-bottom"
        }
      }
    },
    ".active": {
      zIndex: "2",
      ".bottom": {
        zIndex: "2",
        transformOrigin: "top center"
      }
    },
    ".before": {
      zIndex: "3",
      ".top": {
        zIndex: "2",
        transformOrigin: "bottom center",
        "&:after": {
          background: "linear-gradient(to bottom, rgba(0,0,0,.1) 0%, rgba(0,0,0,1) 100%)"
        }
      },
      ".bottom": {
        "&:after": {
          background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,.1) 100%)"
        }
      }
    }
  },
  "@keyframes flip-clock-indexing": {
    "0%": {
      zIndex: "2"
    },
    "1%": {
      zIndex: "3"
    },
    "100%": {
      zIndex: "4"
    }
  },
  "@keyframes flip-clock-bottom": {
    "0%": {
      transform: "rotateX(90deg)"
    },
    "100%": {
      transform: "rotateX(0)"
    }
  },
  "@keyframes flip-clock-top": {
    "0%": {
      transform: "rotateX(0)"
    },
    "100%": {
      transform: "rotateX(-90deg)"
    }
  },
  "@keyframes flip-clock-show-shadow": {
    "0%": {
      opacity: "0"
    },
    "100%": {
      opacity: "1"
    }
  },
  "@keyframes flip-clock-hide-shadow": {
    "0%": {
      opacity: "1"
    },
    "100%": {
      opacity: "0"
    }
  }
});
export {
  dt as Alphanumeric,
  mt as Clock,
  gt as Counter,
  $e as EMPTY_CHAR,
  vt as ElapsedTime,
  ut as EventEmitter,
  ee as FaceValue,
  ht as FlipClock,
  K as Timer,
  C as add,
  qe as addDays,
  We as addMonths,
  St as alphanumeric,
  pt as card,
  le as cardItem,
  st as castDigitizedGroup,
  U as castDigitizedString,
  at as castDigitizedValues,
  B as characterRange,
  me as classes,
  Ct as clock,
  z as compareAsc,
  it as computed,
  ot as count,
  Ft as counter,
  nt as createSignal,
  Ve as dayAbbreviations,
  ze as days,
  Ie as daysInWeek,
  rt as debounce,
  Ne as defaultCharset,
  Xe as diffInCalMonths,
  Be as diffInCalYears,
  he as diffInDays,
  Ze as diffInHours,
  Y as diffInMilliseconds,
  Qe as diffInMinutes,
  Ge as diffInMonths,
  de as diffInSeconds,
  Ke as diffInWeeks,
  Ue as diffInYears,
  ue as divider,
  S as el,
  Nt as elapsedTime,
  Pe as endOfDay,
  Je as endOfMonth,
  te as faceValue,
  Fe as fisherYatesShuffle,
  $t as flipClock,
  It as flipClockCss,
  ce as getTwelveHourFormat,
  bt as group,
  P as isDigitizedGroup,
  _e as isLastDayOfMonth,
  fe as matchArrayStructure,
  Ee as millisecondsInDay,
  Te as millisecondsInHour,
  je as millisecondsInMinute,
  He as monthAbbreviations,
  Ye as months,
  D as pad,
  Ce as range,
  F as ref,
  yt as render,
  Re as sort,
  ct as stop,
  kt as stopAfterChanges,
  G as stopWhen,
  et as style,
  Ot as theme,
  Mt as timer,
  ft as trackChanges,
  Oe as useCharset,
  Le as useDateFormats,
  Q as useDefinitionMap,
  Dt as useDictionary,
  Se as useDigitizer,
  tt as useDurationFormats,
  lt as useSequencer,
  E as watchEffect
};
//# sourceMappingURL=flipclock.js.map
