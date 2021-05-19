class PoolGame {

    init = () => {

        this.gameEnvironment = new GameEnvironment();
    };

    start = () => {

        this.init();
        this.gameEngine();

    };

    gameEngine = () => {

        canvas.clear();
        poolGame.gameEnvironment.update();
        poolGame.gameEnvironment.draw();
        mouse.reset();

        requestAnimationFrame(poolGame.gameEngine);
    };
};

var poolGame = new PoolGame();
