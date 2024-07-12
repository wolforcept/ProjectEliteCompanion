var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var AudioManager = /** @class */ (function () {
    function AudioManager() {
    }
    return AudioManager;
}());
var Main = /** @class */ (function () {
    function Main() {
        this.audio = new AudioManager();
        this.ui = new UiManager();
        console.log("Starting...");
        this.ui.showMainMenu();
        this.loadSettings();
    }
    Main.prototype.loadSettings = function () {
        var _this = this;
        var settings = ["nr_players", "difficulty", "round_time", "alarm", "alarm_loop"];
        settings.forEach(function (setting) {
            var prevSetting = SavedData.getSetting(setting);
            if (!prevSetting)
                prevSetting = Settings.getDefault(setting);
            _this.ui.setSetting(setting, prevSetting);
        });
    };
    Main.prototype.startNewGame = function () {
        this.gameData = new GameData(SavedData.getSetting("difficulty"));
        this.save();
        this.phaseInit("event");
        this.ui.resetGame();
    };
    Main.prototype.save = function () {
        SavedData.setGameData(this.gameData);
    };
    Main.prototype.onNewEvent = function () {
        console.log("revealing new event card");
        this.gameData.drawEvent();
        this.ui.setNewEvent(this.gameData.currentEvents[this.gameData.currentEvents.length - 1], SavedData.getSetting("nr_players"));
        this.ui.enableButton("event");
    };
    Main.prototype.onNewSwarm = function () {
        console.log("revealing new swarm card");
        this.gameData.drawSwarm();
        this.ui.setNewEvent(this.gameData.currentEvents[this.gameData.currentEvents.length - 1], SavedData.getSetting("nr_players"));
        this.ui.enableButton("spawn");
    };
    Main.prototype.phaseInit = function (phase) {
        var _this = this;
        console.log("Starting Phase: " + phase);
        switch (phase) {
            case "event":
                this.ui.addEventCardToFlip(function () { return _this.onNewEvent(); });
                break;
            case "spawn":
                // for (let i = 0; i < SavedData.getSetting<number>("nr_players"); i++) {
                this.ui.addSwarmCardToFlip(function () { return _this.onNewSwarm(); });
                // }
                break;
        }
    };
    Main.prototype.goToNextPhase = function (fromPhase) {
        if (this.ui.isButtonDisabled(fromPhase))
            return;
        var nextPhase = this.getNextPhase(fromPhase);
        MAIN.ui.showPhase(nextPhase);
        this.phaseInit(nextPhase);
        switch (fromPhase) {
            case "check": {
                this.gameData.turn++;
                this.save();
            }
        }
        this.ui.updateCurrentEvents(nextPhase, this.gameData.currentEvents);
    };
    Main.prototype.getNextPhase = function (fromPhase) {
        switch (fromPhase) {
            case "event": return "spawn";
            case "spawn": return "boss";
            case "boss": return "action";
            case "action": return "ability";
            case "ability": return "movement";
            case "movement": return "check";
            case "check": return "event";
        }
    };
    return Main;
}());
var MAIN;
function onButtonStartGame() {
    MAIN.startNewGame();
}
function onSettingChanged(setting, value) {
    SavedData.setSetting(setting, value);
}
function onButtonNext(fromPhase) {
    MAIN.goToNextPhase(fromPhase);
}
function makeOnFlipCardClicked(id) {
    return function () {
        console.log({ id: id });
    };
}
$(function () { return MAIN = new Main(); });
var SavedData = /** @class */ (function () {
    function SavedData() {
    }
    SavedData.setGameData = function (gameData) {
        localStorage.setItem("game_data", JSON.stringify(gameData));
    };
    SavedData.getGameData = function (gameData) {
        return JSON.parse(localStorage.getItem("game_data"));
    };
    SavedData.getSetting = function (setting) {
        return JSON.parse(localStorage.getItem("setting_" + setting));
    };
    SavedData.setSetting = function (setting, value) {
        localStorage.setItem("setting_" + setting, JSON.stringify(value));
    };
    return SavedData;
}());
var GameData = /** @class */ (function () {
    function GameData(diff) {
        this.currentEvents = [];
        this.eventsDiscard = [];
        this.currentBosses = [];
        this.bossesDiscard = [];
        this.swarmDiscard = [];
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
    GameData.prototype.drawEvent = function () {
        var newEvent = this.eventDeck.splice(0, 1)[0];
        this.currentEvents.push(newEvent);
    };
    GameData.prototype.drawSwarm = function () {
        var newSwarm = this.swarmDeck.splice(0, 1)[0];
        this.swarmDiscard.push(newSwarm);
    };
    GameData.prototype.drawBoss = function () {
        var newBoss = this.bossDeck.splice(0, 1)[1];
        this.currentBosses.push(newBoss);
    };
    return GameData;
}());
var Settings = /** @class */ (function () {
    function Settings() {
    }
    Settings.getDefault = function (setting) {
        switch (setting) {
            case "nr_players": return 4;
            case "difficulty": return "easy";
            case "round_time": return "120";
            case "alarm": return "alarm_1";
            case "alarm_loop": return "on";
        }
    };
    return Settings;
}());
var difficulties = ["easy", "medium", "hard"];
var phases = ["event", "spawn", "boss", "action", "ability", "movement", "check"];
// ██▀ █ █ ██▀ █▄ █ ▀█▀    ▄▀▀ ▄▀▄ █▀▄ █▀▄ ▄▀▀ 
// █▄▄ ▀▄▀ █▄▄ █ ▀█  █     ▀▄▄ █▀█ █▀▄ █▄▀ ▄█▀ 
var event1 = {
    id: 1, simple: false, name: "Speedy Spawn", icons: ["wrench", "wrench", "hand", "gun", "hand", "gun"],
    rules: "At the end of the Alien Ability step, all aliens in a spawn point move 2 spaces.", highlightPhase: "ability"
};
var event2 = {
    id: 2, simple: false, name: "Exhaustion", icons: ["gun", "gun", "gun", "search", "gun", "search"],
    rules: "Hero's special abilities have no effect."
};
var event3 = {
    id: 3, simple: false, name: "Shell Shock", icons: ["wrench", "wrench", "gun", "wrench", "gun", "wrench"],
    rules: "At the beginning of the Alien Ability step, each hero suffers 1 damage."
};
var event4 = {
    id: 4, simple: false, name: "Proxy Horde", icons: ["search", "wrench", "hand", "gun", "hand", "gun"],
    rules: "During the Alien Activation phase add +1 to all aliens movement value."
};
var event5 = {
    id: 5, simple: false, name: "Limited Equipments", icons: ["search", "search", "search", "search", "search", "search"],
    rules: "Heroes may not perform Search Actions or draw Alien Tech cards."
};
var event6 = {
    id: 6, simple: false, name: "Sudden Attack", icons: ["hand", "hand", "wrench", "hand", "wrench", "hand"],
    rules: "All aliens have an additional ability: \"Roll 1 Hit Die for each hero within range 1: each hero suffers 1 damage on 4+.\""
};
var event7 = {
    id: 7, simple: false, name: "Proxies in Haste", icons: ["hand", "gun", "search", "wrench", "search", "wrench"],
    rules: "Before the Alien Ability step, all aliens move 1 space."
};
var event8 = {
    id: 8, simple: false, name: "Watch out for Bosses", icons: ["wrench", "hand", "gun", "search", "gun", "search"],
    rules: "At the end of the spawning phase, reveal 1 additional Boss Spawn card.", highlightPhase: "spawn"
};
var event9 = {
    id: 9, simple: false, name: "Large Numbers", icons: ["wrench", "wrench", "wrench", "wrench", "wrench", "wrench"],
    rules: "During the spawning phase, whenever you spawn a swarm, spawn 1 additional figure of that type.", highlightPhase: "spawn"
};
var event10 = {
    id: 10, simple: false, name: "Abrupt Shots", icons: ["hand", "hand", "hand", "gun", "hand", "gun"],
    rules: "All aliens have an additional ability: \"Roll 1 Hit Die for each hero within range 3: each hero suffers 1 damage on 4+.\""
};
var event11 = {
    id: 11, simple: false, name: "Out of Time", icons: ["wrench", "wrench", "hand", "hand", "hand", "hand"],
    rules: "The Action phase lasts 20 seconds less."
};
var event12 = {
    id: 12, simple: false, name: "Enraged Spawn", icons: ["hand", "hand", "search", "search", "search", "search"],
    rules: "All Swarm Spawn cards have <img class=\"inText\" src=\"..\\assets\\svgs\\danger.svg\">.", highlightPhase: "spawn"
};
var event13 = {
    id: 13, simple: false, name: "Overwhelmed", icons: ["gun", "search", "search", "wrench", "search", "wrench"],
    rules: "Before the spawning phase, each hero must move 3 spaces following the alien path.", highlightPhase: "spawn"
};
var event14 = {
    id: 14, simple: false, name: "Rampant Mutation", icons: ["wrench", "wrench", "wrench", "hand", "wrench", "hand"],
    rules: "At the end of the spawning phase, all bosses gain 3 health.", highlightPhase: "spawn"
};
var event15 = {
    id: 15, simple: false, name: "Endless Threat", icons: ["hand", "hand", "gun", "gun", "gun", "gun"],
    rules: "At the end of the spawning phase, spawn an additional Swarm Spawn card.", highlightPhase: "spawn"
};
var event16 = {
    id: 16, simple: false, name: "Toxic Proxies", icons: ["hand", "hand", "wrench", "wrench", "wrench", "wrench"],
    rules: "At the end of the spawning phase, select 3 different aliens and place 1 acid token adjacent to each alien, following the alien path."
};
var event17 = {
    id: 17, icons: ["smile"], name: "No Effect", simple: true,
    rules: ""
};
var event18 = {
    id: 18, icons: ["smile"], name: "No Effect", simple: true,
    rules: ""
};
var event19 = {
    id: 19, icons: ["smile"], name: "No Effect", simple: true,
    rules: ""
};
var event20 = {
    id: 20, icons: ["smile"], name: "No Effect", simple: true,
    rules: ""
};
var event21 = {
    id: 21, icons: ["smile"], name: "No Effect", simple: true,
    rules: ""
};
var event22 = {
    id: 22, simple: true, icons: ["alien_move", "alien_move", "alien_move"], name: "Sudden Movement",
    rules: "Move any aliens a total of 3 spaces combined."
};
var event23 = {
    id: 23, simple: true, icons: ["alien_move", "alien_move", "alien_move"], name: "Sudden Movement",
    rules: "Move any aliens a total of 3 spaces combined."
};
var event24 = {
    id: 24, simple: true, icons: ["alien"], name: "Swarm Rush",
    rules: "Immediately reveal and resolve an additional swarm spawn card."
};
var event25 = {
    id: 25, simple: true, icons: ["boss"], name: "Boss Rush",
    rules: "Immediately reveal and resolve an additional boss spawn card."
};
var events1to16 = [event1, event2, event3, event4, event5, event6, event7, event8, event9, event10, event11, event12, event13, event14, event15, event16];
// ▄▀▀ █   █ ▄▀▄ █▀▄ █▄ ▄█    ▄▀▀ ▄▀▄ █▀▄ █▀▄ ▄▀▀ 
// ▄█▀ ▀▄▀▄▀ █▀█ █▀▄ █ ▀ █    ▀▄▄ █▀█ █▀▄ █▄▀ ▄█▀ 
var alarms = ["alarm_1", "alarm_3", "bell_1", "bell_3", "siren_2", "siren_4", "alarm_2", "alarm_4", "bell_2", "siren_1", "siren_3", "siren_5"];
var swarmCards = [
    { id: 1, alienType: "Shooter", number: 2, location: 1, move: true },
    { id: 2, alienType: "Shooter", number: 2, location: 2, move: true },
    { id: 3, alienType: "Shooter", number: 2, location: 3, move: true },
    { id: 4, alienType: "Shooter", number: 3, location: 1, move: false },
    { id: 5, alienType: "Shooter", number: 3, location: 1, move: false },
    { id: 6, alienType: "Shooter", number: 3, location: 2, move: false },
    { id: 7, alienType: "Shooter", number: 3, location: 2, move: false },
    { id: 8, alienType: "Shooter", number: 3, location: 3, move: false },
    { id: 9, alienType: "Shooter", number: 3, location: 3, move: false },
    { id: 10, alienType: "Shooter", number: 5, location: 0, move: false },
    { id: 11, alienType: "Biter", number: 2, location: 1, move: true },
    { id: 12, alienType: "Biter", number: 2, location: 2, move: true },
    { id: 13, alienType: "Biter", number: 2, location: 3, move: true },
    { id: 14, alienType: "Biter", number: 3, location: 1, move: true },
    { id: 15, alienType: "Biter", number: 3, location: 2, move: true },
    { id: 16, alienType: "Biter", number: 3, location: 3, move: true },
    { id: 17, alienType: "Biter", number: 4, location: 1, move: false },
    { id: 18, alienType: "Biter", number: 4, location: 2, move: false },
    { id: 19, alienType: "Biter", number: 4, location: 3, move: false },
    { id: 20, alienType: "Biter", number: 5, location: 0, move: false },
    { id: 21, alienType: "Runner", number: 2, location: 1, move: true },
    { id: 22, alienType: "Runner", number: 2, location: 2, move: true },
    { id: 23, alienType: "Runner", number: 2, location: 3, move: true },
    { id: 24, alienType: "Runner", number: 3, location: 1, move: true },
    { id: 25, alienType: "Runner", number: 3, location: 1, move: true },
    { id: 26, alienType: "Runner", number: 3, location: 2, move: true },
    { id: 27, alienType: "Runner", number: 3, location: 2, move: true },
    { id: 28, alienType: "Runner", number: 3, location: 3, move: true },
    { id: 29, alienType: "Runner", number: 3, location: 3, move: true },
    { id: 30, alienType: "Runner", number: 5, location: 0, move: false },
];
var bossCards = [
    {
        id: 1, name: "Searsting", hp: 3, movement: 3, move: true,
        rules: "Heroes within range 2 suffer 1 damage."
    },
    {
        id: 2, name: "Ashar", hp: 3, movement: 4, move: true,
        rules: "Roll 1 Hit Die for each hero within range 4: each hero suffers 1 damage on 3+."
    },
    {
        id: 3, name: "Reanimated Harrier", hp: 4, movement: 1, move: true,
        rules: "Move any aliens a total of 4 spaces combined."
    },
    {
        id: 4, name: "The Commandant", hp: 4, movement: 2, move: true,
        rules: "Roll 3 Hit Dice. For each 4+: adjacent heroes suffer 1 damage and the commandant moves 1 space."
    },
    {
        id: 5, name: "Dreadspit", hp: 4, movement: 3, move: true,
        rules: "Place 1 Acid Token on an adjacent space, following the alien path. Any hero in that space suffers 1 damage."
    },
    {
        id: 6, name: "Naga", hp: 4, movement: 3, move: true,
        rules: "Place 1 Slime Token on an adjacent space, following the alien path."
    },
    {
        id: 7, name: "Matriarch", hp: 5, movement: "X", move: true,
        rules: "Spawn 1 plagueling in each adjacent unoccupied space. X = Number of plaguelings just spawned."
    },
    {
        id: 8, name: "Shepherd", hp: 5, movement: 2, move: true,
        rules: "Each hero within range 3 suffers 1 damage (ignore LoS). Move these heroes 3 spaces following the alien path."
    },
    {
        id: 9, name: "Gutslug", hp: 5, movement: 2, move: true,
        rules: "Reveal and spawn 1 swarm spawn card. Use Gutslug's adjacent spaces as spawn points instead of the card's location."
    },
    {
        id: 10, name: "Bounty", hp: 5, movement: 3, move: true,
        rules: "Roll 1 hit die for each hero within range 4: each hero suffers 2 damage on 4+."
    },
    {
        id: 11, name: "Reanimated Crawler", hp: 6, movement: 1, move: true,
        rules: "When killed, place its figure next to the map. At the end of the next spawning phase, spawn it again."
    },
    {
        id: 12, name: "Mindeater", hp: 6, movement: 2, move: true,
        rules: "All aliens within range 3 (ignoring LoS) mvoe 1 space."
    },
    {
        id: 13, name: "Thraex", hp: 6, movement: 2, move: true,
        rules: "Heroes within range 3 suffer 1 damage. Heroes within range 1 suffer 1 additional damage."
    },
    {
        id: 14, name: "Gorgon", hp: 7, movement: 4, move: true,
        rules: "Restore to full health. Heroes within range 2 cannot move during the Action phase but can be pushed."
    },
];
var StaticData = /** @class */ (function () {
    function StaticData() {
    }
    StaticData.getXRandomEvents1To16 = function (n) {
        var drawFrom = __spreadArray([], events1to16, true);
        Util.shuffle(drawFrom);
        return drawFrom.splice(0, n);
    };
    StaticData.makeEventsEasy = function () {
        return [event17, event18, event19, event20, event21, event22, event23, event24];
    };
    StaticData.makeEventsMedium = function () {
        return __spreadArray([event20, event21, event22, event23, event24], this.getXRandomEvents1To16(3), true);
    };
    StaticData.makeEventsHard = function () {
        return __spreadArray([event22, event23, event24, event25], this.getXRandomEvents1To16(4), true);
    };
    StaticData.makeBosses = function () {
        var drawFrom = __spreadArray([], bossCards, true);
        Util.shuffle(drawFrom);
        return drawFrom.splice(0, 8);
    };
    StaticData.makeSwarmDeck = function () {
        return __spreadArray([], swarmCards, true);
    };
    return StaticData;
}());
var UiManager = /** @class */ (function () {
    function UiManager() {
    }
    UiManager.prototype.addSwarmCardToFlip = function (onReveal) {
        var card = this.generateCardToFlip(function (front) {
            front.append($("<img src=\"../assets/cards/card_event_back.png\">"));
        }, function (back) {
            back.append($("<h3 id=\"new-event-card-name\"></h3>"));
            back.append($("<div id=\"new-event-card-icons\"></div>"));
            back.append($("<div id=\"new-event-card-rules\"></div>"));
            back.append($("<img id=\"new-event-card-face\" src=\"../assets/cards/card_event_empty.png\">"));
        }, onReveal);
        $("#phase-spawn .cards").append(card);
    };
    UiManager.prototype.addEventCardToFlip = function (onReveal) {
        var card = this.generateCardToFlip(function (front) {
            front.append($("<img src=\"../assets/cards/card_event_back.png\">"));
        }, function (back) {
            back.append($("<h3 id=\"new-event-card-name\"></h3>"));
            back.append($("<div id=\"new-event-card-icons\"></div>"));
            back.append($("<div id=\"new-event-card-rules\"></div>"));
            back.append($("<img id=\"new-event-card-face\" src=\"../assets/cards/card_event_empty.png\">"));
        }, onReveal);
        $("#phase-event .cards").append(card);
    };
    UiManager.prototype.generateCardToFlip = function (addToFront, addToBack, onReveal) {
        var flipcard = $("<div class=\"flipcard\"></div>");
        var inner = $("<div class=\"flipcard-inner\"></div>");
        var front = $("<div class=\"flipcard-front\"></div>");
        front.on("click", function () {
            flipcard.addClass("flipped");
            onReveal();
        });
        var back = $("<div class=\"flipcard-back\"></div>");
        addToFront(front);
        addToBack(back);
        inner.append(front);
        inner.append(back);
        flipcard.append(inner);
        return flipcard;
    };
    UiManager.prototype.updateCurrentEvents = function (currentPhase, currentEvents) {
        if (currentEvents.length === 0) {
            $("#events").hide();
            return;
        }
        $("#events").show();
        var events = $("#currentEvents");
        events.empty();
        currentEvents.forEach(function (event) {
            var div = $("<div class=\"current-event\"></div>");
            var title = $("<div class=\".title\">".concat(event.name, "</div>"));
            div.append(title);
            var icons = $("<div class=\"icons\"></div>");
            div.append(icons);
            var rules = $("<div class=\"rules\">".concat(event.rules, "</div>"));
            div.append(rules);
            event.icons.forEach(function (iconName) {
                if (event.simple)
                    icons.append("<img src=\"../assets/svgs/".concat(iconName, ".svg\" class=\"current-events-icon white\">"));
                else
                    icons.append("<img src=\"../assets/pngs/icon_red_".concat(iconName, ".png\" class=\"current-events-icon\">"));
            });
            if (event.highlightPhase === currentPhase)
                div.addClass("highlighted");
            events.append(div);
        });
    };
    UiManager.prototype.enableButton = function (phase, enable) {
        if (enable === void 0) { enable = true; }
        if (enable)
            $("#phase-".concat(phase, " button")).removeClass("disabled");
        else
            $("#phase-".concat(phase, " button")).addClass("disabled");
    };
    UiManager.prototype.isButtonDisabled = function (phase) {
        return $("#phase-".concat(phase, " button")).hasClass("disabled");
    };
    UiManager.prototype.showMainMenu = function () {
        $('#title').show();
        $('#settings').show();
        $('#menu').show();
        $('#content').hide();
    };
    UiManager.prototype.setSetting = function (setting, value) {
        $("#setting-".concat(setting, " select")).val(value).trigger("change");
    };
    UiManager.prototype.resetGame = function () {
        this.updateCurrentEvents("event", []);
        this.resetPhases();
        this.showContent();
        this.showPhase("event");
    };
    UiManager.prototype.showContent = function () {
        $('#title').hide();
        $('#settings').hide();
        $('#menu').hide();
        $('#content').show();
    };
    UiManager.prototype.showPhase = function (phase) {
        phases.forEach(function (p) { return $('#phase-' + p).hide(); });
        $('#phase-' + phase).show();
        $(".selected").removeClass("selected");
        $(".selected").removeClass("selected");
        $(".phaseIcon.".concat(phase)).addClass("selected");
    };
    UiManager.prototype.resetPhases = function () {
        $("#phase-event button").addClass("disabled");
        $("#phase-spawn button").addClass("disabled");
        $("#phase-boss button").addClass("disabled");
        $("#phase-action button").addClass("disabled");
        $("#phase-ability button").addClass("disabled");
        $("#phase-movement button").addClass("disabled");
        $("#phase-check button").addClass("disabled");
    };
    // EVENT PHASE
    UiManager.prototype.setNewEvent = function (event, nPlayers) {
        console.log({ event: event });
        // $("#new-event-card-face").attr("src", event.name);
        $('#new-event-card-name').text(event.name);
        var icons = $('#new-event-card-icons');
        icons.empty();
        event.icons.forEach(function (element, i) {
            if ((i + 1) > nPlayers)
                return;
            if (event.simple)
                icons.append("<img src=\"../assets/svgs/".concat(element, ".svg\" class=\"card-icon white\">"));
            else
                icons.append("<img src=\"../assets/pngs/icon_red_".concat(element, ".png\" class=\"card-icon\">"));
        });
        $("#new-event-card-rules").text(event.rules);
    };
    return UiManager;
}());
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.shuffle = function (array) {
        var _a;
        var currentIndex = array.length;
        var randomIndex;
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            _a = [array[randomIndex], array[currentIndex]], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
        }
        return array;
    };
    return Util;
}());
