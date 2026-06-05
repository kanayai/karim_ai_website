# Habits & Changes — karim_ai_website

Personal, project-level takeaways. (System-wide requirements live in the cross-project synthesis.)

## Keep doing

1. **Let the agent commit in fine-grained steps.** It's the only reason this project is auditable
   at all — frequent commits gave a usable trail even with no transcripts (W1).
2. **Let the agent own the UI scaffolding.** Gemini was strong and fast at the React component
   layer (`src/components`) and the VS-Code-clone metaphor.

## Stop doing

1. **Stop throwing away the prompts.** This is the big one. 61 AI commits, zero preserved prompts —
   the reasoning is unrecoverable. On coaster_credits I kept `migrated_prompt_history/`; here I kept
   nothing. **Export and commit the Antigravity transcript at the end of a session**, the same way
   coaster_credits did.
2. **Stop batch-inventing features.** "Add four interactive extensions" led to same-day removals
   (W2); search was added and reverted (W3). Ask for one feature, decide, then the next.
3. **Stop leaving transitions implicit.** The AI→human handover (W4) is invisible except as a change
   of commit author. Drop a one-line marker at the boundary.

## Concrete changes for the next phase of this project

- At session end, run the Antigravity transcript export and commit it under a
  `prompt_history/` (or `_admin/`) folder — adopt coaster_credits' preserved-transcript habit.
- When the agent proposes a bundle of features, take them one at a time.
- If I pick the project back up, write a two-line "where the agent left it / what I'm changing" note
  before starting.
