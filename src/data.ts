type Difficulty = "easy" | "medium" | "hard";
const difficulties: Array<Difficulty> = ["easy", "medium", "hard"];

type Phase = "event" | "spawn" | "action" | "activation";
const phases: Array<Phase> = ["event", "spawn", "action", "activation"];

interface BossCard {
    id: number;
    name: string;
    health: number;
    movement: number | string;
    activate: boolean;
    rules: string;
}

interface EventCard {
    id: number;
    simple: boolean;
    name: string;
    rules: string;
    highlightPhase?: Phase | "all";
    icons?: Array<string>;
}

type AlienType = "Shooter" | "Biter" | "Runner";

interface SwarmCard {
    id: number;
    alienType: AlienType;
    number: number;
    location: number;
    activate: boolean;
}

// ██▀ █ █ ██▀ █▄ █ ▀█▀    ▄▀▀ ▄▀▄ █▀▄ █▀▄ ▄▀▀ 
// █▄▄ ▀▄▀ █▄▄ █ ▀█  █     ▀▄▄ █▀█ █▀▄ █▄▀ ▄█▀ 

const event1: EventCard = {
    id: 1, simple: false, name: "Speedy Spawn", icons: ["wrench", "wrench", "hand", "gun", "hand", "gun"], highlightPhase: "activation",
    rules: "At the end of the Alien Ability step, all aliens in a spawn point move 2 spaces.",
};
const event2: EventCard = {
    id: 2, simple: false, name: "Exhaustion", icons: ["gun", "gun", "gun", "search", "gun", "search"], highlightPhase: "all",
    rules: "Hero's special abilities have no effect.",
};
const event3: EventCard = {
    id: 3, simple: false, name: "Shell Shock", icons: ["wrench", "wrench", "gun", "wrench", "gun", "wrench"], highlightPhase: "activation",
    rules: "At the beginning of the Alien Ability step, each hero suffers 1 damage.",
};
const event4: EventCard = {
    id: 4, simple: false, name: "Proxy Horde", icons: ["search", "wrench", "hand", "gun", "hand", "gun"], highlightPhase: "activation",
    rules: "During the Alien Activation phase add +1 to all aliens movement value.",
};
const event5: EventCard = {
    id: 5, simple: false, name: "Limited Equipments", icons: ["search", "search", "search", "search", "search", "search"], highlightPhase: "action",
    rules: "Heroes may not perform Search Actions or draw Alien Tech cards.",
};
const event6: EventCard = {
    id: 6, simple: false, name: "Sudden Attack", icons: ["hand", "hand", "wrench", "hand", "wrench", "hand"], highlightPhase: "activation",
    rules: "All aliens have an additional ability: \"Roll 1 Hit Die for each hero within range 1: each hero suffers 1 damage on 4+.\"",
};
const event7: EventCard = {
    id: 7, simple: false, name: "Proxies in Haste", icons: ["hand", "gun", "search", "wrench", "search", "wrench"], highlightPhase: "activation",
    rules: "Before the Alien Ability step, all aliens move 1 space.",
};
const event8: EventCard = {
    id: 8, simple: false, name: "Watch out for Bosses", icons: ["wrench", "hand", "gun", "search", "gun", "search"], highlightPhase: "spawn",
    rules: "At the end of the spawning phase, reveal 1 additional Boss Spawn card.",
};
const event9: EventCard = {
    id: 9, simple: false, name: "Large Numbers", icons: ["wrench", "wrench", "wrench", "wrench", "wrench", "wrench"], highlightPhase: "spawn",
    rules: "During the spawning phase, whenever you spawn a swarm, spawn 1 additional figure of that type.",
};
const event10: EventCard = {
    id: 10, simple: false, name: "Abrupt Shots", icons: ["hand", "hand", "hand", "gun", "hand", "gun"], highlightPhase: "activation",
    rules: "All aliens have an additional ability: \"Roll 1 Hit Die for each hero within range 3: each hero suffers 1 damage on 4+.\"",

};
const event11: EventCard = {
    id: 11, simple: false, name: "Out of Time", icons: ["wrench", "wrench", "hand", "hand", "hand", "hand"], highlightPhase: "action",
    rules: "The Action phase lasts 20 seconds less."
};
const event12: EventCard = {
    id: 12, simple: false, name: "Enraged Spawn", icons: ["hand", "hand", "search", "search", "search", "search"], highlightPhase: "spawn",
    rules: "All Swarm Spawn cards have <img class=\"inText\" src=\".\\assets\\images\\light\\danger.svg\">.",
};
const event13: EventCard = {
    id: 13, simple: false, name: "Overwhelmed", icons: ["gun", "search", "search", "wrench", "search", "wrench"], highlightPhase: "spawn",
    rules: "Before the spawning phase, each hero must move 3 spaces following the alien path.",
};
const event14: EventCard = {
    id: 14, simple: false, name: "Rampant Mutation", icons: ["wrench", "wrench", "wrench", "hand", "wrench", "hand"], highlightPhase: "spawn",
    rules: "At the end of the spawning phase, all bosses gain 3 health.",
};
const event15: EventCard = {
    id: 15, simple: false, name: "Endless Threat", icons: ["hand", "hand", "gun", "gun", "gun", "gun"], highlightPhase: "spawn",
    rules: "At the end of the spawning phase, spawn an additional Swarm Spawn card.",
};
const event16: EventCard = {
    id: 16, simple: false, name: "Toxic Proxies", icons: ["hand", "hand", "wrench", "wrench", "wrench", "wrench"], highlightPhase: "spawn",
    rules: "At the end of the spawning phase, select 3 different aliens and place 1 acid token adjacent to each alien, following the alien path."
};
const event17: EventCard = {
    id: 17, icons: ["smile"], name: "No Effect", simple: true,
    rules: ""
};
const event18: EventCard = {
    id: 18, icons: ["smile"], name: "No Effect", simple: true,
    rules: ""
};
const event19: EventCard = {
    id: 19, icons: ["smile"], name: "No Effect", simple: true,
    rules: ""
};
const event20: EventCard = {
    id: 20, icons: ["smile"], name: "No Effect", simple: true,
    rules: ""
};
const event21: EventCard = {
    id: 21, icons: ["smile"], name: "No Effect", simple: true,
    rules: ""
};
const event22: EventCard = {
    id: 22, simple: true, icons: ["alien_move", "alien_move", "alien_move"], name: "Sudden Movement",
    rules: "Move any aliens a total of 3 spaces combined."
};
const event23: EventCard = {
    id: 23, simple: true, icons: ["alien_move", "alien_move", "alien_move"], name: "Sudden Movement",
    rules: "Move any aliens a total of 3 spaces combined."
};
const event24: EventCard = {
    id: 24, simple: true, icons: ["alien"], name: "Swarm Rush",
    rules: "Immediately reveal and resolve an additional swarm spawn card."
};
const event25: EventCard = {
    id: 25, simple: true, icons: ["boss"], name: "Boss Rush",
    rules: "Immediately reveal and resolve an additional boss spawn card."
};

const events1to16 = [event1, event2, event3, event4, event5, event6, event7, event8, event9, event10, event11, event12, event13, event14, event15, event16];

// ▄▀▀ █   █ ▄▀▄ █▀▄ █▄ ▄█    ▄▀▀ ▄▀▄ █▀▄ █▀▄ ▄▀▀ 
// ▄█▀ ▀▄▀▄▀ █▀█ █▀▄ █ ▀ █    ▀▄▄ █▀█ █▀▄ █▄▀ ▄█▀ 

const alarms = ["alarm_1", "alarm_3", "bell_1", "bell_3", "siren_2", "siren_4", "alarm_2", "alarm_4", "bell_2", "siren_1", "siren_3", "siren_5"];
const swarmCards: Array<SwarmCard> = [
    { id: 1, alienType: "Shooter", number: 2, location: 1, activate: true },
    { id: 2, alienType: "Shooter", number: 2, location: 2, activate: true },
    { id: 3, alienType: "Shooter", number: 2, location: 3, activate: true },
    { id: 4, alienType: "Shooter", number: 3, location: 1, activate: false },
    { id: 5, alienType: "Shooter", number: 3, location: 1, activate: false },
    { id: 6, alienType: "Shooter", number: 3, location: 2, activate: false },
    { id: 7, alienType: "Shooter", number: 3, location: 2, activate: false },
    { id: 8, alienType: "Shooter", number: 3, location: 3, activate: false },
    { id: 9, alienType: "Shooter", number: 3, location: 3, activate: false },
    { id: 10, alienType: "Shooter", number: 5, location: 0, activate: false },
    { id: 11, alienType: "Biter", number: 2, location: 1, activate: true },
    { id: 12, alienType: "Biter", number: 2, location: 2, activate: true },
    { id: 13, alienType: "Biter", number: 2, location: 3, activate: true },
    { id: 14, alienType: "Biter", number: 3, location: 1, activate: true },
    { id: 15, alienType: "Biter", number: 3, location: 2, activate: true },
    { id: 16, alienType: "Biter", number: 3, location: 3, activate: true },
    { id: 17, alienType: "Biter", number: 4, location: 1, activate: false },
    { id: 18, alienType: "Biter", number: 4, location: 2, activate: false },
    { id: 19, alienType: "Biter", number: 4, location: 3, activate: false },
    { id: 20, alienType: "Biter", number: 5, location: 0, activate: false },
    { id: 21, alienType: "Runner", number: 2, location: 1, activate: true },
    { id: 22, alienType: "Runner", number: 2, location: 2, activate: true },
    { id: 23, alienType: "Runner", number: 2, location: 3, activate: true },
    { id: 24, alienType: "Runner", number: 3, location: 1, activate: true },
    { id: 25, alienType: "Runner", number: 3, location: 1, activate: true },
    { id: 26, alienType: "Runner", number: 3, location: 2, activate: true },
    { id: 27, alienType: "Runner", number: 3, location: 2, activate: true },
    { id: 28, alienType: "Runner", number: 3, location: 3, activate: true },
    { id: 29, alienType: "Runner", number: 3, location: 3, activate: true },
    { id: 30, alienType: "Runner", number: 5, location: 0, activate: false },
]

// ██▄ ▄▀▄ ▄▀▀ ▄▀▀    ▄▀▀ ▄▀▄ █▀▄ █▀▄ ▄▀▀ 
// █▄█ ▀▄▀ ▄█▀ ▄█▀    ▀▄▄ █▀█ █▀▄ █▄▀ ▄█▀ 

const bossCards: Array<BossCard> = [
    {
        id: 1, name: "Searsting", health: 3, movement: 3, activate: true,
        rules: "Heroes within range 2 suffer 1 damage."
    },
    {
        id: 2, name: "Ashar", health: 3, movement: 4, activate: true,
        rules: "Roll 1 Hit Die for each hero within range 4: each hero suffers 1 damage on 3+."
    },
    {
        id: 3, name: "Reanimated Harrier", health: 4, movement: 1, activate: true,
        rules: "Move any aliens a total of 4 spaces combined."
    },
    {
        id: 4, name: "The Commandant", health: 4, movement: 2, activate: true,
        rules: "Roll 3 Hit Dice. For each 4+: adjacent heroes suffer 1 damage and the commandant moves 1 space."
    },
    {
        id: 5, name: "Dreadspit", health: 4, movement: 3, activate: true,
        rules: "Place 1 Acid Token on an adjacent space, following the alien path. Any hero in that space suffers 1 damage."
    },
    {
        id: 6, name: "Naga", health: 4, movement: 3, activate: true,
        rules: "Place 1 Slime Token on an adjacent space, following the alien path."
    },
    {
        id: 7, name: "Matriarch", health: 5, movement: "X", activate: true,
        rules: "Spawn 1 plagueling in each adjacent unoccupied space. X = Number of plaguelings just spawned."
    },
    {
        id: 8, name: "Shepherd", health: 5, movement: 2, activate: true,
        rules: "Each hero within range 3 suffers 1 damage (ignore LoS). Move these heroes 3 spaces following the alien path."
    },
    {
        id: 9, name: "Gutslug", health: 5, movement: 2, activate: true,
        rules: "Reveal and spawn 1 swarm spawn card. Use Gutslug's adjacent spaces as spawn points instead of the card's location."
    },
    {
        id: 10, name: "Bounty", health: 5, movement: 3, activate: true,
        rules: "Roll 1 hit die for each hero within range 4: each hero suffers 2 damage on 4+."
    },
    {
        id: 11, name: "Reanimated Crawler", health: 6, movement: 1, activate: true,
        rules: "When killed, place its figure next to the map. At the end of the next spawning phase, spawn it again."
    },
    {
        id: 12, name: "Mindeater", health: 6, movement: 2, activate: true,
        rules: "All aliens within range 3 (ignoring LoS) mvoe 1 space."
    },
    {
        id: 13, name: "Thraex", health: 6, movement: 2, activate: true,
        rules: "Heroes within range 3 suffer 1 damage. Heroes within range 1 suffer 1 additional damage."
    },
    {
        id: 14, name: "Gorgon", health: 7, movement: 4, activate: true,
        rules: "Restore to full health. Heroes within range 2 cannot move during the Action phase but can be pushed."
    },
]

interface SavedBossCard extends BossCard {
    currentHealth: number;
}

interface SavedGame {
    timerEnd?: number;
    currentEvents: Array<EventCard>;
    drawnSwarms: Array<SwarmCard>;
    currentBosses: Array<SavedBossCard>;
    eventDeck: Array<EventCard>;
    swarmDeck: Array<SwarmCard>;
    bossDeck: Array<BossCard>;
}

const timerSounds = ["alarm_1", "alarm_2", "alarm_3", "alarm_4", "bell_1", "bell_2", "bell_3", "siren_1", "siren_2", "siren_3", "siren_4", "siren_5",];

class StaticData {

    private static storageid_difficulty = "project_elite_companion_difficulty";
    private static storageid_nrplayers = "project_elite_companion_nr_of_players";
    private static storageid_savedGame = "project_elite_companion_saved_game";
    private static storageid_timerSound = "project_elite_timer_sound";
    private static storageid_roundTime = "project_elite_round_time";

    static getRoundTime(): number {
        let nr = parseInt(localStorage.getItem(StaticData.storageid_roundTime));
        if (!nr) {
            nr = 2 * 60 * 1000;
            localStorage.setItem(StaticData.storageid_roundTime, "" + nr);
        }
        return nr;
    }

    static toggleRoundTime(): void {
        let nr = StaticData.getRoundTime();
        if (!nr) nr = 2 * 60 * 1000;
        nr += 15000;
        if (nr > 3 * 60 * 1000) nr = 15000;
        localStorage.setItem(StaticData.storageid_roundTime, nr + "");
    }

    //

    static getTimerSound(): string {
        let val = localStorage.getItem(StaticData.storageid_timerSound);
        if (!timerSounds.includes(val)) {
            val = timerSounds[0];
            localStorage.setItem(StaticData.storageid_timerSound, val);
        }
        return val;
    }

    static toggleTimerSound(): void {
        let val = localStorage.getItem(StaticData.storageid_timerSound);
        let newIndex = timerSounds.indexOf(val) + 1;
        if (newIndex >= timerSounds.length) newIndex = 0;
        localStorage.setItem(StaticData.storageid_timerSound, timerSounds[newIndex]);
    }

    //

    static getDifficulty(): Difficulty {
        let diff = localStorage.getItem(StaticData.storageid_difficulty);
        if (diff != "easy" && diff != "medium" && diff != "hard") {
            diff = "easy";
            localStorage.setItem(StaticData.storageid_difficulty, diff);
        }
        return diff as Difficulty;
    }

    static toggleDifficulty(): void {
        let diff = localStorage.getItem(StaticData.storageid_difficulty);
        if (diff === "easy") diff = "medium";
        else if (diff === "medium") diff = "hard";
        else if (diff === "hard") diff = "easy";
        localStorage.setItem(StaticData.storageid_difficulty, diff);
    }

    //

    static getNrOfPlayers(): number {
        let nr = parseInt(localStorage.getItem(StaticData.storageid_nrplayers));
        if (!nr) {
            nr = 4;
            localStorage.setItem(StaticData.storageid_nrplayers, "" + nr);
        }
        return nr;
    }

    static toggleNrOfPlayers(): void {
        let nr = StaticData.getNrOfPlayers();
        if (!nr) nr = 4;
        nr++;
        if (nr > 6) nr = 1;
        localStorage.setItem(StaticData.storageid_nrplayers, nr + "");
    }

    //

    static getXRandomEvents1To16(n: number): Array<EventCard> {
        const drawFrom: Array<EventCard> = [...events1to16];
        Util.shuffle(drawFrom);
        return drawFrom.splice(0, n);
    }

    static makeEventsEasy(): Array<EventCard> {
        return [event17, event18, event19, event20, event21, event22, event23, event24];
    }

    static makeEventsMedium(): Array<EventCard> {
        return [event20, event21, event22, event23, event24, ...this.getXRandomEvents1To16(3)];
    }

    static makeEventsHard(): Array<EventCard> {
        return [event22, event23, event24, event25, ...this.getXRandomEvents1To16(4)];
    }

    static makeBosses(): Array<BossCard> {
        const drawFrom: Array<BossCard> = [...bossCards];
        Util.shuffle(drawFrom);
        return drawFrom.splice(0, 8);
    }

    static makeSwarmDeck(): Array<SwarmCard> {
        const returnDeck = [...swarmCards];
        Util.shuffle(returnDeck);
        return returnDeck;
    }

    static makeEventDeck(diff: Difficulty): Array<EventCard> {
        const returnDeck = diff === "medium" ? this.makeEventsMedium() : diff === "hard" ? this.makeEventsHard() : this.makeEventsEasy();
        Util.shuffle(returnDeck);
        return returnDeck;
    }

    static initSavedGame(): SavedGame {

        const diff = StaticData.getDifficulty();
        const nPlayers = StaticData.getNrOfPlayers();

        const savedGame: SavedGame = {
            currentEvents: [],
            drawnSwarms: [],
            currentBosses: [],
            eventDeck: (diff === "medium" ? StaticData.makeEventsMedium() : diff === "hard" ? StaticData.makeEventsHard() : StaticData.makeEventsEasy()),
            swarmDeck: StaticData.makeSwarmDeck(),
            bossDeck: StaticData.makeBosses(),
        }

        savedGame.eventDeck.forEach(ev => {
            if (nPlayers < 6) ev.icons.splice(5, 1);
            if (nPlayers < 5) ev.icons.splice(4, 1);
            if (nPlayers < 4) ev.icons.splice(3, 1);
            if (nPlayers < 3) ev.icons.splice(2, 1);
        });

        StaticData.save(savedGame);

        console.log("Started new game with difficulty " + diff + " for " + nPlayers + " players");
        return savedGame;
    }

    static drawEvent(savedGame: SavedGame): EventCard {
        if (savedGame.eventDeck.length === 0) return undefined;
        const eventCard = savedGame.eventDeck.splice(0, 1)[0];
        if (!eventCard.simple)
            savedGame.currentEvents.push(eventCard);
        StaticData.save(savedGame);
        return eventCard;
    }

    static drawSwarm(savedGame: SavedGame): SwarmCard {
        if (savedGame.swarmDeck.length === 0)
            savedGame.swarmDeck = this.makeSwarmDeck();
        const swarmCard = savedGame.swarmDeck.splice(0, 1)[0];
        savedGame.drawnSwarms.push(swarmCard);
        StaticData.save(savedGame);
        return swarmCard;
    }

    static drawBoss(savedGame: SavedGame): BossCard | undefined {
        if (savedGame.bossDeck.length === 0) return undefined;
        const bossCard = savedGame.bossDeck.splice(0, 1)[0];
        savedGame.currentBosses.push({ ...bossCard, currentHealth: bossCard.health });
        StaticData.save(savedGame);
        return bossCard;
    }

    static addDamageToBoss(savedGame: SavedGame, id: number, val: number) {
        const boss = savedGame.currentBosses.filter(x => x.id === id)[0];
        boss.currentHealth -= val;
        StaticData.save(savedGame);
    }

    static removeEvent(savedGame: SavedGame, event: EventCard): void {
        const eventIndex = savedGame.currentEvents.findIndex(ev => ev.id == event.id);
        if (eventIndex >= 0) savedGame.currentEvents.splice(eventIndex, 1);
        StaticData.save(savedGame);
    }

    static removeBoss(savedGame: SavedGame, boss: BossCard): void {
        const bossIndex = savedGame.currentBosses.findIndex(ev => ev.id == boss.id);
        if (bossIndex >= 0) savedGame.currentBosses.splice(bossIndex, 1);
        StaticData.save(savedGame);
    }

    static load(): SavedGame {
        let savedGame: SavedGame = JSON.parse(localStorage.getItem(StaticData.storageid_savedGame));
        return savedGame;
    }

    static save(savedGame: SavedGame) {
        localStorage.setItem(StaticData.storageid_savedGame, JSON.stringify(savedGame));
    }

    // UTIL

    static getNrOfSwarmCardsDrawn() {
        return StaticData.getNrOfPlayers() + (StaticData.getDifficulty() === "hard" ? 1 : 0);
    }

}