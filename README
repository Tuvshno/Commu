# Commu:

To run
-  Install Node.js
- `npm install` to install dependencies


To run the server:
- `node server.js`

Open http://localhost:3000 in the browser to see the website running.

The architecture separates two responsibilities:
- Service: Handles the business logic
- Repository: Handles database access—SQL queries that save and retrieve decisions.

server.js runs and handles the server.

COMMU DB MOCK DATA:

| Table | Purpose | Fields |
|---|---|---|
| `issues` | Stores issue details | `id`, `title`, `status`, `priority`, `assignee`, `updated_label` |
| `summaries` | Stores short and full issue summaries | `issue_id`, `dashboard_text`, `detail_text` |
| `notifications` | Stores related GitHub, Slack, and email content | `id`, `issue_id`, `source`, `title`, `author`, `time_label`, `body`, `link_url`, `link_label`, `display_order` |
| `issue_source_counts` | Stores dashboard counts for each source | `issue_id`, `source`, `item_count` |
| `question_samples` | Stores sample questions and fixed answers | `id`, `issue_id`, `example_question`, `answer_label`, `answer_text`, `references_text`, `link_url`, `link_label` |
| `action_decisions` | Stores Confirm/Deny choices | `action_id`, `decision` |