# Issue tracker: Local Markdown

Raw incoming work (bug reports, ideas, requests) and transient thinking artifacts
live as markdown files in `.scratch/`. `.scratch/` is **gitignored**: it is an
inbox, not a history — everything that survives triage graduates into a change
directory under `docs/changes/` (see `development-workflow.md`).

## Conventions

- One item per directory: `.scratch/<slug>/`
- A raw incoming item is a short markdown file with whatever context the reporter
  left; no required format
- Triage state is recorded in a YAML frontmatter block at the top of each item
  file (`status:` key, see `triage-labels.md` for the role strings)
- Wayfinder maps live at `.scratch/<effort>/map.md` with child decision tickets at
  `.scratch/<effort>/issues/NN-<slug>.md` (numbered from `01`, one file per ticket)
- Research artifacts from `/research` also land in `.scratch/`

## Lifecycle

1. Raw item arrives in `.scratch/<slug>/`
2. `/triage` moves it through the triage roles until it is `ready-for-agent` or
   `wontfix`
3. `ready-for-agent` items become changes: create `docs/changes/<change-id>/` and
   run the development workflow; the `.scratch/` item is then deleted
4. `wontfix` items are deleted (nothing references them)

## Wayfinding operations

Used by `/wayfinder`. The **map** is a file with one **child** file per ticket.

- **Map**: `.scratch/<effort>/map.md` (the Notes / Decisions-so-far / Fog body).
- **Child ticket**: `.scratch/<effort>/issues/NN-<slug>.md`, numbered from `01`,
  with the question in the body. A `Type:` line records the ticket type
  (`research`/`prototype`/`grilling`/`task`); a `Status:` line records
  `claimed`/`resolved`.
- **Blocking**: a `Blocked by: NN, NN` line near the top. A ticket is unblocked
  when every file it lists is `resolved`.
- **Frontier**: scan `.scratch/<effort>/issues/` for files that are open,
  unblocked, and unclaimed; first by number wins.
- **Claim**: set `Status: claimed` and save before any work.
- **Resolve**: append the answer under an `## Answer` heading, set
  `Status: resolved`, then append a context pointer (gist + link) to the map's
  Decisions-so-far in `map.md`.

## When a skill says "publish to the issue tracker"

Create a file under `.scratch/<slug>/` (creating the directory if needed).

## When a skill says "fetch the relevant ticket"

Read the file at the referenced path. The user will normally pass the path or the
slug directly.
