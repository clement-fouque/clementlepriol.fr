---
title: "VescUart"
date: 2018-10-27T22:01:19Z
summary: "Ma version de la bibliothèque Arduino VescUart, pour dialoguer en UART avec un contrôleur moteur VESC, enrichie de nouvelles commandes."
description: "VescUart : fork de la bibliothèque Arduino de SolidGeek pour communiquer en UART avec un VESC, avec compatibilité firmware et commandes ajoutées."
category: electronics
tags: ["VESC", "Arduino", "UART", "Bibliothèque", "C++", "Skate électrique"]
cover: ""
coverAlt: ""
repo: "https://github.com/Peemouse/VescUart"
featured: false
materials: ["Carte Arduino ou compatible", "Contrôleur moteur VESC"]
difficulty: intermediate
translationKey: "vescuart"
draft: true
---

<!-- TODO Clément : compléter avec photos et récit du projet -->

VescUart est une bibliothèque Arduino permettant de communiquer en UART avec un VESC, le contrôleur moteur open source très utilisé dans les skateboards électriques. Mon dépôt est un fork de la bibliothèque de [SolidGeek](https://github.com/SolidGeek/VescUart), elle-même basée sur celle de RollingGecko.

## Ce que fait le projet

La bibliothèque regroupe toutes les fonctions et valeurs dans une classe : on l'initialise avec un port série, puis on peut lire la télémétrie du VESC (tours/minute, tension d'entrée, ampères-heures, tachymètre…) ou lui envoyer des commandes.

## Mes ajouts

- Compatibilité avec le firmware VESC 3.49 et suivants, et demande de la valeur PPM
- Vérification de la version du firmware
- Désérialisation de toutes les valeurs renvoyées par le VESC
- Communication avec le BMS DieBieMS
- Prise en charge de la télécommande Trampa WAND
- Nouvelles commandes, alignées sur celles du VESC

Cette version est notamment requise par mon projet [SmartRing]({{< ref "/diy/smartring" >}}).

## Le code

Le code (C++, licence GPL-3.0) est disponible sur GitHub : [Peemouse/VescUart](https://github.com/Peemouse/VescUart).
