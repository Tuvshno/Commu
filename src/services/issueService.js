class ValidationError extends Error {}
class NotFoundError extends Error {}

class IssueService {
    constructor(repository) {
        this.repository = repository;
    }

    getIssue(issueId) {
        if (!/^\d+$/.test(issueId) || !Number.isSafeInteger(Number(issueId)) || Number(issueId) < 1) {
            throw new ValidationError('Issue ID must be a positive integer.');
        }

        const issue = this.repository.getIssue(Number(issueId));
        if (!issue) {
            throw new NotFoundError('Issue not found.');
        }

        return issue;
    }
}

module.exports = IssueService;
module.exports.ValidationError = ValidationError;
module.exports.NotFoundError = NotFoundError;
