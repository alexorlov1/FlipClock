// node_modules/.pnpm/file+/node_modules/flipclock/dist/flipclock.es.js
function v(e, ...t) {
  return e && e(...t);
}
function R(e) {
  return (t) => t.map(e).reduce((s, n) => s.concat(n), []);
}
function j(e) {
  return R((t) => Array.isArray(t) ? j(t) : t)(e);
}
function D(e) {
  return R((t) => t)(e);
}
function E(e, t = {}) {
  function s(i) {
    return (!!(t != null && t.prependLeadingZero) && i.toString().split("").length === 1 ? "0" : "").concat(i);
  }
  function n(i, r = 0) {
    const o = j(i).length;
    if (o < r)
      for (let a = 0; a < r - o; a++)
        i[0].unshift("0");
    return D(i);
  }
  return t.format && (e = t.format(e)), n(D([e]).map((i) => D(j([i]).map((r) => s(r).split("")))), t.minimumDigits);
}
var tt = /Y{2,4}|M{1,2}|D{1,2}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|v{1,4}|A|a/g;
var P = {
  a: (e, t) => String(t.get(e.getHours() < 12 ? "am" : "pm")).toLowerCase(),
  A: (e, t) => String(t.get(e.getHours() < 12 ? "am" : "pm")).toUpperCase(),
  YY: (e) => u(e.getFullYear().toString().slice(2), 2),
  YYYY: (e) => e.getFullYear().toString(),
  M: (e) => String(e.getMonth()),
  MM: (e) => u(e.getMonth() + 1, 2),
  D: (e) => String(e.getDate()),
  DD: (e) => u(e.getDate(), 2),
  H: (e) => String(e.getHours()),
  HH: (e) => u(e.getHours(), 2),
  h: (e) => C(e),
  hh: (e) => u(C(e)),
  m: (e) => String(e.getMinutes()),
  mm: (e) => u(e.getMinutes(), 2),
  s: (e) => String(e.getSeconds()),
  ss: (e) => u(e.getSeconds(), 2),
  v: (e) => String(e.getMilliseconds()),
  vv: (e) => u(e.getMilliseconds(), 2),
  vvv: (e) => u(e.getMilliseconds(), 3),
  vvvv: (e) => u(e.getMilliseconds(), 4)
};
var et = 7;
var x = /(Y|M|W|D|h|m|s|v)+/g;
var N = {
  Y: (e, t) => u(e == null ? void 0 : e.years, t),
  M: (e, t) => u(e == null ? void 0 : e.months, t),
  W: (e, t) => u(e == null ? void 0 : e.weeks, t),
  D: (e, t) => u(e.days, t),
  h: (e, t) => u(e.hours, t),
  m: (e, t) => u(e.minutes, t),
  s: (e, t) => u(e.seconds, t),
  v: (e, t) => u(e.milliseconds, t)
};
var st = 864e5;
var nt = 36e5;
var it = 6e4;
var T = ((e) => (e.Y = "years", e.M = "months", e.W = "weeks", e.D = "days", e.h = "hours", e.m = "minutes", e.s = "seconds", e.v = "milliseconds", e))(T || {});
function V(e) {
  return 1 / Math.round(e) === -1 / 0;
}
function rt(e) {
  return V(e) || e < 0;
}
function p(e) {
  return V(
    e = rt(e) ? Math.ceil(e) : Math.floor(e)
  ) ? ("-" + e).toString() : e;
}
function ot(e, t) {
  return isNaN(t) || !t || e.setDate(e.getDate() + t), e;
}
function at(e, t) {
  if (isNaN(t) || !t)
    return e;
  const s = e.getDate(), n = new Date(e.getTime());
  n.setMonth(e.getMonth() + t + 1, 0);
  const i = n.getDate();
  return s >= i ? n : (e.setFullYear(
    n.getFullYear(),
    n.getMonth(),
    s
  ), e);
}
function ct(e, t) {
  const s = new Date(e), {
    years: n = 0,
    months: i = 0,
    weeks: r = 0,
    days: o = 0,
    hours: a = 0,
    minutes: c = 0,
    seconds: m = 0
  } = t || {}, f = i || n ? at(s, i + n * 12) : new Date(s.getTime()), M = o || r ? ot(f, o + r * 7) : f, S = c + a * 60, b = (m + S * 60) * 1e3;
  return new Date(M.getTime() + b);
}
function y(e, t) {
  const s = new Date(e), n = new Date(t), i = s.getTime() - n.getTime();
  return i < 0 ? -1 : i > 0 ? 1 : i;
}
function ut(e) {
  return e.setHours(23, 59, 59, 999), e;
}
function lt(e) {
  const t = e.getMonth();
  return e.setFullYear(e.getFullYear(), t + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function ht(e) {
  return ut(e).getTime() === lt(e).getTime();
}
function dt(e, t) {
  const s = new Date(e), n = new Date(t);
  return s.getFullYear() - n.getFullYear();
}
function ft(e, t) {
  const s = new Date(e), n = new Date(t), i = s.getFullYear() - n.getFullYear(), r = s.getMonth() - n.getMonth();
  return i * 12 + r;
}
function mt(e, t) {
  const s = new Date(e), n = new Date(t), i = y(s, n), r = Math.abs(dt(s, n));
  s.setFullYear(1584), n.setFullYear(1584);
  const o = y(s, n) === -i, a = i * (r - Number(o));
  return a === 0 ? 0 : a;
}
function yt(e, t) {
  const s = new Date(e), n = new Date(t), i = y(s, n), r = Math.abs(ft(s, n));
  if (r < 1)
    return 0;
  s.getMonth() === 1 && s.getDate() > 27 && s.setDate(30), s.setMonth(s.getMonth() - i * r);
  let o = y(s, n) === -i;
  ht(s) && r === 1 && y(s, n) === 1 && (o = false);
  const a = i * (r - Number(o));
  return a === 0 ? 0 : a;
}
function pt(e, t) {
  return p(J(e, t) / et);
}
function J(e, t) {
  return p(g(e, t) / st);
}
function gt(e, t) {
  return p(g(e, t) / nt);
}
function St(e, t) {
  return p(g(e, t) / it);
}
function bt(e, t) {
  return p(g(e, t) / 1e3);
}
function g(e, t) {
  return new Date(e).getTime() - new Date(t).getTime();
}
var vt = {
  years: (e, t) => mt(e, t),
  months: (e, t) => yt(e, t),
  weeks: (e, t) => pt(e, t),
  days: (e, t) => J(e, t),
  hours: (e, t) => gt(e, t),
  minutes: (e, t) => St(e, t),
  seconds: (e, t) => bt(e, t),
  milliseconds: (e, t) => g(e, t)
};
function _t(e, t) {
  const s = Object.keys(T), n = s.indexOf(e), i = s.indexOf(t);
  return n < i ? -1 : i > n ? 1 : 0;
}
function Mt(e, t, s) {
  let [n, i] = [e, t].sort(y);
  const r = [
    ...new Set(
      (s.match(x) || []).map((a) => a.slice(0, 1)).sort(_t).map((a) => T[a])
    )
  ];
  function o(a, c) {
    const m = vt[a](i, n), f = { [a]: m };
    return n = ct(n, f), Object.assign(c, f);
  }
  return Object.freeze(r.reduce((a, c) => o(c, a), {}));
}
function wt(e, t, s) {
  return t.replace(tt, (n) => {
    if (!P[n])
      throw new Error(`Invalid date format: ${n}`);
    return String(P[n](e, s));
  });
}
function Dt(e, t, s) {
  return t = t.replace(x, (n) => {
    const i = n.slice(0, 1);
    if (!N[i])
      throw new Error(`Invalid duration format: ${n}`);
    return N[i](e, n.length);
  }), t;
}
function C(e) {
  const t = e.getHours() % 12;
  return String(t === 0 ? 12 : t);
}
var L = class {
  /**
   * Construct the VNode.
   * 
   * @param tagName - The tagName of the VNode element.
   * @param attributes - The attributes used to create the VNode.
   * @param childNodes - The children elements
   */
  constructor(t, s = {}, n = []) {
    this.attributes = {}, this.on = {}, this.tagName = t.toLowerCase(), this.childNodes = n, this.textContent = void 0;
    for (const [i, r] of Object.entries(s))
      this.hasOwnProperty(i) ? this[i] = r : this.attributes[i] = r;
  }
  /**
   * Render the VNode.
   * 
   * @returns The rendered element
   */
  render() {
    return this.el = A(this);
  }
  /**
   * Mount the VNode to the DOM.
   * 
   * @param el - The DOM element used to mount the VNode.
   */
  mount(t) {
    this.el || this.render(), z(this, t);
  }
};
var W = /<!--(.+?)-->/gim;
function Ot(e) {
  return !!e.match(W);
}
function F(e) {
  return e && typeof e == "object" && "render" in e;
}
function h(e, t, s) {
  return F(e) ? e.render() : (Array.isArray(t) && (s = t, t = {}), t && (!(t instanceof Object) || typeof t == "string") && (s = [t]), typeof s == "string" && (s = [s]), new L(e, t, s == null ? void 0 : s.filter((n) => n !== void 0).map((n) => n instanceof L ? n : F(n) ? n.render() : Ot(String(n)) ? h("comment", {
    textContent: String(n).replace(W, "$1")
  }) : h("text", { textContent: n }))));
}
var Y = class {
  /**
   * Instnatiate a Dictionary.
   * 
   * @param definitions - An object of key/value pairs
   */
  constructor(t = {}) {
    this.definitions = new Map(
      Object.entries(t).map(([s, n]) => [
        s.toLowerCase(),
        String(n)
      ])
    );
  }
  /**
   * Get the definition
   * 
   * @param value - The string to translate.
   * @returns The translated string.
   */
  get(t) {
    return this.definitions.get(t == null ? void 0 : t.toLowerCase()) || t;
  }
};
var H = /* @__PURE__ */ new Map();
function $(e, t) {
  if (Array.isArray(e)) {
    let n;
    for (const i of e)
      n = $(i, t);
    return n;
  }
  if (t === void 0)
    return H.get(e) || new Y();
  const s = new Y(t);
  return H.set(e, s), s;
}
function He(e) {
  return e != null;
}
function u(e, t = 2, s = "0") {
  for (e = String(e === void 0 ? 0 : e); e.length < t; )
    e = s + e;
  return e;
}
function l(e, t) {
  return e === void 0 ? t : e;
}
function jt(e, t) {
  function s(n) {
    return t.push(n), () => {
      t.splice(t.indexOf(n), 1);
    };
  }
  if (Array.isArray(e)) {
    class n extends Array {
      watch(r) {
        return s(r);
      }
    }
    return Array.of.call(n, ...e);
  }
  return Object.assign(
    /* @__PURE__ */ Object.create({ watch: s }),
    e instanceof Object ? e : { value: e }
  );
}
function U(e) {
  const t = [];
  return new Proxy(jt(e, t), {
    set(s, n, i) {
      const r = JSON.stringify(s);
      if (s[n] = i, JSON.stringify(s) !== r)
        for (const o of t)
          Array.isArray(e) || e instanceof Object ? o(s, JSON.parse(r)) : o(s.value, JSON.parse(r).value);
      return true;
    }
  });
}
function kt(e, t) {
  for (const [s, n] of Object.entries(e.on))
    t.addEventListener(s, n);
}
function Tt(e) {
  const t = {
    text: (s) => document.createTextNode(String(s.textContent)),
    comment: (s) => document.createComment(String(s.textContent)),
    element: (s) => document.createElement(s.tagName)
  };
  return t[e.tagName] ? t[e.tagName](e) : t.element(e);
}
function $t(e) {
  return e.nodeType === 3 ? "text" : e.nodeType === 8 ? "comment" : e.nodeType === 11 ? "fragment" : e instanceof Element ? e.tagName.toLowerCase() : null;
}
function A(e) {
  const t = Tt(e);
  q(e, t), kt(e, t);
  for (const s of e.childNodes)
    t.appendChild(A(s));
  return t;
}
function q(e, t) {
  for (const [s, n] of Object.entries(e.attributes))
    t.getAttribute(s) !== n && t.setAttribute(s, n);
}
function At(e, t) {
  if (q(e, t), t.attributes)
    for (const { name: s } of [...t.attributes])
      e.attributes[s] || t.removeAttribute(s);
}
function zt(e, t) {
  return e.tagName !== $t(t) || e.tagName === "text" && String(e.textContent) !== String(t.textContent);
}
function z(e, t) {
  var s;
  if (zt(e, t)) {
    (s = t.parentNode) == null || s.replaceChild(e.render(), t);
    return;
  }
  t instanceof Element && At(e, t);
  for (let n of [...t.childNodes].slice(e.childNodes.length))
    t.removeChild(n);
  for (let [n, i] of e.childNodes.entries()) {
    if (!t.childNodes[n]) {
      t.appendChild(A(i));
      continue;
    }
    z(i, t.childNodes[n]);
  }
}
var I = class {
  /**
   * Instantiate a CardItem.
   * 
   * @param value - The card value
   * @param className - Additional CSS classes
   */
  constructor(t = "", s = "") {
    this.value = t, this.className = s;
  }
  /**
   * Render the VNode.
   * 
   * @returns The rendered VNode.
   */
  render() {
    return h("div", {
      class: `flip-clock-card-item ${this.className}`
    }, [
      h("div", {
        class: "flip-clock-card-item-inner"
      }, [
        h("div", { class: "top" }, [this.value]),
        h("div", { class: "bottom" }, [this.value])
      ])
    ]);
  }
};
var Z = class {
  /**
   * Instantiate a new Card.
   * 
   * @param currentDigit - The card's current digit to display
   * @param lastDigit - The card's previous digit
   * @param animationRate - The number of milliseconds used to the animation rate
   */
  constructor(t, s, n = 225) {
    this.animationRate = 225, this.currentDigit = t, this.lastDigit = s, this.animationRate = n, this.items = [
      new I(t, "active"),
      new I(l(s, t), "before")
    ];
  }
  /**
   * Get the Card's current digit.
   * 
   * @readonly
   */
  get digit() {
    return this.currentDigit;
  }
  /**
   * Render the VNode.
   * 
   * @returns The rendered VNode.
   */
  render() {
    return h("div", {
      class: `flip-clock-card ${this.currentDigit !== this.lastDigit ? "animate" : ""}`,
      style: `animation-delay: ${this.animationRate}ms; animation-duration: ${this.animationRate}ms`
    }, this.items);
  }
};
var G = class {
  /**
   * Instantiate a Divider.
   * 
   * @param character - The character used for the divider.
   */
  constructor(t = ":") {
    this.character = t;
  }
  /**
   * Render the VNode.
   * 
   * @returns The rendered VNode.
   */
  render() {
    return h("div", {
      class: "flip-clock-divider"
    }, [
      h("div", {
        class: "flip-clock-divider-inner"
      }, [this.character])
    ]);
  }
};
var Pt = class {
  constructor() {
    this.events = [];
  }
  /**
   * Emit an event.
   * 
   * @param key - The name of the name of the event to emit.
   * @param args - The arguments passed to the event.
   * @returns The `EventEmitter` instance.
   */
  emit(t, ...s) {
    const n = this.events.filter(
      (i) => i.key === t
    );
    for (const i of n)
      i.fn.apply(this, ...s);
    return this;
  }
  /**
   * Stop listening to for event to fire.
   *
   * @param key - The name of the name of the event to emit.
   * @param fn - The listener callback function.
   * @returns The EventEmitter instance.
   */
  off(t, s) {
    return this.events = this.events.filter((n) => {
      n.key === t && (!s || n.fn);
    }), this.events[t] && s ? this.events[t] = this.events[t].filter((n) => n !== s) : this.events[t] = [], this;
  }
  /**
   * Start listening for an event to fire.
   *
   * @param key - The name of the name of the event to emit.
   * @param fn - The listener callback function.
   * @returns The EventEmitter instance.
   */
  on(t, s) {
    return this.events.push({ key: t, fn: s }), this;
  }
  /**
   * Listen form an event to fire once.
   *
   * @param key - The name of the name of the event to emit.
   * @param fn - The listener callback function.
   * @returns The EventEmitter instance.
   */
  once(t, s) {
    return this.on(t, (...n) => {
      s(...n), this.off(t, s);
    });
  }
};
var d = class {
  /**
   * Instantiate the face value.
   * 
   * @param value - The value to digitize.
   * @param attributes - The options passed to the instance.
   */
  constructor(t, s = {}) {
    this.minimumDigits = 0, this.value = t;
    const n = l(
      s.minimumDigits,
      this.minimumDigits
    );
    this.minimumDigits = l(s.minimumDigits, this.minimumDigits);
    const i = this.format = l(s.format);
    this.digits = U(E(l(t, ""), {
      minimumDigits: n,
      format: i
    })), this.minimumDigits !== false && (this.minimumDigits = Math.max(
      this.digits.length,
      s.minimumDigits || 0
    ));
  }
  compare(t) {
    return this.value === d.make(t).value;
  }
  /**
   * Create a new instance with the given value.
   * 
   * @param value - The new value.
   * @returns A new FaceValue instance.
   */
  copy(t) {
    return new d(t, {
      format: this.format,
      minimumDigits: this.minimumDigits
    });
  }
  /**
   * Instantiate a new FaceValue with the given value. If the give value
   * is already an instance of FaceValue, then return the instance.
   * 
   * @param value - The clock's face value.
   * @param attributes - The options passed to the instance.
   * @returns A new FaceValue instance.
   */
  static make(t, s = {}) {
    return t instanceof d ? t : new this(t, s);
  }
};
var K = class extends Pt {
  /**
   * Instantiate a Clock face with a given value and attributes.
   * 
   * @param attributes - The options passed to the instance.
   */
  constructor(t = {}) {
    super(), this.animationRate = 500, this.autoStart = true, this.watchers = [], this.animationRate = l(t.animationRate, this.animationRate), this.autoStart = l(t.autoStart, this.autoStart), this.stopAt = t.stopAt, this.dictionary = $(
      this.language = t.language || "en-us"
    ), this.state = U({
      value: this.defaultValue(t.value)
    }), this.watch(() => this.emit("render"));
  }
  /**
   * Get the face value.
   */
  get value() {
    return this.state.value;
  }
  /**
   * Set the face value.
   */
  set value(t) {
    this.prevState = {
      value: this.state.value
    }, this.state.value = d.make(t);
  }
  /**
   * Get the last face value.
   * 
   * @returns A FaceValue instance.
   */
  get lastValue() {
    var t;
    return (t = this.prevState) == null ? void 0 : t.value;
  }
  /**
   * Get the default FaceValue using the instantiated value.
   * 
   * @param value - The value passed from instantiation.
   * @returns A FaceValue instance.
   */
  defaultValue(t) {
    return d.make(t);
  }
  /**
   * Dispatch the event and call the method that correspond to given hook.
   * 
   * @param key - The name of the hook being dispatched.
   * @param args - The arguments passed to the callbacks. 
   */
  hook(t, ...s) {
    this[t](...s), this.emit(t, ...s);
  }
  /**
   * Bind a watcher function to the state.
   * 
   * @param fn - The watcher callback function.
   * @returns A function to unwatch the callback.
   */
  watch(t) {
    const s = this.state.watch(t);
    return this.watchers.push(s), s;
  }
  /**
   * Reset the watchers.
   * 
   * @returns The `Face` instance.
   */
  resetWatchers() {
    for (const t of this.watchers)
      t();
    return this.watchers = [], this;
  }
  shouldStop(t) {
    return this.stopAt === void 0 ? false : typeof this.stopAt == "function" ? this.stopAt(t) : d.make(this.stopAt).compare(this.value);
  }
  /**
   * Run before the animation.
   * 
   * @param instance - The FlipClock instance.
   */
  beforeMount(t) {
  }
  /**
   * The `mounted` hook.
   * 
   * @param instance - The FlipClock instance.
   */
  mounted(t) {
  }
  /**
   * The `beforeCreate` hook.
   * 
   * This is the hook to change the VNode before it hits the DOM.
   * 
   * @param instance - The FlipClock instance.
   */
  beforeCreate(t) {
  }
  /**
   * The `beforeCreate` hook.
   * 
   * This is the hook to change the VNode before it hits the DOM.
   * 
   * @param instance - The FlipClock instance.
   * @param vnode - The VNode instance.
   */
  afterCreate(t, s) {
  }
  /**
   * The `beforeUnmount` hook.
   * 
   * @param instance - The FlipClock instance.
   * @param vnode - The VNode instance.
   */
  beforeUnmount(t) {
  }
  /**
   * The `unmounted` hook.
   * 
   * @param instance - The FlipClock instance.
   */
  unmounted(t) {
  }
  /**
   * The `afterRender` hook.
   * 
   * @param instance - The FlipClock instance.
   * @param vnode - The VNode instance.
   */
  afterRender(t, s) {
  }
  /**
   * The `beforeAnimation` hook.
   * 
   * @param instance - The FlipClock instance.
   * @param vnode - The VNode instance.
   */
  beforeAnimation(t, s) {
    t.el.querySelectorAll(".animate").forEach(
      (n) => n.classList.remove("animate")
    );
  }
  /**
   * The `afterAnimation` hook.
   * 
   * @param instance - The FlipClock instance.
   * @param vnode - The VNode instance.
   */
  afterAnimation(t, s) {
    this.shouldStop(t) && t.stop();
  }
  /**
   * The `started` hook.
   * 
   * @param instance - The FlipClock instance.
   */
  started(t) {
  }
  /**
   * The `stopped` hook.
   * 
   * @param instance - The FlipClock instance.
   */
  stopped(t) {
  }
};
var B = {
  years: "Years",
  months: "Months",
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds"
};
var Q = ["en", "en-us", "english"];
var Ie = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: Q,
  dictionary: B
}, Symbol.toStringTag, { value: "Module" }));
var _ = class {
  /**
   * Create a new `Timer` instance.
   *
   * @param interval - The number of milliseconds between intervals.
   */
  constructor(t = 1e3) {
    this.count = 0, this.interval = 1e3, this.running = false, this.interval = t;
  }
  /**
   * The `elapsed` attribute.
   */
  get elapsed() {
    return this.startDate ? Math.max(0, Date.now() - this.startDate.getTime()) : 0;
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
    return this.running === true;
  }
  /**
   * Determines if the Timer is currently stopped.
   */
  get isStopped() {
    return this.running === false;
  }
  /**
   * Get the last timestamp the timer looped.
   */
  get lastLoop() {
    return this.lastLooped || 0;
  }
  /**
   * Get the date object when the timer started.
   */
  get started() {
    return this.startDate;
  }
  /**
   * Resets the timer.
   *
   * @param fn - The interval callback.
   * @returns The Timer instance
   */
  reset(t) {
    return this.stop(() => {
      this.count = 0, this.start(() => v(t));
    }), this;
  }
  /**
   * Starts the timer.
   *
   * @param fn - The interval callback.
   * @returns The Timer instance
   */
  start(t) {
    this.startDate = /* @__PURE__ */ new Date(), this.running = true;
    const s = () => {
      const n = typeof this.interval == "function" ? this.interval() : this.interval;
      return Date.now() - this.lastLoop >= n && (v(t), this.lastLooped = Date.now(), this.count++), this.handle = window.requestAnimationFrame(s), this;
    };
    return s();
  }
  /**
   * Stops the timer.
   *
   * @param fn - The stop callback.
   * @returns The Timer instance
   */
  stop(t) {
    return this.isRunning && setTimeout(() => {
      window.cancelAnimationFrame(this.handle), this.running = false, v(t);
    }), this;
  }
  /**
   * Create a new Timer instance.
   * 
   * @param interval - The interval number. If a Timer instance is passed, return it.
   * @returns The Timer instance.
   */
  static make(t) {
    return t instanceof _ ? t : new _(t);
  }
};
$(Q, B);
var Ge = class {
  /**
   * Construct the FlipClock.
   * 
   * @param attributes - The options passed to the instance.
   */
  constructor(t = {}) {
    if (!t.face)
      throw new Error("You must define a face property.");
    this.face = t.face, this.face.on("render", () => this.render()), this.timer = _.make(l(t.timer, 1e3)), t.el && this.mount(t.el);
  }
  /**
   * Mount the clock instance to the DOM.
   * 
   * @param el - The DOM element used to mount the clock.
   * @returns The `FlipClock` instance.
   */
  mount(t) {
    return t ? (this.face.beforeMount(this), this.el = t, this.render(), this.face.mounted(this), this.face.autoStart && this.timer.isStopped && window.requestAnimationFrame(() => this.start()), this) : this;
  }
  /**
   * Render the clock instance.
   * 
   * @returns The rendered VNode.
   */
  render() {
    this.face.hook("beforeCreate", this);
    const t = this.face.render();
    return this.face.hook("afterCreate", this, t), this.face.hook("beforeAnimation", this, t), setTimeout(() => {
      z(t, this.el), setTimeout(() => {
        this.face.hook("afterRender", this, t);
      }), setTimeout(() => {
        this.face.hook("afterAnimation", this, t);
      }, this.face.animationRate);
    }), t;
  }
  /**
   * Start the clock instance.
   *
   * @param fn - A function that is called after the clock starts.
   * @returns The `FlipClock` instance.
   */
  start(t) {
    const s = () => (this.face.hook("interval", this, t), v(t), s);
    return this.timer.start(s()), this.face.hook("started", this), this;
  }
  /**
   * Stop the clock instance.
   *
   * @param fn - A function that is called after the clock stops.
   * @returns The `FlipClock` instance.
   */
  stop(t) {
    return this.timer.stop(t), this.face.hook("stopped", this), this;
  }
  /**
   * Toggle starting/stopping the clock instance.
   *
   * @param fn - A function that is called after the clock stops.
   * @returns The `FlipClock` instance.
   */
  toggle(t) {
    return this.timer.isStopped ? this.start(t) : this.stop(t), this;
  }
  /**
   * Unmount the clock instance from the DOM.
   * 
   * @returns The `FlipClock` instance.
   */
  unmount() {
    var t;
    return this.face.hook("beforeUnmount", this), (t = this.el.parentElement) == null || t.removeChild(this.el), this.face.resetWatchers(), this.face.hook("unmounted", this), this;
  }
};
var Nt = class {
  /**
   * Construct the Label.
   * 
   * @param value - The label's value.
   */
  constructor(t) {
    this.value = t;
  }
  /**
   * Render the VNode.
   * 
   * @returns The rendered VNode.
   */
  render() {
    return h("div", {
      class: "flip-clock-label"
    }, [this.value]);
  }
};
var k = class {
  /**
   * Construct the Group.
   * 
   * @param attributes - The options passed to the instance.
   */
  constructor(t) {
    this.items = t.items || [], this.label = t.label;
  }
  /**
   * Render the VNode.
   * 
   * @returns The rendered VNode.
   */
  render() {
    return h("div", {
      class: "flip-clock-group"
    }, [
      this.label && new Nt(this.label),
      h("div", {
        class: "flip-clock-group-items"
      }, this.items)
    ]);
  }
};
var O = /[^\w]+/;
var X = class extends K {
  /**
   * Create the groups from the given FaceValue.
   */
  createGroups(t, s = []) {
    let n, i;
    return this.format instanceof Function ? n = this.format(t, this) : n = (this.formatter || ((o) => this.formatFaceValue(o)))(t, this)(i = this.format), n.split(/\s+/).map((r, o) => new k({
      items: this.createGroup(r, i, o, s)
    }));
  }
  /**
   * Create the groups from given string.
   */
  createGroup(t, s, n, i = []) {
    const r = t.match(O) || [], o = t.split(O).map((c) => E(c));
    for (let c = 0; c < o.length - 1; c += 2)
      o.splice(c + 1, 0, new G(r[c]));
    let a = 0;
    return o.map((c, m) => c instanceof G ? (a++, c) : new k({
      label: this.label(s, n, m - a),
      items: c.map((f, M) => {
        var S, w, b;
        return new Z(f, (b = (w = (S = i[n]) == null ? void 0 : S.items[m]) == null ? void 0 : w.items[M]) == null ? void 0 : b.digit);
      })
    }));
  }
  /**
   * Get the label using the given flag.
   */
  label(t, s, n) {
    var c;
    let i = this.labels instanceof Function ? this.labels(this) : this.labels;
    if (this.labels === void 0)
      return;
    if (Array.isArray(i) && i[s] && i[s][n] !== null)
      return i[s][n];
    const a = ((c = String(t).split(/\s+/)[s]) == null ? void 0 : c.split(O))[n];
    return i[a];
  }
};
var Re = class extends X {
  /**
   * Instantiate a Clock face with a given value and attributes.
   * 
   * @param attributes - The options passed to the instance.
   */
  constructor(t = {}) {
    super(t), this.format = l(t.format, "hh:mm:ss A"), this.labels = l(t.labels, this.labels);
  }
  /**
   * Get the default value if no value is passed.
   */
  defaultValue(t) {
    return t instanceof d ? d.make(t) : (t === void 0 && (t = /* @__PURE__ */ new Date()), d.make(new Date(t)));
  }
  /**
   * Format the face value into a string.
   * 
   * @param value - The face value to format.
   * @param format - The format string.
   * @returns The formatted face value as a string.
   */
  formatFaceValue(t) {
    return (s) => wt(
      t.value || /* @__PURE__ */ new Date(),
      s,
      this.dictionary
    );
  }
  /**
   * This method is called with every interval, or every time the clock
   * should change, and handles the actual incrementing and decrementing the
   * clock's `FaceValue`.
   *
   * @param instance - The FlipClock instance.
   */
  interval(t) {
    const s = t.timer.lastLoop ? (/* @__PURE__ */ new Date()).getTime() - t.timer.lastLoop : 0;
    this.value = this.value.copy(
      new Date(this.value.value.getTime() + s)
    );
  }
  /**
   * Render the clock face.
   * 
   * @returns The rendered VNode.
   */
  render() {
    var t;
    return h("div", { class: "flip-clock" }, this.createGroups(
      this.state.value,
      this.createGroups(((t = this.prevState) == null ? void 0 : t.value) || this.state.value)
    ));
  }
};
var Ee = class extends K {
  /**
   * Instantiate a Clock face with a given value and attributes.
   */
  constructor(t = {}) {
    super(t), this.countdown = false, this.step = 1, this.countdown = l(t.countdown, this.countdown), this.step = l(t.step, this.step);
  }
  /**
   * Get the default FaceValue using the instantiated value.
   */
  defaultValue(t) {
    return d.make(t || 0);
  }
  /**
   * Decrement the face value by the given value.
   */
  decrement(t) {
    const s = l(t, this.step);
    this.value = this.value.copy(
      this.value.value - (typeof s == "function" ? s() : s)
    );
  }
  /**
   * Increment the face value by the given value.
   */
  increment(t) {
    const s = l(t, this.step);
    this.value = this.value.copy(
      this.value.value + (typeof s == "function" ? s() : s)
    );
  }
  /**
   * This method is called with every interval, or every time the clock
   * should change, and handles the actual incrementing and decrementing the
   * clock's `FaceValue`.
   */
  interval() {
    this.countdown ? this.decrement() : this.increment();
  }
  /**
   * Render the clock face.
   */
  render() {
    const t = this.value.digits.map((s, n) => {
      var i;
      return new Z(
        s,
        ((i = this.lastValue) == null ? void 0 : i.digits[n]) || s
      );
    });
    return h("div", {
      class: "flip-clock"
    }, [
      h(new k({ items: t }))
    ]);
  }
};
var xe = class extends X {
  /**
   * Instantiate a Clock face with a given value and attributes.
   * 
   * @param attributes - The options passed to the instance.
   */
  constructor(t = {}) {
    super(Object.assign({
      value: d.make(t.end || /* @__PURE__ */ new Date())
    }, t)), this.countdown = false, this.format = l(t.format, "hh:mm:ss"), this.labels = l(t.labels, []), this.start = l(t.start, /* @__PURE__ */ new Date()), this.end = l(t.end, this.value);
  }
  /**
   * Get the default value if no value is passed.
   * 
   * @param value - The value passed from instantiation.
   * @returns A FaceValue instance.
   */
  defaultValue(t) {
    return super.defaultValue(t || /* @__PURE__ */ new Date());
  }
  /**
   * Format the face value into a string.
   * 
   * @param value - The face value to format.
   * @param format - The format string.
   * @returns The formatted face value as a string.
   */
  formatFaceValue(t) {
    return (s) => {
      const n = Mt(
        this.start,
        t == null ? void 0 : t.value,
        s
      );
      return Dt(n, s, this.dictionary);
    };
  }
  /**
   * This method is called with every interval, or every time the clock
   * should change, and handles the actual incrementing and decrementing the
   * clock's `FaceValue`.
   *
   * @param instance - The FlipClock instance.
   */
  interval(t) {
    var n;
    const s = new Date(
      ((n = this.value) == null ? void 0 : n.value.getTime()) + t.timer.elapsedSinceLastLoop
    );
    this.value = this.value.copy(s);
  }
  /**
   * Render the clock face.
   * 
   * @returns The rendered VNode.
   */
  render() {
    var s;
    const t = this.createGroups(
      ((s = this.prevState) == null ? void 0 : s.value) || this.state.value
    );
    return h("div", {
      class: "flip-clock"
    }, this.createGroups(
      this.state.value,
      t
    ));
  }
};
var Ct = {
  years: "سنوات",
  months: "شهور",
  days: "أيام",
  hours: "ساعات",
  minutes: "دقائق",
  seconds: "ثواني"
};
var Lt = ["ar", "ar-ar", "arabic"];
var Ve = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: Lt,
  dictionary: Ct
}, Symbol.toStringTag, { value: "Module" }));
var Ft = {
  years: "Anys",
  months: "Mesos",
  days: "Dies",
  hours: "Hores",
  minutes: "Minuts",
  seconds: "Segons"
};
var Yt = ["ca", "ca-es", "catalan"];
var Je = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: Yt,
  dictionary: Ft
}, Symbol.toStringTag, { value: "Module" }));
var Ht = {
  years: "Roky",
  months: "Měsíce",
  days: "Dny",
  hours: "Hodiny",
  minutes: "Minuty",
  seconds: "Sekundy"
};
var It = ["cs", "cs-cz", "cz", "cz-cs", "czech"];
var We = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: It,
  dictionary: Ht
}, Symbol.toStringTag, { value: "Module" }));
var Gt = {
  years: "År",
  months: "Måneder",
  days: "Dage",
  hours: "Timer",
  minutes: "Minutter",
  seconds: "Sekunder"
};
var Rt = ["da", "da-dk", "danish"];
var Ue = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: Rt,
  dictionary: Gt
}, Symbol.toStringTag, { value: "Module" }));
var Et = {
  years: "Jahre",
  months: "Monate",
  days: "Tage",
  hours: "Stunden",
  minutes: "Minuten",
  seconds: "Sekunden"
};
var xt = ["de", "de-de", "german"];
var qe = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: xt,
  dictionary: Et
}, Symbol.toStringTag, { value: "Module" }));
var Vt = {
  years: "Años",
  months: "Meses",
  days: "Días",
  hours: "Horas",
  minutes: "Minutos",
  seconds: "Segundos"
};
var Jt = ["es", "es-es", "spanish"];
var Ze = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: Jt,
  dictionary: Vt
}, Symbol.toStringTag, { value: "Module" }));
var Wt = {
  years: "سال",
  months: "ماه",
  days: "روز",
  hours: "ساعت",
  minutes: "دقیقه",
  seconds: "ثانیه"
};
var Ut = ["fa", "fa-ir", "persian"];
var Ke = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: Ut,
  dictionary: Wt
}, Symbol.toStringTag, { value: "Module" }));
var qt = {
  years: "Vuotta",
  months: "Kuukautta",
  days: "Päivää",
  hours: "Tuntia",
  minutes: "Minuuttia",
  seconds: "Sekuntia"
};
var Zt = ["fi", "fi-fi", "finnish"];
var Be = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: Zt,
  dictionary: qt
}, Symbol.toStringTag, { value: "Module" }));
var Kt = {
  years: "Ans",
  months: "Mois",
  days: "Jours",
  hours: "Heures",
  minutes: "Minutes",
  seconds: "Secondes"
};
var Bt = ["fr", "fr-ca", "french"];
var Qe = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: Bt,
  dictionary: Kt
}, Symbol.toStringTag, { value: "Module" }));
var Qt = {
  years: "שנים",
  months: "חודש",
  days: "ימים",
  hours: "שעות",
  minutes: "דקות",
  seconds: "שניות"
};
var Xt = ["il", "he-il", "hebrew"];
var Xe = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: Xt,
  dictionary: Qt
}, Symbol.toStringTag, { value: "Module" }));
var te = {
  years: "Év",
  months: "Hónap",
  days: "Nap",
  hours: "Óra",
  minutes: "Perc",
  seconds: "Másodperc"
};
var ee = ["hu", "hu-hu", "hungarian"];
var ts = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: ee,
  dictionary: te
}, Symbol.toStringTag, { value: "Module" }));
var se = {
  years: "Anni",
  months: "Mesi",
  days: "Giorni",
  hours: "Ore",
  minutes: "Minuti",
  seconds: "Secondi"
};
var ne = ["da", "da-dk", "danish"];
var es = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: ne,
  dictionary: se
}, Symbol.toStringTag, { value: "Module" }));
var ie = {
  years: "年",
  months: "月",
  days: "日",
  hours: "時",
  minutes: "分",
  seconds: "秒"
};
var re = ["jp", "ja-jp", "japanese"];
var ss = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: re,
  dictionary: ie
}, Symbol.toStringTag, { value: "Module" }));
var oe = {
  years: "년",
  months: "월",
  days: "일",
  hours: "시",
  minutes: "분",
  seconds: "초"
};
var ae = ["ko", "ko-kr", "korean"];
var ns = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: ae,
  dictionary: oe
}, Symbol.toStringTag, { value: "Module" }));
var ce = {
  years: "Gadi",
  months: "Mēneši",
  days: "Dienas",
  hours: "Stundas",
  minutes: "Minūtes",
  seconds: "Sekundes"
};
var ue = ["lv", "lv-lv", "latvian"];
var is = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: ue,
  dictionary: ce
}, Symbol.toStringTag, { value: "Module" }));
var le = {
  years: "Jaren",
  months: "Maanden",
  days: "Dagen",
  hours: "Uren",
  minutes: "Minuten",
  seconds: "Seconden"
};
var he = ["nl", "nl-be", "dutch"];
var rs = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: he,
  dictionary: le
}, Symbol.toStringTag, { value: "Module" }));
var de = {
  years: "År",
  months: "Måneder",
  days: "Dager",
  hours: "Timer",
  minutes: "Minutter",
  seconds: "Sekunder"
};
var fe = ["no", "nb", "no-nb", "norwegian"];
var os = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: fe,
  dictionary: de
}, Symbol.toStringTag, { value: "Module" }));
var me = {
  years: "Lat",
  months: "Miesięcy",
  days: "Dni",
  hours: "Godziny",
  minutes: "Minuty",
  seconds: "Sekundy"
};
var ye = ["pl", "pl-pl", "polish"];
var as = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: ye,
  dictionary: me
}, Symbol.toStringTag, { value: "Module" }));
var pe = {
  years: "Anos",
  months: "Meses",
  days: "Dias",
  hours: "Horas",
  minutes: "Minutos",
  seconds: "Segundos"
};
var ge = ["pt", "pt-br", "portuguese"];
var cs = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: ge,
  dictionary: pe
}, Symbol.toStringTag, { value: "Module" }));
var Se = {
  years: "Ani",
  months: "Luni",
  days: "Zile",
  hours: "Ore",
  minutes: "Minute",
  seconds: "sSecunde"
};
var be = ["ro", "ro-ro", "romana"];
var us = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: be,
  dictionary: Se
}, Symbol.toStringTag, { value: "Module" }));
var ve = {
  years: "лет",
  months: "месяцев",
  days: "дней",
  hours: "часов",
  minutes: "минут",
  seconds: "секунд"
};
var _e = ["ru", "ru-ru", "russian"];
var ls = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: _e,
  dictionary: ve
}, Symbol.toStringTag, { value: "Module" }));
var Me = {
  years: "Roky",
  months: "Mesiace",
  days: "Dni",
  hours: "Hodiny",
  minutes: "Minúty",
  seconds: "Sekundy"
};
var we = ["sk", "sk-sk", "slovak"];
var hs = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: we,
  dictionary: Me
}, Symbol.toStringTag, { value: "Module" }));
var De = {
  years: "År",
  months: "Månader",
  days: "Dagar",
  hours: "Timmar",
  minutes: "Minuter",
  seconds: "Sekunder"
};
var Oe = ["sv", "sv-se", "swedish"];
var ds = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: Oe,
  dictionary: De
}, Symbol.toStringTag, { value: "Module" }));
var je = {
  years: "ปี",
  months: "เดือน",
  days: "วัน",
  hours: "ชั่วโมง",
  minutes: "นาที",
  seconds: "วินาที"
};
var ke = ["th", "th-th", "thai"];
var fs = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: ke,
  dictionary: je
}, Symbol.toStringTag, { value: "Module" }));
var Te = {
  years: "Yıl",
  months: "Ay",
  days: "Gün",
  hours: "Saat",
  minutes: "Dakika",
  seconds: "Saniye"
};
var $e = ["tr", "tr-tr", "turkish"];
var ms = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: $e,
  dictionary: Te
}, Symbol.toStringTag, { value: "Module" }));
var Ae = {
  years: "роки",
  months: "місяці",
  days: "дні",
  hours: "години",
  minutes: "хвилини",
  seconds: "секунди"
};
var ze = ["ua", "ua-ua", "ukraine"];
var ys = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: ze,
  dictionary: Ae
}, Symbol.toStringTag, { value: "Module" }));
var Pe = {
  years: "Năm",
  months: "Tháng",
  days: "Ngày",
  hours: "Giờ",
  minutes: "Phút",
  seconds: "Giây"
};
var Ne = ["vn", "vn-vn", "vietnamese"];
var ps = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: Ne,
  dictionary: Pe
}, Symbol.toStringTag, { value: "Module" }));
var Ce = {
  years: "年",
  months: "月",
  days: "日",
  hours: "时",
  minutes: "分",
  seconds: "秒"
};
var Le = ["zh", "zh-cn", "chinese"];
var gs = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: Le,
  dictionary: Ce
}, Symbol.toStringTag, { value: "Module" }));
var Fe = {
  years: "年",
  months: "月",
  days: "日",
  hours: "時",
  minutes: "分",
  seconds: "秒"
};
var Ye = ["zh-tw"];
var Ss = Object.freeze(Object.defineProperty({
  __proto__: null,
  aliases: Ye,
  dictionary: Fe
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ve as Arabic,
  Z as Card,
  I as CardItem,
  Je as Catalan,
  gs as Chinese,
  Re as Clock,
  Ee as Counter,
  We as Czech,
  Ue as Danish,
  Y as Dictionary,
  G as Divider,
  rs as Dutch,
  xe as ElapsedTime,
  Ie as English,
  Pt as EventEmitter,
  K as Face,
  d as FaceValue,
  Be as Finnish,
  Ge as FlipClock,
  Qe as French,
  qe as German,
  k as Group,
  Xe as Hebrew,
  ts as Hungarian,
  es as Italian,
  ss as Japanese,
  ns as Korean,
  Nt as Label,
  is as Latvian,
  os as Norwegian,
  Ke as Persian,
  as as Polish,
  cs as Portuguese,
  us as Romanian,
  ls as Russian,
  hs as Slovak,
  Ze as Spanish,
  ds as Swedish,
  fs as Thai,
  _ as Timer,
  Ss as TraditionalChinese,
  ms as Turkish,
  ys as Ukrainian,
  L as VNode,
  ps as Vietnamese,
  ct as add,
  v as call,
  y as compareAsc,
  R as concatMap,
  j as deepFlatten,
  z as diff,
  J as differenceInDays,
  gt as differenceInHours,
  g as differenceInMilliseconds,
  St as differenceInMinutes,
  yt as differenceInMonths,
  bt as differenceInSeconds,
  pt as differenceInWeeks,
  mt as differenceInYears,
  E as digitize,
  Mt as duration,
  D as flatten,
  wt as formatDate,
  Dt as formatDuration,
  C as getTwelveHourFormat,
  h,
  ht as isLastDayOfMonth,
  rt as isNegative,
  V as isNegativeZero,
  $ as language,
  He as noop,
  u as pad,
  l as prop,
  U as ref,
  A as render,
  p as round
};
//# sourceMappingURL=flipclock.js.map
