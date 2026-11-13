# Suggested Action Decision: Sequence Diagram

This diagram describes a successful confirm or deny request. The application
records a decision; it does not send a message or create an external task.

```mermaid
sequenceDiagram
    actor User
    participant UI as Actions page
    participant API as Express API
    participant Service as ActionService
    participant Repo as ActionRepository
    participant DB as SQLite

    User->>UI: Confirm or deny an action
    UI->>API: PUT /api/actions/:actionId with decision
    API->>Service: saveDecision(actionId, decision)
    Service->>Repo: actionExists(actionId)
    Repo->>DB: Look up suggested action
    DB-->>Repo: Action exists
    Repo-->>Service: true
    Service->>Service: Validate decision
    Service->>Repo: saveDecision(actionId, decision)
    Repo->>DB: Insert or update action_decisions
    Service->>Repo: getDecision(actionId)
    Repo->>DB: Read saved decision
    DB-->>Repo: Decision row
    Repo-->>Service: Decision
    Service-->>API: Decision
    API-->>UI: JSON response
    UI-->>User: Show saved result
```

An unknown action ID or invalid decision produces a validation error. The
page displays an error if saving fails. The API permits updating an existing
decision, even though the page disables the buttons after a successful save.
