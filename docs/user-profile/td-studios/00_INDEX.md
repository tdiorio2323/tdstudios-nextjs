# 00_INDEX.md  
[Visibility: Private]

## 1. Purpose

This package captures a reusable profile for “Tyler / TD STUDIOS” based solely on this account’s history and instructions. It is designed to be dropped into repos, internal docs, or assistant configs to keep responses consistent, execution-focused, and privacy-respecting.

## 2. Contents

- `00_INDEX.md` – Index, package purpose, navigation, visibility legend.
- `01_EXEC_SUMMARY.md` – Concise overview: identity/roles, domains, skills/tooling, preferences, constraints, goals.
- `02_USER_PROFILE.md` – Canonical profile, including PII handling policy.
- `03_DOMAINS_PROJECTS.md` – Key domains and recurring project categories.
- `04_SKILLS_TOOLING.md` – Evidence-based skills and tooling overview.
- `05_PREFERENCES_GUIDE.md` – Communication and output preferences with Do/Don’t list.
- `06_OUTPUT_STANDARDS.md` – Response standards, docs/CLI conventions, Future-Response Checklist.
- `07_CONSTRAINTS_PRIVACY.md` – Privacy posture, constraints, and risk-handling rules.
- `08_RESPONSE_TEMPLATES.md` – Reusable response templates.
- `09_CHECKLISTS.md` – Checklists for replies, builds, deployment, privacy/compliance, QA.
- `10_PROMPT_LIBRARY.md` – Reusable prompt patterns for this user.
- `11_SYSTEM_INSTRUCTIONS.txt` – System-style instructions for future assistants.
- `12_PROFILE.json` – Machine-readable user profile with visibility flags.
- `12_PROFILE.schema.json` – JSON Schema for `12_PROFILE.json`.
- `CHANGELOG.md` – Version history of this package.

## 3. Visibility Legend

- `[Visibility: Public]` – Safe to expose externally (e.g., marketing copy, high-level positioning).  
- `[Visibility: Private]` – Internal-only; do not expose directly to clients, public sites, or external collaborators without review.

Default is **Private** unless explicitly and repeatedly framed as public-facing. All files in this package are currently marked **Private** by default.

## 4. How to Use (Executable Brief)

[Visibility: Private]

- In a repo:  
  - Place this directory under something like `docs/user-profile/td-studios/`.  
  - Wire `11_SYSTEM_INSTRUCTIONS.txt` or `12_PROFILE.json` into AI/agent configs as the primary behavioral reference.  

- For assistants/agents:  
  - Load `11_SYSTEM_INSTRUCTIONS.txt` as a system message.  
  - Use `05_PREFERENCES_GUIDE.md` + `06_OUTPUT_STANDARDS.md` + `09_CHECKLISTS.md` as operational standards.  
  - Use `10_PROMPT_LIBRARY.md` for fast, aligned prompting.

- For internal collaborators:  
  - Share selectively; all content should be treated as internal by default.  
  - Never expose referral details or internal systems in public-facing contexts unless explicitly requested.