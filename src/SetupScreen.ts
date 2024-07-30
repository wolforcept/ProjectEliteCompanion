///<reference path="Data.ts" />
///<reference path="JScreen.ts" />

interface GameMap {
    name: string;
    img: string;
    difficulty: number;
}

interface MissionType {
    name: string;
    img: string;
    difficulty: number;
    tokenName: string;
    special?: string;
    rules: string;
}

const SLOTS: any = {
    "extermination": {
        "crash site": [
            [7, 9, 10],
            [7, 9, 10],
            [2, 6, 9, 10],
            [1, 3, 7, 9, 10],
            [1, 4, 7, 8, 9, 10],
            [2, 3, 5, 9, 10, 11, 12]
        ],
        "abandoned lab": [
            [1, 4, 11],
            [1, 4, 11],
            [2, 4, 6, 11],
            [2, 4, 6, 9, 10],
            [1, 3, 5, 7, 8, 11],
            [1, 4, 5, 7, 9, 10, 11]
        ],
        "shallow river": [
            [6, 9, 11],
            [6, 9, 11],
            [5, 6, 9, 11],
            [5, 6, 7, 9, 11],
            [2, 5, 6, 7, 9, 11],
            [2, 5, 6, 7, 9, 11, 12]
        ],
        "infested ruins": [
            [6, 7, 11],
            [6, 7, 11],
            [6, 7, 9, 11],
            [2, 6, 7, 9, 11],
            [2, 5, 6, 7, 9, 11],
            [2, 5, 6, 7, 9, 10, 11]
        ],
    },
    "capture": {
        "crash site": [
            [6, 10],
            [6, 10],
            [7, 10, 12],
            [1, 9, 10, 11],
            [3, 6, 10, 11, 12],
            [1, 3, 7, 9, 10, 11]
        ],
        "abandoned lab": [
            [5, 11],
            [5, 11],
            [3, 7, 11],
            [2, 5, 6, 11],
            [2, 3, 7, 9, 11],
            [2, 5, 6, 7, 9, 11]
        ],
        "shallow river": [
            [7, 12],
            [7, 12],
            [6, 7, 12],
            [6, 7, 11, 12],
            [6, 7, 9, 11, 12],
            [2, 6, 7, 9, 11, 12]
        ],
        "infested ruins": [
            [8, 9],
            [8, 9],
            [8, 9, 12],
            [4, 8, 9, 12],
            [4, 7, 8, 9, 12],
            [4, 7, 8, 9, 10, 12]
        ],
    },
    "demolition": {
        "crash site": [
            [6, 7, 9, 10],
            [6, 7, 9, 10],
            [5, 7, 9, 10, 11, 12],
            [2, 4, 5, 6, 7, 9, 10, 12],
            [1, 2, 3, 5, 6, 7, 8, 9, 10, 12],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        ],
        "abandoned lab": [
            [1, 3, 7, 11],
            [1, 3, 7, 11],
            [1, 3, 4, 6, 7, 11],
            [1, 2, 3, 4, 6, 7, 11, 12],
            [1, 2, 4, 5, 6, 7, 9, 10, 11, 12],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        ],
        "shallow river": [
            [2, 6, 7, 10],
            [2, 6, 7, 10],
            [2, 6, 7, 8, 10, 11],
            [2, 5, 6, 7, 8, 10, 11, 12],
            [2, 3, 5, 6, 7, 8, 9, 10, 11, 12],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        ],
        "infested ruins": [
            [2, 7, 8, 9],
            [2, 7, 8, 9],
            [2, 4, 7, 8, 9, 12],
            [2, 4, 5, 7, 8, 9, 10, 12],
            [1, 2, 3, 4, 5, 7, 8, 9, 10, 12],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        ],
    },
    "recon": {
        "crash site": [
            [4, 7],
            [4, 7],
            [1, 7, 10],
            [1, 6, 9, 10],
            [1, 4, 7, 9, 11],
            [2, 7, 8, 9, 10, 11]
        ],
        "abandoned lab": [
            [6, 11],
            [6, 11],
            [4, 7, 11],
            [2, 7, 11, 12],
            [1, 5, 7, 9, 11],
            [2, 4, 6, 9, 11, 12]
        ],
        "shallow river": [
            [7, 8],
            [7, 8],
            [3, 8, 12],
            [3, 7, 8, 12],
            [3, 5, 7, 8, 12],
            [3, 5, 7, 8, 10, 12]
        ],
        "infested ruins": [
            [7, 10],
            [7, 10],
            [3, 6, 12],
            [5, 8, 9, 11],
            [3, 5, 8, 9, 11],
            [3, 5, 7, 8, 9, 11],
        ],
    },
    "exploration": {
        "crash site": [
            [1, 8, 10, 11],
            [1, 8, 10, 11],
            [2, 3, 5, 7, 9, 11],
            [1, 3, 5, 7, 8, 9, 11, 12],
            [1, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        ],
        "abandoned lab": [
            [4, 7, 10, 12],
            [4, 7, 10, 12],
            [1, 3, 4, 7, 10, 12],
            [3, 4, 5, 7, 8, 9, 11, 12],
            [1, 3, 4, 5, 7, 8, 9, 10, 11, 12],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        ],
        "shallow river": [
            [2, 6, 9, 11],
            [2, 6, 9, 11],
            [2, 5, 6, 7, 9, 11],
            [2, 3, 5, 6, 7, 9, 11, 12],
            [1, 2, 5, 6, 7, 8, 9, 11],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        ],
        "infested ruins": [
            [2, 5, 9, 11],
            [2, 5, 9, 11],
            [2, 5, 6, 9, 10, 11],
            [2, 3, 5, 6, 7, 9, 10, 11],
            [1, 2, 3, 5, 6, 7, 8, 9, 10, 11],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        ],
    },
};

class SetupScreen extends JScreen {

    maps: { [key: string]: GameMap } = {
        "crash site": { name: "Crash Site", img: "", difficulty: 0 },
        "abandoned lab": { name: "Abandoned Lab", img: "", difficulty: 0 },
        "shallow river": { name: "Shallow River", img: "", difficulty: 0 },
        "infested ruins": { name: "Infested Ruins", img: "", difficulty: 0 },
    };

    missionTypes: { [key: string]: MissionType } = {
        "extermination": {
            name: "Extermination", img: "", difficulty: 0, tokenName: "Extermination Token",
            rules: `<div class="part">OBJECTIVE: The nests found by the exploration team are marked on the Map. It is your job to destroy them all. To win the Mission,exterminate the nests by activating all Extermination tokens.</div>
                    <div class="part">SPECIAL SETUP: Fill the Objective slots with 1 random Extermination token each. Return the remaining tokens to the box.</div>
                    <div class="part">ACTION: Any Hero adjacent to an Extermination token may allocate dice to it. When all slots are filled, the token is ready. At the End of the Round Phase, remove from the Map all ready Extermination tokens.</div>`
        },
        "exploration": {
            name: "Exploration", img: "", difficulty: 0, tokenName: "Exploration Token",
            rules: `<div class="part"></div>
                <div class="part"></div>
                <div class="part"></div>`
        },
        "capture": {
            name: "Capture", img: "", difficulty: 0, tokenName: "Capture Token<br />+ 2 Trap Token in each",
            rules: `<div class="part">OBJECTIVE: Special traps are exactly what it takes to capture living specimens, but they need the right timing to activate. To win the game, all Traps must successfully capture an Alien.</div>
                <div class="part">SPECIAL SETUP RULES: According to the number of players indicated for each Map, fill the listed Objective slots with 1 random Capture token each. Then, place 2 Trap tokens adjacent to each Capture token. Return the remaining tokens to the box</div>
                <div class="part">Activating Traps: Any Hero adjacent to a Capture token may allocate dice to it. When all slots are filled, the Capture token is ready. At the end of the Action Phase, each ready Capture token is activated and Heroes must choose 1 Trap adjacent to the tokens to close.</div>
                <div class="part">Resolving Traps: If a Trap closes with a Swarm Alien figure on it, the Capture is considered successful! Remove the Trap token from the Map and return the Swarm to the reserve. If a Trap closes without a Swarm on it, the Capture is considered unsuccessful and the Trap remains on the Map. Bosses are unaffected by Traps.</div>
                <div class="part">Moving Around: Spaces occupied by Traps or Capture tokens are not considered Blocking Spaces.</div>`
        },
        "recon": {
            name: "Recon", img: "", difficulty: 0, tokenName: "Target Token",
            special: `1x Recon Token per Hero in Starting Area`,
            rules: `<div class="part"></div>
                <div class="part"></div>
                <div class="part"></div>`
        },
        "demolition": {
            name: "Demolition", img: "", difficulty: 0, tokenName: "Target Token",
            special: "1x Demo4 and 1x Demo3 per player.",
            rules: `<div class="part"></div>
                <div class="part"></div>
                <div class="part"></div>`
        },
    };

    objectives = {

    }

    chooseMap: JQuery<HTMLElement>;
    chooseMissionType: JQuery<HTMLElement>;
    specificsWrapper: JQuery<HTMLElement>;

    chosenMap: JQuery<HTMLElement>;
    chosenMissionType: JQuery<HTMLElement>;

    startGameButton: JQuery<HTMLElement>;

    currentPhase: number = 0;
    selectedMapId: string;
    selectedMissionTypeId: string;
    callback?: () => void;

    getMap(id?: string) { return this.maps[id ?? this.selectedMapId] };
    getMissionType(id?: string) { return this.missionTypes[id ?? this.selectedMissionTypeId] };

    constructor(private main: Main) {
        super("setup");

        this.chosenMap = $(`<div class="chosen"></div>`);
        this.chosenMissionType = $(`<div class="chosen"></div>`);

        this.chooseMap = $(`<div class="chooseMap"><h3>Game Map:</h3></div>`);
        Object.keys(this.maps).forEach(mapId => {
            const div = $(`<div class="map button">${this.getMap(mapId).name}</div>`);
            div.on('click', () => this.setMapAndContinue(mapId))
            this.chooseMap.append(div);
        });

        this.chooseMissionType = $(`<div class="chooseMissionType"><h3>Mission Type:</h3></div>`);
        Object.keys(this.missionTypes).forEach(typeId => {
            const div = $(`<div class="missionType button">${this.getMissionType(typeId).name}</div>`);
            div.on('click', () => this.setMissionTypeAndContinue(typeId))
            this.chooseMissionType.append(div);
        });

        this.specificsWrapper = $(`<div class="rulesWrapper"></div>`);


        this.startGameButton = $(`<div class="start button">Start Game</div>`);
        this.startGameButton.on('click', () => this.startGame());

        const backButton = $(`<div class="back button">Back</div>`);
        backButton.on('click', () => this.showPhase(this.currentPhase - 1));

        this.div.append(this.chosenMap);
        this.div.append(this.chosenMissionType);
        this.div.append(this.chooseMap);
        this.div.append(this.chooseMissionType);
        this.div.append(this.specificsWrapper);
        this.div.append(this.startGameButton);
        this.div.append(backButton);
    }

    startGame() {
        if (this.callback)
            this.callback();
    }

    showPhase(phase: number) {

        this.currentPhase = phase;

        this.startGameButton.hide();

        this.chosenMap.hide();
        this.chosenMap.hide();
        this.chosenMissionType.hide();

        this.chooseMap.hide();
        this.chooseMissionType.hide();
        this.specificsWrapper.hide();

        if (phase < 0) {
            this.main.menuScreen.show();
            return;
        }

        if (phase == 0) {
            this.chooseMap.show();
            return;
        }

        if (phase == 1) {
            this.showSelectedMap();
            this.chooseMissionType.show();
            return;
        }

        if (phase == 2) {
            this.showSelectedMap();
            this.showSelectedMissionType();
            this.specificsWrapper.empty();

            const missionType = this.getMissionType();
            const map = this.getMap();
            const slotsArr = SLOTS["extermination"][this.selectedMapId][StaticData.getNrOfPlayers()];

            const nrPlayersDiv = $(`<div class="nrPlayers">Number of Players: ${StaticData.getNrOfPlayers()}</div>`);
            const tokensDiv = $(`<div class="tokens">${slotsArr.length}x ${missionType.tokenName}</div>`);
            const slotsDiv = $(`<div class="slots"></div>`);
            const rulesDiv = $(`<div class="rules">${missionType.rules}</div>`);

            slotsArr.forEach((n: number) => slotsDiv.append($(`<div class="slot">${n}</div>`)));

            this.specificsWrapper.append(nrPlayersDiv);
            this.specificsWrapper.append(tokensDiv);
            this.specificsWrapper.append(slotsDiv);
            this.specificsWrapper.append(rulesDiv);

            if (missionType.special)
                this.specificsWrapper.append($(`<div class="special">${missionType.special}</div>`));

            this.startGameButton.show();
            this.specificsWrapper.show();
            return;
        }

    }

    private showSelectedMap() {
        this.chosenMap.empty();
        this.chosenMap.append($(`<h3>Map: ${this.getMap().name}</h3>`))
        this.chosenMap.show();
    }

    private showSelectedMissionType() {
        this.chosenMissionType.empty();
        this.chosenMissionType.append($(`<h3>Mission: ${this.getMissionType().name}</h3>`))
        this.chosenMissionType.show();
    }

    private setMapAndContinue(mapId: string): void {
        this.selectedMapId = mapId;
        this.showPhase(1);
    }

    private setMissionTypeAndContinue(missionTypeId: string): void {
        this.selectedMissionTypeId = missionTypeId;
        this.showPhase(2);
    }

    init(callback: () => void) {
        this.show();
        this.showPhase(0);
        this.callback = callback;
    }
}

