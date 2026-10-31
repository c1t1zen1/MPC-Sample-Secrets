# MPC Sample Secrets

**The MPC Sample Secret Guidebook Bible** is an unofficial, community-sourced living record of the Akai MPC Sample (model AC50). It covers every control, every shortcut, the settings people forget, and the hacking scene that has grown around the box.

**Live site: https://c1t1zen1.github.io/MPC-Sample-Secrets/**

## Pages

| # | Page | What's inside |
|---|---|---|
| 01 | [Cheat Sheet](https://c1t1zen1.github.io/MPC-Sample-Secrets/) | Interactive top-panel map with leader lines to every control. Hover any control for a pop-up over the machine, or click to pin it. A SHIFT layer toggle (or hold your keyboard Shift) shows each control's second function. Also: rear-panel I/O, four flow-state recipes (sample → beat → performance → export), quick hits, SHIFT + pad grid. Prints as a one-page sheet. |
| 02 | [System Config](https://c1t1zen1.github.io/MPC-Sample-Secrets/setup.html) | Power and battery, firmware and the hidden update-mode boot combo, the five jobs of the USB-C port, the full MIDI config table (TRS Type A), a Sync Out PPQN calculator, sample and project transfer, the MPC 3.8 round trip, input config, knob takeover, resets. |
| 03 | [Secret Manual](https://c1t1zen1.github.io/MPC-Sample-Secrets/deep.html) | Features the quick-start skips, a searchable codex of 119 button combos, Sample-mode parameter map, all 16 Pad FX and 28 Knob FX, Flex Beat and the Color compressor, limits and workarounds, recipes, a manual-revision diff and spec conflicts. |
| 04 | [The Underground](https://c1t1zen1.github.io/MPC-Sample-Secrets/hacks.html) | Internals (RK3566, AK4558, ST7796S, panel MCU), firmware signing, root SSH over USB, the test-app path, RAM-only custom firmware, the control-surface protocol, a pad-colour SysEx builder and a Web MIDI pad tester. |
| 05 | [The Network](https://c1t1zen1.github.io/MPC-Sample-Secrets/sources.html) | Official docs, forums, 19 GitHub projects, press, videos, web tools, and the MPC//SAMPLE.WEB browser-replica teaser with playable prototype pads. |

Press <kbd>/</kbd> or <kbd>⌘K</kbd> on any page to search every combo and section.

## Sources and evidence

Every claim links to its source, and badges show how well it's verified:

- **official**: Akai user guides (v1.0 through v1.3.0 RevA), release notes, FAQ and support articles
- **verified**: tested on hardware by the community (e.g. [mpc-sample-lab](https://github.com/gospodindilly-ops/mpc-sample-lab), [mpc-sample-kit](https://github.com/micknoise/mpc-sample-kit), [mpc-sample-root-ssh](https://github.com/orrpunk-art/mpc-sample-root-ssh))
- **community**: reported in forums or reviews, not lab-tested
- **experimental**: inference, or risky
- **conflict**: official sources disagree

Last sync: 2026-10-26 · firmware 1.3.0 (build 1.3.0.12) · manual v1.3.0 (RevA).

## Run it locally

It's plain HTML, CSS and JavaScript with no build step. Open `index.html`, or serve the folder so Web MIDI works:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Update it

- Sources, the shortcut codex, FX tables and the search index all live in `assets/data.js` (`MPC.SRC`, `MPC.SHORTCUTS`, `MPC.PADFX`, `MPC.KNOBFX`, `MPC.PAGES`).
- The panel diagram and its pop-ups are in `assets/panel.js`. Shared behaviour (search, keycaps, copy buttons) is in `assets/mpc.js`, and the whole look is in `assets/mpc.css`.
- Bump `MPC.SYNC` in `data.js` when you re-check sources.

## Disclaimer

Unofficial and not affiliated with, endorsed by or sponsored by inMusic Brands, Inc. or Akai Professional. "MPC" and "Akai Professional" are trademarks of inMusic Brands, Inc. The Underground page describes community research on owners' own devices: it can void your warranty, and nothing here ships or links to Akai firmware binaries.

Credits for the reverse-engineering work go to briwil78, vinylstyle and puckcv (MPC-Forums), gospodindilly-ops, jrold, garrettjwilke, micknoise and tarikcampos.
