class Main {

    gameData: GameData;
    audio: AudioManager;
    ui: UiManager;

    constructor() {
        this.audio = new AudioManager();
        this.ui = new UiManager();
        console.log("Starting...")
        this.ui.showMainMenu();
        this.loadSettings();
    }

    loadSettings() {
        const settings: Array<Setting> = ["nr_players", "difficulty", "round_time", "alarm", "alarm_loop"];
        settings.forEach(setting => {
            let prevSetting = SavedData.getSetting(setting);
            if (!prevSetting)
                prevSetting = Settings.getDefault(setting);
            this.ui.setSetting(setting, prevSetting);
        });
    }

    startNewGame() {
        this.gameData = new GameData(SavedData.getSetting<Difficulty>("difficulty"));
        this.save();
        this.phaseInit("event");
        this.ui.resetGame();
    }

    save() {
        SavedData.setGameData(this.gameData);
    }

    onNewEvent() {
        console.log("revealing new event card")
        this.gameData.drawEvent();
        this.ui.setNewEvent(this.gameData.currentEvents[this.gameData.currentEvents.length - 1], SavedData.getSetting<number>("nr_players"));
        this.ui.enableButton("event")
    }

    onNewSwarm() {
        console.log("revealing new swarm card")
        this.gameData.drawSwarm();
        this.ui.setNewEvent(this.gameData.currentEvents[this.gameData.currentEvents.length - 1], SavedData.getSetting<number>("nr_players"));
        this.ui.enableButton("spawn")
    }

    phaseInit(phase: Phase) {

        console.log("Starting Phase: " + phase)
        switch (phase) {

            case "event":
                this.ui.addEventCardToFlip(() => this.onNewEvent());
                break;

            case "spawn":
                // for (let i = 0; i < SavedData.getSetting<number>("nr_players"); i++) {
                    this.ui.addSwarmCardToFlip(() => this.onNewSwarm());
                // }
                break;
        }
    }

    goToNextPhase(fromPhase: Phase) {
        if (this.ui.isButtonDisabled(fromPhase)) return;

        const nextPhase = this.getNextPhase(fromPhase);
        MAIN.ui.showPhase(nextPhase);
        this.phaseInit(nextPhase);

        switch (fromPhase) {
            case "check": {
                this.gameData.turn++;
                this.save();
            }
        }

        this.ui.updateCurrentEvents(nextPhase, this.gameData.currentEvents);
    }

    getNextPhase(fromPhase: Phase): Phase {
        switch (fromPhase) {
            case "event": return "spawn"
            case "spawn": return "boss";
            case "boss": return "action";
            case "action": return "ability";
            case "ability": return "movement";
            case "movement": return "check";
            case "check": return "event";
        }
    }
}

var MAIN: Main;

function onButtonStartGame() {
    MAIN.startNewGame();
}

function onSettingChanged(setting: Setting, value: any) {
    SavedData.setSetting(setting, value)
}

function onButtonNext(fromPhase: Phase) {
    MAIN.goToNextPhase(fromPhase);
}

function makeOnFlipCardClicked(id: string) {
    return () => {
        console.log({ id })
    }
}

$(() => MAIN = new Main());