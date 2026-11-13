# Actions: Detailed Class Diagram

This describes the current implementation. JavaScript does not enforce the
types shown. `ActionsPage` and `ExpressRoutes` represent functions and routes,
not actual JavaScript classes.

```mermaid
classDiagram
    class ActionsPage {
        +loadActions() Promise
        +createAction(item, index) HTMLElement
        +setupAction(action) void
    }
    class ExpressRoutes {
        +GET /api/issues/:issueId/actions
        +GET /api/actions/:actionId
        +PUT /api/actions/:actionId
    }
    class IssueService {
        +getIssue(issueId) Issue
    }
    class IssueRepository {
        +getIssue(issueId) Issue or undefined
    }
    class ActionService {
        +repository ActionRepository
        +getActionsForIssue(issueId) ActionArray
        +getDecision(actionId) Decision or undefined
        +saveDecision(actionId, decision) Decision
        +validateActionId(actionId) void
    }
    class ActionRepository {
        +db Database
        +getActionsForIssue(issueId) ActionArray
        +actionExists(actionId) boolean
        +getDecision(actionId) Decision or undefined
        +saveDecision(actionId, decision) void
        +close() void
    }
    class SQLite {
        issues table
        suggested_actions table
        action_decisions table
    }

    ActionsPage ..> ExpressRoutes : HTTP requests
    ExpressRoutes ..> IssueService : validates issue
    ExpressRoutes ..> ActionService : calls
    IssueService --> IssueRepository : uses
    IssueRepository --> SQLite : reads
    ActionService --> ActionRepository : uses
    ActionRepository --> SQLite : reads and writes
```

The service receives its repository through its constructor; no formal
repository interface is currently defined. `ActionArray` and `Decision` are
plain JavaScript values, not defined classes. Issue validation is performed by
`IssueService` before the actions listing route invokes `ActionService`.
