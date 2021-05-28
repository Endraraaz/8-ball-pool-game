/**
 * Defines the Rules of the Game.
 */
class GameRules {
    constructor() {
        this.turn = 0;
        this.firstCollision = true;
        let player1TotalScore = new Score(new Vector(canvas.canvas.width / 2 - 95, canvas.canvas.height / 2 - 65));
        let player2TotalScore = new Score(new Vector(canvas.canvas.width / 2 + 95, canvas.canvas.height / 2 - 65));

        let player1MatchScore = new Score(new Vector(canvas.canvas.width / 2 - 280, 108));
        let player2MatchScore = new Score(new Vector(canvas.canvas.width / 2 + 230, 108));

        this.players = [new Player(player1MatchScore, player1TotalScore), new Player(player2MatchScore, player2TotalScore)];
        this.foul = false;
        this.scored = false;
        this.won = false;
        this.turnPlayed = false;
        this.validBallsPockettedOnTurn = 0;

        // game over state check
        this.gameOver = false;

        this.topCenterPocketPosition = POCKETS[0];
        this.bottomCenterPocketPosition = POCKETS[1];
        this.topLeftPocketPosition = POCKETS[2];
        this.topRightPocketPosition = POCKETS[3];
        this.bottomLeftPocketPosition = POCKETS[4];
        this.bottomRightPocketPosition = POCKETS[5];

    };

    /**
     * Resets match variables to initial state after match over.
     */
    reset = () => {
        this.turn = 0;
        this.players[0].matchScore.value = 0;
        this.players[0].color = undefined;
        this.players[1].matchScore.value = 0;
        this.players[1].color = undefined;
        this.foul = false;
        this.scored = false;
        this.turnPlayed = false;
        this.won = false;
        this.firstCollision = true;
        this.validBallsPockettedOnTurn = 0;

    };

    /**
     * Displays Player turn.
     */
    drawPlayerTurn = () => {
        canvas.drawText("PLAYER " + (this.turn + 1) + " TURN", new Vector(canvas.canvas.width / 2 + 40, 380), new Vector(230, 0), "#096830", "top", "Impact", "70px");
        this.players[0].matchScore.drawScoreColor(this.players[0].color);
        this.players[1].matchScore.drawScoreColor(this.players[1].color);
    };

    /**
     * Displays Match outcome.
     */
    drawMatchOutcome = () => {
        this.players[0].totalScore.draw();
        canvas.drawText("vs", new Vector(canvas.canvas.width / 2 + 95, canvas.canvas.height / 2 - 65), new Vector(100, 0), "#096830", "top", "Impact", "40px");
        this.players[1].totalScore.draw();
    };

    /**
     * Checks whether two balls colliding commit foul or not and sets foul value to true.
     * Mostly one of the ball is cue ball in this function. 
     * @param {object} ball1 First colliding ball.
     * @param {object} ball2 Second Colliding ball.
     * @returns Exits if no foul is committed.
     */
    checkCollisionValidity = (ball1, ball2) => {
        let currentPlayerColor = this.players[this.turn].color;

        if (this.players[this.turn].matchScore.value === 7 && (ball1.color == COLOR.BLACK || ball2.color == COLOR.BLACK)) {
            this.firstCollision = false;

            return;
        };

        if (!this.firstCollision) {

            return;
        };

        if (currentPlayerColor == undefined && (ball1.color == COLOR.BLACK || ball2.color == COLOR.BLACK)) {
            this.foul = true;
            this.firstCollision = false;

            return;
        };

        if (currentPlayerColor == undefined) {
            this.firstCollision = false;

            return;
        };

        if (ball1.color == COLOR.WHITE) {
            if (ball2.color !== currentPlayerColor) {
                this.foul = true;
            };
            this.firstCollision = false;
        };

        if (ball2.color == COLOR.WHITE) {
            if (ball1.color !== currentPlayerColor) {
                this.foul = true;
            };
            this.firstCollision = false;
        };

    };

    /**
     * Checks whether the pocketted ball is valid or not.
     * @param {object} ball Provides ball properties of the ball which is pocketted.
     */
    checkValidityOfBallInPocket = (ball) => {
        let currentPlayer = this.players[this.turn];
        let secondPlayer = this.players[(this.turn + 1) % 2];

        if (currentPlayer.color == undefined) {
            if (ball.color === COLOR.RED) {
                currentPlayer.color = COLOR.RED;
                secondPlayer.color = COLOR.YELLOW;
            } else if (ball.color === COLOR.YELLOW) {
                currentPlayer.color = COLOR.YELLOW;
                secondPlayer.color = COLOR.RED;
            } else if (ball.color === COLOR.BLACK) {
                this.won = true;
                this.foul = true;
            } else if (ball.color === COLOR.WHITE) {
                this.foul = true;
            }
        };

        if (currentPlayer.color === ball.color) {
            currentPlayer.matchScore.increment();
            this.scored = true;
            this.validBallsPockettedOnTurn++;

        } else if (ball.color === COLOR.WHITE) {

            if (currentPlayer.color != undefined) {
                this.foul = true;

                let ballsSet = poolGame.gameEnvironment.getBallSetsByColor(currentPlayer.color);

                let allBallsInPocket = true;

                for (let i = 0; i < ballsSet.length; i++) {
                    if (!ballsSet[i].inPocket) {
                        allBallsInPocket = false;
                    };
                };

                if (allBallsInPocket) {
                    this.won = true;
                };
            };

        } else if (ball.color === COLOR.BLACK) {

            if (currentPlayer.color == undefined) {
                this.foul = true;
                this.won = true;

            } else if (currentPlayer.color != undefined) {
                let ballsSet = poolGame.gameEnvironment.getBallSetsByColor(currentPlayer.color);

                for (let i = 0; i < ballsSet.length; i++) {
                    if (!ballsSet[i].inPocket) {
                        this.foul = true;
                    };
                };

                this.won = true;
            };

        } else {
            secondPlayer.matchScore.increment();
            this.foul = true;
        };

    };

    /**
     * Switches turn between players.
     */
    switchTurns = () => {
        this.turn++;
        this.turn %= 2;
    };

    /**
     * Updates the outcome at the turn of player.
     * @returns Exits on match won or turn played.
     */
    updateTurnOutcome = () => {

        if (!this.turnPlayed) {

            return;
        };

        if (this.firstCollision == true) {
            this.foul = true;
        };

        if (this.won) {

            poolGame.gameEnvironment.gameOver = true;

            if (!this.foul) {
                this.players[this.turn].totalScore.increment();
                this.reset();
                setTimeout(() => {
                    poolGame.gameEnvironment.reset();
                }, 5000);


            } else {
                this.players[(this.turn + 1) % 2].totalScore.increment();
                this.reset();
                setTimeout(() => {
                    poolGame.gameEnvironment.reset();
                }, 5000);

            };

            return;
        };

        if (!this.scored || this.foul) {
            this.switchTurns();
        };

        this.scored = false;
        this.turnPlayed = false;
        this.firstCollision = true;
        this.validBallsPockettedOnTurn = 0;

        // makes cueball visible again if pocketted
        setTimeout(() => {
            poolGame.gameEnvironment.cueBall.visible = true;
        }, 200);

    };

    /**
     * Checks if cue ball is outside border or not of pool table when placing after ball in hand state.
     * @param {object} position Provides position of cue ball when ball in hand state.
     * @param {object} origin Provides origin of cue ball when ball in hand state.
     * @returns boolean value.
     */
    isOutsideBorder = (position, origin) => {

        return this.isXOutsideLeftBorder(position, origin) || this.isXOutsideRightBorder(position, origin) ||
            this.isYOutsideTopBorder(position, origin) || this.isYOutsideBottomBorder(position, origin);
    };

    isXOutsideLeftBorder = (position, origin) => {

        return (position.x - origin.x) < TABLE.leftX;
    };

    isXOutsideRightBorder = (position, origin) => {

        return (position.x + origin.x) > TABLE.rightX;
    };

    isYOutsideTopBorder = (position, origin) => {

        return (position.y - origin.y) < TABLE.topY;
    };

    isYOutsideBottomBorder = (position, origin) => {

        return (position.y + origin.y) > TABLE.bottomY;
    };

    /**
     * Checks cue ball is inside pocket area or not when placing after ball in hand state.
     * @param {object} position Provides position of cue ball while in ball in hand state.
     * @returns boolean value.
     */
    isInsidePocket = (position) => {

        return this.isInsideTopLeftPocket(position) || this.isInsideTopRightPocket(position) ||
            this.isInsideBottomLeftPocket(position) || this.isInsideBottomRightPocket(position) ||
            this.isInsideTopCenterPocket(position) || this.isInsideBottomCenterPocket(position);
    };

    isInsideTopLeftPocket = (position) => {

        return this.topLeftPocketPosition.distanceFrom(position) < POCKET_RADIUS;
    };

    isInsideTopRightPocket = (position) => {

        return this.topRightPocketPosition.distanceFrom(position) < POCKET_RADIUS;
    };

    isInsideBottomLeftPocket = (position) => {

        return this.bottomLeftPocketPosition.distanceFrom(position) < POCKET_RADIUS;
    };

    isInsideBottomRightPocket = (position) => {

        return this.bottomRightPocketPosition.distanceFrom(position) < POCKET_RADIUS;
    };

    isInsideTopCenterPocket = (position) => {

        return this.topCenterPocketPosition.distanceFrom(position) < (POCKET_RADIUS + 6);
    };

    isInsideBottomCenterPocket = (position) => {

        return this.bottomCenterPocketPosition.distanceFrom(position) < (POCKET_RADIUS + 6);
    };

};