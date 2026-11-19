# Security and Privacy

## Principles
- Privacy by default.
- Least privilege.
- No unnecessary data collection.
- No hidden functionality.
- No unnecessary network access.

## Android
- Request permissions only when needed and explain their purpose.
- Do not request camera, microphone, contacts, SMS, location, accessibility, notification access, or file access for ordinary calculator functionality.
- Do not hide app behavior from users.
- Do not bypass Android security controls.

## Dependencies
- Review dependencies before installation.
- Prefer maintained packages from trusted sources.
- Avoid executing remote scripts without inspecting them.
- Keep dependencies updated appropriately.

## Data
- Do not store sensitive information.
- Keep calculator history local.
- Never hardcode API keys or credentials.
- Avoid transmitting calculation data.

## Review
Before release, inspect AndroidManifest.xml, permissions, dependency list, network behavior, and build configuration.
