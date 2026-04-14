# Baseline Checklist Template

Use this as a living checklist.
Keep it short by default.
For a fast path, complete the core checklist first and expand only if the route becomes complex or unstable.

## Identity

- parent_map_node:
- loop_id:
- baseline id:
- route:
- owner stage:

## Active Frontier

- [ ] next baseline route check is explicit
- [ ] next execution or verification step is explicit
- [ ] next map transition is explicit

## Blocked

- [ ] blockers or unresolved dependencies are recorded here

## Core Gate

- [ ] baseline object and route are explicit
- [ ] dataset / split and core metric contract are explicit enough to judge comparability
- [ ] `PLAN.md` captures the command path, expected outputs, acceptance condition, and fallback when the route is non-trivial
- [ ] smoke decision is explicit
- [ ] real validation/run decision is explicit
- [ ] expected result files and currently required metrics are checked
- [ ] baseline is accepted, blocked, or waived with a durable note

## Closeout

- [ ] concise `1-2` sentence baseline summary written
- [ ] next stage named explicitly
