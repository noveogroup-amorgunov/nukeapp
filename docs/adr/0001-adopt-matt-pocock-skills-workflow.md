---
status: accepted
date: 2026-09-08
---

# Adopt Matt Pocock skills workflow

Development in this repository follows the skills-based workflow from Matt Pocock
(mattpocock/skills): both agent and human work run through shared scenarios —
feature, bug, ADR, wayfinder, codebase health — with a shared process vocabulary.
The decision was made because ad-hoc prompting loses context between sessions and
produces no agent-ready tickets, while the stateless approach (`/grill-me`) leaves
no artifacts (glossary, ADRs) in the repository.

The mandatory core: grilling before feature work (`/grill-with-docs`), code-review
before commit (`/code-review`), and triage for incoming issues (`/triage`). All
other skills are used as needed. The living description of scenarios and the
process vocabulary live in `docs/agents/development-workflow.md`; this ADR records
only the decision and its rationale.

## Considered Options

- **Ad-hoc prompting**: context is lost between sessions; no reproducible specs
  and no tickets that are ready for an agent to pick up.
- **Stateless mode (`/grill-me` without docs)**: the same interview, but nothing
  is written back to the repo — decisions and terminology never accumulate.
