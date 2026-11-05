---
title: "SmartCharger"
slug: "smartcharger"
date: 2019-08-29T12:56:26Z
summary: "An ESP32-based smart charger for 1S to 12S Li-Ion battery packs, with a menu, safety features and a Wi-Fi web interface."
description: "SmartCharger: a universal 1S–12S Li-Ion charger driven by an ESP32, with storage mode, safety features, a Wi-Fi web server and OTA updates."
category: electronics
tags: ["ESP32", "Li-Ion", "Charger", "OLED", "Wi-Fi", "OTA", "C++"]
cover: ""
coverAlt: ""
repo: "https://github.com/Peemouse/SmartCharger"
featured: false
materials: ["ESP32", "DPS programmable power supply", "1.3\" 128x64 monochrome OLED display (Adafruit)", "3 push buttons", "Active buzzer", "5 V USB charger (modified)"]
difficulty: advanced
translationKey: "smartcharger"
draft: true
---

<!-- TODO Clément : compléter avec photos et récit du projet -->

SmartCharger is a smart charger for "universal" Li-Ion battery pack charging. An ESP32 drives a DPS-style programmable power supply and shows the charging status on a small OLED display.

## What it does

The microcontroller talks to the DPS power supply over UART to set the charging voltage and current for the connected pack. You navigate a menu with three buttons (up, enter, down), and an active buzzer signals events. The project is flagged as a beta version.

## Features

- Charges 1S to 12S Li-Ion packs
- Storage mode charging (charge only, no discharging)
- User-friendly menu
- Safety features protecting the battery, the charger and the power supply
- Gradual charge current ramp-up
- End-of-charge detection
- Web server for remote monitoring and control (Wi-Fi)
- Over-the-air firmware updates (Wi-Fi)

## The code

The firmware (C++, GPL-3.0 licence) and detailed wiring are available on GitHub: [Peemouse/SmartCharger](https://github.com/Peemouse/SmartCharger).
