/* MPC SAMPLE // top-panel + rear-panel map for the cheat sheet.
   Geometry traced from the Features chapter of the User Guide v1.3.0 (device units, origin = top-left of art).
   Builds the device, routes leader lines to label columns, wires hover/click info + the SHIFT layer. */
(function () {
  "use strict";
  const OX = 300, OY = 92;           // device offset inside the global viewBox
  const W = 1500, H = 1048;
  const L_TEXT = 300, L_END = 308;   // left label column (text-anchor end)
  const R_TEXT = 1200, R_END = 1192; // right label column
  const L_EDGE = OX + 80 - 16, R_EDGE = OX + 820 + 16;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- control data ---------- */
  const C = [
    // left column
    { id: "vol", side: "L", a: [[176, 190]], lane: 190, name: "MAIN VOLUME", shift: "", k: "MAIN VOLUME", info: "Master level for the built-in speaker, PHONES and AUDIO OUT. The meters show output, or input level while sampling." },
    { id: "banks", side: "L", a: [[282, 186]], lane: 146, name: "BANK LEDS A–H", shift: "current pad bank", k: "PAD BANK", info: "8 banks × 16 pads = 128 samples per project. Hold PAD BANK + PAD 1–8 to jump straight to a bank." },
    { id: "display", side: "L", a: [[355, 232]], lane: 232, name: "DISPLAY", shift: "2.4\" · 320×240 SPI LCD", k: "B1", info: "320×240 colour LCD (ST7796S over SPI, per community teardown). A SHIFT icon on screen means holding SHIFT reveals more K1–K3 / B1–B3 parameters." },
    { id: "batt", side: "L", a: [[262, 259]], lane: 259, name: "BATTERY · CHARGE", shift: "green / amber / red / blink", k: "", info: "Green = 100–30% · amber = 29–15% · red = 14–5% · blinking red = under 5%, plug in now. Charge icon lights only while charging (it goes dark when full)." },
    { id: "seq", side: "L", a: [[212, 322]], lane: 321, name: "SEQ", shift: "STEP EDIT", k: "SEQ", info: "Sequence mode: pads select or queue sequences (128 per project). B1 hold = BPM, B2 = SEQ/GBL tempo, B3 = rec quantize, K1 length, K2 Q, K3 real-time swing." },
    { id: "sample", side: "L", a: [[110, 337]], lane: 337, name: "SAMPLE", shift: "INPUT CONFIG", k: "SAMPLE", info: "The home mode: pads trigger samples and show the waveform. B1/B2/B3 cycle Trim·Mix·Amp Env / Tune·Play / Filter·Filt Env. Hold SAMPLE + pad to select silently." },
    { id: "knobfx", side: "L", a: [[212, 370]], lane: 369, name: "KNOB FX", shift: "FX SELECT", k: "KNOB FX", info: "One effect (out of 28) driven by K1–K3, applied to the pads you pick. SHIFT + KNOB FX picks the effect and the target pads (B2 all, B3 bypass)." },
    { id: "padfx", side: "L", a: [[110, 385]], lane: 385, name: "PAD FX", shift: "FLEX BEAT", k: "PAD FX", info: "16 performance effects on the pads, pressure = amount, up to 4 stacked, B1 latches. SHIFT + PAD FX = Flex Beat: time-warp chops, scratches and gates." },
    { id: "padbank", side: "L", a: [[212, 433]], lane: 424, name: "PAD BANK", shift: "previous bank", k: "PAD BANK", info: "Cycle banks A→H. Hold + PAD 1–8 jumps directly; SHIFT + PAD BANK goes back one." },
    { id: "shift", side: "L", a: [[107, 446]], lane: 446, name: "SHIFT", shift: "2nd function of everything", k: "SHIFT", info: "Hold for the secondary function printed under each button and pad. Buttons with a SHIFT function glow dim red while held (bright red if active)." },
    { id: "fader", side: "L", a: [[176, 603]], lane: 603, name: "FADER", shift: "SHIFT + PAD 9 assigns it", k: "FADER", info: "Pad Volume by default. Can drive Pan, Tune, Amp Attack, Decay/Release, Filter Cutoff or Kit Volume. LED brightness = value. In Step Edit it nudges event timing." },
    { id: "noterep", side: "L", a: [[212, 744]], lane: 741, name: "NOTE REPEAT", shift: "TRIPLET", k: "NOTE REPEAT", info: "Tap to latch, hold for momentary rolls. B1–B3 pick the division, SHIFT shows triplets. Time Correct swing also swings Note Repeat." },
    { id: "erase", side: "L", a: [[110, 759]], lane: 759, name: "ERASE", shift: "COPY", k: "ERASE", info: "ERASE + pad deletes a sample (stopped), live-wipes that pad's notes (playing), or deletes a sequence (Seq mode). ERASE + knob/fader erases automation. SHIFT + ERASE copies." },
    { id: "pads", side: "L", a: [[300, 772]], lane: 800, name: "PADS 1–16", shift: "SHIFT fn printed under each pad", k: "PAD", info: "Velocity + polyphonic aftertouch. Click any pad for its SHIFT function, Pad FX slot and MIDI note." },
    // top
    { id: "bbtns", side: "T", a: [[384, 87], [447, 87], [511, 87]], lane: 64, name: "B1 · B2 · B3", shift: "function buttons: page / action", k: "B1", info: "Context buttons above the screen: page cycling in Sample mode, Latch in Pad FX, Do It! / Cancel in menus. They have no LEDs." },
    // right column
    { id: "meters", side: "R", a: [[594, 134]], lane: 118, name: "METERS", shift: "input level while sampling", k: "", info: "Output level normally; input level in Sample Record. Living in the red while recording? Lower the source or REC GAIN on the back." },
    { id: "speaker", side: "R", a: [[710, 192]], lane: 192, name: "SPEAKER", shift: "3 W · auto-off with jacks", k: "", info: "3 W built-in speaker. It mutes when PHONES or AUDIO OUT are plugged in, and while sampling the built-in mic with monitoring on (no feedback)." },
    { id: "knobs", side: "R", a: [[310, 322], [448, 322], [586, 322]], lane: 298, name: "K1 · K2 · K3", shift: "SHIFT = hidden 2nd params", k: "K1", info: "Absolute 270° knobs. Since fw 1.3 knobs and Knob FX default to SCALED takeover (fader stays Pickup), configurable in SHIFT + PAD 8. SHIFT + K1/K2/K3 in Trim = ZOOM." },
    { id: "chop", side: "R", a: [[682, 322]], lane: 321, name: "CHOP", shift: "NOTE ON", k: "CHOP", info: "Slice the selected sample across the pads: Threshold (default), Regions 4/8/16 or Manual (tap pads live). SHIFT + B1 extracts a slice, B2 splits, B3 merges." },
    { id: "mute", side: "R", a: [[785, 337]], lane: 337, name: "MUTE", shift: "UNMUTE ALL", k: "MUTE", info: "Works from ANY mode. Tap to latch mute mode, hold for momentary. Red = muted, yellow = playing." },
    { id: "loop", side: "R", a: [[682, 370]], lane: 369, name: "LOOP", shift: "REVERSE", k: "LOOP", info: "Pad loops between Loop point (K3 in Trim) and End. Loop Lock pins loop start to sample start (SHIFT + B1 in Trim)." },
    { id: "lev16", side: "R", a: [[785, 385]], lane: 385, name: "16 LEVELS", shift: "TYPE", k: "16 LEVELS", info: "Spread one sample over 16 pads by Velocity, Filter or Tune. In Tune, the original pitch sits on PAD 4: instant chromatic-ish melodies." },
    { id: "ssel", side: "R", a: [[682, 433]], lane: 426, name: "SAMPLE SELECT", shift: "SAVE SAMPLE", k: "SAMPLE SELECT", info: "Browser: ENCODER scrolls/opens, B1 back, B2 Internal ↔ microSD, B3 preview on/off. SHIFT = save the selected sample." },
    { id: "tap", side: "R", a: [[785, 448]], lane: 448, name: "TAP TEMPO", shift: "METRO", k: "TAP TEMPO", info: "Tap the tempo, or HOLD + turn the ENCODER for a BPM pop-up in any mode. SHIFT cycles the metronome Off / On / Record." },
    { id: "mic", side: "R", a: [[789, 506]], lane: 506, name: "MIC", shift: "built-in condenser", k: "", info: "Choose 'Mic' as source (K1 in Sample Record). The speaker auto-mutes to stop feedback. Fw 1.3 fixed the mic recording in stereo after power cycling." },
    { id: "enc", side: "R", a: [[764, 552]], lane: 552, name: "ENCODER", shift: "push = select / cycle", k: "ENCODER", info: "Scroll and push to select. In Sample mode, push cycles focus through K1–K3 params (SHIFT + push = backwards). In Seq mode it moves the playhead." },
    { id: "undo", side: "R", a: [[682, 617], [756, 617]], lane: 609, name: "− / +", shift: "UNDO / REDO", k: "SHIFT + −", info: "Step values and lists. SHIFT + − undoes, SHIFT + + redoes. Right after a take, SHIFT + − wipes everything recorded since record began." },
    { id: "srec", side: "R", a: [[682, 677]], lane: 674, name: "SAMPLE RECORD", shift: "RECALL · last ~25 s", k: "SAMPLE RECORD", info: "Arm sampling (K1 source, K2 Free/Seq, K3 threshold), tap a pad to start. Tap more pads mid-take to chop live. SHIFT = retro-capture the last ~25 s of input." },
    { id: "sqrec", side: "R", a: [[785, 694]], lane: 694, name: "SEQ RECORD", shift: "RECALL · last loop", k: "SEQ RECORD", info: "Arm sequence recording, PLAY to roll; it overdubs after the first pass. SHIFT = drop what you jammed on the last loop into the sequence." },
    { id: "stop", side: "R", a: [[682, 735]], lane: 736, name: "STOP", shift: "double-tap = all sound off", k: "STOP", info: "Stops playback/recording. Double-tap to kill every voice." },
    { id: "play", side: "R", a: [[785, 752]], lane: 752, name: "PLAY", shift: "CONTINUE", k: "PLAY", info: "Play from the top of the sequence. SHIFT + PLAY continues from the playhead (or from the highlighted sequence in Song mode)." }
  ];

  // panel-MCU pad notes (internal), from the community control-surface protocol doc
  const PAD_INT = [37, 36, 42, 82, 40, 38, 46, 44, 48, 47, 45, 43, 49, 55, 51, 53];

  /* ---------- drawing helpers (device units) ---------- */
  function btn(id, cx, cy, label, opt = {}) {
    const w = opt.w || 58, h = opt.h || 30;
    const fill = opt.fill || "#8b8e95";
    const lines = label.split("|");
    const tc = opt.dark ? "btn-txt dark" : "btn-txt";
    let t = "";
    lines.forEach((ln, i) => {
      const y = cy + 3.5 + (i - (lines.length - 1) / 2) * 10;
      t += '<text class="' + tc + '" x="' + cx + '" y="' + y + '" text-anchor="middle">' + esc(ln) + "</text>";
    });
    let extra = "";
    if (opt.bar) extra += '<rect x="' + (cx - w / 2 + 6) + '" y="' + (cy + h / 2 - 8) + '" width="' + (w - 12) + '" height="4" rx="1" fill="' + opt.bar + '"/>';
    if (opt.icon === "stop") extra += '<rect x="' + (cx - 7) + '" y="' + (cy - 11) + '" width="14" height="14" fill="#f2f2f2"/>';
    if (opt.icon === "play") extra += '<path d="M' + (cx - 6) + " " + (cy - 12) + " L" + (cx + 9) + " " + (cy - 4) + " L" + (cx - 6) + " " + (cy + 4) + 'Z" fill="#f2f2f2"/>';
    const sh = opt.shift ? '<text class="legend-txt shift-legend" x="' + cx + '" y="' + (cy + h / 2 + 12) + '" text-anchor="middle">' + esc(opt.shift) + "</text>" : "";
    return '<g class="ctl" data-id="' + id + '"><g class="body"><rect x="' + (cx - w / 2) + '" y="' + (cy - h / 2) + '" width="' + w + '" height="' + h + '" rx="5" fill="' + fill + '" stroke="rgba(0,0,0,.35)"/>' +
      '<rect x="' + (cx - w / 2 + 2) + '" y="' + (cy - h / 2 + 2) + '" width="' + (w - 4) + '" height="' + (h / 2 - 2) + '" rx="4" fill="rgba(255,255,255,.12)"/>' + extra + t + "</g>" + sh + "</g>";
  }
  function knob(id, cx, cy, r, label) {
    const ring = r + 13;
    const a0 = (135 * Math.PI) / 180, a1 = (405 * Math.PI) / 180;
    const p = (a) => (cx + ring * Math.cos(a)).toFixed(1) + " " + (cy + ring * Math.sin(a)).toFixed(1);
    return '<g class="ctl" data-id="' + id + '"><path d="M' + p(a0) + " A" + ring + " " + ring + " 0 1 1 " + p(a1) + '" fill="none" stroke="#2f3a57" stroke-width="2.5"/>' +
      '<circle cx="' + (cx + ring * Math.cos(a0)) + '" cy="' + (cy + ring * Math.sin(a0)) + '" r="3.5" fill="#1b2645"/><circle cx="' + (cx + ring * Math.cos(a1)) + '" cy="' + (cy + ring * Math.sin(a1)) + '" r="3.5" fill="#1b2645"/>' +
      '<g class="body"><circle cx="' + cx + '" cy="' + cy + '" r="' + (r + 6) + '" fill="#e9e5df" stroke="#9a958e"/><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="url(#capg)" stroke="#2a2f37"/>' +
      '<rect x="' + (cx - 2) + '" y="' + (cy - r + 3) + '" width="4" height="' + (r - 3) + '" rx="2" fill="#f4f4f4"/></g>' +
      (label ? '<text class="legend-txt" x="' + cx + '" y="' + (cy + r + 30) + '" text-anchor="middle" style="font-size:11px">' + label + "</text>" : "") + "</g>";
  }

  function wave() {
    let d = "", d2 = "";
    for (let i = 0; i <= 170; i++) {
      const x = 362 + i;
      const beat = Math.pow(Math.max(0, Math.cos(((i % 34) / 34) * Math.PI)), 3);
      const amp = 4 + 13 * beat * (0.65 + 0.35 * Math.sin(i * 1.7)) * (0.8 + 0.2 * Math.sin(i * 0.31));
      d += (i ? "L" : "M") + x + " " + (178 - amp).toFixed(1);
      d2 = "L" + x + " " + (178 + amp).toFixed(1) + d2;
    }
    return d + d2.replace(/^L/, "L") + "Z";
  }

  function device() {
    let s = "";
    s += '<defs><linearGradient id="chg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ece8e3"/><stop offset="1" stop-color="#d6d1cb"/></linearGradient>' +
      '<radialGradient id="capg" cx=".4" cy=".35"><stop offset="0" stop-color="#6c7480"/><stop offset="1" stop-color="#363c46"/></radialGradient>' +
      '<linearGradient id="padg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a9da4"/><stop offset="1" stop-color="#7b7e85"/></linearGradient>' +
      '<pattern id="grill" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1.6" fill="#050506"/></pattern></defs>';
    // chassis + top panel
    s += '<rect x="80" y="60" width="740" height="872" rx="46" fill="url(#chg)" stroke="#8e8982" stroke-width="3"/>';
    s += '<rect x="90" y="70" width="720" height="852" rx="38" fill="none" stroke="#fff" stroke-opacity=".55"/>';
    s += '<path d="M128 72 H772 Q808 72 808 108 V290 H92 V108 Q92 72 128 72Z" fill="#151518"/>';
    s += '<text x="118" y="118" font-family="Georgia, \'Times New Roman\', serif" font-weight="700" font-size="46" fill="#d71920" letter-spacing="1">AKAI</text>';
    s += '<text x="146" y="136" font-family="Georgia, serif" font-style="italic" font-size="16" fill="#d71920">professional</text>';
    s += '<text x="782" y="108" text-anchor="end" font-family="\'Chakra Petch\', sans-serif" font-weight="700" font-size="25" fill="#d71920" letter-spacing="1">MPC <tspan fill="none" stroke="#d71920" stroke-width="1.2">SAMPLE</tspan></text>';
    // main volume + banks + battery
    s += knob("vol", 176, 190, 24, "");
    s += '<text x="176" y="250" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="9.5" fill="#77746f">MAIN VOLUME</text>';
    const bank = "ABCDEFGH";
    for (let i = 0; i < 8; i++) {
      const row = i < 4 ? 1 : 0, col = i % 4;
      s += '<text x="' + (254 + col * 15) + '" y="' + (183 + row * 20) + '" font-family="sans-serif" font-weight="700" font-size="14" fill="' + (i === 0 ? "#f4f4f4" : "#3d3d42") + '" text-anchor="middle">' + bank[i] + "</text>";
    }
    s += '<g class="ctl" data-id="banks"><rect class="body" x="242" y="166" width="60" height="42" fill="transparent"/></g>';
    s += '<g class="ctl" data-id="batt"><g class="body"><rect x="254" y="255" width="22" height="9" rx="2" fill="#39e08a"/><rect x="286" y="254" width="20" height="11" rx="2" fill="none" stroke="#7a7a80"/><path d="M297 255 l-4 5 h3 l-2 4 l5 -6 h-3 l2 -3z" fill="#bbb"/></g></g>';
    // display
    s += '<g class="ctl" data-id="display"><g class="body"><rect x="353" y="130" width="191" height="144" rx="3" fill="#050505" stroke="#2c2c30"/>' +
      '<rect x="359" y="135" width="52" height="12" fill="#f2f2f2"/><text x="385" y="144" text-anchor="middle" font-family="monospace" font-size="8" fill="#000">Trim</text>' +
      '<text x="447" y="144" text-anchor="middle" font-family="monospace" font-size="8" fill="#ccc">Tune</text><text x="511" y="144" text-anchor="middle" font-family="monospace" font-size="8" fill="#ccc">Filter</text>' +
      '<text x="360" y="161" font-family="monospace" font-size="7.5" fill="#ffb000">A02  BrassPh-Rya Dm 70</text>' +
      '<path d="' + wave() + '" fill="#ffb000" opacity=".95"/><line x1="389" y1="160" x2="389" y2="198" stroke="#fff" stroke-width=".6"/><line x1="476" y1="160" x2="476" y2="198" stroke="#fff" stroke-width=".6"/>' +
      '<text x="363" y="262" font-family="monospace" font-size="7.5" fill="#ddd">Start</text><text x="425" y="262" font-family="monospace" font-size="7.5" fill="#ddd">End</text><text x="489" y="262" font-family="monospace" font-size="7.5" fill="#4fb3ff">Loop</text>' +
      '<rect x="362" y="266" width="40" height="2" fill="#555"/><rect x="424" y="266" width="40" height="2" fill="#555"/><rect x="488" y="266" width="40" height="2" fill="#555"/><rect x="424" y="266" width="28" height="2" fill="#eee"/></g></g>';
    // B1..B3
    [384, 447, 511].forEach((x, i) => {
      s += '<g class="ctl" data-id="bbtns"><g class="body"><rect x="' + (x - 28) + '" y="87" width="56" height="22" rx="4" fill="#565c66" stroke="#2a2d33"/><text class="btn-txt" x="' + x + '" y="101.5" text-anchor="middle">B' + (i + 1) + "</text></g></g>";
    });
    // meters
    let m = '<g class="ctl" data-id="meters"><g class="body">';
    [583, 601].forEach((x) => {
      const segs = ["#4a4a50", "#4a4a50", "#ffd400", "#3bbf4a", "#3bbf4a", "#3bbf4a"];
      segs.forEach((c, i) => { m += '<rect x="' + x + '" y="' + (134 + i * 23) + '" width="10" height="17" rx="1" fill="' + c + '"/>'; });
    });
    s += m + "</g></g>";
    // speaker
    s += '<g class="ctl" data-id="speaker"><g class="body"><rect x="645" y="127" width="130" height="130" rx="12" fill="#26262a" stroke="#3a3a40"/><rect x="653" y="135" width="114" height="114" rx="8" fill="url(#grill)"/></g></g>';
    // section headers
    s += '<line x1="112" y1="314" x2="150" y2="314" stroke="#2a2d33"/><text x="176" y="318" text-anchor="middle" class="legend-txt" style="font-size:10px">MODE</text><line x1="202" y1="314" x2="240" y2="314" stroke="#2a2d33"/>';
    s += '<line x1="654" y1="314" x2="686" y2="314" stroke="#2a2d33"/><text x="721" y="318" text-anchor="middle" class="legend-txt" style="font-size:10px">PAD PLAY</text><line x1="756" y1="314" x2="788" y2="314" stroke="#2a2d33"/>';
    s += '<line x1="112" y1="424" x2="240" y2="424" stroke="#2a2d33" stroke-opacity=".5"/><line x1="654" y1="424" x2="788" y2="424" stroke="#2a2d33" stroke-opacity=".5"/>';
    // mode buttons
    s += btn("sample", 139, 337, "SAMPLE", { shift: "INPUT CONFIG" });
    s += btn("seq", 212, 337, "SEQ", { shift: "STEP EDIT" });
    s += btn("padfx", 139, 385, "PAD|FX", { fill: "#ff5a1f", shift: "FLEX BEAT" });
    s += btn("knobfx", 212, 385, "KNOB|FX", { fill: "#ff5a1f", shift: "FX SELECT" });
    s += '<g class="ctl shift-cap" data-id="shift"><rect x="107" y="428" width="64" height="56" rx="7" fill="#3f4756"/><g class="body"><rect x="112" y="432" width="54" height="30" rx="5" fill="#8b8e95" stroke="rgba(0,0,0,.35)"/></g><text x="139" y="477" text-anchor="middle" class="btn-txt">SHIFT</text></g>';
    s += btn("padbank", 212, 448, "PAD|BANK");
    // knobs
    s += knob("knobs", 310, 360, 22, "K1") + knob("knobs", 448, 360, 22, "K2") + knob("knobs", 586, 360, 22, "K3");
    // pad play
    s += btn("chop", 682, 337, "CHOP", { fill: "#1f8fe5", shift: "NOTE ON" });
    s += btn("mute", 756, 337, "MUTE", { fill: "#1f8fe5", shift: "UNMUTE ALL" });
    s += btn("loop", 682, 385, "LOOP", { fill: "#1f8fe5", shift: "REVERSE" });
    s += btn("lev16", 756, 385, "16|LEVELS", { fill: "#1f8fe5", shift: "TYPE" });
    s += btn("ssel", 682, 448, "SAMPLE|SELECT", { shift: "SAVE SAMPLE" });
    s += btn("tap", 756, 448, "TAP|TEMPO", { shift: "METRO" });
    // mic + encoder
    s += '<g class="ctl" data-id="mic"><g class="body"><rect x="775" y="492" width="14" height="20" rx="7" fill="#2f3a57"/><circle cx="779" cy="498" r="1.6" fill="#ddd"/><circle cx="785" cy="498" r="1.6" fill="#ddd"/><circle cx="779" cy="505" r="1.6" fill="#ddd"/><circle cx="785" cy="505" r="1.6" fill="#ddd"/><path d="M771 506 q11 14 22 0 M782 517 v5" stroke="#2f3a57" fill="none" stroke-width="1.5"/></g></g>';
    s += '<g class="ctl" data-id="enc"><g class="body"><circle cx="720" cy="552" r="44" fill="#ebe7e2" stroke="#8e8982" stroke-width="2"/><circle cx="720" cy="552" r="36" fill="none" stroke="#c7c2bb" stroke-width="3" stroke-dasharray="2 3"/><circle cx="720" cy="552" r="28" fill="#e2ded8"/></g></g>';
    // -/+ and transport
    s += btn("undo", 682, 632, "−", { shift: "UNDO" });
    s += btn("undo", 756, 632, "+", { shift: "REDO" });
    s += btn("srec", 682, 694, "SAMPLE|RECORD", { fill: "#cfcac3", dark: true, bar: "#e4002b", h: 34, shift: "RECALL" });
    s += btn("sqrec", 756, 694, "SEQ|RECORD", { fill: "#cfcac3", dark: true, bar: "#e4002b", h: 34, shift: "RECALL" });
    s += btn("stop", 682, 752, "", { fill: "#8b8e95", bar: "#f4f4f4", icon: "stop", h: 34 });
    s += btn("play", 756, 752, "", { fill: "#8b8e95", bar: "#39e08a", icon: "play", h: 34, shift: "CONTINUE" });
    // fader
    s += '<g class="ctl" data-id="fader"><g class="body"><rect x="152" y="506" width="48" height="196" rx="9" fill="#ebe7e2" stroke="#8e8982"/><rect x="170" y="528" width="12" height="152" rx="3" fill="#18181b"/>' +
      '<rect x="157" y="590" width="38" height="28" rx="5" fill="#dcd7d0" stroke="#5a5a5f"/><line x1="160" y1="598" x2="192" y2="598" stroke="#5a5a5f"/><line x1="160" y1="610" x2="192" y2="610" stroke="#5a5a5f"/></g>' +
      '<rect x="213" y="600" width="17" height="9" rx="2" fill="#b583ff"/></g>';
    s += btn("erase", 139, 759, "ERASE", { shift: "COPY" });
    s += btn("noterep", 212, 759, "NOTE|REPEAT", { shift: "TRIPLET" });
    // pads
    s += '<rect x="261" y="414" width="374" height="382" rx="4" fill="#1b2645"/>';
    const cols = [310, 402, 494, 586], rows = [738, 646, 553, 460];
    const SP = (window.MPC && MPC.SHIFT_PADS) || [];
    for (let n = 0; n < 16; n++) {
      const cx = cols[n % 4], cy = rows[(n / 4) | 0];
      s += '<g class="ctl pad" data-id="pads" data-pad="' + (n + 1) + '"><rect class="body" x="' + (cx - 39) + '" y="' + (cy - 39) + '" width="78" height="78" rx="6" fill="url(#padg)" stroke="rgba(0,0,0,.4)"/>' +
        '<text class="pad-num" x="' + (cx - 40) + '" y="' + (cy + 50) + '">' + (n + 1) + '</text><text class="pad-txt shift-legend-pad" x="' + (cx + 40) + '" y="' + (cy + 50) + '" text-anchor="end">' + esc(SP[n] || "") + "</text></g>";
    }
    // palm rest
    s += '<rect x="92" y="806" width="716" height="112" rx="20" fill="#8a8c91" stroke="#6b6d72"/>';
    return s;
  }

  /* ---------- leader lines & labels ---------- */
  function spread(items, gap, lo, hi) {
    items.sort((a, b) => a.want - b.want);
    items.forEach((it, i) => { it.y = Math.max(it.want, i ? items[i - 1].y + gap : lo); });
    for (let i = items.length - 1; i >= 0; i--) {
      const max = i === items.length - 1 ? hi : items[i + 1].y - gap;
      if (items[i].y > max) items[i].y = max;
    }
  }

  function leaders() {
    const L = [], R = [];
    C.forEach((c) => { if (c.side === "L") L.push({ c, want: c.lane + OY }); else if (c.side === "R") R.push({ c, want: c.lane + OY }); });
    spread(L, 40, 70, H - 18);
    spread(R, 40, 70, H - 18);
    let s = "";
    const label = (it, side) => {
      const c = it.c, y = it.y;
      const lanes = c.lane + OY;
      let path = "";
      c.a.forEach(([x, ay]) => {
        const gx = x + OX, gy = ay + OY;
        path += "M" + gx + " " + gy + " V" + lanes + " ";
      });
      const xs = c.a.map((p) => p[0] + OX);
      const edge = side === "L" ? L_EDGE : R_EDGE;
      const far = side === "L" ? Math.max(...xs) : Math.min(...xs);
      path += "M" + far + " " + lanes + " H" + edge + " L" + (side === "L" ? L_END : R_END) + " " + y;
      const tx = side === "L" ? L_TEXT : R_TEXT, anchor = side === "L" ? "end" : "start";
      const dots = c.a.map(([x, ay]) => '<circle class="dot" cx="' + (x + OX) + '" cy="' + (ay + OY) + '" r="3.4"/>').join("");
      return '<g class="grp" data-id="' + c.id + '"><path class="lead" d="' + path + '"/>' + dots +
        '<g class="lbl" data-id="' + c.id + '" tabindex="0" role="button" aria-label="' + esc(c.name) + '"><text class="t1" x="' + tx + '" y="' + (y - 2) + '" text-anchor="' + anchor + '">' + esc(c.name) + "</text>" +
        '<text class="t2' + (c.shift ? " has" : "") + '" x="' + tx + '" y="' + (y + 13) + '" text-anchor="' + anchor + '">' + (c.shift ? "⇧ " + esc(c.shift) : "") + "</text></g></g>";
    };
    L.forEach((it) => (s += label(it, "L")));
    R.forEach((it) => (s += label(it, "R")));
    // top group (B1..B3)
    const b = C.find((c) => c.id === "bbtns");
    const by = b.lane;
    let p = "";
    b.a.forEach(([x, y]) => (p += "M" + (x + OX) + " " + (y + OY) + " V" + by + " "));
    p += "M" + (b.a[0][0] + OX) + " " + by + " H" + (b.a[2][0] + OX);
    const cx = b.a[1][0] + OX;
    p += "M" + cx + " " + by + " V" + (by - 8);
    s += '<g class="grp" data-id="bbtns"><path class="lead" d="' + p + '"/>' + b.a.map(([x, y]) => '<circle class="dot" cx="' + (x + OX) + '" cy="' + (y + OY) + '" r="4"/>').join("") +
      '<g class="lbl" data-id="bbtns" tabindex="0" role="button" aria-label="B1 B2 B3"><text class="t1" x="' + cx + '" y="' + (by - 26) + '" text-anchor="middle">' + esc(b.name) + '</text><text class="t2 has" x="' + cx + '" y="' + (by - 12) + '" text-anchor="middle">' + esc(b.shift) + "</text></g></g>";
    return s;
  }

  /* ---------- info panel ---------- */
  function related(k) {
    if (!k || !window.MPC) return [];
    const K = k.toUpperCase();
    return MPC.SHORTCUTS.filter((s) => s.keys.toUpperCase().split(" + ").some((t) => t.replace("HOLD:", "").replace(/\s*\(.*\)$/, "").trim() === K)).slice(0, 6);
  }
  function showInfo(id, pad, pinned) {
    const box = document.getElementById("panel-pop");
    if (!box) return false;
    const c = C.find((x) => x.id === id);
    if (!c) return false;
    let html = "";
    if (pad) {
      const fx = MPC.PADFX[pad - 1];
      html = '<div class="pi-name">PAD ' + pad + ' <span class="badge b-official">SHIFT → ' + esc(MPC.SHIFT_PADS[pad - 1]) + "</span></div>" +
        '<div class="pi-k">Shift</div><div class="pi-v">' + MPC.keys("SHIFT + PAD " + pad) + " " + esc((MPC.SHORTCUTS.find((s) => s.keys === "SHIFT + PAD " + pad) || {}).what || "") + "</div>" +
        '<div class="pi-k">Pad FX</div><div class="pi-v">Slot ' + pad + ": <b>" + esc(fx[0]) + "</b> · " + esc(fx[1]) + "</div>" +
        '<div class="pi-k">Flex Beat</div><div class="pi-v">' + (pad === 1 ? "Empty: the dry baseline" : "Time-warp slot " + pad + " (names appear on screen)") + "</div>" +
        '<div class="pi-k">MIDI</div><div class="pi-v">Plays from external MIDI note <code>' + (35 + pad) + "</code> (bank A, notes 36–51) · panel MCU sends internal note <code>" + PAD_INT[pad - 1] + "</code> on ch 10 " + MPC.srcLink("kithw", "KIT") + MPC.srcLink("labproto", "LAB") + "</div>" +
        '<div class="pi-k">Seq mode</div><div class="pi-v">Selects / queues sequence ' + pad + " of the current bank (light green = has events, dim = empty).</div>";
    } else {
      const rel = related(c.k);
      html = '<div class="pi-name">' + esc(c.name) + (c.shift ? ' <span class="badge b-experimental">⇧ ' + esc(c.shift) + "</span>" : "") + "</div>" +
        '<div class="pi-k">What</div><div class="pi-v">' + esc(c.info) + "</div>" +
        (rel.length ? '<div class="pi-k">Combos</div><div class="pi-v">' + rel.map((r) => '<div style="margin:3px 0">' + MPC.keys(r.keys) + ' <span class="muted small">' + esc(r.what) + "</span></div>").join("") + "</div>" : "");
    }
    html += '<div class="pi-hint">' + (pinned ? "PINNED · ✕ / ESC / click empty space to close" : "CLICK TO PIN") + "</div>";
    box.innerHTML = '<button class="pi-x" type="button" aria-label="Close">✕</button>' + html;
    box.classList.toggle("pinned", !!pinned);
    box.setAttribute("aria-hidden", "false");
    return true;
  }

  // Put the pop-up over the machine, beside the control it describes, clamped inside the stage.
  function place(id, pad) {
    const stage = document.getElementById("panel-stage"), box = document.getElementById("panel-pop");
    if (!stage || !box) return;
    const sel = pad ? '#panel-svg .ctl[data-pad="' + pad + '"]' : '#panel-svg .ctl[data-id="' + id + '"]';
    const els = Array.from(document.querySelectorAll(sel));
    if (!els.length) return;
    const sr = stage.getBoundingClientRect();
    let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity;
    els.forEach((el) => { const q = el.getBoundingClientRect(); l = Math.min(l, q.left); t = Math.min(t, q.top); r = Math.max(r, q.right); b = Math.max(b, q.bottom); });
    l -= sr.left; r -= sr.left; t -= sr.top; b -= sr.top;
    const W = stage.clientWidth, H = stage.clientHeight, pw = box.offsetWidth, ph = box.offsetHeight, gap = 14;
    let x, y;
    if (W < 700) {
      x = (l + r) / 2 - pw / 2;
      y = b + gap;
      if (y + ph > H - 8) y = t - ph - gap;
    } else {
      x = (l + r) / 2 < W / 2 ? r + gap : l - pw - gap;
      y = (t + b) / 2 - ph / 2;
    }
    x = Math.max(8, Math.min(W - pw - 8, x));
    y = Math.max(8, Math.min(H - ph - 8, y));
    box.style.left = Math.round(x) + "px";
    box.style.top = Math.round(y) + "px";
    box.style.transformOrigin = ((l + r) / 2 < x ? "left" : "right") + " center";
    box.classList.add("show");
  }
  function hidePop() {
    const box = document.getElementById("panel-pop");
    if (!box) return;
    box.classList.remove("show", "pinned");
    box.setAttribute("aria-hidden", "true");
  }

  function hot(id) {
    document.querySelectorAll("#panel-svg .grp, #panel-svg .ctl").forEach((g) => g.classList.toggle("hot", g.dataset.id === id));
  }

  /* ---------- rear panel ---------- */
  function rear() {
    const jacks = [
      [177, 13, "PHONES", "3.5 mm TRS", "kills the speaker", 0], [262, 13, "SYNC OUT", "3.5 mm · 5 V clock", "PPQN in MIDI CONFIG", 1],
      [348, 13, "", "", "", 0], [434, 13, "", "", "", 0],
      [540, 21, "", "", "", 0], [665, 21, "", "", "", 0], [806, 21, "", "", "", 0], [929, 21, "", "", "", 0],
      [1058, 20, "REC GAIN", "rear-input level", "(mic/line/inst)", 1], [1186, 9, "USB-C", "power · audio · MIDI", "· disk · network", 0], [1295, 19, "POWER", "hold to force off", "if frozen", 1]
    ];
    let s = '<svg class="rear-svg" viewBox="0 0 1500 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MPC Sample rear panel connections">';
    s += '<rect x="60" y="28" width="1380" height="118" rx="20" fill="#ddd8d2" stroke="#8e8982" stroke-width="2"/><rect x="130" y="62" width="1240" height="76" rx="8" fill="#cfcac4" stroke="#aaa59e"/>';
    const top = [["PHONES", 177], ["SYNC|OUT", 262], ["OUT", 348], ["IN", 434], ["2/R", 540], ["1/L", 665], ["2/R", 806], ["1/L", 929], ["REC GAIN", 1058], ["USB", 1186], ["POWER", 1295]];
    top.forEach(([t, x]) => {
      const parts = t.split("|");
      parts.forEach((p, i) => (s += '<text x="' + x + '" y="' + (52 + i * 10 - (parts.length - 1) * 10) + '" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="10" fill="#d71920">' + p + "</text>"));
    });
    s += '<text x="391" y="40" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="10" fill="#d71920">MIDI</text>';
    s += '<text x="602" y="40" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="10" fill="#d71920">AUDIO OUT</text><text x="867" y="40" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="10" fill="#d71920">AUDIO IN</text>';
    jacks.forEach(([x, r, name, a, b]) => {
      if (name === "USB-C") s += '<rect x="' + (x - 22) + '" y="92" width="44" height="16" rx="8" fill="#222" stroke="#666" stroke-width="2"/>';
      else if (name === "REC GAIN") s += '<circle cx="' + x + '" cy="100" r="' + r + '" fill="#1d1d20"/><rect x="' + (x - 1.5) + '" y="82" width="3" height="14" fill="#eee"/>';
      else if (name === "POWER") s += '<circle cx="' + x + '" cy="100" r="' + r + '" fill="#2a2a2e" stroke="#777" stroke-width="3"/>';
      else s += '<circle cx="' + x + '" cy="100" r="' + (r + 5) + '" fill="#bdb8b1"/><circle cx="' + x + '" cy="100" r="' + r + '" fill="#141416" stroke="#555" stroke-width="2"/><circle cx="' + x + '" cy="100" r="' + (r * 0.38) + '" fill="#000"/>';
    });
    const lab = (x, y, t1, t2, t3) => '<line x1="' + x + '" y1="' + 130 + '" x2="' + x + '" y2="' + (y - 16) + '" stroke="#6b6860"/><circle cx="' + x + '" cy="130" r="3.5" fill="#e4002b" stroke="#fff"/>' +
      '<text x="' + x + '" y="' + y + '" text-anchor="middle" style="font:700 13px var(--display);fill:var(--ink)">' + t1 + '</text><text x="' + x + '" y="' + (y + 14) + '" text-anchor="middle" style="font:600 10.5px var(--mono);fill:var(--ink-dim)">' + t2 + "</text>" +
      (t3 ? '<text x="' + x + '" y="' + (y + 27) + '" text-anchor="middle" style="font:600 10.5px var(--mono);fill:var(--ink-faint)">' + t3 + "</text>" : "");
    s += lab(177, 178, "PHONES", "3.5 mm TRS", "mutes speaker");
    s += lab(262, 212, "SYNC OUT", "3.5 mm TS · 5 V clock", "");
    s += lab(391, 178, "MIDI OUT · IN", "3.5 mm TRS Type A", "DIN adapter");
    s += lab(602, 212, "AUDIO OUT", "¼″ TRS line · L/R", "");
    s += lab(867, 178, "AUDIO IN", "¼″ TRS mic/line", "mono L or R ok");
    s += lab(1058, 212, "REC GAIN", "rear inputs only", "");
    s += lab(1186, 178, "USB-C", "5 V 2 A · audio · MIDI", "disk · net 192.168.155.1");
    s += lab(1295, 212, "POWER", "", "");
    s += '<path d="M1440 70 h28 v60 h-28" fill="none" stroke="#6b6860" stroke-dasharray="4 3"/><text x="1458" y="60" text-anchor="middle" style="font:700 12px var(--display);fill:var(--amber)">microSD</text><text x="1458" y="152" text-anchor="middle" style="font:600 10px var(--mono);fill:var(--ink-dim)">left side</text>';
    s += "</svg>";
    return s;
  }

  /* ---------- mount ---------- */
  function mount() {
    const host = document.getElementById("panel-host");
    if (!host) return;
    host.innerHTML = '<svg id="panel-svg" viewBox="0 0 ' + W + " " + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MPC Sample top panel with labelled controls">' +
      '<g transform="translate(' + OX + "," + OY + ')">' + device() + "</g>" + leaders() + "</svg>";
    const rh = document.getElementById("rear-host");
    if (rh) rh.innerHTML = rear();
    const svg = document.getElementById("panel-svg");
    const pop = document.getElementById("panel-pop");
    let pinned = null, cur = null;
    const pick = (el) => el && el.closest("[data-id]");
    const padOf = (g) => (g.dataset.pad ? +g.dataset.pad : 0);
    const peek = (id, pad) => {
      if (pinned || (cur && cur.id === id && cur.pad === pad)) return;
      cur = { id, pad };
      hot(id);
      if (showInfo(id, pad, false)) place(id, pad);
    };
    const pin = (id, pad) => {
      pinned = { id, pad }; cur = pinned;
      hot(id);
      if (showInfo(id, pad, true)) place(id, pad);
    };
    const unpin = () => { pinned = null; cur = null; hot(null); hidePop(); };
    svg.addEventListener("mouseover", (e) => { const g = pick(e.target); if (g) peek(g.dataset.id, padOf(g)); });
    svg.addEventListener("mouseleave", () => { if (!pinned) { cur = null; hot(null); hidePop(); } });
    svg.addEventListener("click", (e) => {
      const g = pick(e.target);
      if (!g) { unpin(); return; }
      const id = g.dataset.id, pad = padOf(g);
      if (pinned && pinned.id === id && pinned.pad === pad) { unpin(); return; }
      pin(id, pad);
    });
    svg.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const g = pick(e.target);
      if (g) { e.preventDefault(); pin(g.dataset.id, padOf(g)); }
    });
    svg.addEventListener("focusin", (e) => { const g = pick(e.target); if (g) peek(g.dataset.id, padOf(g)); });
    svg.addEventListener("focusout", () => { if (!pinned) { cur = null; hidePop(); } });
    if (pop) pop.addEventListener("click", (e) => { if (e.target.closest(".pi-x")) unpin(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && pinned) unpin(); });
    document.addEventListener("click", (e) => { if (pinned && !e.target.closest("#panel-stage")) unpin(); });
    window.addEventListener("resize", () => { if (cur) place(cur.id, cur.pad); });

    // SHIFT layer: sticky toggle + hold the real Shift key
    const tg = document.getElementById("shift-toggle");
    const set = (on) => { document.body.classList.toggle("shift-on", on); if (tg) tg.setAttribute("aria-pressed", String(on)); };
    let sticky = false;
    if (tg) tg.addEventListener("click", () => { sticky = !sticky; set(sticky); });
    const typing = () => /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
    document.addEventListener("keydown", (e) => { if (e.key === "Shift" && !typing() && !e.repeat) set(!sticky); });
    document.addEventListener("keyup", (e) => { if (e.key === "Shift" && !typing()) set(sticky); });
  }
  document.addEventListener("DOMContentLoaded", mount);
})();
