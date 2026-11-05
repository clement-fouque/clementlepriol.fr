---
title: "Contrôleur DMX pour machine à fumée Martin Magnum"
date: 2026-02-15T15:51:38Z
summary: "Un contrôleur à base d'ESP32 qui ajoute le pilotage DMX à une machine à fumée Martin Magnum 850/1200, sans modification irréversible."
description: "Contrôleur ESP32 ajoutant le DMX (Art-Net/sACN prévus) aux machines à fumée Martin Magnum 850/1200, avec minuterie et mode manuel."
category: electronics
tags: ["ESP32", "DMX", "Art-Net", "sACN", "Machine à fumée", "Impression 3D", "C++"]
cover: ""
coverAlt: ""
repo: "https://github.com/Peemouse/Martin-Magnum-DMX-controller"
featured: false
materials: ["ESP32 (carte sur mesure)", "Écran OLED", "5 boutons poussoirs", "Connecteurs XLR mâle et femelle", "Connecteurs RJ45", "Boîtier imprimé en 3D", "Relais pour ventilateur (option)"]
difficulty: advanced
translationKey: "martin-magnum-dmx-controller"
draft: true
---

<!-- TODO Clément : compléter avec photos et récit du projet -->

La machine à fumée Martin Magnum 850 était livrée avec une simple télécommande à un bouton, sans option DMX. Ce contrôleur à base d'ESP32 lui ajoute une connectivité DMX (Art-Net et sACN prévus) pour la piloter depuis la régie. Il a été testé sur la Magnum 850 et devrait fonctionner sur la 1200.

## Ce que fait le projet

La machine reçoit sa commande sur un connecteur RJ45 : un signal 0–10 V règle l'intensité de la fumée.

- 0 à 1,5 V : machine éteinte (pas de chauffe)
- 1,5 à 2 V : machine en attente (chauffe, pas de fumée)
- 2 à 10 V : fumée proportionnelle au signal

Le contrôleur génère ce signal à partir des valeurs DMX reçues. À part quelques trous pour fixer le boîtier à l'arrière de la machine, tout est réversible et la télécommande d'origine reste utilisable (mais pas en même temps que le DMX). Un boîtier optionnel permet aussi d'allumer ou d'éteindre un ventilateur via un relais.

{{< note >}}
Pour l'instant, seul le DMX filaire fonctionne, même si la carte a été conçue pour l'Ethernet (Art-Net/sACN).
{{< /note >}}

## Fonctionnalités

- Pilotage sur 4 canaux DMX : intensité (0–100 %), minuterie ON (0–255 s), minuterie OFF (0–255 s), ventilateur
- Mode continu si l'une des deux minuteries vaut 0
- Mode refroidissement (plus de chauffe) avec une combinaison de valeurs dédiée
- Réglage de l'adresse DMX depuis l'écran OLED et les boutons
- Mode manuel sans DMX : fumée à pleine puissance avec le bouton +, ou minuterie réglable
- Calibration des tensions de sortie dans `parameters.h` à l'aide d'un multimètre

## Matériel et code

La carte a été conçue sous [EasyEDA](https://oshwlab.com/pimousse/led_artnet_copy) (version stable à partir de la V1.2). Les schémas, fichiers Gerber, la nomenclature, le firmware (C++, licence GPL-3.0) et les fichiers 3D du boîtier sont sur GitHub : [Peemouse/Martin-Magnum-DMX-controller](https://github.com/Peemouse/Martin-Magnum-DMX-controller).
