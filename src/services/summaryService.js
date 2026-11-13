class SummaryService {
    constructor(repository) {
        this.repository = repository;
    }

    getSummaryForIssue(issueId) {
        return this.repository.getSummaryForIssue(issueId);
    }
}

module.exports = SummaryService;