---
name: write
description: Use when a quest has enough evidence to draft or refine a paper, report, or research summary without inventing missing support.
skill_role: stage
---
# Write
Use this skill to turn accepted evidence into a faithful paper or report draft. Keep claims bounded by artifacts; if evidence is weak or missing, record the gap and route back instead of drafting fiction.

## Use when
- accepted baseline and at least one meaningful result exist
- the user wants a draft, report, or paper bundle and narrative consolidation is now the main blocker

## Do not use when
- the evidence base is still weak or unstable
- the main need is new experiments, baselines, or ideation

## Keep these files aligned
- `paper/selected_outline.json`, `paper/evidence_ledger.json`, `paper/paper_experiment_matrix.md` or `.json`
- `paper/references.bib`, `paper/claim_evidence_map.json`, `paper/paper_bundle_manifest.json` when bundling

## Required MCP usage
- Start each substantial pass with `memory.list_recent(scope='quest', limit=5)` and one writing-relevant `memory.search(...)`.
- Use `artifact.get_paper_contract_health(detail='full')` if the blocker might be stale outline state, unresolved experiment rows, or unclear evidence ownership.
- Use `artifact.get_quest_state(detail='summary')`, `artifact.read_quest_documents(...)`, or `artifact.get_conversation_context(...)` when restart context is unclear.
- Use `artifact.submit_paper_outline(mode='candidate'|'select'|'revise', ...)`; treat `mode='select'` as paper-line activation and sync contract files before heavy drafting.
- Use `artifact.create_analysis_campaign(...)` only for real paper-facing evidence gaps, not for prose cleanup or citation chores.
- If writing exposes a missing evidence requirement, route back through `decision`, `experiment`, or `analysis-campaign` instead of drafting around it.
- Use `artifact.submit_paper_bundle(...)` only after the draft, bibliography, and bundle metadata are durable enough to hand off.
- Use `memory.write(...)` only for reusable writing, citation, or search lessons, not one-off local edits.

## Figure-first coordination
- If a section needs a structured paper-facing figure from measured data, do not improvise a new plotting stack inside `write`.
- Read `paper-plot` first for the first-pass durable chart, then return to `write` for caption, callout, and prose integration.
- Use `figure-polish` only after a durable first-pass render already exists and the remaining blocker is figure quality rather than figure existence.
- Treat unresolved figure requirements as a real writing blocker for the affected section; in autonomous mode, repair the figure path before expanding heavy prose around that section.
- After each figure-producing pass, sync the resulting figure path, role, and local takeaway back into `paper/evidence_ledger.json`, `paper/paper_experiment_matrix.md`, and the relevant draft section.

## DeepResearch-style collaboration order
- Default order: refresh outline -> refresh evidence ledger / experiment matrix -> refresh literature survey and `paper/references.bib` -> then draft or revise.
- Do not start heavy prose before the paper contract and literature surface are synchronized.
- If the matrix, outline, or section contract implies a missing structured result figure, insert a `paper-plot` pass before the prose pass for that section.
- If literature coverage, novelty overlap, or claim support is still unclear after survey refresh, record the blocker and route to `decision`, `scout`, or `analysis-campaign`.

## Reader-first writing references
- Use `references/oral_package_patterns.md` when a dense draft needs stronger oral-style evidence staging and display-role separation.
- Use `references/oral_writing_principles.md` when the draft needs a more reader-centered and reviewer-aware narrative spine.
- Use `references/experiments_analysis_patterns.md` when the experiments and analysis sections need clearer role separation or reviewer-facing evidence design.
- Use `references/section_rewrite_checklist.md` before treating a rewritten section as stable enough for bundling or review.

## Literature workflow
- Start from seed papers: baseline, strongest direct competitors, and mechanism-nearest papers.
- Run `breadth -> shortlist -> depth`: broad discovery, shortlist triage, source reading, then survey synthesis.
- Before heavy drafting, leave behind both a grouped survey summary (`core papers`, `closest competitors`, `adjacent inspirations`, `watchlist`) and a machine-usable `paper/references.bib`.
- Once a shortlist stabilizes, lock each paper to a DOI or arXiv id first and fetch BibTeX immediately instead of postponing bibliography cleanup to the end.
- For a normal paper-like deliverable, aim for roughly `30-50` verified references unless scope clearly justifies fewer.

## Discovery and reading rules
- If DeepXiv is available, use it for paper-centric discovery, clustering, and shortlist triage before broad web search.
- DeepXiv is a discovery layer, not a final truth layer; still verify claim support against source papers.
- If DeepXiv is unavailable, use the legacy route: memory reuse, arXiv-first web search, OpenAlex expansion, and targeted open-web search.
- Use `artifact.arxiv(paper_id=..., full_text=False)` only after a paper is shortlisted and its arXiv id is known; switch to `full_text=True` only when needed.
- Do not rerun broad search without a clear gap; search only missing, newer, or unresolved neighborhoods.

## Citation graph rules
- Use backward references to map foundations and immediate method lineage.
- Use forward citations to find newer competitors, replications, and follow-up mechanisms.
- Prefer expanding from recent and task-specific seeds, not only from famous foundational papers.
- When using forward citations on a classic paper, add task, mechanism, and year filters; otherwise results become too broad.
- OpenAlex is usually the easiest graph-expansion layer for `references` and `cites` traversal.

## Citation validation and BibTeX
- Use `SEARCH -> VERIFY -> RETRIEVE -> VALIDATE -> ADD`.
- Secondary validation means: verify the paper exists, verify it is relevant, verify the cited claim really appears in the source, verify metadata, then add BibTeX plus a one-line survey note.
- Discovery sources: DeepXiv if configured, OpenAlex, Semantic Scholar when available, and Google Scholar only for manual search or manual BibTeX export.
- Metadata and verification sources: DOI / Crossref, publisher pages, arXiv, and OpenAlex.
- Treat DOI and arXiv as the primary BibTeX sources. Treat DeepXiv and OpenAlex as discovery / graph layers, not final BibTeX truth layers.
- BibTeX decision tree:
  - known arXiv id: use `artifact.arxiv(...)` and reuse returned `bibtex`
  - publisher DOI: prefer `doi.org` content negotiation; Crossref transform is an acceptable fallback
  - arXiv DOI (`10.48550/arXiv...`): use `doi.org` content negotiation, not Crossref transform
  - title only: lock the exact paper first via discovery and metadata, then retrieve BibTeX
- Fast rule: if you only need BibTeX, prefer DOI retrieval; if you also need to read the paper and have an arXiv id, `artifact.arxiv(...)` is acceptable but heavier.
- Do not hand-write BibTeX from memory.
- Do one explicit reference audit before bundle submission, including count, existence, and spot checks for claim-level support.

## Good, bad, and boundary cases
- Good: call `artifact.get_paper_contract_health(...)` before assuming a weak section is only a prose problem.
- Bad: keep rewriting the draft while outline, matrix, or references are stale.
- Good: call `artifact.submit_paper_outline(mode='select', ...)` once candidate comparison is done; then sync evidence files before writing hard.
- Bad: leave the winning outline only in prose or chat and draft as if the paper contract were settled.
- Good: use DeepXiv or OpenAlex to build a shortlist, then read only shortlisted papers with `artifact.arxiv(...)` or source pages.
- Bad: treat one keyword search or one already-known paper as a complete literature review.
- Good: use DeepXiv or OpenAlex to discover the paper, then use DOI or arXiv id as the final BibTeX retrieval path.
- Bad: copy metadata from DeepXiv or OpenAlex into a hand-written BibTeX entry without DOI / arXiv-level verification.
- Good: use `artifact.create_analysis_campaign(...)` only when a real follow-up slice is needed for a paper-facing claim.
- Bad: use `artifact.create_analysis_campaign(...)` for chores like "polish the introduction" or "find two more citations".
- Boundary: if DeepXiv clustering is good but claim overlap is unclear, continue with citation expansion and source reading instead of stopping at the cluster.
- Boundary: if the strongest cited paper is not on arXiv, use DOI / Crossref / publisher metadata and validate against the source page instead of forcing an arXiv-only path.
- Boundary: if the field is genuinely narrow and `30-50` references is unrealistic, record why the neighborhood is smaller and keep the bibliography high-quality rather than padded.
- Boundary: if DOI metadata and source metadata disagree, keep the discrepancy explicit until resolved instead of silently citing one version.

## Integrity and exit
- do not invent citations, experiments, metrics, method components, or settled claims
- do not treat the experiments section as stable while feasible non-optional matrix rows remain unresolved
- exit only when the draft is evidence-complete enough for `finalize`, a clear evidence gap is recorded, or a packaging/proofing blocker is recorded

## Templates
- use a real template from `templates/` and draft inside `paper/latex/`
- default general ML/AI work to `templates/iclr2026/`
