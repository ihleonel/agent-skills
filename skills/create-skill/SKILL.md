---
name: create-skill
description: "Create a new skill for this project (agent-skills). Use when: you want to add a new skill to the repository, you need to create SKILL.md and metadata.json correctly, you want the skill to appear in npm run cli -- list."
argument-hint: "name and purpose of the skill to create"
---

# Create Skill

Creates a new skill in this repository following the structure required by the CLI. **Both files are mandatory**: without `metadata.json` the skill will not appear in the list or be installable.

## Required structure

```
skills/
└── <skill-name>/
    ├── SKILL.md         ← agent instructions (required)
    └── metadata.json    ← CLI metadata (required)
```

## Procedure

### 1. Define the name

- Use `kebab-case`: lowercase letters and hyphens (`git-commit-message`, `create-skill`)
- Must be descriptive and unique within `skills/`
- The folder name **must match** the `name` field in both files

### 2. Create `metadata.json`

Create the file `skills/<skill-name>/metadata.json`:

```json
{
  "name": "<skill-name>",
  "version": "1.0.0",
  "description": "Brief description of what this skill does (max ~120 chars)",
  "tags": ["tag1", "tag2"],
  "author": "agent-skills"
}
```

Rules:
- `name` must match exactly the folder name
- `description` is what the CLI displays in `npm run cli -- list`
- `tags` help categorize and filter skills

### 3. Create `SKILL.md`

Create the file `skills/<skill-name>/SKILL.md` with this format:

```markdown
---
name: <skill-name>
description: "Trigger keywords. Use when: <specific use cases>."
argument-hint: "optional hint for manual invocation"
---

# Skill Title

Intro paragraph: what it does and when to use it.

## Procedure

1. Concrete step with command or action
2. Next step
3. ...

## Example output

(Optional) Example of expected result
```

Rules for `SKILL.md`:
- `name` in the frontmatter must match the folder name
- `description` must include **trigger keywords** so the agent discovers it automatically
- Use the pattern `"Use when: ..."` in the description
- The body must have concrete, actionable steps — not vague descriptions

### 4. Verify

Run to confirm the skill appears correctly:

```bash
npm run cli -- list
npm run cli -- info <skill-name>
```

## Quality checklist

- [ ] Folder created at `skills/<skill-name>/`
- [ ] `metadata.json` exists and `name` matches the folder
- [ ] `SKILL.md` exists with valid YAML frontmatter
- [ ] `name` in both files is identical to the folder name
- [ ] `description` in `SKILL.md` includes trigger keywords
- [ ] Skill appears when running `npm run cli -- list`
