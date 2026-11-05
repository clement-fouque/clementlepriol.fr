---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
summary: ""
description: ""
category: electronics   # stage | electronics | traditional
tags: []
cover: "cover.jpg"
coverAlt: ""
repo: ""
featured: false
materials: []
difficulty: intermediate   # beginner | intermediate | advanced
translationKey: "{{ path.Base .File.Dir }}"
draft: true
---
