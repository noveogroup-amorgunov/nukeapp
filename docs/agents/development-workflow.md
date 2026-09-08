# Development workflow

How development is done in this repository (ADR-0001): the change lifecycle, work
scenarios, and the process vocabulary. Skills are installed in `.agents/skills/`,
versions are pinned in `skills-lock.json`, and restored via `pnpm setup`. Domain
terms live separately in the `CONTEXT.md` glossary; this file covers process
language only.

## The mental model

```text
docs/changes/       WHAT changed (one directory per change)
docs/adr/           WHY durable technical/process decisions were made
docs/product.md     WHAT the system supports now
docs/architecture.md  HOW the system is structured now
.scratch/           transient inbox: raw incoming, wayfinder maps, research
```

Changes are events. ADRs are decisions. Product and Architecture are the current
state. Skills are engineering capabilities applied situationally — never run every
skill for every change, and never run a second orchestration framework on top of
the skills.

## Mandatory core

- Grilling before feature work: `/grill-with-docs`
- Code-review before commit: `/code-review`
- Triage for raw incoming work: `/triage` (the inbox is `.scratch/`, configuration
  in `docs/agents/issue-tracker.md`)

## The change lifecycle

Every non-trivial piece of work is a change in `docs/changes/<change-id>/`:

```text
docs/changes/<change-id>/
├── product.md     WHY + WHAT (product/behavioral spec)
├── technical.md   HOW (technical design)
└── tasks.md       EXECUTION (checkbox checklist, persistent progress state)
```

`<change-id>` is short kebab-case reflecting intent (`add-product-favorites`,
`fix-cart-race-condition`, `migrate-api-client`). A change is a self-contained
context scope: `Implement change add-product-favorites` is enough for a fresh
session to start.

Lifecycle:

```text
raw incoming (.scratch/) → /triage
  → /grill-with-docs            sharpen the idea
  → /to-spec                    product.md + technical.md of the change
  → /to-tickets                 subtasks as checkboxes in tasks.md
  → /implement (driving /tdd)   one unchecked item at a time
  → /code-review                before commit
  → update docs/product.md / docs/architecture.md / ADRs if the current state changed
  → archive the whole directory to docs/changes/archive/YYYY-MM-DD-<change-id>/
```

- `/to-spec` collapses the grilling conversation into the change's `product.md`
  (WHY + WHAT) and `technical.md` (HOW).
- `/to-tickets` produces the execution checklist inside `tasks.md` instead of
  separate ticket files. `tasks.md` doubles as persistent progress state: if a
  session is interrupted or a new agent takes over, work resumes from the first
  unchecked item.
- Behavioral scenarios (Given/When/Then) go into `product.md` for requirements
  that must be unambiguously verifiable; they are the input for tests and
  `/tdd`.
- Small single-session work still gets a change directory, but any of the
  middle steps can be trivially short.
- Raw incoming items in `.scratch/` carry their triage status in a YAML
  frontmatter block at the top of the item file (matching the ADR metadata
  format):

```yaml
---
status: needs-triage
---
```

## Scenarios

### Feature

Raw idea enters `.scratch/` (or is born in conversation), passes `/triage`, then
runs the change lifecycle above. `/grill-with-docs` writes domain terms into
`CONTEXT.md` and durable decisions into `docs/adr/` as they crystallise. If a
question needs a runnable answer, detour through `/prototype` (bridged by
`/handoff` both ways); the conclusions go into `technical.md` or an ADR.

### Bug

Incoming bugs and requests land in `.scratch/` and go through `/triage` until
they are ready-for-agent or wontfix. A triaged bugfix becomes a change (e.g.
`fix-cart-race-condition/`). Hard bugs go to `/diagnosing-bugs`: establish a
tight feedback loop first, then fix with a regression test.

### ADR

Via `/grill-with-docs` + `/domain-modeling`. An ADR is only created when the
decision is hard to reverse, surprising without context, and the result of a real
trade-off. The format is a short document with a metadata block:

```yaml
---
status: accepted
date: 2026-09-08
supersedes:
  - ADR-0002
---
```

`supersedes` is only included when there are ADRs being replaced. A change never
duplicates an ADR: local design decisions live in `technical.md`; only decisions
that should outlive the change go to `docs/adr/`.

### Wayfinder

Large foggy efforts (a greenfield project or a huge feature build that doesn't
fit in one session): `/wayfinder` charts a map of decision tickets under
`.scratch/<effort>/` and resolves them one at a time. The map is never handed
straight to `/implement` — its decisions collapse into a change directory
(product.md / technical.md / tasks.md) and the normal lifecycle takes over.

### Codebase health

`/improve-codebase-architecture` — ongoing upkeep: it surfaces deepening
opportunities; the one you pick becomes a seed idea for the Feature scenario.

## After a change

Do not turn persistent docs into a changelog — update them only when the current
state actually changed:

1. Verify the change and complete `tasks.md`.
2. Update `docs/product.md` if product capabilities appeared, disappeared, or
   changed substantially.
3. Update `docs/architecture.md` if high-level architecture changed (new layer,
   state management approach, API interaction method, subsystem boundaries,
   rendering model, persistence model) — not implementation details.
4. Create or update ADRs for durable decisions.
5. Move the whole change directory to
   `docs/changes/archive/YYYY-MM-DD-<change-id>/` — the archive is
   immutable-ish; do not edit archived changes.

## Process vocabulary

**Grilling**: an interview until shared understanding is reached; questions come
in rounds over the frontier, the agent collects facts, the human makes decisions.
_Avoid_: interview

**Change**: a self-contained unit of work in `docs/changes/<change-id>/` —
product spec, technical design, and execution checklist in one directory.
_Avoid_: ticket (for the whole unit), feature folder, epic

**Spec**: the pair `product.md` (WHY + WHAT) and `technical.md` (HOW) inside a
change, produced by `/to-spec`.
_Avoid_: requirements, task list

**Task**: one checkbox item in a change's `tasks.md`; produced by `/to-tickets`.
The set of unchecked tasks is the current execution state.
_Avoid_: ticket, subtask

**Agent-ready item**: a raw incoming item that has passed triage and can be
turned into a change without further human involvement.

**Map**: the wayfinder map — a file holding child decision tickets under
`.scratch/`; it produces decisions, not deliverables.

**Triage role**: one of the five canonical roles for an incoming item
(needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix); the label
mapping lives in `docs/agents/triage-labels.md`.

**Prototype**: a throwaway program that answers a single design question; the
answer folds into `technical.md` or an ADR, the prototype stays as a primary
source.

**Deepening opportunity**: an architecture improvement candidate found by
`/improve-codebase-architecture` — a deep module behind a small interface.
