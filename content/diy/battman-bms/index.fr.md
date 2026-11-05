---
title: "Battman BMS"
date: 2017-09-07T15:58:20Z
summary: "Mes contributions au BMS open source Battman : un firmware v0.2 enrichi et un tableau de bord Node.js compatible pour le surveiller."
description: "Battman BMS : forks du firmware (C, STM32) et du tableau de bord Node.js du système de gestion de batterie Battman, adaptés à un firmware v0.2."
category: electronics
tags: ["BMS", "Batterie", "Firmware", "C", "Node.js", "ARM", "DFU"]
cover: ""
coverAlt: ""
repo: "https://github.com/Peemouse/battman-firmware"
featured: false
materials: ["Carte BMS Battman", "Câble USB"]
difficulty: advanced
translationKey: "battman-bms"
draft: true
---

<!-- TODO Clément : compléter avec photos et récit du projet -->

Battman est un système de gestion de batterie (BMS) open source créé par [Raphael Chang](https://github.com/raphaelchang). J'ai forké ses deux dépôts, le firmware et le tableau de bord, pour y ajouter des fonctionnalités.

## Le firmware

[battman-firmware](https://github.com/Peemouse/battman-firmware) est le firmware du BMS (C, licence LGPL-3.0). Mon fork ajoute une version 0.2 avec de nouvelles fonctionnalités (indiquée « en développement »).

- Compilation avec le compilateur croisé `gcc-arm-none-eabi` et `make`
- Programmation par USB avec `dfu-util` (v0.9 ou plus) et `make upload`, la carte étant en mode bootloader

## Le tableau de bord

[battman-dashboard](https://github.com/Peemouse/battman-dashboard) est une application Node.js qui dialogue avec le BMS Battman. Mon fork la rend compatible avec le firmware personnalisé v0.2.

- Installation avec `npm install`, lancement avec `npm start`
- Interface accessible dans le navigateur sur `localhost:3000`

## Le code

- Firmware : [Peemouse/battman-firmware](https://github.com/Peemouse/battman-firmware)
- Tableau de bord : [Peemouse/battman-dashboard](https://github.com/Peemouse/battman-dashboard)
