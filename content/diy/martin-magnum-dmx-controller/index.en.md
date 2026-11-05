---
title: "DMX controller for the Martin Magnum fog machine"
slug: "martin-magnum-dmx-controller"
date: 2026-02-15T15:51:38Z
summary: "An ESP32-based controller that adds DMX control to a Martin Magnum 850/1200 fog machine, with no irreversible modifications."
description: "An ESP32 controller adding DMX (Art-Net/sACN planned) to Martin Magnum 850/1200 fog machines, with timer and manual modes."
category: electronics
tags: ["ESP32", "DMX", "Art-Net", "sACN", "Fog machine", "3D printing", "C++"]
cover: ""
coverAlt: ""
repo: "https://github.com/Peemouse/Martin-Magnum-DMX-controller"
featured: false
materials: ["ESP32 (custom board)", "OLED display", "5 push buttons", "Male and female XLR connectors", "RJ45 connectors", "3D-printed enclosure", "Fan relay (optional)"]
difficulty: advanced
translationKey: "martin-magnum-dmx-controller"
draft: true
---

<!-- TODO Clément : compléter avec photos et récit du projet -->

The Martin Magnum 850 fog machine shipped with a simple one-button remote and no DMX option. This ESP32-based controller adds DMX connectivity (with Art-Net and sACN planned) so it can be run from the lighting desk. It has been tested on the Magnum 850 and should work on the 1200.

## What it does

The machine takes its control signal on an RJ45 connector: a 0–10 V signal sets the fog intensity.

- 0 to 1.5 V: machine off (not even heating)
- 1.5 to 2 V: machine idle (heating, no output)
- 2 to 10 V: fog output proportional to the signal

The controller generates this signal from the DMX values it receives. Apart from a few holes to attach the enclosure to the back of the machine, everything is reversible and the original remote can still be used (though not at the same time as DMX). An optional box can also switch a fan on and off through a relay.

{{< note >}}
For now, only wired DMX works, even though the board was designed for Ethernet (Art-Net/sACN).
{{< /note >}}

## Features

- Control over 4 DMX channels: intensity (0–100%), timer ON (0–255 s), timer OFF (0–255 s), fan
- Continuous mode when either timer is set to 0
- Cool-down mode (heating off) using a dedicated combination of values
- DMX address set from the OLED display and buttons
- Manual mode without DMX: full fog with the + button, or an adjustable timer
- Output voltage calibration in `parameters.h` using a multimeter

## Hardware and code

The board was designed in [EasyEDA](https://oshwlab.com/pimousse/led_artnet_copy) (stable from V1.2). Schematics, Gerber files, the bill of materials, the firmware (C++, GPL-3.0 licence) and the 3D enclosure files are on GitHub: [Peemouse/Martin-Magnum-DMX-controller](https://github.com/Peemouse/Martin-Magnum-DMX-controller).
