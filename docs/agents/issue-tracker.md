# Issue tracker: Local Markdown

Raw incoming work (bug reports, ideas, requests) and transient thinking artifacts
live as markdown files in `.scratch/`, tracked in git and shared across machines.
Everything that survives triage graduates into a change directory under
`docs/changes/` (see `development-workflow.md`).

## Conventions

- Raw incoming items are flat files: `.scratch/NNN-<slug>.md`, numbered from
  `001`.
  There is no per-feature subdirectory unless an effort (e.g. a wayfinder map)
  explicitly needs one.
- Each triaged item has one category (`bug` or `enhancement`) in `category:`.
- Triage state is recorded as a YAML frontmatter block at the top of the item
  file (see `triage-labels.md` for the role strings):

  ```yaml
  ---
  status: needs-triage
  ---
  ```

- Items may declare blocking edges as a `Blocked by:` section listing other item
  numbers.
- Implementation follows one of two paths in `development-workflow.md`:
  - Spec-driven: create `docs/changes/<change-id>/` with a task graph
    in `tasks.md`; mark the source item as superseded with a link in `## Comments`.
  - Direct: keep acceptance checkboxes, progress, verification results, and a
    completion note in the source item; no spec or change directory is required.
- Completed and superseded items are excluded from pending-work lists. The five
  triage statuses express readiness; completion is recorded in `## Comments`.
- Comments and conversation history (triage notes, grilling notes) append to the
  bottom of the item file under a `## Comments` heading.

## Completion rule

Completion is recorded in `## Comments`, never as a sixth triage status — the
five statuses express readiness, not completion. The visual "done" sign is a
check emoji in the file name: completed items are renamed to
`NNN-✅-<slug>.md` (emoji after the number; `NNN` stays the first token, so
resolution by number keeps working). Keep the renamed file in place rather than
moving it to `.scratch/archive/`: that archive is for obsolete items and
preserves original status, while the check prefix marks implemented work.
Other sessions must not strip the check mark. `/do-archive` performs the
closing; see `development-workflow.md`, "Completion for both implementation
paths".

## When a skill says "publish to the issue tracker"

Create a new flat item file under `.scratch/` (next free `NNN-` number).
Exception: during spec-driven implementation the skills publish into the change
directory instead — the artifact mappings live in `development-workflow.md`.

## When a skill says "fetch the relevant ticket"

Read the file at the referenced path. The user will normally pass the path or the issue number directly.

For `/implement-spec`, a ticket is a task identified inside the change's
`tasks.md`; read it together with `product.md` and `technical.md`. Claims,
blocking edges, and completion follow “Running `/implement-spec`” in
`development-workflow.md`. Completing a task checks its entry after implementation
and verification; closing the whole change uses `/do-archive`, including the
source item's completion note and rename. This tracker does not close work
through PRs.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a file with one **child** file per ticket.

- **Map**: `.scratch/<effort>/map.md` (the Notes / Decisions-so-far / Fog body).
- **Child ticket**: `.scratch/<effort>/issues/NNN-<slug>.md`, numbered from `001`, with the question in the body. A `Type:` line records the ticket type (`research`/`prototype`/`grilling`/`task`); a `Status:` line records `claimed`/`resolved`.
- **Blocking**: a `Blocked by: NNN, NNN` line near the top. A ticket is unblocked when every file it lists is `resolved`.
- **Frontier**: scan `.scratch/<effort>/issues/` for files that are open, unblocked, and unclaimed; first by number wins.
- **Claim**: set `Status: claimed` and save before any work.
- **Resolve**: append the answer under an `## Answer` heading, set `Status: resolved`, then append a context pointer (gist + link) to the map's Decisions-so-far in `map.md`.
