class SavedData {

    static setGameData(gameData: GameData | number) {
        localStorage.setItem("game_data", JSON.stringify(gameData));
    }

    static getGameData(gameData: GameData): GameData {
        return JSON.parse(localStorage.getItem("game_data")) as GameData;
    }

    static getSetting<T>(setting: Setting): T {
        return JSON.parse(localStorage.getItem("setting_" + setting)) as T;
    }

    static setSetting<T>(setting: Setting, value: T) {
        localStorage.setItem("setting_" + setting, JSON.stringify(value));
    }

}

class GameData {

    turn: number;
    eventDeck: Array<EventCard>;
    currentEvents: Array<EventCard> = [];
    eventsDiscard: Array<EventCard> = [];

    bossDeck: Array<BossCard>;
    currentBosses: Array<BossCard> = [];
    bossesDiscard: Array<BossCard> = [];

    swarmDeck: Array<SwarmCard>;
    swarmDiscard: Array<SwarmCard> = [];

    constructor(diff: Difficulty) {
        switch (diff) {
            case "easy":
                this.eventDeck = StaticData.makeEventsEasy();
                break;
            case "medium":
                this.eventDeck = StaticData.makeEventsMedium();
                break;
            case "hard":
                this.eventDeck = StaticData.makeEventsHard();
                break;
        }

        this.bossDeck = StaticData.makeBosses();
        this.swarmDeck = StaticData.makeSwarmDeck();

        Util.shuffle(this.eventDeck);
        Util.shuffle(this.bossDeck);
        Util.shuffle(this.swarmDeck);
    }

    drawEvent() {
        const newEvent = this.eventDeck.splice(0, 1)[0];
        this.currentEvents.push(newEvent);
    }

    drawSwarm() {
        const newSwarm = this.swarmDeck.splice(0, 1)[0];
        this.swarmDiscard.push(newSwarm);
    }

    drawBoss() {
        const newBoss = this.bossDeck.splice(0, 1)[1];
        this.currentBosses.push(newBoss);
    }
}