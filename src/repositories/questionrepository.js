class qr {
    constructor(daba) {
        this.daba = daba;
    }


    getSampleForIssue(iId) {
        return this.daba.prepare(`
            SELECT id, issue_id, example_question, answer_label, answer_text,
                references_text, link_url, link_label
            FROM question_samples
            WHERE issue_id = ?
            ORDER BY id
            LIMIT 1
        `).get(iId);
    }
}


module.exports = qr;
