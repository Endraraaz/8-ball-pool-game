let sprites = {};
let assetsStillLoading = 0;

/**
 * Loads Assets until assetsStillLoading is true.
 */
assetsLoadingLoop = (gameCallback) => {

    if (assetsStillLoading) {
        requestAnimationFrame(assetsLoadingLoop.bind(gameCallback));
    } else {
        requestAnimationFrame(poolGame.mainMenu.load.bind(this.mainMenu));
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

    sprites.mainMenuBackground = loadSprites('menu_bg.png');
    sprites.newGameButton = loadSprites('new_game.png');
    sprites.newGameButtonHover = loadSprites('new_game_hover.png');
    sprites.controlsButton = loadSprites('controls.png');
    sprites.controlsButtonHover = loadSprites('controls_hover.png');
    sprites.resumeGameButton = loadSprites('resume_game.png');
    sprites.resumeGameButtonHover = loadSprites('resume_game_hover.png');
    sprites.backButton = loadSprites('back_button.png');
    sprites.backButtonHover = loadSprites('back_button_hover.png');
    sprites.controlsInstructions = loadSprites('controls_info.png');
    sprites.background = loadSprites('table.png');
    sprites.stick = loadSprites('stick.png');
    sprites.cueBall = loadSprites('cue_ball.png');
    sprites.blackBall = loadSprites('black_ball.png');
    sprites.yellowBall = loadSprites('yellow_ball.png');
    sprites.redBall = loadSprites('red_ball.png');

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
