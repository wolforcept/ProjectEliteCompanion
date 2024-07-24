///<reference path="Data.ts" />
///<reference path="MenuScreen.ts" />
///<reference path="GameScreen.ts" />
///<reference path="SetupScreen.ts" />

class Main {

    menuScreen = new MenuScreen(this);
    gameScreen = new GameScreen(this);
    setupScreen = new SetupScreen(this);

    constructor() {
        this.menuScreen.show();

        // setTimeout(() => this.menuScreen.startNewGame(), 333);
        // setTimeout(() => this.menuScreen.startNewGame(), 666);
        // setTimeout(() => this.menuScreen.continueSavedGame(), 333);
        // setTimeout(() => {
        //     StaticData.drawEvent(this.gameScreen.savedGame);
        //     StaticData.drawEvent(this.gameScreen.savedGame);
        //     StaticData.drawEvent(this.gameScreen.savedGame);
        // }, 666);
        // setTimeout(() => this.gameScreen.selectTab(1), 666);
    }

}

new Main();