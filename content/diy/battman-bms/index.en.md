---
title: "Battman BMS"
slug: "battman-bms"
date: 2017-09-07T15:58:20Z
summary: "My contributions to the open-source Battman BMS: an extended v0.2 firmware and a matching Node.js dashboard to monitor it."
description: "Battman BMS: forks of the firmware (C, ARM) and Node.js dashboard of the Battman battery management system, adapted to a v0.2 firmware."
category: electronics
tags: ["BMS", "Battery", "Firmware", "C", "Node.js", "ARM", "DFU"]
cover: ""
coverAlt: ""
repo: "https://github.com/Peemouse/battman-firmware"
featured: false
materials: ["Battman BMS board", "USB cable"]
difficulty: advanced
translationKey: "battman-bms"
draft: true
---

<!-- TODO Clément : compléter avec photos et récit du projet -->

Battman is an open-source battery management system (BMS) created by [Raphael Chang](https://github.com/raphaelchang). I forked both of its repositories, the firmware and the dashboard, to add features.

## The firmware

[battman-firmware](https://github.com/Peemouse/battman-firmware) is the BMS firmware (C, LGPL-3.0 licence). My fork adds a version 0.2 with new features (marked as "in development").

- Built with the `gcc-arm-none-eabi` cross-compiler and `make`
- Flashed over USB with `dfu-util` (v0.9 or later) and `make upload`, with the board in bootloader mode

## The dashboard

[battman-dashboard](https://github.com/Peemouse/battman-dashboard) is a Node.js application for interfacing with the Battman BMS. My fork makes it compatible with the custom v0.2 firmware.

- Install with `npm install`, run with `npm start`
- Open the interface in a browser at `localhost:3000`

## The code

- Firmware: [Peemouse/battman-firmware](https://github.com/Peemouse/battman-firmware)
- Dashboard: [Peemouse/battman-dashboard](https://github.com/Peemouse/battman-dashboard)
