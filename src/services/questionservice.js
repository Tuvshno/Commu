class ve extends Error {}
class nfe extends Error {}


class qs {
    constructor(repository) {
        this.repository = repository;
    }


    getSampleAnswer(iId, questi) {
        if (typeof questi !== 'string' || questi.length > 500 || !questi.trim()) {
            throw new ve('question must contain 1 to 500 characters.');
        }


        const sample = this.repository.getSampleForIssue(iId);
        if (!sample) {
            throw new nfe('No sample answer is available for this issue.');
        }
        return sample;
    }
}


module.exports = qs;
module.exports.ve = ve;
module.exports.nfe = nfe;
module.exports.ValidationError = ve;
module.exports.NotFoundError = nfe;
