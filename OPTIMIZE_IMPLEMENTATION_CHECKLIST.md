# Optimize Implementation Checklist

## Done

- [x] Add `submission_mode='candidate'|'line'` to `artifact.submit_idea(...)` with default `line`
- [x] Keep `submission_mode='candidate'` branchless and non-promoting
- [x] Allow promotion from candidate to line via `source_candidate_id`
- [x] Register `optimize` as a standard stage skill
- [x] Add the initial `optimize` skill bundle
- [x] Expand `optimize` skill content with candidate / ranking / codegen / plateau / fusion / debug protocols
- [x] Add optimize reference templates
- [x] Patch MCP `submit_idea` tool to expose `submission_mode`
- [x] Implement `artifact.get_optimization_frontier(...)`
- [x] Expose optimization frontier through the artifact MCP namespace
- [x] Update focused tests for candidate mode, optimize skill discovery, and prompt builder support

## Next

- [ ] Refine frontier heuristics from existing ideas / runs / decisions / candidate reports
- [ ] Add guidance for frontier-driven optimization route transitions
- [ ] Expose optimization frontier through workflow/details payloads for the UI
- [ ] Add a lightweight Optimization section in Details
- [ ] Add optimization memory write helpers for success / failure / fusion lessons
- [ ] Patch adjacent stage skills (`idea`, `experiment`, `decision`) more deeply for algorithm-first handoff
- [ ] Add broader regression tests for frontier and optimize-stage route transitions
