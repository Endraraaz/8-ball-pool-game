class Player {
    /**
     * Provides player properties.
     * @param {object} matchScore Provides scores of players in the current match.
     * @param {object} totalScore Provides outcomes of matches.
     */
    constructor(matchScore, totalScore) {
        this.color = undefined;
        this.matchScore = matchScore;
        this.totalScore = totalScore;
    };

};