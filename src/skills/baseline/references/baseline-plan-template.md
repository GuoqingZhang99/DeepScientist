# Baseline Plan Template

Use this when the `baseline` stage becomes concrete enough to act.
Keep it short when the route is simple, but do not skip the sections that affect reproducibility, code touchpoints, or fallback handling.

## 1. Objective

- quest goal:
- user's core requirements:
- non-negotiable user constraints:
- chosen baseline route:
  - attach / import / reproduce / repair
- baseline id:
- variant id:

## 2. Source Package

- source paper:
- source repo:
- fallback repo or mirror:
- source commit / version / tag:
- task:
- dataset / split:
- metric contract:

## 3. Paper And Repo Reading Notes

- paper summary in `1-3` bullets:
- repo summary in `1-3` bullets:
- what the baseline actually does:
- what the likely bottlenecks or brittle points are:
- what still needs verification:

## 4. Code Touchpoints

List the main files or modules that matter before you change anything substantial.

| Path | Role | Why it matters now | Expected action | Notes |
|---|---|---|---|---|
| | | | inspect / modify / leave alone | |

## 5. Environment And Asset Plan

- working directory:
- environment plan:
- required downloads:
- checkpoints / models:
- hardware assumptions:
- likely external blockers:

Fallbacks and contingency options:

- if Hugging Face is slow, blocked, or rate-limited:
  - try ModelScope, official mirrors, quest-local caches, or manually staged files
- if the official repo is unavailable:
  - use a verified mirror and record the exact provenance
- if the full run is too expensive:
  - define the smoke-test path and the cheapest comparable reduced pilot

## 6. Execution Strategy

### Smoke Test

- command:
- purpose:
- expected outputs:
- fastest failure signal:

### Main Run

- command:
- expected outputs:
- expected runtime / budget:
- durable log path:
- safe efficiency levers to try first:

### Monitoring And Sleep Rules

- first checks:
  - `60s`
  - `120s`
  - `300s`
  - `600s`
  - `1800s`
- health signals that justify continued monitoring rather than intervention:
- conditions that require plan revision or kill-and-relaunch:

## 7. Verification Plan

- required result files:
- required metric keys:
- comparability checks:
- acceptance condition:
- downgrade / blocked condition:

## 8. Checklist Link

- checklist path:
- which item should move next:

## 9. Revision Log

| Time | What changed | Why it changed | Impact on execution |
|---|---|---|---|
| | | | |
