---
name: structured-commit-push
description: 'Create structured Conventional Commits from the current Git diff and push them safely. Use when preparing commit titles, commit descriptions, release-quality commit messages, or committing and pushing completed changes.'
argument-hint: 'Describe the changes to commit, or ask me to inspect the current diff.'
user-invocable: true
disable-model-invocation: false
---

# Structured Commit And Push

## Purpose

Create clear, reviewable commits from the current repository changes and push them to the configured remote after explicit confirmation.

Use the strongest coding and reasoning model available in the Copilot model picker for commit interpretation. The skill cannot select a model programmatically.

## Procedure

1. Inspect the working tree with `git status --short` and review the complete diff.
2. Separate unrelated changes. Do not stage or commit files that are not part of the requested change.
3. Run the narrowest relevant tests or checks. Report failures before committing.
4. Generate a Conventional Commit title in this format:
   - `type(scope): imperative summary`
   - Keep the title under 72 characters.
   - Use `feat`, `fix`, `test`, `refactor`, `docs`, `build`, `ci`, or `chore` as appropriate.
5. Generate a description with these sections when useful:
   - `What changed`: the concrete implementation changes.
   - `Why`: the behavior or problem motivating the change.
   - `Tests`: commands run and their results.
6. Show the proposed title, description, files to be committed, and test results.
7. Ask for explicit confirmation before staging, committing, or pushing if the user has not already clearly requested those exact operations.
8. Stage only the intended files and create the commit with the approved message.
9. Verify the commit and current branch, then push the current branch to its configured upstream remote.
10. Report the commit hash, branch, push result, and any remaining uncommitted changes.

## Commit Message Template

```text
<type>(<scope>): <imperative summary>

What changed:
- <concrete change>

Why:
- <reason for the change>

Tests:
- <command>: <result>
```

## Safety Rules

- Never use `git reset --hard`, force-push, or rewrite history.
- Never include secrets, generated output, dependencies, or unrelated user changes without confirmation.
- Do not claim a test passed unless it was actually run successfully.
- If the branch has no upstream, report that and ask whether to publish it with `git push -u origin <branch>`.
- If the push is rejected, preserve the commit and explain the next non-destructive step.
