---
title: "SmartCharger"
date: 2019-08-29T12:56:26Z
summary: "Un chargeur intelligent à base d'ESP32 pour packs de batteries Li-Ion de 1 à 12S, avec menu, sécurités et interface web Wifi."
description: "SmartCharger : chargeur Li-Ion universel 1 à 12S piloté par ESP32, avec mode stockage, sécurités, serveur web Wifi et mises à jour OTA."
category: electronics
tags: ["ESP32", "Li-Ion", "Chargeur", "OLED", "Wifi", "OTA", "C++"]
cover: ""
coverAlt: ""
repo: "https://github.com/Peemouse/SmartCharger"
featured: false
materials: ["ESP32", "Alimentation programmable DPS", "Écran OLED monochrome 1,3\" 128x64 (Adafruit)", "3 boutons poussoirs", "Buzzer actif", "Chargeur USB 5 V (modifié)"]
difficulty: advanced
translationKey: "smartcharger"
draft: true
---

<!-- TODO Clément : compléter avec photos et récit du projet -->

SmartCharger est un chargeur intelligent pour la charge de packs de batteries Li-Ion « universels ». Un ESP32 pilote une alimentation programmable de type DPS et affiche l'état de la charge sur un petit écran OLED.

## Ce que fait le projet

Le microcontrôleur communique en UART avec l'alimentation DPS pour régler la tension et le courant de charge selon le pack connecté. L'utilisateur navigue dans un menu à l'aide de trois boutons (haut, entrée, bas), et un buzzer actif signale les événements. Le projet est indiqué comme étant en version bêta.

## Fonctionnalités

- Charge de packs Li-Ion de 1 à 12S
- Mode stockage (charge uniquement, pas de décharge)
- Menu simple d'utilisation
- Sécurités pour protéger la batterie, le chargeur et l'alimentation
- Montée progressive du courant de charge
- Détection de fin de charge
- Serveur web pour la surveillance et le contrôle à distance (Wifi)
- Mise à jour du firmware OTA (Wifi)

## Le code

Le firmware (C++, licence GPL-3.0) et le câblage détaillé sont disponibles sur GitHub : [Peemouse/SmartCharger](https://github.com/Peemouse/SmartCharger).
