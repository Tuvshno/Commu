CREATE TABLE IF NOT EXISTS suggested_actions (
    action_id TEXT PRIMARY KEY,
    issue_id INTEGER NOT NULL REFERENCES issues(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    evidence TEXT NOT NULL,
    preview_label TEXT NOT NULL,
    preview_text TEXT NOT NULL,
    confirm_label TEXT NOT NULL,
    display_order INTEGER NOT NULL,
    UNIQUE (issue_id, display_order)
);

INSERT OR IGNORE INTO suggested_actions
    (action_id, issue_id, title, description, evidence, preview_label, preview_text, confirm_label, display_order)
VALUES
    ('investigate', 18, 'Create a task to investigate the data retrieval flow',
     'Recommended first: trace the response through PR #12 to find where repository information stops reaching the dashboard.',
     'Context: GitHub PR #12 changed retrieval logic; Jordan and Maya report a response mapping problem in Slack.',
     'Proposed GitHub task:', '“Trace repository response from PR #12 to dashboard” · Assigned to Alex · Linked to Issue #18.',
     'Confirm — Create task', 1),
    ('update', 18, 'Share an investigation update with the team',
     'Keep the team informed about the suspected cause and who is investigating it.',
     'Context: Alex, Jordan, and Sam are discussing the empty dashboard in Slack.',
     'Proposed Slack message:', '“Issue #18: the repository connects, but dashboard data is missing. Alex is investigating the retrieval flow changed in PR #12. The cause is not yet confirmed.”',
     'Confirm — Post update', 2),
    ('email', 18, 'Reply to the project lead about the demo',
     'Acknowledge the demo blocker and explain the next step without promising a fix date.',
     'Context: the project lead’s email asks the team to investigate before the next demo.',
     'Proposed email reply:', '“We are investigating Issue #18. Alex is checking how repository data reaches the dashboard after the changes in PR #12. We will share a further update once the cause is verified.”',
     'Confirm — Send reply', 3);
