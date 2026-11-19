# Project Agent Instructions

## Project
Build a professional Android calculator application using JavaScript/TypeScript, React, Vite, and Capacitor. The application must function as a normal calculator.

## Skills
Before working on a task, identify and read the relevant project-level skills in `.agents/skills/`.
- UI/UX: ui-ux-pro-max, frontend-design, design, design-system, ui-styling
- Capacitor: capacitor-best-practices, capacitor-plugins
- Testing: capacitor-testing, debugging-capacitor
- Security: capacitor-security
- Build and CI: capacitor-ci-cd

Do not read every skill for every task. Read only the relevant skills and their references.

## Workflow
1. Inspect existing files before modifying them.
2. Understand the task and relevant skill instructions.
3. Make a concise plan for complex changes.
4. Implement only what is necessary.
5. Run lint, typecheck, tests, and build where applicable.
6. Review changed files and git diff.
7. Report completed changes, verification results, and remaining issues.

## Design
- Create a deliberate visual identity. Avoid generic AI-generated UI.
- Do not default to gradients, excessive rounded cards, arbitrary icons, or unnecessary decoration.
- Use a consistent typography scale, spacing system, color palette, and component states.
- Prioritize usability, accessibility, responsive layouts, and Android conventions.
- Use UI/UX Pro Max for design research when appropriate.
- Explain design decisions briefly when implementing major UI.

## Engineering
- Use TypeScript where practical.
- Prefer maintainable, modular components.
- Avoid unnecessary dependencies.
- Handle errors and empty states.
- Keep secrets and credentials out of source control.
- Do not modify unrelated files.
- Never overwrite user data without explicit approval.

## Android
- Use Capacitor, not Expo.
- Keep Android permissions minimal and justified.
- Do not implement covert monitoring, stealth functionality, permission bypasses, or collection of private third-party data.
- Any sensitive device functionality must be user-initiated, transparent, and protected by appropriate Android permissions.

## Git
- Review git status before changes.
- Do not commit, push, reset, or delete branches without explicit approval.
- Do not overwrite existing work.
