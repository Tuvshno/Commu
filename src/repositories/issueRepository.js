class IssueRepository {
    constructor(db) {
        this.db = db;
    }

    getIssuesForProject(projectId) {
        return this.db.prepare(`
            SELECT issues.*, summaries.dashboard_text,
                COALESCE(github.item_count, 0) AS github_count,
                COALESCE(slack.item_count, 0) AS slack_count,
                COALESCE(email.item_count, 0) AS email_count
            FROM issues
            LEFT JOIN summaries ON summaries.issue_id = issues.id
            LEFT JOIN issue_source_counts AS github
                ON github.issue_id = issues.id AND github.source = 'github'
            LEFT JOIN issue_source_counts AS slack
                ON slack.issue_id = issues.id AND slack.source = 'slack'
            LEFT JOIN issue_source_counts AS email
                ON email.issue_id = issues.id AND email.source = 'email'
            WHERE issues.project_id = ?
            ORDER BY issues.id
        `).all(projectId);
    }

    getIssue(issueId) {
        return this.db.prepare(`
            SELECT issues.*,
                COALESCE((
                    SELECT SUM(item_count)
                    FROM issue_source_counts
                    WHERE issue_id = issues.id
                ), 0) AS source_count
            FROM issues
            WHERE issues.id = ?
        `).get(issueId);
    }
}

module.exports = IssueRepository;
