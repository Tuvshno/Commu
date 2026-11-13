# Actions: Conceptual Class Diagram

This is a problem-level model, not a diagram of JavaScript classes.

```mermaid
classDiagram
    class User
    class Issue {
        issue ID
    }
    class SuggestedAction {
        action ID
        issue ID
        title and description
        evidence and preview
    }
    class Decision {
        action ID
        confirmed or denied
    }

    Issue "1" --> "0..*" SuggestedAction : has
    User --> SuggestedAction : reviews
    User --> Decision : makes
    SuggestedAction "1" --> "0..1" Decision : has latest
```

Sample suggested actions are stored in SQLite and retrieved for an issue.
Decisions are stored by action ID, without user identity or decision history.
User and Decision are concepts, not persisted user accounts or separate
JavaScript classes. No external action is performed.
