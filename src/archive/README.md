# Archived layouts

Retired in the October 2026 revamp (`_admin/planning/2026-10_revamp-plan.md`, M1). Not imported or
routed anywhere; kept for reference only.

- `TerminalLayout` — the full interactive terminal page (`terminal.html`). Its identity panel informs
  the Home redesign (M3).
- `PyPILayout` — the PyPI-style Teaching page (`current_courses.ipynb`, `previous_courses.ipynb`).
  Teaching becomes a Moodle look-alike (M4).

To restore one: move it back to `src/components/`, re-import it in `src/App.jsx` and add its case to
`getLayoutType`.
