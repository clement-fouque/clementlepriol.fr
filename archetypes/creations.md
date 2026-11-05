---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
summary: ""
description: ""
category: stage   # stage | electronics | traditional
tags: []
cover: "cover.jpg"
coverAlt: ""
repo: ""
featured: false
translationKey: "{{ path.Base .File.Dir }}"
draft: true
---
