# Synthesis — karim_ai_website

Patterns inferable from git (no transcripts exist for this project).

## 1. The defining gap: no preserved prompts

The agent authored 31% of commits, but **not a single prompt was kept**. Everything we can say
about *how* the work was driven is inferred from commit messages and diffs. The reasoning behind 61
commits — why these features, why this revert — is gone. On coaster_credits the transcripts were
migrated and preserved; here nothing was. **This is the headline lesson of the project.**

## 2. Git is a usable but lossy audit substitute

Because Gemini is a tagged author and committed in fine-grained steps, git *does* let us
reconstruct episodes, spot churn, and see where the agent worked (`src/components`). Frequent
small commits are the agent's accidental audit trail. But it only records *what landed*, never the
intent or the discarded attempts — and "what landed" includes same-day reverts that look like noise
without the prompt that explains them.

## 3. Same failure mode as coaster_credits, different evidence

The **add-then-undo / mystery-feature** pattern recurs:
- coaster E2: *"I've got a menu called continue marathon and do not know how to remove it"*
- website W2: *"Add interactive extensions…"* → *"Remove Theme Switcher…"* same day
- website W3: search added → reverted same day

When the agent invents a batch of features, some are immediately removed. This is a stable,
cross-project habit, visible as anxious prompts in one project and as commit churn in the other.

## 4. Front-loaded burst, clean human takeover

Work front-loads into Nov–Dec; Gemini stops dead on 2026-01-13 and I finish the polish in March
(W4). The result is good but the transition is undocumented — no bridging handoff.

## 5. Agent vs human commit shape

Agent = many small commits (61 commits, 7.8k lines); human = fewer, larger (138 commits, 28.3k
lines). The agent operated as a high-frequency drafter; I operated as a lower-frequency integrator.

## Carry-forward to the cross-project synthesis

- **Preserve prompts/transcripts by default** — this project proves the cost of not doing so.
- **Mark AI→human and tool→tool transitions explicitly**, even on solo projects.
- **Scope guardrails for agent-invented features** (same finding as coaster E2/W2).
- **Frequent commits are a partial, free audit signal** — lean on them, but don't rely on them
  instead of prompt capture.
