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