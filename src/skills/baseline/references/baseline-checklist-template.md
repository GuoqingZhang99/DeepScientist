# Baseline Checklist Template

Use this as a living checklist.
Update it during reading, setup, smoke testing, real execution, verification, and route changes.

## Identity

- baseline id:
- route:
- owner stage:

## Analysis

- [ ] paper source identified
- [ ] repo source identified
- [ ] paper read enough to restate the core method faithfully
- [ ] repo read enough to identify the real entrypoints
- [ ] dataset / split contract confirmed
- [ ] metric contract confirmed
- [ ] main files to inspect or modify listed
- [ ] risks and fallbacks written into `PLAN.md`

## Setup

- [ ] working directory confirmed
- [ ] environment route chosen
- [ ] key dependencies checked
- [ ] model / data download path confirmed
- [ ] fallback source recorded for critical downloads

## Smoke Test

- [ ] smoke command written in `PLAN.md`
- [ ] smoke command executed
- [ ] smoke outputs verified
- [ ] smoke failure handled or route revised

## Main Run

- [ ] real command written in `PLAN.md`
- [ ] real run launched with durable logging
- [ ] monitoring cadence started
- [ ] health signals confirmed
- [ ] any execution deviation reflected back into `PLAN.md`

## Verification

- [ ] expected result files exist
- [ ] metric keys are complete
- [ ] baseline is comparable to the intended contract
- [ ] verification note written
- [ ] baseline accepted or explicitly blocked / waived

## Closeout

- [ ] concise `1-2` sentence baseline summary written
- [ ] next stage named explicitly
