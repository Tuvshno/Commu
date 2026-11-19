class ProjectRepository {
    constructor(db) {
        this.db = db;
    }

    getProjects() {
        return this.db.prepare('SELECT id, name, description FROM projects ORDER BY id').all();
    }

    getProject(projectId) {
        return this.db.prepare('SELECT id, name, description FROM projects WHERE id = ?').get(projectId);
    }
}

module.exports = ProjectRepository;
