---
title: "SmartRing"
slug: "smartring"
date: 2017-02-08T18:34:06Z
summary: "An RGB LED ring that shows a VESC's battery gauge and faults, and handles an electric skateboard's lights and brake light."
description: "SmartRing: a 12-LED RGB battery gauge for the VESC, with fault display, headlight control and a CAN-driven brake light."
category: electronics
tags: ["VESC", "Arduino", "RGB LED", "CAN", "PPM", "Electric skateboard", "C++"]
cover: ""
coverAlt: ""
repo: "https://github.com/Peemouse/SmartRing"
featured: false
materials: ["Arduino microcontroller", "12-LED RGB ring", "VESC motor controller", "GT2b remote", "Push button"]
difficulty: intermediate
translationKey: "smartring"
draft: true
---

<!-- TODO Clément : compléter avec photos et récit du projet -->

SmartRing is an accessory for simple monitoring of a VESC, the open-source motor controller used in electric skateboards. An RGB LED ring shows the state of the battery and the system at a glance.

## What it does

The device queries the VESC using my [VescUart]({{< ref "/diy/vescuart" >}}) library (the modified version is required) and turns those values into colours on the ring. It also handles the board's lighting.

{{< video provider="youtube" id="94tGvjmw-p8" title="SMARTRING : Some features" >}}

## Features

- Battery gauge on a 12-LED RGB ring
- Fault display with fault ID
- Voltage cutoff display
- Headlight/rear light on/off with a wired button or via PPM on channel CH2 of a GT2b remote
- Brake light driven by the master VESC's PPM value over the CAN bus

## Hardware and code

The circuit board is available on [EasyEDA](https://easyeda.com/Pimousse/WS2812_VESC_Gauge_v1_0_copy-8115fc38efb44be88084f875dda5bb6a) and the code (C++, GPL-3.0 licence) on GitHub: [Peemouse/SmartRing](https://github.com/Peemouse/SmartRing).
