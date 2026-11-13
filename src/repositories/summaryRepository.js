class SummaryRepository {
    constructor(db) {
        this.db = db;
    }

    getSummaryForIssue(issueId) {
        return this.db.prepare(`
            SELECT issue_id, dashboard_text, detail_text
            FROM summaries
            WHERE issue_id = ?
        `).get(issueId);
    }
}

module.exports = SummaryRepository;