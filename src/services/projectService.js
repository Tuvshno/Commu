class ValidationError extends Error {}
class NotFoundError extends Error {}

class ProjectService {
    constructor(repository, issueRepository) {
        this.repository = repository;
        this.issueRepository = issueRepository;
    }

    getProjects() {
        return this.repository.getProjects();
    }

    getIssues(projectId) {
        if (!/^\d+$/.test(projectId) || !Number.isSafeInteger(Number(projectId)) || Number(projectId) < 1) {
            throw new ValidationError('Project ID must be a positive integer.');
        }
        const id = Number(projectId);
        if (!this.repository.getProject(id)) {
            throw new NotFoundError('Project not found.');
        }
        return this.issueRepository.getIssuesForProject(id);
    }
}

module.exports = ProjectService;
module.exports.ValidationError = ValidationError;
module.exports.NotFoundError = NotFoundError;
