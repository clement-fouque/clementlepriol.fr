---
title: "SmartRing"
date: 2017-02-08T18:34:06Z
summary: "Un anneau de LED RGB qui affiche la jauge de batterie et les défauts d'un VESC, et gère phares et feu stop d'un skate électrique."
description: "SmartRing : jauge de batterie sur anneau de 12 LED RGB pour VESC, avec affichage des défauts, gestion des phares et feu stop via CAN."
category: electronics
tags: ["VESC", "Arduino", "LED RGB", "CAN", "PPM", "Skate électrique", "C++"]
cover: ""
coverAlt: ""
repo: "https://github.com/Peemouse/SmartRing"
featured: false
materials: ["Microcontrôleur Arduino", "Anneau de 12 LED RGB", "Contrôleur moteur VESC", "Télécommande GT2b", "Bouton poussoir"]
difficulty: intermediate
translationKey: "smartring"
draft: true
---

<!-- TODO Clément : compléter avec photos et récit du projet -->

SmartRing est un accessoire pour surveiller simplement un VESC, le contrôleur moteur open source des skateboards électriques. Un anneau de LED RGB affiche d'un coup d'œil l'état de la batterie et du système.

## Ce que fait le projet

Le montage interroge le VESC via ma bibliothèque [VescUart]({{< ref "/diy/vescuart" >}}) (version modifiée requise) et traduit ces valeurs en couleurs sur l'anneau. Il gère aussi l'éclairage de la planche.

{{< video provider="youtube" id="94tGvjmw-p8" title="SMARTRING : Some features" >}}

## Fonctionnalités

- Jauge de batterie sur un anneau de 12 LED RGB
- Affichage des défauts avec leur identifiant
- Affichage de la coupure en tension (voltage cutoff)
- Allumage/extinction des phares et feux arrière avec un bouton filaire ou via le PPM du canal CH2 d'une télécommande GT2b
- Feu stop selon la valeur PPM du VESC maître, via le bus CAN

## Matériel et code

Le circuit imprimé est disponible sur [EasyEDA](https://easyeda.com/Pimousse/WS2812_VESC_Gauge_v1_0_copy-8115fc38efb44be88084f875dda5bb6a) et le code (C++, licence GPL-3.0) sur GitHub : [Peemouse/SmartRing](https://github.com/Peemouse/SmartRing).
