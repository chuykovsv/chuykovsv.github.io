var g = Object.defineProperty;
var S = (i) => {
  throw TypeError(i);
};
var H = (i, t, e) => t in i ? g(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var u = (i, t, e) => H(i, typeof t != "symbol" ? t + "" : t, e), x = (i, t, e) => t.has(i) || S("Cannot " + e);
var s = (i, t, e) => (x(i, t, "read from private field"), e ? e.call(i) : t.get(i)), r = (i, t, e) => t.has(i) ? S("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), m = (i, t, e, o) => (x(i, t, "write to private field"), o ? o.call(i, e) : t.set(i, e), e), A = (i, t, e) => (x(i, t, "access private method"), e);
var n = /* @__PURE__ */ ((i) => (i[i.EMPTY = 0] = "EMPTY", i[i.FLAT = 1] = "FLAT", i[i.SHARP = 2] = "SHARP", i[i.NATURAL = 3] = "NATURAL", i))(n || {});
const v = new Map([
  { midi: 57, line: -8, key: n.EMPTY },
  { midi: 58, line: -8, key: n.SHARP },
  { midi: 59, line: -7, key: n.EMPTY },
  { midi: 60, line: -6, key: n.EMPTY },
  { midi: 61, line: -6, key: n.SHARP },
  { midi: 62, line: -5, key: n.EMPTY },
  { midi: 63, line: -5, key: n.SHARP },
  { midi: 64, line: -4, key: n.EMPTY },
  { midi: 65, line: -3, key: n.EMPTY },
  { midi: 66, line: -3, key: n.SHARP },
  { midi: 67, line: -2, key: n.EMPTY },
  { midi: 68, line: -2, key: n.SHARP },
  { midi: 69, line: -1, key: n.EMPTY },
  { midi: 70, line: -1, key: n.SHARP },
  { midi: 71, line: 0, key: n.EMPTY },
  { midi: 72, line: 1, key: n.EMPTY },
  { midi: 73, line: 1, key: n.SHARP },
  { midi: 74, line: 2, key: n.EMPTY },
  { midi: 75, line: 2, key: n.SHARP },
  { midi: 76, line: 3, key: n.EMPTY },
  { midi: 77, line: 4, key: n.EMPTY },
  { midi: 78, line: 4, key: n.SHARP },
  { midi: 79, line: 5, key: n.EMPTY },
  { midi: 80, line: 5, key: n.SHARP },
  { midi: 81, line: 6, key: n.EMPTY },
  { midi: 82, line: 6, key: n.SHARP },
  { midi: 83, line: 7, key: n.EMPTY },
  { midi: 84, line: 8, key: n.EMPTY },
  { midi: 85, line: 8, key: n.SHARP }
].map((i) => [i.midi, i]));
var w;
class L {
  constructor() {
    r(this, w, v);
  }
  midiToNoteView(t) {
    return s(this, w).get(t) ?? { midi: t, line: -100, key: n.EMPTY };
  }
}
w = new WeakMap();
class N {
  constructor(t) {
    u(this, "ctx");
    this.ctx = t;
  }
  start() {
    throw new Error("Needs implement start method");
  }
  stop() {
    throw new Error("Needs implement stop method");
  }
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  step(t, e) {
    throw new Error("Needs implement step method");
  }
}
const b = [
  [-0.4, 0.1],
  [-0.3, 0.1],
  [-0.2, 1.1],
  [-0.1, 1.1],
  [-0, 1.1],
  [0.1, 1.1],
  [0.2, 1.1],
  [0.3, 0.1],
  [0.4, 0.1]
];
var p, h, T, P, R;
class Y extends N {
  constructor() {
    super(...arguments);
    r(this, P);
    r(this, p, new L());
    r(this, h, 0);
    r(this, T, 0);
  }
  start() {
    A(this, P, R).call(this);
  }
  stop() {
  }
  step(e, o) {
    m(this, h, e), o !== 0 ? m(this, h, e) : (m(this, T, Math.floor(Math.random() * 28) + 57), m(this, h, -100)), A(this, P, R).call(this);
  }
}
p = new WeakMap(), h = new WeakMap(), T = new WeakMap(), P = new WeakSet(), R = function() {
  const e = this.ctx, o = e.canvas.width, a = e.canvas.height;
  e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, o, a), e.lineWidth = 2e-3, e.strokeStyle = "#000000", e.setTransform(a * 0.5, 0, 0, -a * 0.5, o * 0.5, a * 0.5), e.beginPath();
  for (const E of b)
    e.moveTo(-E[1], E[0]), e.lineTo(E[1], E[0]);
  e.stroke(), e.setTransform(a * 0.5, 0, 0, a * 0.5, o * 0.5, a * 0.5), e.fillStyle = "black", e.font = "0.6px serif", e.fillText("𝄞", -1.1, 0.195);
  const c = s(this, p).midiToNoteView(s(this, h)), M = s(this, p).midiToNoteView(s(this, T));
  e.fillStyle = "#0000ff", e.font = "0.12px serif", e.fillText(`${M.key === n.EMPTY ? "" : "♯"}`, -0.1, -M.line * 0.05 + 0.03), e.font = "0.3px serif", e.fillText("𝅝", -0.05, -M.line * 0.05 + 0.03), e.fillStyle = s(this, h) === s(this, T) ? "#008000" : "#800000", e.font = "0.12px serif", e.fillText(`${c.key === n.EMPTY ? "" : "♯"}`, 0.15, -c.line * 0.05 + 0.03), e.font = "0.3px serif", e.fillText("𝅝", 0.2, -c.line * 0.05 + 0.03);
}, u(Y, "name", "staff");
var l, y, d, f, k;
class I {
  constructor() {
    r(this, l);
    r(this, y, /* @__PURE__ */ new Map());
    r(this, d, null);
    r(this, f, () => {
      const t = window.devicePixelRatio, e = Math.round(window.innerWidth * t), o = Math.round(window.innerHeight * t);
      s(this, l).canvas.width = e, s(this, l).canvas.height = o;
    });
    r(this, k, (t) => {
      const e = t.data ? t.data[0] ?? 0 : 0, o = t.data ? t.data[1] ?? 0 : 0, a = t.data ? t.data[2] ?? 0 : 0;
      switch (e & 240) {
        case 144:
          s(this, d)?.step(o, a);
          break;
        case 128:
          s(this, d)?.step(o, 0);
          break;
      }
    });
    const t = document.createElement("canvas"), e = t.getContext("2d");
    if (e === null)
      throw new Error("ctx");
    document.body.style.overflow = "hidden", t.style.cssText = "position:absolute;width:100%;height:100%;top:0px;right:0px;", t.oncontextmenu = () => !1, document.body.appendChild(t), window.addEventListener("resize", s(this, f)), navigator.requestMIDIAccess({
      sysex: !0,
      software: !0
    }).then((o) => {
      o.inputs.forEach((a) => {
        a.addEventListener("midimessage", s(this, k));
      }), o.addEventListener("statechange", (a) => {
        const c = a.port;
        c instanceof MIDIInput && c?.state === "connected" && c.addEventListener("midimessage", s(this, k));
      });
    }), m(this, l, e), s(this, f).call(this);
  }
  regLesson(t) {
    s(this, y).set(t.name, new t(s(this, l)));
  }
  startLesson(t) {
    s(this, d) && s(this, d).stop(), s(this, l).clearRect(0, 0, s(this, l).canvas.width, s(this, l).canvas.height), m(this, d, s(this, y).get(t) ?? null), s(this, d)?.start();
  }
}
l = new WeakMap(), y = new WeakMap(), d = new WeakMap(), f = new WeakMap(), k = new WeakMap();
try {
  const i = new I();
  i.regLesson(Y), i.startLesson(Y.name);
} catch (i) {
  const t = document.createElement("div");
  t.innerText = `${i}`, t.style.color = "red", document.body.appendChild(t);
}
