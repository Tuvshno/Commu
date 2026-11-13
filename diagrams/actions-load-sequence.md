# Actions: Load Suggestions and Decisions Sequence Diagram

This is the successful load flow. Decision lookup is repeated for each
suggested action returned for the requested issue.

```mermaid
sequenceDiagram
    actor User
    participant UI as Actions page
    participant API as Express API
    participant IssueService
    participant IssueRepo as IssueRepository
    participant Service as ActionService
    participant Repo as ActionRepository
    participant DB as SQLite

    User->>UI: Open or reload actions for an issue
    UI->>API: GET /api/issues/:issueId/actions
    API->>IssueService: getIssue(issueId)
    IssueService->>IssueService: Validate issue ID
    IssueService->>IssueRepo: getIssue(issueId)
    IssueRepo->>DB: Read issue
    DB-->>IssueRepo: Issue
    IssueRepo-->>IssueService: Issue
    IssueService-->>API: Issue
    API->>Service: getActionsForIssue(issue.id)
    Service->>Repo: getActionsForIssue(issue.id)
    Repo->>DB: Read ordered suggested actions
    DB-->>Repo: Action rows
    Repo-->>Service: Actions
    Service-->>API: Actions
    API-->>UI: JSON actions
    loop For each suggested action
        UI->>UI: Render action and disable buttons
        UI->>API: GET /api/actions/:actionId
        API->>Service: getDecision(actionId)
        Service->>Repo: actionExists(actionId)
        Repo->>DB: Look up suggested action
        DB-->>Repo: Action exists
        Repo-->>Service: true
        Service->>Repo: getDecision(actionId)
        Repo->>DB: Read decision
        DB-->>Repo: Decision row or no row
        Repo-->>Service: Decision or undefined
        Service-->>API: Decision or undefined
        API-->>UI: JSON decision or null
        alt Decision exists
            UI-->>User: Show decision and disable buttons
        else No decision exists
            UI-->>User: Enable confirm and deny buttons
        end
    end
```

If no actions are returned, the page displays an empty-state message. If
loading actions or a decision fails, the page displays an error; decision
buttons remain disabled when their state cannot be loaded.
