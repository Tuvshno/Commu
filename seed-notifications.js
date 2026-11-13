const Database = require('better-sqlite3');
const db = new Database('commu.db');

// source must be lowercase: 'github' | 'slack' | 'email'
const rows = [
  [18, 'github', 'Issue #18', null, null, 'Dashboard does not load repository data after connecting a GitHub repository.', '#github-issue-18', 'View GitHub Issue', 1],
  [18, 'github', 'Pull Request #12', null, null, 'Updated the repository connection and changed how GitHub repository data is retrieved.', '#github-pr-12', 'View Pull Request', 2],
  [18, 'slack', null, 'Alex', '9:32 AM', 'The repository connects correctly but the dashboard is still empty.', null, null, 3],
  [18, 'slack', null, 'Jordan', '9:36 AM', "I'm getting the same thing. I think the response from GitHub isn't being passed to the dashboard.", null, null, 4],
  [18, 'slack', null, 'Sam', '10:05 AM', 'PR #12 changed the retrieval logic. We should probably check that first.', null, null, 5],
  [18, 'slack', null, 'Maya', '10:12 AM', 'The repository request completes, but the dashboard receives an empty list. We should check how the response is mapped.', null, null, 6],
  [18, 'slack', null, 'Alex', '10:20 AM', 'I will trace the response through PR #12 and verify that the repository issues reach the dashboard before the demo.', null, null, 7],
  [18, 'email', 'Dashboard Repository Issue', 'Project Lead', null, 'The repository connection appears successful, but the dashboard is not displaying project information. Please investigate this before the next project demo.', null, null, 8]
];

const insert = db.prepare(`
  INSERT INTO notifications
  (issue_id, source, title, author, time_label, body, link_url, link_label, display_order)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const seed = db.transaction(() => {
  db.prepare('DELETE FROM notifications WHERE issue_id = 18').run();
  rows.forEach(r => insert.run(...r));
});

seed();

console.log(db.prepare('SELECT id, issue_id, source, title, author FROM notifications').all());