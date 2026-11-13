const validActionIds = new Set(['investigate', 'update', 'email']);
const validDecisions = new Set(['confirmed', 'denied']);

class ValidationError extends Error {}

class ActionService {
    constructor(repository) {
        this.repository = repository;
    }

    getDecision(actionId) {
        this.validateActionId(actionId);
        return this.repository.getDecision(actionId);
    }

    saveDecision(actionId, decision) {
        this.validateActionId(actionId);

        if (!validDecisions.has(decision)) {
            throw new ValidationError('Decision must be confirmed or denied.');
        }

        this.repository.saveDecision(actionId, decision);
        return this.repository.getDecision(actionId);
    }

    validateActionId(actionId) {
        if (!validActionIds.has(actionId)) {
            throw new ValidationError('Unknown action.');
        }
    }
}

module.exports = ActionService;
module.exports.ValidationError = ValidationError;