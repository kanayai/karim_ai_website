# Structural Audit — karim_ai_website

All figures reproducible from the repo on 2026-06-05.

## 1. Git cadence — heavily front-loaded

```
git rev-list --count HEAD   → 200 commits
first → last                → 2025-11-22 → 2026-03-31
```

Commits per month:

| Month | Total | Gemini | Human | Note |
|-------|------:|-------:|------:|------|
| 2025-11 | 128 | 27 | 100 | Intense launch month |
| 2025-12 | 58 | 28 | 30 | Theming, extensions, blog |
| 2026-01 | 8 | 6 | 2 | Tailing off; last AI commit 01-13 |
| 2026-03 | 6 | 0 | 6 | Human-only final polish |

Both human and AI work front-load hard into Nov–Dec. **Gemini stops entirely after 2026-01-13**;
everything afterwards is mine. This is a clean **AI-burst → human-takeover** shape.

## 2. Authorship — the AI is attributable here

```
git shortlog -sne --all
  138  kanayai            (me)
   61  Gemini AI          ← 31% of commits, directly tagged
    1  Karim (campus id)
```

Unlike coaster_credits (where 167/168 commits were mine and the AI was invisible), here Gemini owns
31% of commits. **This is the good case for auditability** — I can ask "what did the agent actually
do?" and git answers.

Lines changed (`git log --author=… --numstat`):

| | Commits | Lines added | Lines deleted |
|---|------:|------:|------:|
| Gemini | 61 | 7,822 | 3,215 |
| Human (kanayai) | 138 | 28,254 | 8,366 |

Gemini = 31% of commits but ~22% of added lines → **smaller, more numerous commits** than mine. The
agent worked in fine-grained steps; I worked in larger ones.

## 3. Commit-message discipline — weaker, and it improved over time

Prefix counts: `43 feat / 12 fix / 10 docs / 8 refactor / 4 style / 3 chore / 1 wip / 1 revert /
1 content`. Only ~82 of 200 commits use a conventional prefix — **the rest are free-form**
("Implement toast notification system", "Enhanced search functionality", "Loop typewriter
animation"). The early Nov/Dec commits are mostly free-form; conventional prefixes appear later.
Contrast coaster_credits, which had strong `feat:`/`fix:` discipline throughout.

## 4. Where the agent worked

Top directories touched by Gemini (`git log --author=Gemini --name-only`):

```
120  src/components     ← overwhelmingly the React UI
 16  src
 16  public
 13  public/blog/...    ← Quarto blog output
 11  data
  8  src/styles
  4  src/constants
  4  package.json
```

Gemini's work was concentrated in the **React component layer** — UI building, the VS-Code-clone
look, interactive "extensions", theming. It rarely touched build config or data scripts.

## 5. Visible thrash in git

Because there are no transcripts, the only sign of churn is git — and it's there. Examples from
single-day clusters:

- **2025-11-24** (14 Gemini commits): *"Add dummy .gitignore and README.md entries… render them as
  non-clickable"* immediately followed by *"Revert dummy .gitignore and README.md entries…"*. An
  experiment added and reverted within the same day.
- **2025-12-04** (9 commits): *"Feat: Add interactive extensions (Theme Switcher, LaTeX Playground,
  Citation Generator, Data Viz Gallery)"* then *"Refactor: Remove Theme Switcher…"* — a feature
  shipped and partly removed the same day.
- **2025-12-07** (10 commits): *"feat: add … search functionality …"* then *"revert: remove search
  functionality from publications page"*.

This is the same **add-then-undo churn** the coaster transcripts showed as error events — except
here it's only visible because the agent committed each step.

## 6. The sync workflow

`.agent/workflows/git_sync.md` documents a "Sync BEFORE you start, Sync AFTER you finish" rule via
`./scripts/sync_work.sh` for multi-machine work. Lightweight, human-oriented; no agent-state or
prompt capture.

## Summary table

| Dimension | Finding |
|---|---|
| Primary agent | Gemini Antigravity |
| AI visibility in git | **High** — 31% of commits tagged Gemini |
| Evidence regime | Git only (no transcripts) |
| Cadence shape | Front-loaded AI burst → human takeover (AI stops 2026-01-13) |
| Commit size | Agent = many small commits; human = fewer, larger |
| Message discipline | Weak early (free-form), improving later |
| Work concentration | `src/components` (UI layer) |
| Main evidence gap | No prompts preserved → AI reasoning unrecoverable |
