HUGO := hugo
PORT ?= 1313
SITE := http://localhost:$(PORT)

.PHONY: all build serve dev new check clean help

all: build

## Build the production site into ./public
build:
	$(HUGO) --gc --minify

## Serve the site locally (published content only)
serve:
	$(HUGO) server --bind 0.0.0.0 --port $(PORT)

## Serve the site locally including drafts
dev:
	$(HUGO) server --bind 0.0.0.0 --port $(PORT) --buildDrafts

## Create new content: make new SECTION=diy NAME=mon-projet  (SECTION: diy | creations)
new:
	@test -n "$(NAME)" || (echo "Usage: make new SECTION=diy|creations NAME=slug" && exit 1)
	$(HUGO) new content $(or $(SECTION),diy)/$(NAME)/index.fr.md
	$(HUGO) new content $(or $(SECTION),diy)/$(NAME)/index.en.md

## Quality checks: HTML validation + Lighthouse (fails below $(MIN_SCORE) in any category)
MIN_SCORE ?= 95
PAGES ?= / /creations/ /diy/ /diy/poteaux-lumineux-v2/ /a-propos/ /contact/ /en/
check:
	$(HUGO) --gc -d public-check --quiet
	npx --yes html-validate@9 "public-check/**/*.html"
	@HUGO_PARAMS_INDEXING=true $(HUGO) server --port $(PORT) --baseURL $(SITE)/ --appendPort=false --renderToMemory --disableLiveReload --environment production >/dev/null 2>&1 & echo $$! > .hugo.pid
	@until curl -sf $(SITE)/ >/dev/null; do sleep 1; done
	@mkdir -p .lighthouse; status=0; for p in $(PAGES); do \
		out=.lighthouse/$$(echo $$p | tr '/' '_').json; \
		npx --yes lighthouse@12 "$(SITE)$$p" --quiet --chrome-flags="--headless=new --no-sandbox" \
			--only-categories=performance,accessibility,best-practices,seo --output=json --output-path=$$out; \
		node -e 'const r=require("./'$$out'");let ok=true;const s=Object.values(r.categories).map(c=>{const v=Math.round(c.score*100);if(v<$(MIN_SCORE))ok=false;return c.id+"="+v});console.log((ok?"✓ ":"✗ ")+r.finalDisplayedUrl.padEnd(52),s.join("  "));process.exit(ok?0:1)' || status=1; \
	done; kill `cat .hugo.pid`; rm -f .hugo.pid; rm -rf public-check; exit $$status

clean:
	rm -rf public public-check .lighthouse resources/_gen .hugo_build.lock

help:
	@grep -B1 -E '^[a-z]+:' Makefile | grep '^##' | sed 's/## /  /'
