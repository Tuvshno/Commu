class NotificationRepository {
    constructor(db) {
        this.db = db;
    }

    getNotificationsForIssue(issueId) {
        return this.db.prepare(`
            SELECT id, issue_id, source, title, author, time_label, body, link_url, link_label
            FROM notifications
            WHERE issue_id = ?
            ORDER BY display_order
        `).all(issueId);
    }
}

module.exports = NotificationRepository;