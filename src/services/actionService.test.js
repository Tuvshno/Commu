const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ActionRepository = require('../repositories/actionRepository');
const ActionService = require('./actionService');

const seed = fs.readFileSync(path.join(__dirname, '..', '..', 'database-seed-actions.sql'), 'utf8');

function createRepository() {
    const repository = new ActionRepository(':memory:');
    repository.db.exec('CREATE TABLE issues (id INTEGER PRIMARY KEY); INSERT INTO issues VALUES (18);');
    repository.db.exec(seed);
    return repository;
}

test('loads ordered mock actions from the database for the requested issue', () => {
    const repository = createRepository();
    try {
        const service = new ActionService(repository);
        assert.deepEqual(service.getActionsForIssue(18).map(action => action.action_id),
            ['investigate', 'update', 'email']);
        assert.deepEqual(service.getActionsForIssue(19), []);
        repository.db.prepare('UPDATE suggested_actions SET title = ? WHERE action_id = ?')
            .run('Updated database title', 'update');
        assert.equal(service.getActionsForIssue(18)[1].title, 'Updated database title');
    } finally {
        repository.close();
    }
});

test('saves and retrieves a decision and rejects invalid input', () => {
    const repository = createRepository();
    try {
        const service = new ActionService(repository);
        assert.deepEqual(service.saveDecision('investigate', 'confirmed'),
            { action_id: 'investigate', decision: 'confirmed' });
        assert.deepEqual(service.getDecision('investigate'),
            { action_id: 'investigate', decision: 'confirmed' });
        assert.throws(() => service.saveDecision('unknown', 'confirmed'), ActionService.ValidationError);
        assert.throws(() => service.saveDecision('email', 'maybe'), ActionService.ValidationError);
        assert.equal(service.getDecision('email'), undefined);
    } finally {
        repository.close();
    }
});

test('seeding again preserves decisions and existing action content', () => {
    const repository = createRepository();
    try {
        repository.saveDecision('update', 'denied');
        repository.db.prepare('UPDATE suggested_actions SET title = ? WHERE action_id = ?')
            .run('Custom title', 'update');
        repository.db.exec(seed);
        assert.equal(repository.getDecision('update').decision, 'denied');
        assert.equal(repository.getActionsForIssue(18)[1].title, 'Custom title');
        assert.equal(repository.getActionsForIssue(18).length, 3);
    } finally {
        repository.close();
    }
});
