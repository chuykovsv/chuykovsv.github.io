var H = Object.defineProperty;
var g = (i) => {
  throw TypeError(i);
};
var v = (i, e, t) => e in i ? H(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var u = (i, e, t) => v(i, typeof e != "symbol" ? e + "" : e, t), A = (i, e, t) => e.has(i) || g("Cannot " + t);
var n = (i, e, t) => (A(i, e, "read from private field"), t ? t.call(i) : e.get(i)), a = (i, e, t) => e.has(i) ? g("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), c = (i, e, t, o) => (A(i, e, "write to private field"), o ? o.call(i, t) : e.set(i, t), t), f = (i, e, t) => (A(i, e, "access private method"), t);
var s = /* @__PURE__ */ ((i) => (i[i.EMPTY = 0] = "EMPTY", i[i.FLAT = 1] = "FLAT", i[i.SHARP = 2] = "SHARP", i[i.NATURAL = 3] = "NATURAL", i))(s || {});
const x = new Map([
  { midi: 57, line: -8, key: s.EMPTY },
  { midi: 58, line: -8, key: s.SHARP },
  { midi: 59, line: -7, key: s.EMPTY },
  { midi: 60, line: -6, key: s.EMPTY },
  { midi: 61, line: -6, key: s.SHARP },
  { midi: 62, line: -5, key: s.EMPTY },
  { midi: 63, line: -5, key: s.SHARP },
  { midi: 64, line: -4, key: s.EMPTY },
  { midi: 65, line: -3, key: s.EMPTY },
  { midi: 66, line: -3, key: s.SHARP },
  { midi: 67, line: -2, key: s.EMPTY },
  { midi: 68, line: -2, key: s.SHARP },
  { midi: 69, line: -1, key: s.EMPTY },
  { midi: 70, line: -1, key: s.SHARP },
  { midi: 71, line: 0, key: s.EMPTY },
  { midi: 72, line: 1, key: s.EMPTY },
  { midi: 73, line: 1, key: s.SHARP },
  { midi: 74, line: 2, key: s.EMPTY },
  { midi: 75, line: 2, key: s.SHARP },
  { midi: 76, line: 3, key: s.EMPTY },
  { midi: 77, line: 4, key: s.EMPTY },
  { midi: 78, line: 4, key: s.SHARP },
  { midi: 79, line: 5, key: s.EMPTY },
  { midi: 80, line: 5, key: s.SHARP },
  { midi: 81, line: 6, key: s.EMPTY },
  { midi: 82, line: 6, key: s.SHARP },
  { midi: 83, line: 7, key: s.EMPTY },
  { midi: 84, line: 8, key: s.EMPTY },
  { midi: 85, line: 8, key: s.SHARP }
].map((i) => [i.midi, i]));
var M;
class L {
  constructor() {
    a(this, M, x);
  }
  midiToNoteView(e) {
    return n(this, M).get(e) ?? { midi: e, line: -100, key: s.EMPTY };
  }
}
M = new WeakMap();
class N {
  constructor(e) {
    u(this, "ctx");
    this.ctx = e;
  }
  start() {
    throw new Error("Needs implement start method");
  }
  stop() {
    throw new Error("Needs implement stop method");
  }
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  step(e, t) {
    throw new Error("Needs implement step method");
  }
}
const b = [
  [-0.4, 0.1],
  [-0.3, 0.1],
  [-0.2, 0.9],
  [-0.1, 0.9],
  [-0, 0.9],
  [0.1, 0.9],
  [0.2, 0.9],
  [0.3, 0.1],
  [0.4, 0.1]
];
var p, h, m, k, Y;
class R extends N {
  constructor() {
    super(...arguments);
    a(this, k);
    a(this, p, new L());
    a(this, h, 0);
    a(this, m, 0);
  }
  start() {
    f(this, k, Y).call(this);
  }
  stop() {
  }
  step(t, o) {
    c(this, h, t), o !== 0 ? c(this, h, t) : (c(this, m, Math.floor(Math.random() * 28) + 57), c(this, h, -100)), f(this, k, Y).call(this);
  }
}
p = new WeakMap(), h = new WeakMap(), m = new WeakMap(), k = new WeakSet(), Y = function() {
  const t = this.ctx, o = t.canvas.width, d = t.canvas.height;
  t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, o, d), t.lineWidth = 2e-3, t.strokeStyle = "#000000", t.setTransform(d * 0.5, 0, 0, -d * 0.5, o * 0.5, d * 0.5), t.beginPath();
  for (const E of b)
    t.moveTo(-E[1], E[0]), t.lineTo(E[1], E[0]);
  t.stroke();
  const P = n(this, p).midiToNoteView(n(this, h)), S = n(this, p).midiToNoteView(n(this, m));
  t.strokeStyle = "#0000ff", t.beginPath(), t.ellipse(0, S.line * 0.05, 0.04, 0.04, 0, 0, Math.PI * 2), t.stroke(), t.fillStyle = n(this, h) === n(this, m) ? "#008000" : "#800000", t.beginPath(), t.ellipse(0, P.line * 0.05, 0.03, 0.03, 0, 0, Math.PI * 2), t.fill();
}, u(R, "name", "staff");
var r, y, l, T, w;
class I {
  constructor() {
    a(this, r);
    a(this, y, /* @__PURE__ */ new Map());
    a(this, l, null);
    a(this, T, () => {
      const e = window.devicePixelRatio, t = Math.round(window.innerWidth * e), o = Math.round(window.innerHeight * e);
      n(this, r).canvas.width = t, n(this, r).canvas.height = o;
    });
    a(this, w, (e) => {
      const t = e.data ? e.data[0] ?? 0 : 0, o = e.data ? e.data[1] ?? 0 : 0, d = e.data ? e.data[2] ?? 0 : 0;
      switch (t & 240) {
        case 144:
          n(this, l)?.step(o, d);
          break;
        case 128:
          n(this, l)?.step(o, 0);
          break;
      }
    });
    const e = document.createElement("canvas"), t = e.getContext("2d");
    if (t === null)
      throw new Error("ctx");
    document.body.style.overflow = "hidden", e.style.cssText = "position:absolute;width:100%;height:100%;top:0px;right:0px;", e.oncontextmenu = () => !1, document.body.appendChild(e), window.addEventListener("resize", n(this, T)), navigator.requestMIDIAccess({
      sysex: !0,
      software: !0
    }).then((o) => {
      o.inputs.forEach((d) => {
        d.addEventListener("midimessage", n(this, w));
      }), o.addEventListener("statechange", (d) => {
        const P = d.port;
        P instanceof MIDIInput && P?.state === "connected" && P.addEventListener("midimessage", n(this, w));
      });
    }), c(this, r, t), n(this, T).call(this);
  }
  regLesson(e) {
    n(this, y).set(e.name, new e(n(this, r)));
  }
  startLesson(e) {
    n(this, l) && n(this, l).stop(), n(this, r).clearRect(0, 0, n(this, r).canvas.width, n(this, r).canvas.height), c(this, l, n(this, y).get(e) ?? null), n(this, l)?.start();
  }
}
r = new WeakMap(), y = new WeakMap(), l = new WeakMap(), T = new WeakMap(), w = new WeakMap();
try {
  const i = new I();
  i.regLesson(R), i.startLesson(R.name);
} catch (i) {
  const e = document.createElement("div");
  e.innerText = `${i}`, e.style.color = "red", document.body.appendChild(e);
}
