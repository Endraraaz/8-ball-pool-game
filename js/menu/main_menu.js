/**
 * Generates and saves labels to be displayed in menu in an array.
 * @param {string} headerText Provides string value to label.
 * @returns Array of menu labels.
 */
generateMainMenuLabels = (headerText) => {

    let labels = [new Label(headerText, new Vector(150, 30), new Vector(), "white", "left", "Bookman", "100px")];

    return labels;
};

/**
 * Generates and saves buttons to be displayed in menu in an array.
 * @param {boolean} inGame Provides boolean value to check the game state whether fresh start or pause mode. 
 * @returns Array of menu buttons.
 */
generateMainMenuButtons = (inGame) => {

    let buttons = [];

    let addYPosition = 0;

    if (inGame) {
        addYPosition = 200;
        buttons.push(
            // Resume button
            new Button
                (
                    sprites.resumeGameButton,
                    new Vector(200, 200),
                    () => {
                        poolGame.mainMenu.active = false;
                        GAME_STOPPED = false;
                        setTimeout(poolGame.resumeGame, 200);
                    },
                    sprites.resumeGameButtonHover
                )
        );
    };

    // Back button
    let backButton = new Button(
        sprites.backButton,
        new Vector(100, 150),
        () => {
            poolGame.mainMenu.labels = generateMainMenuLabels("8-Ball Pool Game");
            poolGame.mainMenu.buttons = generateMainMenuButtons(inGame);
        },
        sprites.backButtonHover
    );

    buttons = buttons.concat([
        new Button(
            // New Game button
            sprites.newGameButton,
            new Vector(200, addYPosition + 200),
            () => {
                poolGame.mainMenu.active = false;
                GAME_STOPPED = false;
                setTimeout(poolGame.start, 200);
            },
            sprites.newGameButtonHover
        ),
        new Button(
            // Controls button
            sprites.controlsButton,
            new Vector(200, addYPosition + 400),
            () => {
                poolGame.mainMenu.labels = generateMainMenuLabels("Game Controls");
                mouse.reset();
                poolGame.mainMenu.buttons = [
                    new Button(
                        sprites.controlsInstructions,
                        new Vector(200, 150),
                        () => {
                            poolGame.mainMenu.active = true;
                            GAME_STOPPED = false;
                        },
                        sprites.controlsInstructions
                    ),
                    // Back button
                    backButton
                ];
            },
            sprites.controlsButtonHover
        )
    ]);

    return buttons;
};
