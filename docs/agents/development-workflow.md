# Development workflow

How development is done in this repository (ADR-0001): work scenarios and the
process vocabulary. Skills are installed in `.agents/skills/`, versions are
pinned in `skills-lock.json`, and restored via `pnpm setup`. Domain terms live
separately in the `CONTEXT.md` glossary; this file covers process language only.

## Mandatory core

- Grilling before feature work: `/grill-with-docs`
- Code-review before commit: `/code-review`
- Triage for incoming issues: `/triage` (issues live as files under `.scratch/`,
  configuration in `docs/agents/issue-tracker.md`)

## Scenarios

### Feature

`/grill-with-docs` — an interview that sharpens the idea; terms and decisions are
written into `CONTEXT.md` and `docs/adr/` as they crystallise. If a question needs
a runnable answer, detour through `/prototype` (bridged by `/handoff` both ways).
Then: multi-session build → `/to-spec`, then `/to-tickets` (one ticket at a time,
with explicit blocking edges) → `/implement` per ticket (driving `/tdd` internally,
closed out with `/code-review`). Single-session work → `/implement` right away.

### Bug

Incoming bugs and requests go through `/triage`: moving issues through the triage
roles until they are agent-ready. Hard bugs go to `/diagnosing-bugs`: establish a
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

`supersedes` is only included when there are ADRs being replaced.

### Wayfinder

Large foggy efforts (a greenfield project or a huge feature build that doesn't fit
in one session): `/wayfinder` charts a map of decision tickets under
`.scratch/<effort>/` and resolves them one at a time. The map is never handed
straight to `/implement` — first `/to-spec` collapses the decisions into a
buildable plan, then `/to-tickets` → `/implement`.

### Codebase health

`/improve-codebase-architecture` — ongoing upkeep: it surfaces deepening
opportunities; the one you pick becomes a seed idea for the Feature scenario.

## Process vocabulary

**Grilling**: an interview until shared understanding is reached; questions come
in rounds over the frontier, the agent collects facts, the human makes decisions.
_Avoid_: interview

**Spec**: a spec collapsed out of a discussion (`/to-spec`); the input for
splitting into tickets.
_Avoid_: requirements, task list

**Ticket**: an atomic unit of work in the issue tracker, self-contained enough
for `/implement`; blocking is expressed as explicit blocking edges.
_Avoid_: task, issue (internal synonym), story

**Agent-ready ticket**: a ticket that has passed triage, is fully specified, and
can be implemented by an agent without human involvement.

**Map**: the wayfinder map — an issue holding child decision tickets; it produces
decisions, not deliverables.

**Triage role**: one of the five canonical roles for an incoming issue
(needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix); the label
mapping lives in `docs/agents/triage-labels.md`.

**Prototype**: a throwaway program that answers a single design question; the
answer folds into real code, the prototype stays as a primary source.

**Deepening opportunity**: an architecture improvement candidate found by
`/improve-codebase-architecture` — a deep module behind a small interface.
