# Baseline Plan Template

Use this when the `baseline` stage becomes concrete enough to act.
Keep it short when the route is simple.
For fast-path attach/import/prebound validation, a one-screen plan is enough if it preserves the route, command path, outputs, acceptance condition, core metric contract scope, and fallback.
Expand the optional sections only when the route is ambiguous, code-touching, broken, or intended for reuse beyond the current quest.

## 1. Context

- parent_map_node:
- loop_id:
- node_objective:
- success_condition:

## 2. Core Contract

- quest goal:
- user's core requirements:
- non-negotiable user constraints:
- chosen baseline route:
  - attach / import / verify-local-existing / reproduce / repair
- baseline id:
- source paper:
- source repo:
- source commit / version / tag:
- task:
- dataset / split:
- core metric contract scope:
- expected command path:
- expected outputs:
- acceptance condition:
- cheapest fallback:

## 3. Current Node Tasks

- [ ] confirm the concrete baseline route
- [ ] validate the command path or justify skipping smoke
- [ ] launch or verify the real validation path
- [ ] record the node outcome and next edge if the route changed

## 4. Execution Path

- working directory:
- environment plan:
- required downloads:
- hardware assumptions:
- smoke test needed:
  - yes / no
- smoke command:
- main validation or run command:
- expected runtime / budget:
- durable log path:
- verification targets:
- fastest failure signal:

## 5. Risks And Revision

- main risks:
- when to escalate from fast path to full audit:
- revision note:

## 6. Checklist Link

- checklist path:
- which item should move next:
