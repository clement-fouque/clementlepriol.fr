---
title: "Light poles — version 2"
slug: "light-poles-v2"
date: 2025-12-07T17:22:39Z
summary: "Mangled RS485 signals, a bargain-bin cable and 3D-printed quick-connect bases: version 2 of my LED light poles, ready for Fest'up 2025."
description: "Version 2 of my DIY LED poles: debugging RS485 with an oscilloscope, EtherCon cables, and concrete-weighted 3D-printed quick-connect bases."
category: electronics
tags: ["WLED", "ESP32", "RS485", "DMX", "EtherCon", "Oscilloscope", "3D printing"]
cover: "cover.jpg"
coverAlt: "Four light poles glowing cool white on the Fest'up 2025 stage"
repo: ""
featured: true
materials: ["ESP32", "RS485 transceivers", "10 m Cat6 EtherCon cables and connectors", "24 V COB LED strip", "1 m polycarbonate tubes", "3D-printed bases (PLA)", "Concrete", "Brass screws", "Contact blades salvaged from telephone sockets"]
difficulty: advanced
translationKey: "poteaux-lumineux-v2"
draft: false
---

![Fest'up 2025 improv theatre festival](images/01-festup-2025.jpg "Fest'up 2025 improv theatre festival")

If you haven't read about how this project started with version 1, I'd suggest reading that post first: [Light poles — version 1]({{< ref "/diy/poteaux-lumineux-v1" >}}).

## Why?

At the end of the previous post, I mentioned a strange ailment that was "frying" the pole outputs one after another.

On top of that, carrying the poles — fixed to their bases — to the venue turned out to be quite a hassle, and the concrete bases were crumbling, exposing the grey concrete.

So there were 3 things to rework:

- The bases
- Portability
- The robustness of the electrical and electronic system

It was April 1st at that point (no joke!), and everything had to be ready by the morning of May 28.

That left a lot more time than for the first version.

## The electronics

It's strange that I'd had no problems up to that point, and then suddenly everything was breaking...

![Annotated RS485 transceiver module: indicators, resettable fuses and TVS diodes](images/02-module-rs485.jpg)

My first suspect was the RS485 transmitters/receivers: the version I'd picked came with a whole bunch of protection components.

Unfortunately, I only buy from cheap Chinese websites, so there's always a risk of poor design and/or manufacturing.

So I switched to a different model.

When they arrived, I swapped the components and ran the first tests... which didn't help at all.

The boards kept failing!

OK. Time to get the oscilloscope out and analyse this meticulously, because the plot was thickening.

![Autopsy of a faulty light pole](images/03-autopsie-poteau.jpg "Autopsy of a faulty light pole")

The signals were awful, and I couldn't understand why. The RS485 transmitters seemed to be in a daze.

I replaced them with new ones and checked them before putting everything back together: perfect signals.

I reconnected the pole: the board turned back into a zombie, as if transformed overnight.

![Before connecting. All good.](images/04-signal-avant-connexion.jpg "Before connecting. All good.")

![After connecting, one line becomes very weak: the receiver can no longer make sense of the differential signal.](images/05-signal-apres-connexion.jpg "After connecting, one line becomes very weak: the receiver can no longer make sense of the differential signal.")

Even worse was the shape of the signal at the receiver inside the pole base. It was so distorted the receiver could barely understand it.

![Call that an RS485 signal?](images/06-signal-deforme.jpg "Call that an RS485 signal?")

By now, I'd been tearing my hair out over this problem for a month.

I'd changed everything, designed a new circuit board, rearranged the receivers and... nothing.

Unless... No way! There was one thing I hadn't changed.

Remember, in [the version 1 post]({{< ref "/diy/poteaux-lumineux-v1" >}}), the cable I'd bought to connect the poles?

Yes, those 50 m of very low-end RJ45 cable whose only selling point was the price.

I tried another cable I had lying around: the signal at the pole came back to life and, above all, was no longer distorted.

What if that had been the problem all along? A shoddy cable.

Hard to believe, but to get to the bottom of it, I decided to order dedicated [10 m EtherCon cables](https://www.thomann.fr/pro_snake_cat6e_cable_10m.htm) for the show, along with the matching connectors.

![EtherCon cable plugged into a connector being tested on the workbench](images/07-connecteur-ethercon.jpg)

The connector was wired to the new board, the cable plugged in — all that was left was to power up the system.

With one month left to finish everything, it HAD to work...

And then — what a relief!

All the problems really did come from the dreadful quality of that cheap RJ45 cable.

I knew cable quality could vary in all sorts of ways, but to the point of frying components? I'd never have guessed.

What the oscilloscope showed was a genuine relief.

![Yellow and green: the RS485 sent by the board / Purple and blue: the signal received at the pole.](images/08-signal-oscilloscope.jpg "Yellow and green: the RS485 sent by the board / Purple and blue: the signal received at the pole.")

{{< clip src="images/09-boitier-ethercon.mp4" alt="Control box fitted with four EtherCon connectors" >}}

I hurried to modify the enclosure (not without some effort) to fit the EtherCon connectors.

I'm absolutely delighted with these connectors — far sturdier than the ones used on version 1 (GX16).

![New v1.0 control board: ESP32, RS485 modules and fuses grouped together](images/10-carte-controle-v1-0.jpg)

The circuit board also got a little refresh, with:

- A revised layout that groups all the fuses in one place
- Fuse status indicators
- Terminal blocks for the EtherCon connectors
- A more compact shape

## The bases

I won't hide the fact that the solution from the [YouTuber](https://www.youtube.com/@SuperValidDesigns) I mentioned in the first post was a big inspiration for designing the new bases.

But I also kept something from the first version: weighting them with concrete.

So my bases would be:

- Fitted with a compartment for the electronics
- Fitted with an EtherCon socket
- Equipped with a quick connect/disconnect system for the LED tube.
- Designed to be 3D printed on a 250x250x250 mm build plate without supports, to minimise plastic use and post-printing work.

After many hours in CAD software, I had something that should meet all of these needs.

![Final render of the new base](images/11-rendu-socle.jpg "Final render of the new base")

![The poles' quick electrical connection system.](images/12-connexion-rapide.jpg "The poles' quick electrical connection system.")

{{< clip src="images/13-impression-socle.mp4" alt="3D-printed base being lifted off the printer bed" >}}

After 24 hours of printing, the result was more than satisfying!

With time running short, and because my 3D printer was starting to show signs of weakness, I printed in PLA, knowing full well that a plastic like ABS or ASA (or at least PETG) would have been better for sturdier parts.

Maybe an upgrade for version 3?

{{< clip src="images/14-test-connexion-tube.mp4" alt="Testing a short printed tube section slotting into the base" >}}

I printed a short piece of tube to simulate the poles connecting properly to the base.

The triangle acts as a keying feature. That way, the electrical connections will always be the right way round.

The test revealed that the shape of the contact tabs needed adjusting so that the weight of the poles alone would ensure a reliable electrical connection.

In the video, the tabs are too stiff and push the tube outwards.

The tubes were modified for quick connection by wiring the 3 conductors to brass screws (better electrical conductivity), while the bases were fitted with contact blades salvaged from old telephone sockets.

![End of a tube, with the wires attached to brass screws](images/15-tube-vis-laiton.jpg)

![The base's receptacle fitted with contact blades](images/16-socle-languettes.jpg)

![Base seen from above, with its EtherCon socket and electronics](images/17-socle-ethercon.jpg)

After testing each base, I prepared them for the final step: pouring the concrete.

![Five bases protected with masking tape before pouring the concrete](images/18-socles-masques.jpg)

![The bases lined up after the concrete was poured](images/19-socles-beton.jpg)

![Toolboxes stacked on the bases while the concrete sets](images/20-socles-leste.jpg)

It was now the evening before leaving for the festival with these version 2 poles.

The last lids were printing, and I couldn't resist one final test with all the poles.

{{< clip src="images/21-test-final-poteaux.mp4" alt="The four poles glowing in rainbow colours during the final test" >}}

## Conclusion

Version 2 really gave me a run for my money!

But the result exceeded my initial expectations.

The quick-connect system and the detachable cables make transport so much easier.

The system is now reliable and robust... and finished just in time (the last lid finished printing at midnight, for an 8 am departure the next morning. Phew!).

The lesson here is that I didn't question the original cable even though plenty of signs (and signals on the oscilloscope) pointed to it. That cost me precious time.

Finally, I'll remember that even on a project meant to be as cheap as possible, skimping on quality components can end up costing more than going for the very cheapest.

This light poles project took up my evenings and weekends for a total of 3 months.

But I already have ideas for what comes next, so don't miss the other posts on the blog!
