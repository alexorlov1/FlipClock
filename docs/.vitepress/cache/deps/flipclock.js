// node_modules/.pnpm/file+/node_modules/flipclock/dist/flipclock.es.js
var we = Object.defineProperty;
var Ae = (e, t, r) => t in e ? we(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r;
var w = (e, t, r) => (Ae(e, typeof t != "symbol" ? t + "" : t, r), r);
function xe(e, t) {
  function r() {
    this.constructor = e;
  }
  r.prototype = t.prototype, e.prototype = new r();
}
function I(e, t, r, n) {
  var o = Error.call(this, e);
  return Object.setPrototypeOf && Object.setPrototypeOf(o, I.prototype), o.expected = t, o.found = r, o.location = n, o.name = "SyntaxError", o;
}
xe(I, Error);
function J(e, t, r) {
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
    var o = this.location.start, f = this.location.source && typeof this.location.source.offset == "function" ? this.location.source.offset(o) : o, s = this.location.source + ":" + f.line + ":" + f.column;
    if (r) {
      var a = this.location.end, u = J("", f.line.toString().length, " "), i = r[o.line - 1], c = o.line === a.line ? a.column : i.length + 1, m = c - o.column || 1;
      t += `
 --> ` + s + `
` + u + ` |
` + f.line + " | " + i + `
` + u + " | " + J("", o.column - 1, " ") + J("", m, "^");
    } else
      t += `
 at ` + s;
  }
  return t;
};
I.buildMessage = function(e, t) {
  var r = {
    literal: function(i) {
      return '"' + o(i.text) + '"';
    },
    class: function(i) {
      var c = i.parts.map(function(m) {
        return Array.isArray(m) ? f(m[0]) + "-" + f(m[1]) : f(m);
      });
      return "[" + (i.inverted ? "^" : "") + c.join("") + "]";
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
  function o(i) {
    return i.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(c) {
      return "\\x0" + n(c);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(c) {
      return "\\x" + n(c);
    });
  }
  function f(i) {
    return i.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(c) {
      return "\\x0" + n(c);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(c) {
      return "\\x" + n(c);
    });
  }
  function s(i) {
    return r[i.type](i);
  }
  function a(i) {
    var c = i.map(s), m, y;
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
  function u(i) {
    return i ? '"' + o(i) + '"' : "end of input";
  }
  return "Expected " + a(e) + " but " + u(t) + " found.";
};
function De(e, t) {
  t = t !== void 0 ? t : {};
  var r = {}, n = t.grammarSource, o = { start: ae }, f = ae, s = "[", a = "]", u = /^[[\]]/, i = re("[", false), c = re("]", false), m = ve(["[", "]"], false, false), y = ye(), l = function(h) {
    return () => h;
  }, v = function(h) {
    return oe(h);
  }, p = function(h) {
    return () => h;
  }, A = function(h) {
    return oe(h);
  }, $ = function(h) {
    return h.flat(1).filter(Boolean);
  }, b = 0, F = [{ line: 1, column: 1 }], M = 0, P = [], N = 0, L;
  if ("startRule" in t) {
    if (!(t.startRule in o))
      throw new Error(`Can't start parsing from rule "` + t.startRule + '".');
    f = o[t.startRule];
  }
  function re(h, d) {
    return { type: "literal", text: h, ignoreCase: d };
  }
  function ve(h, d, g) {
    return { type: "class", parts: h, inverted: d, ignoreCase: g };
  }
  function ye() {
    return { type: "any" };
  }
  function be() {
    return { type: "end" };
  }
  function ne(h) {
    var d = F[h], g;
    if (d)
      return d;
    for (g = h - 1; !F[g]; )
      g--;
    for (d = F[g], d = {
      line: d.line,
      column: d.column
    }; g < h; )
      e.charCodeAt(g) === 10 ? (d.line++, d.column = 1) : d.column++, g++;
    return F[h] = d, d;
  }
  function ie(h, d, g) {
    var x = ne(h), S = ne(d), T = {
      source: n,
      start: {
        offset: h,
        line: x.line,
        column: x.column
      },
      end: {
        offset: d,
        line: S.line,
        column: S.column
      }
    };
    return g && n && typeof n.offset == "function" && (T.start = n.offset(T.start), T.end = n.offset(T.end)), T;
  }
  function E(h) {
    b < M || (b > M && (M = b, P = []), P.push(h));
  }
  function pe(h, d, g) {
    return new I(
      I.buildMessage(h, d),
      h,
      d,
      g
    );
  }
  function ae() {
    var h, d, g, x;
    for (h = b, d = [], g = b, x = R(), x !== r && (x = l(x)), g = x, g === r && (g = H()); g !== r; )
      d.push(g), g = b, x = R(), x !== r && (x = l(x)), g = x, g === r && (g = H());
    return d = v(d), h = d, h;
  }
  function H() {
    var h, d, g, x, S;
    if (h = b, e.charCodeAt(b) === 91 ? (d = s, b++) : (d = r, N === 0 && E(i)), d !== r) {
      if (g = [], x = b, S = R(), S !== r && (S = p(S)), x = S, x === r && (x = H()), x !== r)
        for (; x !== r; )
          g.push(x), x = b, S = R(), S !== r && (S = p(S)), x = S, x === r && (x = H());
      else
        g = r;
      g !== r ? (e.charCodeAt(b) === 93 ? (x = a, b++) : (x = r, N === 0 && E(c)), x !== r ? h = A(g) : (b = h, h = r)) : (b = h, h = r);
    } else
      b = h, h = r;
    return h;
  }
  function R() {
    var h, d, g;
    if (h = b, d = [], g = se(), g !== r)
      for (; g !== r; )
        d.push(g), g = se();
    else
      d = r;
    return d !== r && (d = $(d)), h = d, h;
  }
  function se() {
    var h, d, g;
    return h = b, d = b, N++, u.test(e.charAt(b)) ? (g = e.charAt(b), b++) : (g = r, N === 0 && E(m)), N--, g === r ? d = void 0 : (b = d, d = r), d !== r ? (e.length > b ? (g = e.charAt(b), b++) : (g = r, N === 0 && E(y)), g !== r ? (d = [d, g], h = d) : (b = h, h = r)) : (b = h, h = r), h;
  }
  function oe(h) {
    for (const d of h)
      typeof d == "function" && h.splice(h.indexOf(d), 1, ...d());
    return h;
  }
  if (L = f(), L !== r && b === e.length)
    return L;
  throw L !== r && b < e.length && E(be()), pe(
    P,
    M < e.length ? e.charAt(M) : null,
    M < e.length ? ie(M, M + 1) : ie(M, M)
  );
}
var Me = De;
var Se = " ";
function $e() {
  function e(n) {
    if (n === void 0)
      return [];
    if (typeof n == "string")
      return n.match(/\[|\]/) ? Me(n) : Array.from(n);
    if (typeof n == "number")
      return Array.from(n.toString());
    for (const o of n) {
      const f = n.indexOf(o), s = e(o);
      s !== void 0 && (typeof o == "string" ? n.splice(f, 1, ...s) : n.splice(f, 1, s));
    }
    return n.filter(Boolean) ?? [];
  }
  function t(n) {
    function o(f) {
      const s = [];
      let a = false, u = true;
      for (let i = 0; i < f.length; i++) {
        if (Array.isArray(f[i])) {
          s.push(o(f[i])), a = u = true;
          continue;
        }
        u && (s.push(""), u = false), s[s.length - 1] += f[i];
      }
      return a ? s : s[0];
    }
    return o(n);
  }
  function r(n) {
    function o(f) {
      if (!Array.isArray(f))
        return false;
      for (const s in f)
        if (!(typeof f[s] == "string" && f[s].length === 1)) {
          if (Array.isArray(f[s])) {
            if (!f[s].length)
              continue;
          } else
            return false;
          if (!o(f[s]))
            return false;
        }
      return true;
    }
    return o(n);
  }
  return {
    digitize: e,
    isDigitized: r,
    undigitize: t
  };
}
function ke(e = 0, t) {
  return Array.from(Array(t).keys()).map((r) => r + e);
}
function _(e, t) {
  return ke(
    e.charCodeAt(0),
    t.charCodeAt(0) + 1 - e.charCodeAt(0)
  ).map((n) => String.fromCharCode(n));
}
function Ce(e) {
  const t = [];
  for (; e.length; ) {
    const r = Math.floor(
      Math.random() * e.length
    );
    t.push(...e.splice(r, 1));
  }
  return t;
}
function Fe() {
  return [
    ..._("a", "z"),
    ..._("A", "Z"),
    ..._("0", "9"),
    ":",
    "-",
    ".",
    ",",
    "!",
    "?"
  ];
}
function Ne(e = {}) {
  const t = e.blacklist || [], r = e.whitelist || [], n = e.emptyChar || Se, o = typeof e.shuffle == "function" ? e.shuffle : e.shuffle ? Ce : void 0;
  function f() {
    const l = (e == null ? void 0 : e.charset) || Fe;
    return o ? o(l()) : l();
  }
  const s = f();
  function a(l) {
    const v = l.charCodeAt(0), p = s.map((A) => A.charCodeAt(0));
    return String.fromCharCode(
      p.reduce((A, $) => Math.abs($ - v) < Math.abs(A - v) ? $ : A)
    );
  }
  function u(l, v = 1) {
    let p = [n, ...s, n, ...s];
    v < 0 && (p = p.reverse());
    let A = 1;
    l === void 0 ? l = n : p.includes(l) || (l = n, A = 0);
    const $ = p.indexOf(l);
    return p.slice(
      $ + A,
      p.indexOf(l, $ + 1) + A
    ).splice(0, Math.abs(v));
  }
  function i(l, v, p = 1) {
    if (v === void 0 && l === n)
      return;
    if (typeof v == "string" && !s.includes(v))
      return v;
    if (l && (y(l) || v === l))
      return l;
    if (l && m(l))
      return a(l);
    const A = u(l, p);
    if (typeof v == "string" && A.includes(v))
      return v;
    if (!(v === void 0 && l && s.indexOf(A[p - 1]) < s.indexOf(l)))
      return A[p - 1];
  }
  function c(l, v, p = 1) {
    if (v === void 0 && l === n)
      return;
    if (typeof v == "string" && !s.includes(v))
      return v;
    if (l && (y(l) || v === l))
      return l;
    if (l && m(l))
      return a(l);
    const A = u(l, -p);
    if (typeof v == "string" && A.includes(v))
      return v;
    if (!(v === void 0 && l && s.indexOf(A[p - 1]) > s.indexOf(l)))
      return A[p - 1];
  }
  function m(l) {
    return t.includes(l);
  }
  function y(l) {
    return r.includes(l);
  }
  return {
    charset: s,
    chunk: u,
    emptyChar: n,
    isBlacklisted: m,
    isWhitelisted: y,
    next: i,
    prev: c
  };
}
function Z(e) {
  const t = new Map(e);
  function r(o, f) {
    if (typeof o == "string" && f)
      t.set(o, f);
    else if (typeof o == "object")
      for (const s of Object.entries(o))
        t.set(s[0], s[1]);
  }
  function n(o) {
    if (Array.isArray(o))
      for (const f of o)
        t.delete(f);
    else
      t.delete(o);
  }
  return {
    map: t,
    define: r,
    unset: n
  };
}
function Dt(e = {}) {
  const { map: t, define: r, unset: n } = Z(Object.entries(e));
  function o(f) {
    const s = t.get(f);
    return typeof s == "function" ? s(f) : s === void 0 ? f : s;
  }
  return {
    map: t,
    define: r,
    translate: o,
    unset: n
  };
}
var Oe = 7;
var Ie = 864e5;
var Ee = 36e5;
var Te = 6e4;
var ze = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
var je = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun"
];
var Ve = [
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
var Ye = [
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
  var s;
  const { map: t, define: r, unset: n } = Z(Object.entries(
    Object.assign({
      A: (a) => a.getHours() < 12 ? "AM" : "PM",
      a: (a) => a.getHours() < 12 ? "am" : "pm",
      Q: (a) => Math.ceil((a.getMonth() + 1) / 3).toString(),
      YYYY: (a) => a.getFullYear().toString(),
      YY: (a) => D(a.getFullYear().toString().slice(2), 2),
      MMMM: (a) => Ve[a.getMonth()],
      MMM: (a) => Ye[a.getMonth()],
      MM: (a) => D(a.getMonth() + 1, 2),
      M: (a) => String(a.getMonth() + 1),
      DDDD: (a) => ze[a.getDay()],
      DDD: (a) => je[a.getDay()],
      DD: (a) => D(a.getDate(), 2),
      D: (a) => String(a.getDate()),
      HH: (a) => D(a.getHours(), 2),
      H: (a) => String(a.getHours()),
      hh: (a) => D(ce(a), 2),
      h: (a) => ce(a),
      mm: (a) => D(a.getMinutes(), 2),
      m: (a) => String(a.getMinutes()),
      ss: (a) => D(a.getSeconds(), 2),
      s: (a) => String(a.getSeconds()),
      vvvv: (a) => D(a.getMilliseconds(), 4),
      vvv: (a) => D(a.getMilliseconds(), 3),
      vv: (a) => D(a.getMilliseconds(), 2),
      v: (a) => String(a.getMilliseconds())
    }, e == null ? void 0 : e.formats)
  )), o = typeof (e == null ? void 0 : e.translate) == "function" ? e.translate : (s = e == null ? void 0 : e.translate) == null ? void 0 : s.translate;
  function f(a, u) {
    const i = new RegExp([...He(t)].join("|"), "g");
    return u.replace(i, (c) => {
      const m = t.get(c);
      if (!m)
        return c;
      const y = m(a);
      return (o == null ? void 0 : o(y)) ?? y;
    });
  }
  return { map: t, define: r, format: f, unset: n };
}
function He(e) {
  return Array.from(e.keys()).sort((t, r) => t.length < r.length ? 1 : t.length > r.length ? -1 : 0);
}
function D(e, t) {
  return e === void 0 ? "" : (typeof e == "number" && (e = e.toString()), t < e.length ? e : Array(t - e.length + 1).join("0") + e);
}
function C(e, t) {
  const {
    years: r = 0,
    months: n = 0,
    weeks: o = 0,
    days: f = 0,
    hours: s = 0,
    minutes: a = 0,
    seconds: u = 0,
    milliseconds: i = 0
  } = t || {}, c = n || r ? qe(e, n + r * 12) : new Date(e.getTime()), m = f || o ? Re(c, f + o * 7) : c, y = a + s * 60, v = (u + y * 60) * 1e3 + i;
  return new Date(m.getTime() + v);
}
function Re(e, t) {
  return isNaN(t) || !t || e.setDate(e.getDate() + t), e;
}
function qe(e, t) {
  if (isNaN(t) || !t)
    return e;
  const r = e.getDate(), n = new Date(e.getTime());
  n.setMonth(e.getMonth() + t + 1, 0);
  const o = n.getDate();
  return r >= o ? n : (e.setFullYear(
    n.getFullYear(),
    n.getMonth(),
    r
  ), e);
}
function z(e, t) {
  const r = e.getTime() - t.getTime();
  return r < 0 ? -1 : r > 0 ? 1 : r;
}
function We(e) {
  return e.setHours(23, 59, 59, 999), e;
}
function Pe(e) {
  const t = e.getMonth();
  return e.setFullYear(e.getFullYear(), t + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function Je(e) {
  const t = new Date(e);
  return We(t).getTime() === Pe(t).getTime();
}
function _e(e, t) {
  return e.getFullYear() - t.getFullYear();
}
function Be(e, t) {
  const r = e.getFullYear() - t.getFullYear(), n = e.getMonth() - t.getMonth();
  return r * 12 + n;
}
function Xe(e, t) {
  const r = new Date(e), n = new Date(t), o = z(r, n), f = Math.abs(_e(r, n));
  r.setFullYear(1584), n.setFullYear(1584);
  const s = z(r, n) === -o, a = o * (f - Number(s));
  return a === 0 ? 0 : a;
}
function Ue(e, t) {
  const r = new Date(e), n = new Date(t), o = z(r, n), f = Math.abs(Be(r, n));
  if (f < 1)
    return 0;
  r.getMonth() === 1 && r.getDate() > 27 && r.setDate(30), r.setMonth(r.getMonth() - o * f);
  let s = z(r, n) === -o;
  Je(r) && f === 1 && z(r, n) === 1 && (s = false);
  const a = o * (f - Number(s));
  return a === 0 ? 0 : a;
}
function Ge(e, t) {
  return Math.floor(he(e, t) / Oe);
}
function he(e, t) {
  return Math.floor(V(e, t) / Ie);
}
function Ke(e, t) {
  return Math.floor(V(e, t) / Ee);
}
function Ze(e, t) {
  return Math.floor(V(e, t) / Te);
}
function Qe(e, t) {
  return Math.floor(V(e, t) / 1e3);
}
function V(e, t) {
  return new Date(e).getTime() - new Date(t).getTime();
}
function ce(e) {
  const t = e.getHours() % 12;
  return String(t === 0 ? 12 : t);
}
function k(e) {
  var c, m, y;
  const { el: t, tagName: r, attrs: n, class: o, events: f, style: s } = e, a = t && "tagName" in t && ((c = t == null ? void 0 : t.tagName) == null ? void 0 : c.toLowerCase()) === r.toLowerCase() ? t : document.createElement(r);
  if (t && "attributes" in t && (t != null && t.attributes))
    for (const { name: l } of t.attributes)
      a.removeAttribute(l);
  if (n)
    for (const [l, v] of Object.entries(n))
      a.setAttribute(l, v);
  if (o) {
    const l = de(o);
    l ? a.setAttribute("class", l) : a.removeAttribute("class");
  }
  if (s) {
    const l = et(s);
    l ? a.setAttribute("style", l) : a.removeAttribute("style");
  }
  if (f)
    for (const l in f) {
      const v = f[l];
      v && a.addEventListener(l.replace(/^on/, ""), (p) => {
        v.apply(a, [p]);
      });
    }
  let { children: u } = e;
  typeof u == "function" && (u = u(a));
  const i = u == null ? void 0 : u.filter(
    (l) => typeof l == "string" || l instanceof Node
  );
  if (i && i.length) {
    for (let l = 0; l < i.length; l++) {
      const v = i[l], p = a.childNodes.item(l);
      p !== v && (a.childNodes[l] ? p.replaceWith(v) : a.append(v));
    }
    for (; a.childNodes.length > ((i == null ? void 0 : i.length) ?? 0); )
      (m = a.childNodes[a.childNodes.length - 1]) == null || m.remove();
  } else
    for (; a.childNodes.length; )
      (y = a.lastChild) == null || y.remove();
  return a;
}
function de(e) {
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
  var u;
  const { map: t, define: r, unset: n } = Z(Object.entries(
    {
      Y: ["years", ({ years: i }, c) => D(i, c)],
      M: ["months", ({ months: i }, c) => D(i, c)],
      W: ["weeks", ({ weeks: i }, c) => D(i, c)],
      D: ["days", ({ days: i }, c) => D(i, c)],
      h: ["hours", ({ hours: i }, c) => D(i, c)],
      m: ["minutes", ({ minutes: i }, c) => D(i, c)],
      s: ["seconds", ({ seconds: i }, c) => D(i, c)],
      v: ["milliseconds", ({ milliseconds: i }, c) => D(i, c)]
    }
  )), o = {
    years: [
      (i, c) => Xe(i, c),
      (i, c) => C(i, { years: c })
    ],
    months: [
      (i, c) => Ue(i, c),
      (i, c) => C(i, { months: c })
    ],
    weeks: [
      (i, c) => Ge(i, c),
      (i, c) => C(i, { weeks: c })
    ],
    days: [
      (i, c) => he(i, c),
      (i, c) => C(i, { days: c })
    ],
    hours: [
      (i, c) => Ke(i, c),
      (i, c) => C(i, { hours: c })
    ],
    minutes: [
      (i, c) => Ze(i, c),
      (i, c) => C(i, { minutes: c })
    ],
    seconds: [
      (i, c) => Qe(i, c),
      (i, c) => C(i, { seconds: c })
    ],
    milliseconds: [
      (i, c) => V(i, c),
      (i, c) => C(i, { milliseconds: c })
    ]
  }, f = typeof (e == null ? void 0 : e.translate) == "function" ? e.translate : (u = e == null ? void 0 : e.translate) == null ? void 0 : u.translate;
  function s(i, c, m) {
    const y = new RegExp(
      Array.from(t.keys()).map((A) => `${A}+`).join("|"),
      "g"
    ), l = m.match(y);
    if (!l)
      return m;
    const v = l.map((A) => t.get(A[0])).filter(Boolean), p = a(
      i,
      c,
      v.map(([A]) => A).flat(1)
    );
    return m.replace(y, (A) => {
      const $ = t.get(A[0]);
      if (!$)
        return A;
      const b = $[1](p, A.length);
      return (f == null ? void 0 : f(b)) ?? b;
    });
  }
  function a(i, c, m) {
    const y = Object.keys(o), l = m ? m.sort((p, A) => y.indexOf(p) < y.indexOf(A) ? -1 : y.indexOf(p) < y.indexOf(A) ? 1 : 0) : y, [v] = l.map((p) => [p, o[p]]).reduce(([p, A], [$, [b, F]]) => {
      const M = b(c, A);
      return p[$] = M, [p, F(A, M)];
    }, [{}, new Date(i)]);
    return v;
  }
  return { map: t, define: r, duration: a, format: s, unset: n };
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
  function o(s) {
    t = s, r.forEach((a) => a());
  }
  function f() {
    return t = e, r.splice(0, r.length), t;
  }
  return [n, o, f];
}
function Y(e) {
  W = e, e(), W = void 0;
}
function Q(e) {
  const [t, r] = nt(e);
  return new Proxy({ value: e }, {
    get() {
      return t();
    },
    set(n, o, f) {
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
  const o = !r.backwards;
  function f(s, a) {
    if (j(a)) {
      s = st(s);
      const u = Math.max(a.length, s.length);
      for (let i = o ? 0 : u - 1; o ? i < u : i >= 0; o ? i++ : i--) {
        const c = s[i] ? f(s[i], a[i]) : f([], a[i]);
        s[i] ? s[i] = c : s.push(c);
      }
      for (let i = 0; i < s.length; i++)
        s[i] === void 0 && s.splice(i, 1);
      return s;
    }
    if (Array.isArray(a) && !j(a)) {
      s = at(s);
      let u = 0;
      for (; u < s.length; ) {
        const i = o ? u : s.length - 1 - u, c = o ? u : a.length - 1 - u;
        s[i] = f(
          s[i],
          a[c]
        ), s[i] === void 0 ? s.splice(i, 1) : u++;
      }
      for (let i = o ? s.length : a.length - 1; o ? i < a.length : i >= s.length; o ? i++ : i--) {
        const c = f(void 0, a[i]);
        if (c === void 0)
          break;
        s.push(c);
      }
      return s;
    }
    return n ? n(X(s), a) : a === void 0 ? void 0 : X(s);
  }
  return f(e, t);
}
function X(e) {
  return Array.isArray(e) ? X(e[0]) : e;
}
function at(e) {
  return j(e) ? e.flat(1 / 0) : Array.isArray(e) ? e : e === void 0 ? [] : [e];
}
function st(e) {
  return j(e) ? e : Array.isArray(e) ? [e] : e === void 0 ? [[]] : [[e]];
}
function Mt(e) {
  return Array.isArray(e) && !j(e);
}
function j(e) {
  if (!Array.isArray(e) || !e.length)
    return false;
  for (const t in e)
    if (Array.isArray(e[t]))
      return true;
  return false;
}
function ot(e) {
  function t(r, n = 0) {
    for (const o of r)
      Array.isArray(o) ? n += t(o, n) : n += o.length;
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
    let o = typeof n == "object" || Array.isArray(n) ? JSON.stringify(n) : n;
    const f = e(t, ...r);
    if (f && typeof f == "object" && "stop" in f && f.stop === true)
      return n;
    const s = f;
    let a = typeof s == "object" || Array.isArray(s) ? JSON.stringify(s) : s;
    return o !== a && t.push({
      from: n,
      to: s
    }), s;
  };
}
function U(e, t) {
  return ft((r, ...n) => e(r, ...n) ? t(...n) : ct());
}
function St(e, t) {
  return U((r, ...n) => r.length < e, t);
}
function lt(e) {
  const { charset: t, next: r, prev: n } = e != null && e.charset && "next" in e.charset ? e.charset : Ne(e == null ? void 0 : e.charset);
  function o(s, a, u = 1, i = false) {
    const c = {
      backwards: i,
      ...e == null ? void 0 : e.matchArray
    };
    return s.digits = fe(
      s.digits,
      a.digits,
      c,
      U((m, y, l) => e != null && e.stopWhen ? e.stopWhen(m, y, l) : e != null && e.stopAfterChanges ? m.length < e.stopAfterChanges : true, (m, y) => m === y ? m : n(m ?? "", y, u))
    ), s;
  }
  function f(s, a, u = 1, i = false) {
    const c = {
      backwards: i,
      ...e == null ? void 0 : e.matchArray
    };
    return s.digits = fe(
      s.digits,
      a.digits,
      c,
      U((m, y, l) => e != null && e.stopWhen ? e == null ? void 0 : e.stopWhen(m, y, l) : e != null && e.stopAfterChanges ? m.length < e.stopAfterChanges : true, (m, y) => m === y ? m : r(m, y, u))
    ), s;
  }
  return {
    charset: t,
    decrement: o,
    increment: f
  };
}
var ut = class {
  constructor() {
    w(this, "events", []);
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
      const o = this.events.findIndex((f) => f.key === t && f.fn === r);
      this.events.splice(o, 1);
    };
    return this.events.push({ key: t, fn: r, unwatch: n }), n;
  }
  /**
   * Listen for an event once.
   * 
   * @public
   */
  once(t, r) {
    const n = this.on(t, (...o) => {
      r(...o), n();
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
var ee = class _ee {
  /**
   * Instantiate the face value.
   * 
   * @public
   */
  constructor(t, r) {
    w(this, "digitizer");
    w(this, "$value");
    this.digitizer = (r == null ? void 0 : r.digitizer) || $e(), this.$value = Q(t);
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
    return ot(this.digits);
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
    return new _ee(t === void 0 ? this.value : t, Object.assign({
      digitizer: this.digitizer
    }, r));
  }
};
function te(e, t) {
  return new ee(e, t);
}
var G = class {
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
function $t(e = 1e3) {
  return new G(e);
}
var ht = class extends ut {
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
    this.face = r.face, this.theme = r.theme, typeof r.autoStart == "boolean" && (this.autoStart = r.autoStart), this.timer = r.timer instanceof G ? r.timer : new G(r.timer), this.hook("afterCreate", this), r.el && this.mount(r.el);
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
    return this.hook("beforeMount", this), this.el = r, Y(() => {
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
      const o = this.face[r];
      o == null || o.apply(this.face, n);
    }
    if (r in this.theme && typeof this.theme[r] == "function") {
      const o = this.theme[r];
      o == null || o(...n);
    }
    this.emit(r, ...n);
  }
};
function kt(e) {
  return new ht(e);
}
var dt = class {
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
    Y(() => {
      t.autoStart && t.timer.isStopped && this.value.value && t.start();
    });
  }
};
function Ct(e) {
  return new dt(e);
}
var mt = class {
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
    this.date = Q(t == null ? void 0 : t.date), this.formatter = t != null && t.formatter && "format" in t.formatter ? t.formatter : Le(t == null ? void 0 : t.formatter), t != null && t.format && (this.format = t.format);
    const r = () => {
      var n;
      return this.formatter.format(((n = this.date) == null ? void 0 : n.value) ?? /* @__PURE__ */ new Date(), this.format);
    };
    this.value = te(""), Y(() => {
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
function Ft(e) {
  return new mt(e);
}
var gt = class {
  /**
   * Instantiate the clock face.
   * 
   * @public
   */
  constructor(t) {
    w(this, "countdown", false);
    w(this, "step", 1);
    w(this, "formattedValue");
    w(this, "targetValue");
    w(this, "value");
    w(this, "format");
    w(this, "formatter");
    this.value = t.value, this.targetValue = t.targetValue, this.format = t.format, this.formatter = t.formatter, this.formattedValue = te(""), Y(() => {
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
function Nt(e) {
  return new gt(e);
}
var vt = class {
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
    this.start = t.start, this.end = t.end, this.format = t.format, this.formatter = t.formatter && "format" in t.formatter ? t.formatter : tt(t.formatter), this.value = te(
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
function Ot(e) {
  return new vt(e);
}
function It(e = {}) {
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
  function t(s) {
    if (ue !== void 0)
      return s instanceof RegExp ? s : new RegExp(
        `[${(Array.isArray(s) ? s : [s]).join("|")}]`
      );
  }
  function r(s, a) {
    const u = t(a);
    return u ? s.match(u) : false;
  }
  function n(s, a, u) {
    if (Array.isArray(s)) {
      const i = typeof u == "string" || u == null ? void 0 : u.shift();
      return bt({
        el: a,
        label: typeof i == "string" ? i : void 0,
        children: (c) => s.map((m, y) => n(
          m,
          c == null ? void 0 : c.children.item(y),
          i
        ))
      });
    }
    return r(s, e.dividers) ? ue({
      el: a,
      value: s
    }) : pt({
      el: a,
      value: s
    });
  }
  const o = Array.isArray(e.labels) ? structuredClone(e.labels) : e.labels;
  return k({
    el: e.el,
    tagName: "div",
    class: {
      "flip-clock": true,
      [((f = e.css) == null ? void 0 : f.hash.value) ?? ""]: !!e.css
    },
    children: e.value.digits.map((s, a) => {
      var u;
      return n(
        s,
        (u = e == null ? void 0 : e.el) == null ? void 0 : u.children.item(a),
        o
      );
    })
  });
}
function bt(e) {
  return k({
    el: e.el,
    tagName: "div",
    class: "flip-clock-group",
    children: (t) => [
      !!e.label && k({
        el: t.querySelector(".flip-clock-label"),
        tagName: "div",
        class: "flip-clock-label",
        children: [e.label]
      }),
      k({
        el: t.querySelector(".flip-clock-group-items"),
        tagName: "div",
        class: "flip-clock-group-items",
        children: e.children
      })
    ]
  });
}
function pt(e) {
  var o, f;
  const t = (o = e.el) == null ? void 0 : o.getAttribute("data-value"), r = k({
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
        n();
      }
    },
    children: (s) => {
      const a = le({
        el: s.children.item(0),
        value: e.value,
        class: "active"
      }), u = le({
        el: s.children.item(1),
        value: t,
        class: "before"
      });
      return [
        a,
        u
      ];
    }
  }), n = rt(() => {
    r.classList.remove("animate");
  }, 100);
  return r;
}
function le(e) {
  return k({
    el: e.el,
    tagName: "div",
    class: {
      "flip-clock-card-item": true,
      [de(e == null ? void 0 : e.class)]: !!(e != null && e.class)
    },
    children: (t) => [
      k({
        el: t.children.item(0),
        tagName: "div",
        class: "flip-clock-card-item-inner",
        children: (r) => [
          k({
            el: r.children.item(0),
            tagName: "div",
            class: "top",
            children: [(e == null ? void 0 : e.value) ?? " "]
          }),
          k({
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
  return k({
    el: e.el,
    tagName: "div",
    class: "flip-clock-divider",
    children: (t) => [
      k({
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
  e && e.remove();
  const t = document.createElement("style");
  return t.id = "__flipclock__", document.head.appendChild(t), t;
}
var B = {};
var q = {};
function K(e, t) {
  for (const r in t)
    typeof t[r] == "object" && typeof e[r] == "object" ? e[r] = K(
      e[r],
      t[r]
    ) : e[r] = t[r];
  return e;
}
function me(e) {
  const t = Q(e), r = it(() => {
    const o = ge(t.value);
    if (B[o])
      return B[o];
    const f = At(o);
    return B[o] = f, f;
  });
  Y(() => {
    q[r.value] || (q[r.value] = O(t.value, `.${r.value}`)), wt().innerHTML = Object.values(q).join("");
  });
  const n = {
    css: t,
    hash: r,
    merge(o) {
      return t.value = K(o, t.value), n;
    },
    extend(o) {
      return me(K(o, t.value));
    },
    toString() {
      return q[r.value];
    }
  };
  return n;
}
function O(e, t) {
  let r = "", n = "", o = "";
  for (let f in e) {
    let s = e[f];
    f[0] == "@" ? f[1] == "i" ? r = f + " " + s + ";" : f[1] == "f" ? n += O(s, f) : n += f + "{" + O(s, f[1] == "k" ? "" : t) + "}" : typeof s == "object" ? n += O(
      s,
      t ? (
        // Go over the selector and replace the matching multiple selectors if any
        t.replace(/([^,])+/g, (a) => f.replace(/(^:.*)|([^,])+/g, (u) => /&/.test(u) ? u.replace(/&/g, a) : a ? a + " " + u : u))
      ) : f
    ) : s != null && (f = /^--/.test(f) ? f : f.replace(/[A-Z]/g, "-$&").toLowerCase(), o += O.p ? (
      // We have a prefixer and we need to run this through that
      // @ts-ignore
      O.p(f, s)
    ) : (
      // Nope no prefixer just append it
      f + ":" + s + ";"
    ));
  }
  return r + (t && o ? t + "{" + o + "}" : o) + n;
}
function ge(e) {
  if (typeof e == "object") {
    let t = "";
    for (let r in e)
      t += r + ge(e[r]);
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
var Et = me({
  "&.flip-clock": {
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSize: "1rem",
    userSelect: "none",
    textAlign: "center",
    position: "relative",
    width: "100%",
    display: "inline-flex",
    boxSizing: "border-box",
    alignItems: "flex-end",
    gap: ".3333em"
  },
  ".flip-clock-divider": {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "serif",
    color: "#333",
    width: "1em",
    ".flip-clock-divider-inner": {
      fontSize: "5em"
    }
  },
  ".flip-clock-label": {
    marginBottom: ".5rem"
    // @todo: this doesn't currently do anything. there is no way to make
    // this work currently.
    // '&.flip-clock-meridium': {
    //     fontSize: '1.75em',
    //     lineHeight: '1.75em',
    //     top: '50%',
    //     left: '100%',
    //     flex: '0',
    //     width: 'auto',
    //     textTransform: 'uppercase',
    //     fontWeight: '200',
    //     transform: 'translate(.5em, -50%)' 
    // } 
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
      gap: ".3333em"
    }
  },
  ".flip-clock-card": {
    width: "4em",
    height: "6em",
    position: "relative",
    borderRadius: ".75rem",
    boxShadow: "0 1.5px 3px rgba(0, 0, 0, 0.24), 0 3px 8px rgba(0, 0, 0, 0.05)",
    fontWeight: "bold",
    color: "#ccc",
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
        fontSize: "4.5em",
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
        borderRadius: ".75rem .75rem 0 0",
        lineHeight: "1.3333em",
        "&:after": {
          borderRadius: ".75rem .75rem 0 0"
        },
        "&:before": {
          background: "#333",
          opacity: ".4",
          bottom: "0"
        }
      },
      ".bottom": {
        borderRadius: "0 0 .75rem .75rem",
        lineHeight: "0",
        "&:after": {
          borderRadius: "0 0 .75rem .75rem"
        },
        "&:before": {
          background: "#ccc",
          opacity: ".1"
        }
      }
    },
    "&.animate": {
      animationDuration: "80ms",
      animationDelay: "80ms",
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
          animationName: "flip-top"
        },
        ".top:after, .bottom:after": {
          animationName: "show-shadow"
        }
      },
      ".active": {
        animationTimingFunction: "ease-out",
        "& > div": {
          animationName: "indexing"
        },
        ".top:after, .bottom:after": {
          animationName: "hide-shadow"
        },
        ".bottom": {
          animationName: "flip-bottom"
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
  "@keyframes indexing": {
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
  "@keyframes flip-bottom": {
    "0%": {
      transform: "rotateX(90deg)"
    },
    "100%": {
      transform: "rotateX(0)"
    }
  },
  "@keyframes flip-top": {
    "0%": {
      transform: "rotateX(0)"
    },
    "100%": {
      transform: "rotateX(-90deg)"
    }
  },
  "@keyframes show-shadow": {
    "0%": {
      opacity: "0"
    },
    "100%": {
      opacity: "1"
    }
  },
  "@keyframes hide-shadow": {
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
  Se as EMPTY_CHAR,
  vt as ElapsedTime,
  ut as EventEmitter,
  ee as FaceValue,
  ht as FlipClock,
  G as Timer,
  C as add,
  Re as addDays,
  qe as addMonths,
  Ct as alphanumeric,
  pt as card,
  le as cardItem,
  st as castDigitizedGroup,
  X as castDigitizedString,
  at as castDigitizedValues,
  _ as characterRange,
  de as classes,
  Ft as clock,
  z as compareAsc,
  it as computed,
  ot as count,
  Nt as counter,
  nt as createSignal,
  Et as css,
  je as dayAbbreviations,
  ze as days,
  Oe as daysInWeek,
  rt as debounce,
  Fe as defaultCharset,
  Be as differenceInCalendarMonths,
  _e as differenceInCalendarYears,
  he as differenceInDays,
  Ke as differenceInHours,
  V as differenceInMilliseconds,
  Ze as differenceInMinutes,
  Ue as differenceInMonths,
  Qe as differenceInSeconds,
  Ge as differenceInWeeks,
  Xe as differenceInYears,
  ue as divider,
  k as el,
  Ot as elapsedTime,
  We as endOfDay,
  Pe as endOfMonth,
  te as faceValue,
  Ce as fisherYatesShuffle,
  kt as flipClock,
  ce as getTwelveHourFormat,
  bt as group,
  j as isDigitizedGroup,
  Mt as isDigitizedValues,
  Je as isLastDayOfMonth,
  fe as matchArrayStructure,
  Ie as millisecondsInDay,
  Ee as millisecondsInHour,
  Te as millisecondsInMinute,
  Ye as monthAbbreviations,
  Ve as months,
  D as pad,
  ke as range,
  Q as ref,
  yt as render,
  He as sort,
  ct as stop,
  St as stopAfterChanges,
  U as stopWhen,
  et as style,
  It as theme,
  $t as timer,
  ft as trackChanges,
  Ne as useCharset,
  Le as useDateFormats,
  Z as useDefinitionMap,
  Dt as useDictionary,
  $e as useDigitizer,
  tt as useDurationFormats,
  lt as useSequencer,
  Y as watchEffect
};
//# sourceMappingURL=flipclock.js.map
