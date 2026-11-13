const express = require('express');
const path = require('path');
const ActionRepository = require('./src/repositories/actionRepository');
const ActionService = require('./src/services/actionService');

const app = express();
const port = 3000;

const repository = new ActionRepository(path.join(__dirname, 'commu.db'));
const actionService = new ActionService(repository);

app.use(express.json());

app.get('/api/actions/:actionId', (req, res) => {
    const decision = actionService.getDecision(req.params.actionId);
    res.json(decision ?? null);
});

app.put('/api/actions/:actionId', (req, res) => {
    const decision = actionService.saveDecision(
        req.params.actionId,
        req.body && req.body.decision
    );
    res.json(decision);
});

const publicFiles = new Set([
    'index.html',
    'issue.html',
    'summary.html',
    'notifications.html',
    'actions.html',
    'question.html',
    'styles.css'
]);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/:file', (req, res, next) => {
    if (!publicFiles.has(req.params.file)) {
        return next();
    }

    res.sendFile(path.join(__dirname, 'public', req.params.file));
});

app.use((err, req, res, next) => {
    if (err instanceof ActionService.ValidationError) {
        return res.status(400).json({ error: err.message });
    }

    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Invalid JSON body.' });
    }

    console.error(err);
    res.status(500).json({ error: 'Could not process the request.' });
});

app.listen(port, () => {
    console.log(`Commu is running at http://localhost:${port}`);
});