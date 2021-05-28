/**
 * Initializes the Game Environment and runs Game Engine.
 */
class PoolGame {
    constructor() {
        this.mainMenu = new Menu();
        this.gameEnvironment = undefined;
    };

    /**
     * Initializes game environment and executes game menu. 
     */
    init = () => {

        this.initMenu();
        this.gameEnvironment = new GameEnvironment();
        this.gameEnvironment.cueBall.position = new Vector(413, 413);
        this.gameRules = new GameRules();
    };

    /**
     * Runs game engine.
     */
    start = () => {

        this.init();
        this.gameEngine();
        // this.gameRules = new GameRules();

    };

    /**
     * Provides functions to run in game engine.
     */
    gameEngine = () => {

        if (!GAME_STOPPED) {
            canvas.clear();
            poolGame.gameEnvironment.update();
            poolGame.gameEnvironment.draw();
            mouse.reset();
            poolGame.inGameKeyboardControl();

            requestAnimationFrame(poolGame.gameEngine);
        };

    };

    /**
     * Provides game menu properties and initializes the menu.
     * @param {boolean} inGame Provides game state i.e. running mode or fresh start.
     */
    initMenu = (inGame) => {

        let labels = generateMainMenuLabels("8-Ball Pool Game");

        let buttons = generateMainMenuButtons(inGame);

        poolGame.mainMenu.init(sprites.mainMenuBackground, labels, buttons);

    };

    /**
     * Provides keyboard control to exit to menu in game running state. 
     */
    inGameKeyboardControl = () => {

        if (keyboard.down(KEYS.escape)) {
            GAME_STOPPED = true;
            this.initMenu(true);

            requestAnimationFrame(poolGame.mainMenu.load.bind(poolGame.mainMenu));
        };
    };

    /**
     * Resumes game from pause state.
     */
    resumeGame = () => {

        canvas.canvas.style.cursor = "auto";

        requestAnimationFrame(poolGame.gameEngine);
    };

};

let poolGame = new PoolGame();
