class ValidationError extends Error {}

const sources = [
    { key: 'github', label: 'GitHub', unit: 'item' },
    { key: 'slack', label: 'Slack', unit: 'message' },
    { key: 'email', label: 'Email', unit: 'email' }
];

class NotificationService {
    constructor(repository) {
        this.repository = repository;
    }

    getNotificationsForIssue(issueId) {
        if (!/^\d+$/.test(issueId) || !Number.isSafeInteger(Number(issueId)) || Number(issueId) < 1) {
            throw new ValidationError('Issue ID must be a positive integer.');
        }

        const rows = this.repository.getNotificationsForIssue(Number(issueId));

        return sources.map(({ key, label, unit }) => {
            const items = rows.filter(row => row.source === key);
            const noun = unit + (items.length === 1 ? '' : 's');

            return {
                source: label,
                totalLabel: `${items.length} related ${noun}`,
                items
            };
        });
    }
}

module.exports = NotificationService;
module.exports.ValidationError = ValidationError;