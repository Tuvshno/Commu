const Database = require('better-sqlite3');

class ActionRepository {
    constructor(filename) {
        this.db = new Database(filename);

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS action_decisions (
                action_id TEXT PRIMARY KEY,
                decision TEXT NOT NULL
            )
        `);
    }

    getActionsForIssue(issueId) {
        return this.db.prepare(`
            SELECT action_id, issue_id, title, description, evidence,
                preview_label, preview_text, confirm_label, display_order
            FROM suggested_actions
            WHERE issue_id = ?
            ORDER BY display_order
        `).all(issueId);
    }

    actionExists(actionId) {
        return this.db.prepare(`
            SELECT 1 FROM suggested_actions WHERE action_id = ?
        `).get(actionId) !== undefined;
    }

    saveDecision(actionId, decision) {
        const statement = this.db.prepare(`
            INSERT INTO action_decisions (action_id, decision)
            VALUES (?, ?)
            ON CONFLICT(action_id) DO UPDATE SET decision = excluded.decision
        `);

        statement.run(actionId, decision);
    }

    getDecision(actionId) {
        return this.db.prepare(`
            SELECT action_id, decision
            FROM action_decisions
            WHERE action_id = ?
        `).get(actionId);
    }

    close() {
        this.db.close();
    }
}

module.exports = ActionRepository;