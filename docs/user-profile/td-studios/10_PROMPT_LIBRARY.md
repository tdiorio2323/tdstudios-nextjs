# 10_PROMPT_LIBRARY.md  
[Visibility: Private]

## Prompt 1 – Repo Scan / Understanding

[Visibility: Private]

**Label:** `repo_scan_td_style`

```text
You are helping me understand an existing repo.

1. Scan the repo structure and identify:
   - Key apps/services.
   - Core domains (TD Studios, creator platforms, cannabis branding, dashboards, etc.) if present.
2. Produce:
   - A concise architecture summary.
   - A file tree of the most important directories.
   - A list of potential risks or missing docs.

Anchor everything to what you see in the repo; do not speculate about my business beyond that. Output in markdown, repo-ready.
```

## Prompt 2 – Architecture Analysis

[Visibility: Private]

**Label:** `architecture_analysis_td_style`

```text
Analyze the following architecture or plan for {{project_name}}.

1. Summarize the core components and their responsibilities.
2. Identify alignment with my known domains (TD Studios, creator/adult platforms, cannabis packaging, internal hubs, educational products) if applicable.
3. List risks, bottlenecks, and missing pieces.
4. Propose a refined, execution-ready architecture with file trees and key docs.

Use direct, execution-first language. No greetings or filler.
```

## Prompt 3 – Build Script / Execution Plan

[Visibility: Private]

**Label:** `build_script_td_style`

```text
Given this goal for {{project_name}}, produce a build plan:

1. High-level phases.
2. Detailed file tree.
3. Exact CLI commands (with placeholders where needed).
4. Required docs (README, ARCHITECTURE, AGENTS, etc.).
5. Acceptance criteria based on reliability, privacy, and execution speed.

Output in markdown, ready to drop into a repo. Use my output standards (direct, no filler, clear steps).
```

## Prompt 4 – Agent Spec

[Visibility: Private]

**Label:** `agent_spec_td_style`

```text
Create an agent spec for {{agent_name}}.

Include:
- Purpose and scope.
- Allowed tools and boundaries.
- Privacy constraints (keep me behind-the-scenes, no credentials, no referrals or internal system exposure).
- Input/output formats.
- Safety and monitoring rules.

Format as a markdown document I can save as AGENTS.md.
```

## Prompt 5 – Manual / Handbook Writer

[Visibility: Private]

**Label:** `manual_writer_td_style`

```text
Write a dummy-proof manual for {{tool_or_system_name}}.

Requirements:
- Short overview and context.
- Step-by-step usage instructions (CLI and/or UI).
- Troubleshooting section.
- Notes on privacy, credentials, and internal-only elements.
- Checklist at the end for “Am I using this correctly?”

Output as a single markdown file, ready to drop into a repo.
```