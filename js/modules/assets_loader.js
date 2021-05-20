let sprites = {};
let assetsStillLoading = 0;

/**
 * Loads Assets until assetsStillLoading is true.
 */
assetsLoadingLoop = (gameCallback) => {

    if (assetsStillLoading) {
        requestAnimationFrame(assetsLoadingLoop.bind(gameCallback));
    }
    else {
        gameCallback;
    };
};


/**
 * Loads assets by calling assetsLoadingLoop function
 * @param gameCallback Passes instance of PoolGame class with method start
 */
loadAssets = (gameCallback) => {

    loadSprites = (fileName) => {
        assetsStillLoading++;

        let spriteImage = new Image();
        spriteImage.src = "./assets/images/" + fileName;

        spriteImage.onload = () => {
            assetsStillLoading--;
        };
        return spriteImage;
    };

    sprites.background = loadSprites('board.png');
    sprites.stick = loadSprites('stick.png');
    sprites.cueBall = loadSprites('cue-ball.png');
    sprites.blackBall = loadSprites('black-ball.png');
    sprites.yellowBall = loadSprites('yellow-ball.png');
    sprites.redBall = loadSprites('red-ball.png');

    /**
     * Calls method start in instance of PoolGame class.
     */
    assetsLoadingLoop(gameCallback());

};


/**
 * Selects balls by color and returns its value.
 */
getBallSpritesByColor = (color) => {
    switch (color) {
        case COLOR.RED:
            return sprites.redBall;
        case COLOR.YELLOW:
            return sprites.yellowBall;
        case COLOR.BLACK:
            return sprites.blackBall;
        case COLOR.WHITE:
            return sprites.cueBall;
    };
};
