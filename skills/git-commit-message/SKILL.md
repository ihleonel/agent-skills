---
name: git-commit-message
description: "Generate detailed and structured git commit messages from staged changes. Use when: you need to write a commit, you want to follow Conventional Commits, you have staged changes and need to describe them clearly."
argument-hint: "optional context or purpose of the change"
---

# Git Commit Message

Generates detailed, structured, and consistent commit messages based on the currently staged files.

## Procedure

1. **Read the staged changes** by running:
   ```
   git diff --staged
   ```

2. **Analyze the changes** identifying:
   - Which files were modified and their type (feature, fix, refactor, docs, chore, etc.)
   - What the main impact of the change is
   - Whether changes span multiple areas (consider splitting into several commits)

3. **Write the message** following the Conventional Commits format:

   ```
   <type>: <short description in imperative>

   <optional body: what changed and why, not how>

   <optional footer: breaking changes, closed issues>
   ```

4. **Valid types:**

   | Type | When to use |
   |------|-------------|
   | `feat` | New functionality |
   | `fix` | Bug fix |
   | `refactor` | Code change without feat or fix |
   | `docs` | Documentation only |
   | `chore` | Build, dependencies, configuration |
   | `test` | New or modified tests |
   | `style` | Formatting, whitespace (no logic) |
   | `perf` | Performance improvement |

5. **Writing rules:**
   - Subject line: max 72 characters, imperative mood ("add", "fix", "update"), no trailing period
   - Body: explain the **why**, not the how; separated from subject by a blank line
   - If there are breaking changes, add `BREAKING CHANGE:` in the footer

6. **Present the final message** as a ready-to-run command the user can copy directly:

   ```
   git commit -m "<type>: <short description>"
   ```

   If there is ambiguity about the type, ask before finalizing.

## Example output

```
git commit -m "feat: add git-commit-message skill with conventional commits format"
```
