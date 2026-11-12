const test = require('node:test');
const assert = require('node:assert/strict');
const ActionRepository = require('./actionRepository');
const ActionService = require('./actionService');

test('saves and retrieves a valid decision', () => {
    const repository = new ActionRepository(':memory:');

    try {
        const service = new ActionService(repository);
        service.saveDecision('investigate', 'confirmed');

        assert.deepEqual(service.getDecision('investigate'), {
            action_id: 'investigate',
            decision: 'confirmed'
        });
    } finally {
        repository.close();
    }
});

test('rejects invalid actions and decisions', () => {
    const repository = new ActionRepository(':memory:');

    try {
        const service = new ActionService(repository);

        assert.throws(() => service.saveDecision('unknown', 'confirmed'));
        assert.throws(() => service.saveDecision('email', 'maybe'));
        assert.equal(repository.getDecision('email'), undefined);
    } finally {
        repository.close();
    }
});