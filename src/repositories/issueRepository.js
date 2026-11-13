class IssueRepository {
    constructor(db) {
        this.db = db;
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
