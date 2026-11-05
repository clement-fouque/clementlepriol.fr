---
title: "VescUart"
slug: "vescuart"
date: 2018-10-27T22:01:19Z
summary: "My take on the VescUart Arduino library for talking to a VESC motor controller over UART, extended with new commands."
description: "VescUart: a fork of SolidGeek's Arduino library for talking to a VESC over UART, with firmware compatibility updates and extra commands."
category: electronics
tags: ["VESC", "Arduino", "UART", "Library", "C++", "Electric skateboard"]
cover: ""
coverAlt: ""
repo: "https://github.com/Peemouse/VescUart"
featured: false
materials: ["Arduino or compatible board", "VESC motor controller"]
difficulty: intermediate
translationKey: "vescuart"
draft: true
---

<!-- TODO Clément : compléter avec photos et récit du projet -->

VescUart is an Arduino library for communicating over UART with a VESC, the open-source motor controller widely used in electric skateboards. My repository is a fork of [SolidGeek's library](https://github.com/SolidGeek/VescUart), which is itself based on RollingGecko's.

## What it does

The library wraps all functions and values in a class: you initialise it with a serial port, then read telemetry from the VESC (RPM, input voltage, amp-hours, tachometer…) or send it commands.

## What I added

- Compatibility with VESC firmware 3.49 and later, plus PPM value requests
- Firmware version check
- Deserialisation of all the values returned by the VESC
- Communication with the DieBieMS battery management system
- Support for the Trampa WAND remote
- New commands matching the VESC's own

This version is required by my [SmartRing]({{< ref "/diy/smartring" >}}) project.

## The code

The code (C++, GPL-3.0 licence) is available on GitHub: [Peemouse/VescUart](https://github.com/Peemouse/VescUart).
