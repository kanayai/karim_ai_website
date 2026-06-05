# AI-Agent Efficiency Audit — karim_ai_website

What this folder is: a small, evidence-based audit of how this project (a VS Code-themed personal
website) was built with AI agents — here, **Gemini Antigravity** — so I can (a) see my own good and
bad habits and (b) feed concrete requirements into my agentic OS and memory systems.

It mirrors the larger MA22019 audit
(`Teaching/MA22019/ma22019_website/_admin/ai_agent_efficiency`) but condensed. Cross-project
conclusions live in `karim-ai-os/analysis/ai_usage_cross_project_synthesis.md`.

## What evidence exists here (and the big limitation)

This project is the **opposite of coaster_credits**: there are **no preserved transcripts**. No
`migrated_prompt_history/`, no `.claude/` logs, no Codex sessions, no local Gemini logs. The only
record of AI work is **git itself** — and here that record is unusually good, because:

- **Gemini is a tagged commit author** on 61 of 200 commits (31%). On coaster_credits the AI was
  invisible in git; here it is directly attributable.
- Commit messages, diffs, and same-day clusters let us reconstruct work "episodes" from git alone.

So the analysis is **git-history-driven**. Evidence = commit message + diff + clustering, not
conversation. The absence of transcripts is itself a finding (see `habits_and_changes.md`).

## Reading order

1. `structural_audit.md` — the numbers: authorship split, cadence, message discipline, file areas.
2. `commit_episodes/` — 4 work episodes reconstructed from same-day commit clusters.
3. `synthesis.md` — the patterns inferable from git.
4. `habits_and_changes.md` — what to keep, what to change.

## Headline finding

A **front-loaded AI burst then clean human takeover**: Gemini did dense, small-step work Nov–Jan
(last AI commit 2026-01-13), after which I finished the polish myself. The AI work is well-attributed
but **its reasoning is gone** — and the git record shows visible thrash (features added then reverted
the same day). The biggest habit issue is **not preserving the prompts**, which makes the *why*
behind 61 commits unrecoverable.
