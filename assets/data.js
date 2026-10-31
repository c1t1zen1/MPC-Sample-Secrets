/* MPC SAMPLE // SECRET GUIDEBOOK BIBLE — data layer.
   One source of truth for sources, the shortcut codex, FX tables and the search index.
   Last sync: 2026-10-26 · firmware 1.3.0 (build 1.3.0.12) · manual v1.3.0 RevA */

window.MPC = window.MPC || {};

MPC.SYNC = { date: "2026-10-26", fw: "1.3.0", build: "1.3.0.12", manual: "v1.3.0 (RevA)" };

/* ---------- sources: key -> {t,u,k} (k = official|verified|community|experimental|press|video) ---------- */
MPC.SRC = {
  man13: { t: "User Guide v1.3.0 (RevA)", u: "https://cdn.inmusicbrands.com/akai/sample/MPC%20Sample%20-%20User%20Guide%20-%20v1.3.0%20(RevA).pdf", k: "official" },
  man10: { t: "User Guide v1.0 (launch)", u: "https://cdn.inmusicbrands.com/akai/sample/MPC%20Sample%20-%20User%20Guide%20-%20v1.0.pdf", k: "official" },
  manB: { t: "User Guide v1.0 RevB", u: "https://cdn.inmusicbrands.com/akai/sample/MPC%20Sample%20-%20User%20Guide%20-%20v1.0%20(RevB).pdf", k: "official" },
  manC: { t: "User Guide v1.0 RevC", u: "https://cdn.inmusicbrands.com/akai/sample/MPC%20Sample%20-%20User%20Guide%20-%20v1.0%20(RevC).pdf", k: "official" },
  web: { t: "Online User Guide (HTML)", u: "https://www.akaipro.com/guides/mpc-sample/introduction.htm", k: "official" },
  rn12: { t: "Firmware 1.2.0 Release Notes", u: "https://cdn.inmusicbrands.com/akai/sample/MPC%20Sample%201.2.0%20Release%20Notes.pdf", k: "official" },
  rn13: { t: "Firmware 1.3.0 Release Notes", u: "https://cdn.inmusicbrands.com/akai/sample/MPC%20Sample%201.3%20Release%20Notes.pdf", k: "official" },
  faq: { t: "Akai FAQ: MPC Sample", u: "https://support.akaipro.com/en/support/solutions/articles/69000876967-mpc-sample-frequently-asked-questions", k: "official" },
  fw: { t: "Akai: MPC Sample Firmware Update", u: "https://support.akaipro.com/en/support/solutions/articles/69000877649-mpc-sample-firmware-update", k: "official" },
  dl: { t: "Akai downloads: MPC Sample", u: "https://www.akaipro.com/downloads-and-support/downloads/?product=MPC%20Sample", k: "official" },
  prod: { t: "Akai product page", u: "https://www.akaipro.com/mpc-sample/", k: "official" },
  support: { t: "Akai Pro Support", u: "https://support.akaipro.com/en/support/home", k: "official" },
  yt: { t: "Akai Pro YouTube", u: "https://www.youtube.com/AkaiProVideo", k: "official" },
  store: { t: "The MPC Store", u: "https://thempcstore.com", k: "official" },

  cdm: { t: "CDM: the MPC Sample already got updates", u: "https://cdm.link/mpc-sample-updates/", k: "press" },
  gearnews: { t: "Gearnews review (4.5/5)", u: "https://www.gearnews.com/akai-mpc-sample-review/", k: "press" },
  musictech: { t: "MusicTech review (8/10)", u: "https://musictech.com/reviews/hardware-instruments/akai-mpc-sample-review/", k: "press" },
  musictechnews: { t: "MusicTech explainer: features, price, availability", u: "https://musictech.com/news/gear/everything-we-know-akai-mpc-sample-features-pricing-availability/", k: "press" },
  musicradar: { t: "MusicRadar review", u: "https://www.musicradar.com/music-tech/samplers/the-closest-thing-akai-has-released-to-a-vintage-mpc-in-decades-akai-mpc-sample-review", k: "press" },
  attack: { t: "Attack Magazine launch story", u: "https://www.attackmagazine.com/news/akai-launches-mpc-sample-the-most-classic-mpc-design-for-years/", k: "press" },
  synth38: { t: "Synth Anatomy: MPC 3.8 brings MPC Sample integration", u: "https://synthanatomy.com/2026/04/akai-mpc-3-8-firmware-brings-deep-mpc-sample-integration.html", k: "press" },
  djmag38: { t: "DJ Mag: free MPC 3.8 update", u: "https://djmag.com/tech/akai-professional-announces-free-mpc-38-update", k: "press" },
  engadget: { t: "Engadget launch coverage", u: "https://engadget.com/audio/akai-just-released-a-portable-and-relatively-budget-friendly-mpc-sampler-140047113.html", k: "press" },
  boing: { t: "Boing Boing: a simpler groovebox on the go", u: "https://boingboing.net/2026/03/30/akais-mpc-sample-is-simpler-groovebox-on-the-go.html", k: "press" },
  rekkerd: { t: "Rekkerd launch post", u: "https://rekkerd.org/akai-launches-mpc-sample-compact-all-in-one-sampler/", k: "press" },
  dubspot: { t: "Dubspot: MPC Sample overview", u: "https://blog.dubspot.com/akai-mpc-sample", k: "press" },
  gc: { t: "Guitar Center Riffs: Andy Mac interview", u: "https://www.guitarcenter.com/riffs/interviews/keyboards--midi/akai-professional-mpc-sample-inside-the-pocket-size-mpc-with-andy-mac", k: "press" },

  forum: { t: "MPC-Forums › MPC Sample board", u: "https://www.mpc-forums.com/viewforum.php?f=50", k: "community" },
  forum13: { t: "MPC-Forums: Firmware 1.3.0 thread", u: "https://www.mpc-forums.com/viewtopic.php?f=50&t=220503", k: "community" },
  forumlinux: { t: "MPC-Forums: updating from Linux", u: "https://www.mpc-forums.com/viewtopic.php?f=50&t=220516", k: "community" },
  forumbugs: { t: "MPC-Forums: Bugs and fixes", u: "https://www.mpc-forums.com/viewtopic.php?p=1903458", k: "community" },
  forumaltos: { t: "MPC-Forums › MPC Modding: Alternative OS for MPC Sample", u: "https://www.mpc-forums.com/viewtopic.php?p=1907533", k: "community" },
  discord: { t: "MPC-Forums: MPC Discord channel thread", u: "https://www.mpc-forums.com/viewtopic.php?f=39&t=219128", k: "community" },
  manjaro: { t: "Manjaro forum: updating from Linux", u: "https://forum.manjaro.org/t/mpc-sample-firmware-not-updating-on-browser/186970", k: "community" },
  gearspace: { t: "Gearspace mega-thread", u: "https://gearspace.com/board/electronic-music-instruments-and-electronic-music-production/1461770-akai-professional-mpc-sample.html", k: "community" },
  gearspaceAnn: { t: "Gearspace: official announcement thread", u: "https://gearspace.com/threads/akai-professional-introduces-mpc-sample-iconic-beatmaking-anytime-anywhere.1462489/", k: "community" },
  elek: { t: "Elektronauts: The all things MPC thread", u: "https://www.elektronauts.com/t/the-all-things-mpc-thread-part-4/240914", k: "community" },

  lab: { t: "mpc-sample-lab (gospodindilly-ops)", u: "https://github.com/gospodindilly-ops/mpc-sample-lab", k: "verified" },
  labproto: { t: "mpc-sample-lab: control-surface protocol", u: "https://github.com/gospodindilly-ops/mpc-sample-lab/blob/main/docs/control-surface-protocol.en.md", k: "verified" },
  labav: { t: "mpc-sample-lab: audio and display", u: "https://github.com/gospodindilly-ops/mpc-sample-lab/blob/main/docs/audio-display.en.md", k: "verified" },
  labroad: { t: "mpc-sample-lab: firmware roadmap", u: "https://github.com/gospodindilly-ops/mpc-sample-lab/blob/main/docs/firmware-roadmap.en.md", k: "verified" },
  ssh: { t: "mpc-sample-root-ssh (orrpunk-art / puckcv)", u: "https://github.com/orrpunk-art/mpc-sample-root-ssh", k: "verified" },
  sshrel: { t: "root-ssh v1.2.0 release (cold-boot fix)", u: "https://github.com/orrpunk-art/mpc-sample-root-ssh/releases/tag/v1.2.0", k: "verified" },
  re: { t: "MPC-Sample-RE (jrold)", u: "https://github.com/jrold/MPC-Sample-RE", k: "experimental" },
  redev: { t: "MPC-Sample-RE: dev-access / test-app path", u: "https://github.com/jrold/MPC-Sample-RE/blob/main/docs/dev-access.md", k: "experimental" },
  refw: { t: "MPC-Sample-RE: firmware 1.3.0 notes", u: "https://github.com/jrold/MPC-Sample-RE/blob/main/docs/firmware-1.3.0.md", k: "verified" },
  replug: { t: "MPC-Sample-RE: plugin-host investigation", u: "https://github.com/jrold/MPC-Sample-RE/blob/main/docs/plugin-host.md", k: "experimental" },
  patcher: { t: "mpc-sample-patcher (garrettjwilke)", u: "https://github.com/garrettjwilke/mpc-sample-patcher", k: "experimental" },
  patcher2: { t: "mpc-sample-patcher fork (gospodindilly-ops)", u: "https://github.com/gospodindilly-ops/mpc-sample-patcher", k: "experimental" },
  boot: { t: "mpc-boot-thingy (garrettjwilke)", u: "https://github.com/garrettjwilke/mpc-boot-thingy", k: "experimental" },
  bootvid: { t: "mpc boot thingy demo video", u: "https://youtu.be/eMhiaCJpgGg", k: "video" },
  uikit: { t: "mpc-ui-toolkit (garrettjwilke)", u: "https://github.com/garrettjwilke/mpc-ui-toolkit", k: "experimental" },
  kit: { t: "mpc-sample-kit (micknoise)", u: "https://github.com/micknoise/mpc-sample-kit", k: "verified" },
  kithw: { t: "mpc-sample-kit: hardware notes", u: "https://github.com/micknoise/mpc-sample-kit/blob/main/docs/hardware-notes.md", k: "verified" },
  mpctk: { t: "MPC-Sample-Toolkit / MPCTK (tarikcampos)", u: "https://github.com/tarikcampos/MPC-Sample-Toolkit", k: "verified" },
  kitmaker: { t: "MPC Sample Kit Maker (WorldLinkStudio)", u: "https://github.com/WorldLinkStudio/mpcsample", k: "community" },
  kitmakerApp: { t: "mpcsample.app live demo", u: "https://mpcsample.app", k: "community" },
  mpc2live: { t: "MPC2Live (Duffman007)", u: "https://github.com/Duffman007/MPC2Live", k: "community" },
  mpc2liveKofi: { t: "MPC2Live download (Ko-fi)", u: "https://ko-fi.com/s/6ba270ac83", k: "community" },
  helper: { t: "mpc-sample-helper (tomphp)", u: "https://github.com/tomphp/mpc-sample-helper", k: "community" },
  helperApp: { t: "MPC Sample Helper web app", u: "https://tomphp.github.io/mpc-sample-helper/", k: "community" },
  emu: { t: "Akai-MPC-Sample-Emulator build plan (Twisted-Supernova)", u: "https://github.com/Twisted-Supernova/Akai-MPC-Sample-Emulator", k: "community" },
  virtual: { t: "mpc-sample-virtual (Svck1t)", u: "https://mpc-sample-virtual.vercel.app", k: "community" },
  webapp: { t: "mpc-sample-web (jimmylee719)", u: "https://mpc-sample-web.vercel.app", k: "community" },
  beatos: { t: "BeatOS / mpc-sample-database (Astro1Deep)", u: "https://github.com/Astro1Deep/mpc-sample-database", k: "community" },
  yt2tw: { t: "YT2TW: DJ Sample Pad (UncleWob)", u: "https://github.com/UncleWob/YT2TW", k: "community" },
  mobileman: { t: "Mobile web user guide (oyasusan)", u: "https://github.com/oyasusan/mpc-sample-manual", k: "community" },
  companion: { t: "MPC Sample Companion (MrSletner)", u: "https://github.com/MrSletner/mpc-sample-companion", k: "community" },
  converter: { t: "MPC Sample Project Converter (padbangers)", u: "https://padbangers.github.io/mpc-sample-converter-site/", k: "community" },
  padhead: { t: "Padhead: chop samples for MPC Sample", u: "https://padhead.com/guides/chop-samples-on-mpc-sample/", k: "community" },
  padheadKit: { t: "Padhead: load a custom kit", u: "https://padhead.com/guides/load-kit-on-mpc-sample/", k: "community" },
  padheadKey: { t: "Padhead: play melodies in key", u: "https://padhead.com/guides/play-in-key-on-mpc-sample/", k: "community" },
  audeobox: { t: "Audeobox: MPC chop-shop sampling", u: "https://www.audeobox.com/learn/mpc-software/chop-shop-sampling/", k: "community" },
  topic: { t: "GitHub topic: akaipro", u: "https://github.com/topics/akaipro", k: "community" },
  openaz0x: { t: "openAZ0x / meta-az0x (Yocto BSP for inMusic AZ0x)", u: "https://github.com/openAZ0x/meta-az0x", k: "community" },
  prime4: { t: "Denon Prime 4+ research (sibling AZ0x device)", u: "https://github.com/coffeegrind123/denon-prime4plus-research", k: "community" },
  qengine: { t: "QEngine: Engine OS in QEMU", u: "https://github.com/Peyton-C/QEngine", k: "community" },
  makerworld: { t: "MakerWorld: MPC Sample cover / raiser / stand", u: "https://makerworld.com/en/collections/24309789-case", k: "community" },
  minimidi: { t: "MiniMIDI: TRS MIDI Type A/B reference", u: "https://minimidi.world", k: "community" },

  vidExp: { t: "EXPANSIONS ON THE MPC SAMPLE?! (DJ Ave McRee)", u: "https://www.youtube.com/watch?v=9mCkKUWh8FE", k: "video" },
  vidChop: { t: "Getting Started with MPC Sample: Chop Mode", u: "https://www.youtube.com/watch?v=-_KNPLI-JVc", k: "video" },
  vidWarp: { t: "How To Warp Sample Chops in MPC Sample", u: "https://www.youtube.com/watch?v=53e2zOjvsG0", k: "video" },
  vidBeat: { t: "Turn your sample chops into a beat", u: "https://www.youtube.com/watch?v=axbcUpuS6eI", k: "video" }
};

/* ---------- the shortcut codex ----------
   keys: tokens joined by " + ". Prefix "hold:" renders a HOLD keycap. ctx = context filter. */
MPC.SHORTCUTS = [
  // transport & global
  { keys: "PLAY", what: "Play (or record) from the start of the sequence", ctx: "Transport", src: "man13" },
  { keys: "SHIFT + PLAY", what: "CONTINUE: play from the current playhead", ctx: "Transport", src: "man13" },
  { keys: "STOP", what: "Stop playback / recording", ctx: "Transport", src: "man13" },
  { keys: "STOP + STOP", what: "Double-tap: kill ALL audio (panic)", ctx: "Transport", src: "man13", hot: 1 },
  { keys: "SHIFT + −", what: "UNDO (after a take: undoes everything recorded since record began)", ctx: "Global", src: "man13" },
  { keys: "SHIFT + +", what: "REDO", ctx: "Global", src: "man13" },
  { keys: "TAP TEMPO", what: "Tap at a steady interval to set project tempo", ctx: "Transport", src: "man13" },
  { keys: "hold:TAP TEMPO + ENCODER", what: "BPM pop-up from ANY mode", ctx: "Transport", src: "man13", hot: 1 },
  { keys: "SHIFT + TAP TEMPO", what: "METRO: cycle metronome Off → On → Record-only", ctx: "Transport", src: "man13" },
  { keys: "PAD BANK", what: "Next pad bank (A→H)", ctx: "Global", src: "man13" },
  { keys: "hold:PAD BANK + PAD 1–8", what: "Jump straight to bank A–H", ctx: "Global", src: "man13", hot: 1 },
  { keys: "SHIFT + PAD BANK", what: "Previous pad bank", ctx: "Global", src: "man13" },
  { keys: "NOTE REPEAT", what: "Toggle Note Repeat; B1–B3 pick the division", ctx: "Global", src: "man13" },
  { keys: "hold:NOTE REPEAT", what: "Momentary Note Repeat (release to stop)", ctx: "Global", src: "man13", hot: 1 },
  { keys: "NOTE REPEAT + SHIFT", what: "TRIPLET: show triplet divisions on B1–B3", ctx: "Global", src: "man13" },
  { keys: "MUTE", what: "Mute mode, works from ANY mode: red = muted, yellow = live", ctx: "Global", src: "man13" },
  { keys: "hold:MUTE", what: "Momentary mute mode: drop parts, release to return", ctx: "Global", src: "man13", hot: 1 },
  { keys: "SHIFT + MUTE", what: "UNMUTE ALL", ctx: "Global", src: "man13" },
  { keys: "hold:ERASE + PAD", what: "Stopped: delete the sample on that pad. In Seq mode: delete that sequence", ctx: "Global", src: "man13" },
  { keys: "hold:ERASE + hold:PAD", what: "While playing: wipe that pad's notes live from the sequence", ctx: "Global", src: "man13", hot: 1 },
  { keys: "hold:ERASE + K1–K3", what: "Erase recorded automation for that knob's parameter (B3 confirm)", ctx: "Global", src: "man13", hot: 1 },
  { keys: "hold:ERASE + FADER", what: "Erase automation of the fader-assigned parameter", ctx: "Global", src: "man13" },
  { keys: "SHIFT + ERASE + PADS", what: "COPY: hold, tap destination pads (turn red), release to paste sample/sequence", ctx: "Global", src: "man13", hot: 1 },
  { keys: "hold:SAMPLE + PAD", what: "Select a pad WITHOUT triggering it", ctx: "Global", src: "man13", hot: 1 },
  { keys: "hold:SEQ + SAMPLE", what: "Sample/Seq hybrid: Seq screen + sample pads (both buttons flash)", ctx: "Global", src: "man13", hot: 1 },
  { keys: "ENCODER (push)", what: "Sample mode: cycle focus through K1–K3 params, then adjust with ENCODER or −/+", ctx: "Global", src: "man13" },
  { keys: "SHIFT + ENCODER (push)", what: "Cycle parameter focus backwards", ctx: "Global", src: "man13" },
  { keys: "POWER + hold:CHOP + MUTE + SAMPLE SELECT", what: "Boot into UPDATE MODE (desktop updater / recovery)", ctx: "Hidden", src: "fw", hot: 1 },

  // SHIFT + pads
  { keys: "SHIFT + PAD 1", what: "FULL LEVEL: every hit at max velocity", ctx: "Shift Pads", src: "man13" },
  { keys: "SHIFT + PAD 2", what: "HALF SEQ: cut the sequence length in half", ctx: "Shift Pads", src: "man13" },
  { keys: "SHIFT + PAD 3", what: "DOUBLE SEQ: double length, duplicating events", ctx: "Shift Pads", src: "man13" },
  { keys: "SHIFT + PAD 4", what: "COUNT-IN: one-bar count before recording (1234 icon goes red)", ctx: "Shift Pads", src: "man13" },
  { keys: "SHIFT + PAD 5", what: "COMPRESSOR page (Color compressor)", ctx: "Shift Pads", src: "man13" },
  { keys: "SHIFT + PAD 6", what: "HALF SPEED: events take twice the space (8ths → quarters)", ctx: "Shift Pads", src: "man13" },
  { keys: "SHIFT + PAD 7", what: "DOUBLE SPEED: events take half the space (8ths → 16ths)", ctx: "Shift Pads", src: "man13" },
  { keys: "SHIFT + PAD 8", what: "MIDI CONFIG: MIDI/CV, Knob Takeover, factory resets", ctx: "Shift Pads", src: "man13" },
  { keys: "SHIFT + PAD 9", what: "FADER: pick what the fader controls (or turn it off)", ctx: "Shift Pads", src: "man13" },
  { keys: "SHIFT + PAD 10", what: "REC QUANTIZE on/off", ctx: "Shift Pads", src: "man13" },
  { keys: "SHIFT + PAD 11", what: "RESAMPLE: render the current sequence to a pad you choose", ctx: "Shift Pads", src: "man13", hot: 1 },
  { keys: "SHIFT + PAD 12", what: "SONG mode: chain sequences, export audio or a new sequence", ctx: "Shift Pads", src: "man13" },
  { keys: "SHIFT + PAD 13", what: "TRIM SAMPLE: destructively cut outside Start/End", ctx: "Shift Pads", src: "man13" },
  { keys: "SHIFT + PAD 14", what: "TIME CORRECT: quantize, shift, swing (B3 Do It)", ctx: "Shift Pads", src: "man13" },
  { keys: "SHIFT + PAD 15", what: "WARP: toggle Time Stretch ↔ Pitch", ctx: "Shift Pads", src: "man13" },
  { keys: "SHIFT + PAD 16", what: "PROJECT: load / save / new / SD Card Access", ctx: "Shift Pads", src: "man13" },

  // mode shift functions
  { keys: "SHIFT + SAMPLE", what: "INPUT CONFIG: source, monitor, threshold, rec length, Rec Input Effects", ctx: "Menus", src: "man13" },
  { keys: "SHIFT + SEQ", what: "STEP EDIT", ctx: "Menus", src: "man13" },
  { keys: "SHIFT + PAD FX", what: "FLEX BEAT mode", ctx: "FX", src: "man13" },
  { keys: "SHIFT + KNOB FX", what: "FX SELECT: choose the Knob FX and which pads it hits", ctx: "FX", src: "man13" },
  { keys: "SAMPLE SELECT", what: "Sample browser: B1 back · B2 Internal/SD · B3 preview on/off", ctx: "Sample", src: "man13" },
  { keys: "SHIFT + SAMPLE SELECT", what: "SAVE SAMPLE (name it, B3 Do It!)", ctx: "Sample", src: "man13" },

  // sample mode
  { keys: "B1", what: "Sample mode pages: Trim → Mix → Amp Env", ctx: "Sample", src: "man13" },
  { keys: "B2", what: "Sample mode pages: Tune → Play", ctx: "Sample", src: "man13" },
  { keys: "B3", what: "Sample mode pages: Filter → Filt Env", ctx: "Sample", src: "man13" },
  { keys: "SHIFT + K1", what: "Trim/Chop: ZOOM at Start (the zoom the quick-start never mentions)", ctx: "Sample", src: "man13", hot: 1 },
  { keys: "SHIFT + K2", what: "Trim/Chop: ZOOM at End · Mix: Kit Volume · Env: Decay From · Play: Pad Link", ctx: "Sample", src: "man13", hot: 1 },
  { keys: "SHIFT + K3", what: "Trim: ZOOM at Loop · Tune: # Beats · Chop: Threshold", ctx: "Sample", src: "man13", hot: 1 },
  { keys: "SHIFT + B1", what: "Trim: LOOP LOCK per pad (loop start = sample start) · Chop: EXTRACT slice", ctx: "Sample", src: "rn12" },
  { keys: "SHIFT + B2", what: "Trim: NORMALIZE to 0 dB between Start/End (fw 1.3) · Chop: SPLIT slice", ctx: "Sample", src: "rn13", hot: 1 },
  { keys: "K3 (Play page)", what: "Offset: delay the sample after the hit (humanize / flam trick)", ctx: "Sample", src: "man13" },
  { keys: "SHIFT + K2 (Play page)", what: "PAD LINK: layer another pad from the same bank on this pad", ctx: "Sample", src: "man13", hot: 1 },
  { keys: "K2 (Play page)", what: "Mute Group 1–16 (closed hat chokes open hat)", ctx: "Sample", src: "man13" },
  { keys: "K3 (Tune page)", what: "Warp Off / 50–200% / Seq (tempo-lock to the sequence)", ctx: "Sample", src: "man13" },

  // pad play
  { keys: "CHOP", what: "Chop mode: slices across pads (Threshold by default). Press again to return to Trim", ctx: "Chop", src: "man13" },
  { keys: "K3 (Chop)", what: "Chop type: Threshold · Regions 4/8/16 · Manual", ctx: "Chop", src: "man13" },
  { keys: "SHIFT + B1 (Chop)", what: "EXTRACT current slice to the next free pad (non-destructive)", ctx: "Chop", src: "man13", hot: 1 },
  { keys: "SHIFT + B2 (Chop)", what: "SPLIT slice in half", ctx: "Chop", src: "man13" },
  { keys: "SHIFT + B3 (Chop)", what: "MERGE slice with the previous one", ctx: "Chop", src: "man13" },
  { keys: "hold:ERASE + PAD (Chop)", what: "Remove a slice (merges into previous). Slice edits cannot be undone", ctx: "Chop", src: "man13" },
  { keys: "PAD 1 (Manual chop)", what: "Starts playback + first marker; tap other pads live to drop up to 16 slices", ctx: "Chop", src: "man13", hot: 1 },
  { keys: "SHIFT + CHOP", what: "NOTE ON: sample plays only while held (envelopes switch to Release)", ctx: "Chop", src: "man13" },
  { keys: "LOOP", what: "Loop playback for the pad (tap to start/stop)", ctx: "Chop", src: "man13" },
  { keys: "SHIFT + LOOP", what: "REVERSE playback", ctx: "Chop", src: "man13" },
  { keys: "16 LEVELS", what: "Spread the selected sample across 16 pads", ctx: "Chop", src: "man13" },
  { keys: "SHIFT + 16 LEVELS", what: "TYPE: Velocity / Filter / Tune (Tune puts the original pitch on PAD 4)", ctx: "Chop", src: "man13", hot: 1 },

  // record
  { keys: "SAMPLE RECORD", what: "Sample Record: K1 source · K2 Free/Seq length · K3 threshold · B1 monitor", ctx: "Record", src: "man13" },
  { keys: "PAD (while sampling)", what: "First pad starts recording; tap OTHER pads mid-take to chop live", ctx: "Record", src: "man13", hot: 1 },
  { keys: "SHIFT + SAMPLE RECORD", what: "RECALL: grab the last ~25–30 s of input to the next free pad", ctx: "Record", src: "man13", hot: 1 },
  { keys: "SEQ RECORD", what: "Arm sequence recording (pads switch to samples), PLAY to roll", ctx: "Record", src: "man13" },
  { keys: "SHIFT + SEQ RECORD", what: "RECALL: put what you just jammed on the last loop into the sequence", ctx: "Record", src: "man13", hot: 1 },

  // sequence
  { keys: "hold:B1 (Seq)", what: "Sequence BPM: ENCODER sets it, push ENCODER for decimals", ctx: "Sequence", src: "man13" },
  { keys: "B2 (Seq)", what: "Toggle per-sequence (SEQ) vs global (GBL) tempo", ctx: "Sequence", src: "man13", hot: 1 },
  { keys: "B3 (Seq)", what: "Record quantize on/off", ctx: "Sequence", src: "man13" },
  { keys: "K1 (Seq)", what: "Length 1·2·4·8·16·32·64·128 bars", ctx: "Sequence", src: "man13" },
  { keys: "SHIFT + K1 (Seq)", what: "ANY length 1–128 bars (odd lengths for polymeter)", ctx: "Sequence", src: "man13", hot: 1 },
  { keys: "K2 (Seq)", what: "Quantize (Q) value", ctx: "Sequence", src: "man13" },
  { keys: "SHIFT + K2 (Seq)", what: "Project time signature (all sequences)", ctx: "Sequence", src: "man13" },
  { keys: "K3 (Seq)", what: "RT Swing: live, non-destructive swing", ctx: "Sequence", src: "man13", hot: 1 },
  { keys: "SHIFT + K3 (Seq)", what: "Metronome volume", ctx: "Sequence", src: "man13" },
  { keys: "ENCODER (Seq)", what: "Move playhead by beats; SHIFT + ENCODER moves by Q", ctx: "Sequence", src: "man13" },
  { keys: "PAD (Seq)", what: "Select / queue a sequence (flashes until the bar line)", ctx: "Sequence", src: "man13" },

  // step edit
  { keys: "ENCODER (Step Edit)", what: "Step through the sequence at the Q value", ctx: "Step Edit", src: "man13" },
  { keys: "−/+ (Step Edit)", what: "Cycle events on the current step (or tap the pad)", ctx: "Step Edit", src: "man13" },
  { keys: "FADER (Step Edit)", what: "Nudge the selected event earlier/later", ctx: "Step Edit", src: "man13", hot: 1 },
  { keys: "K3 (Step Edit)", what: "Event velocity", ctx: "Step Edit", src: "man13" },
  { keys: "B3 (Step Edit)", what: "Erase selected event", ctx: "Step Edit", src: "man13" },

  // song
  { keys: "B3 (Song)", what: "Insert the selected sequence after the highlight", ctx: "Song", src: "man13" },
  { keys: "B2 (Song)", what: "Remove highlighted sequence", ctx: "Song", src: "man13" },
  { keys: "SHIFT + PLAY (Song)", what: "Play song from the highlighted sequence", ctx: "Song", src: "man13" },
  { keys: "B1 → B2 (Song)", what: "Export → audio mixdown (WAV to share)", ctx: "Song", src: "man13" },
  { keys: "B1 → B3 (Song)", what: "Export → NEW SEQUENCE: automate & perform FX over the whole arrangement (fw 1.2)", ctx: "Song", src: "rn12", hot: 1 },

  // fx
  { keys: "PAD FX + PADS", what: "16 effects; pressure = amount; up to 4 at once (5th bypasses the oldest)", ctx: "FX", src: "man13" },
  { keys: "B1 (Pad FX)", what: "LATCH the effect at its current amount", ctx: "FX", src: "man13", hot: 1 },
  { keys: "PAD 1 (Flex Beat)", what: "Empty slot: back to the dry beat", ctx: "FX", src: "man13" },
  { keys: "K1 (Flex Beat)", what: "One Shot ↔ Loop", ctx: "FX", src: "man13" },
  { keys: "K3 (Flex Beat)", what: "Dry/Wet mix (set 100% dry while changing tempo to avoid the known glitch)", ctx: "FX", src: "rn13" },
  { keys: "B3 (Flex Beat)", what: "Quantize effect start to the grid", ctx: "FX", src: "man13" },
  { keys: "KNOB FX", what: "K1–K3 now drive the active Knob FX (press again to release the knobs)", ctx: "FX", src: "man13" },
  { keys: "B2 (FX Select)", what: "Apply Knob FX to ALL pads", ctx: "FX", src: "man13" },
  { keys: "B3 (FX Select)", what: "Bypass Knob FX on every affected pad", ctx: "FX", src: "man13" },
  { keys: "B1 (Compressor)", what: "COLOR: parallel bass boost + wobble + saturation", ctx: "FX", src: "man13", hot: 1 },
  { keys: "SHIFT + K3 (Compressor)", what: "In Boost: drive the compressor harder", ctx: "FX", src: "man13" },

  // menus
  { keys: "B2 (Time Correct)", what: "Select all pads before Do It", ctx: "Menus", src: "man13" },
  { keys: "K2 (Time Correct)", what: "SHIFT timing: push/pull events for feel", ctx: "Menus", src: "man13" },
  { keys: "B3 (Fader menu)", what: "Fader on/off", ctx: "Menus", src: "man13" },
  { keys: "SHIFT + PAD 8 → Takeover", what: "Knob/Knob FX/Fader takeover: Pickup · Scaled · Instant (fw 1.3)", ctx: "Menus", src: "rn13", hot: 1 },
  { keys: "SHIFT + PAD 8 → MIDI Port", what: "External (TRS) ↔ USB: USB MIDI is SILENT until you pick USB", ctx: "Menus", src: "kithw", hot: 1 },
  { keys: "B3 (Load Kit)", what: "Project › Kits: load only the kit samples (skip the 4 default sequences)", ctx: "Project", src: "man13", hot: 1 },
  { keys: "SHIFT + PAD 16 → SD Card Access", what: "Mount the microSD on your computer over USB (eject first, then B1)", ctx: "Project", src: "rn12" },
  { keys: "SHIFT (naming)", what: "Capitals · SHIFT + B2 erases the whole name · B2 erases one character", ctx: "Project", src: "man13" }
];

/* ---------- SHIFT + pad legend (as printed under the pads) ---------- */
MPC.SHIFT_PADS = ["FULL LEVEL", "HALF SEQ", "DOUBLE SEQ", "COUNT-IN", "COMPRESSOR", "HALF SPEED", "DOUBLE SPEED", "MIDI CONFIG", "FADER", "REC QUANTIZE", "RESAMPLE", "SONG", "TRIM SAMPLE", "TIME CORRECT", "WARP", "PROJECT"];

/* ---------- Pad FX (pad n) ---------- */
MPC.PADFX = [
  ["Half Speed", "K1 Speed x1.5/x2/x4 · K2 Mix", "Tape-stop slowdowns, vapor drops"],
  ["Chorus", "K1 Rate 0.4–3.2 Hz · K2 Depth · K3 Feedback", "Watery widening"],
  ["Flanger", "K1 Rate 0.02–10 Hz · K2 Depth · K3 Feedback", "Jet whoosh on fills"],
  ["Phaser", "K1 Feedback · K2 Speed 2 bars…1/64 · K3 Range", "Tempo-synced sweep"],
  ["Comb Filter", "K1 Speed 2 bars…1/64", "Metallic notch movement"],
  ["LP Filter", "K1 Reso · K2 LFO Speed · K3 Range", "Pressure = filter close"],
  ["HP Filter", "K1 Reso · K2 LFO Speed · K3 Range", "Build-up / thin-out"],
  ["BP Filter", "K1 Reso · K2 LFO Speed · K3 Range", "Telephone mids"],
  ["Ring Mod", "K1 Max Freq 40–400 Hz", "Slow = ducking, fast = metal"],
  ["LoFi", "K1 Bitcrush 24→2 · K2 Decimator", "SP-style crunch on demand"],
  ["Color", "K1 Mode: Cassette, Flutter, Tube Amp, Vinyl, Saturation, Radio", "Vintage gear tones"],
  ["Granulator", "K1 Density 1–300/s · K2 Feedback · K3 Grain 10–200 ms", "Ambient smear under pressure"],
  ["Beat Repeat", "K1 Division 1/4…1/64 · K2 Reverse · K3 Resonance", "Stutters and rolls"],
  ["Rev Stepper", "K1 Delay Time 1/4…1/64 · K2 Repeats 2–8", "Forward/reverse slice chopping"],
  ["Delay", "K1 Time 1/1…1/64t · K2 Feedback · K3 Normal/X-Feedback/Ping-Pong", "Dub throws"],
  ["Reverb", "K1 Pre-Delay 0–250 ms · K2 Decay · K3 Diffusion", "Wash-outs"]
];

/* ---------- Knob FX (28) [name, K1–K3, SHIFT+K1–K3, family] ---------- */
MPC.KNOBFX = [
  ["Delay", "Time (sync 1/32…8/4 or 1 ms–2 s) · Feedback · Mix", "Sync · Damping 1–20 kHz · Width", "Delay"],
  ["Diff Delay", "Time · Feedback · Mix", "Sync · Diffusion · High Damp", "Delay"],
  ["Tape Delay", "Time 1…1/16. · Feedback · Mix", "Wow/Flutter · Ramp · Spread", "Delay"],
  ["Sample Delay", "Left 0–250 ms · Right 0–250 ms", "—", "Delay"],
  ["Reverb Small", "Pre-Delay · Time 0.4–71.5 s/+inf · Mix", "ER/Tail · Density · Low Cut", "Space"],
  ["Reverb Medium", "Pre-Delay · Time 0.4–71.5 s/+inf · Mix", "ER/Tail · Density · Low Cut", "Space"],
  ["Reverb Large", "Pre-Delay · Time 0.4–71.5 s/+inf · Mix", "ER/Tail · Density · Low Cut", "Space"],
  ["Spring Reverb", "Pre-Delay · Time 1–10 s · Mix", "Width · Diffusion · Low Cut", "Space"],
  ["HP Filter", "Frequency 10–19999 Hz · Resonance", "—", "Filter"],
  ["LP Filter", "Frequency 22–19999 Hz · Resonance", "—", "Filter"],
  ["BP Filter", "Frequency 55 Hz–20 kHz · Resonance 0.7–20", "—", "Filter"],
  ["Bus Compressor", "Attack · Release · Threshold -50–0", "Ratio 1–20 · Output · Mix", "Dynamics"],
  ["Limiter", "Gain -12–36 dB · Ceiling · Release", "—", "Dynamics"],
  ["Pumper", "Speed Bar…1/32T · Shape · Depth", "Attack · Hold · Release", "Dynamics"],
  ["Transient", "Attack ±100% · Shape · Sustain ±100%", "—", "Dynamics"],
  ["Noise Gate", "Threshold · Depth", "Attack · Hold · Release", "Dynamics"],
  ["Amp Sim", "Cab (D.I., Brit, 1x8…4x10 Bass, Radio) · Drive 0–11 · Soft Clip", "Bass · Mid · Treble", "Drive"],
  ["Tube Drive", "Drive · Headroom · Saturation", "—", "Drive"],
  ["Soft Clipper", "Drive 1–10000% · Shape Tanh/Sine/Parabolic · Mix", "True Peak · Rel Time · Post Lvl", "Drive"],
  ["Ensemble", "Rate · Depth · Mix", "Delay · Shimmer · Width", "Mod"],
  ["Multi-Chorus", "Rate · Depth · Mix", "Voices 3/4/6 · Delay", "Mod"],
  ["Phaser", "Rate · Depth · Mix", "Model Vibe/Stone/Ninety/Tron · Feedback", "Mod"],
  ["Flanger", "Rate · Depth · Mix", "Feedback", "Mod"],
  ["Auto-Wah", "Sens · Resonance · Mix", "Center · Attack · Release", "Mod"],
  ["Auto-Pan", "Rate · — · Mix", "—", "Mod"],
  ["Vintage Emulator", "Type: MPC3000 · MPC60 · SP1200 · SP1200Ring", "—", "Vintage"],
  ["Vinyl Emulator", "Tone · Crackle · Pitch", "—", "Vintage"],
  ["Tape Emulator", "Wow · Noise · Pitch", "—", "Vintage"]
];

/* ---------- page/section index for search ---------- */
MPC.PAGES = [
  ["index.html", "01 Cheat Sheet", [
    ["#panel", "Top panel map: every control, SHIFT layer"], ["#rear", "Rear panel I/O"], ["#flow", "Flow-state recipes"],
    ["#quick", "Quick hits & panic buttons"], ["#shiftpads", "SHIFT + pad functions"]]],
  ["setup.html", "02 System Config", [
    ["#power", "Power, battery & charging"], ["#firmware", "Firmware updates, update mode, Linux & iOS"], ["#usb", "USB-C: audio, MIDI, network, storage"],
    ["#midi", "MIDI configuration, Type A TRS, notes 36–51"], ["#sync", "Sync Out / CV clock PPQN"], ["#transfer", "Sample & project transfer, SD card"],
    ["#mpc3", "MPC 3.8 round-trip"], ["#input", "Input config & monitoring"], ["#takeover", "Knob takeover modes"], ["#reset", "Factory resets"]]],
  ["deep.html", "03 Secret Manual", [
    ["#missed", "What the quick-start never told you"], ["#codex", "The shortcut codex (all combos)"], ["#samplemap", "Sample-mode parameter map"],
    ["#padfx", "Pad FX encyclopedia"], ["#knobfx", "Knob FX encyclopedia (28)"], ["#flex", "Flex Beat & Color compressor"],
    ["#limits", "Limits and workarounds"], ["#recipes", "Recipes & sound-design tricks"], ["#revisions", "Manual revision diff & conflicts"], ["#timeline", "Firmware timeline"]]],
  ["hacks.html", "04 The Underground", [
    ["#risk", "Risk ladder"], ["#internals", "Hardware internals: RK3566, AK4558, ST7796S"], ["#firmware-anatomy", "Firmware anatomy & signing"],
    ["#ssh", "Root SSH over USB"], ["#testapp", "Test-app launcher path"], ["#customfw", "RAM-only custom firmware"], ["#patching", "Binary patching & boot menu"],
    ["#protocol", "Control-surface protocol (notes, CC, SysEx)"], ["#sysex", "Pad colour SysEx builder"], ["#webmidi", "Web MIDI pad tester"],
    ["#xpj", "Project files (.xpj) & tools"], ["#plugins", "Hidden plugin-host code"], ["#hwmods", "Hardware mods & accessories"]]],
  ["sources.html", "05 The Network", [
    ["#official", "Official docs & downloads"], ["#communities", "Communities & forums"], ["#repos", "GitHub repos"], ["#press", "Press & reviews"],
    ["#videos", "Videos & tutorials"], ["#tools", "Web tools & apps"], ["#teaser", "MPC//SAMPLE.WEB teaser"]]]
];
