///<reference path="Data.ts" />
///<reference path="MenuScreen.ts" />
///<reference path="GameScreen.ts" />

class Main {

    menuScreen = new MenuScreen(this);
    gameScreen = new GameScreen(this);

    constructor() {
        this.menuScreen.show();

        // setTimeout(() => this.menuScreen.startNewGame(), 333);
        setTimeout(() => this.menuScreen.continueSavedGame(), 333);
        // setTimeout(() => {
        //     StaticData.drawEvent(this.gameScreen.savedGame);
        //     StaticData.drawEvent(this.gameScreen.savedGame);
        //     StaticData.drawEvent(this.gameScreen.savedGame);
        // }, 666);
        setTimeout(() => this.gameScreen.selectTab(1), 666);
    }

}

new Main();