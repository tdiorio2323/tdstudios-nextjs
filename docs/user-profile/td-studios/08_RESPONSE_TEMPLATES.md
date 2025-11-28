# 08_RESPONSE_TEMPLATES.md  
[Visibility: Private]

## Template A – Architecture / Design Brief

[Visibility: Private]

```markdown
## Architecture / Design Brief – {{project_name}}

### Context
- Brand / Product: {{brand_or_product}}
- Domain Category: {{domain_category}} (e.g., TD Studios site / creator platform / internal hub / packaging system)

### Objectives
- Primary goal:
- Secondary goals:

### Scope
- Core features:
- Tech stack (if known from history):
- Constraints (privacy, behind-the-scenes posture, etc.):

### Deliverables
- File tree:
- Key components / modules:
- Required docs (README, ARCHITECTURE, AGENTS, etc.):

### Notes
- Alignment with existing systems:
- Tentative elements:
```

## Template B – Repo-Ready Deliverable with File Tree

[Visibility: Private]

```markdown
## Repo Package – {{package_name}}

### File Tree
{{file_tree}}

### Files
- {{file_1}} – purpose
- {{file_2}} – purpose

### Instructions
1. Copy this tree into your repo at: `{{target_path}}`.
2. Adjust any placeholders marked `{{...}}`.
3. Run:
   ```bash
   {{cli_command}}
   ```
4. Confirm behavior against acceptance criteria:

- Aligned with profile/output standards.
- No credentials or PII.
- Visibility tags correct where applicable.
```

## Template C – Step-by-Step CLI/API Guide

[Visibility: Private]

```markdown
## CLI/API Guide – {{tool_or_api_name}}

### Prerequisites
- {{prereq_1}}
- {{prereq_2}}

### Steps
1. Run:
   ```bash
   {{command_1}}
   ```
2. Configure:
   ```bash
   {{command_2}}
   ```
3. Verify:
   - Check {{verification_step}}.

### Notes
- Keep all secrets in environment variables or secure storage.
- Do not paste credentials into prompts or public docs.
```

## Template D – Packaging Design Spec

[Visibility: Private]

```markdown
## Packaging Design Spec – {{strain_or_product_name}}

### Format
- Dimensions: {{dimensions}}
- Ratio / orientation: {{ratio_orientation}}
- Print notes: (spot gloss, dieline specifics, etc.)

### Front Design
- Main logo:
- Imagery style (e.g., candy/cereal-inspired, chrome, 3D text, vibrancy level):
- Required text:

### Back / Reverse Design
- Imagery focus:
- Required text (excluding any logos if requested):
- Compliance/other notes (no sensitive or jurisdiction-specific details unless provided).

### Style Notes
- Color direction:
- 3D / gloss notes:
- Brand consistency requirements:
```

## Template E – Promptbook Entry

[Visibility: Private]

```markdown
## Promptbook Entry – {{entry_name}}

### Purpose
- Describe what this prompt is for.

### Prompt
```text
{{prompt_body}}
```

### Usage Notes
- Context: when to use this prompt.
- Inputs: required variables (e.g., repo name, file tree).
- Output expectation: type of artifact (docs, code, packaging layout, etc.).
```