---
status: accepted
date: 2026-09-08
---

# Adopt Matt Pocock skills workflow with change-based specs

Development in this repository follows the skills-based workflow from Matt Pocock
(mattpocock/skills): both agent and human work run through shared scenarios —
feature, bug, ADR, wayfinder, codebase health — with a shared process vocabulary.
Every non-trivial piece of work is a **change**: a self-contained directory under
`docs/changes/<change-id>/` holding `product.md` (WHY + WHAT), `technical.md`
(HOW), and `tasks.md` (EXECUTION, checkbox checklist doubling as persistent
progress state). Completed changes are archived under
`docs/changes/archive/YYYY-MM-DD-<change-id>/`.

The persistent layers are kept separate: `docs/adr/` records _why_ durable
decisions were made, while `docs/product.md` and `docs/architecture.md` describe
_what the system supports now_ and _how it is structured now_ — updated only when
the current state changes, never turned into a changelog. Raw incoming work waits
in the gitignored `.scratch/` inbox, passes `/triage`, and graduates into a change.

The decision was made because ad-hoc prompting loses context between sessions and
produces no persistent, resumable execution state, while the stateless approach
(`/grill-me`) leaves no artifacts (glossary, ADRs, changes) in the repository. The
change format borrows its conventions from OpenSpec (change-oriented development,
stable change ids, WHAT/HOW/EXECUTION separation, date-prefixed archive) so that
adopting the full OpenSpec tooling later would require minimal migration — but
OpenSpec itself stays out for now to avoid premature ceremony.

The mandatory core: grilling before feature work (`/grill-with-docs`), code-review
before commit (`/code-review`), and triage for raw incoming work (`/triage`). The
skills stay engineering capabilities applied situationally — no second
orchestration framework runs on top of them, and the skills pipeline maps onto the
change format (`/to-spec` → `product.md` + `technical.md`, `/to-tickets` →
checkboxes in `tasks.md`). The living description of scenarios and the process
vocabulary lives in `docs/agents/development-workflow.md`; this ADR records only
the decision and its rationale.

## Considered Options

- **Ad-hoc prompting**: context is lost between sessions; no reproducible specs
  and no resumable execution state for agents.
- **Stateless mode (`/grill-me` without docs)**: the same interview, but nothing
  is written back to the repo — decisions and terminology never accumulate.
- **Full OpenSpec tooling**: CLI, orchestration commands, `proposal.md`, delta
  specs, schemas — more ceremony than value at the current project size; the
  change format keeps the migration path open instead.
- **Matt's ticket pipeline as-is (`/to-spec` → `/to-tickets` → separate ticket
  files)**: duplicates the change format's artifacts and splits the source of
  truth between ticket files and specs; instead the pipeline is mapped onto the
  change directory.
