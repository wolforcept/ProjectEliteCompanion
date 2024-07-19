var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var difficulties = ["easy", "medium", "hard"];
var phases = ["event", "spawn", "action", "activation"];
// ██▀ █ █ ██▀ █▄ █ ▀█▀    ▄▀▀ ▄▀▄ █▀▄ █▀▄ ▄▀▀ 
// █▄▄ ▀▄▀ █▄▄ █ ▀█  █     ▀▄▄ █▀█ █▀▄ █▄▀ ▄█▀ 
var event1 = {
    id: 1, simple: false, name: "Speedy Spawn", icons: ["wrench", "wrench", "hand", "gun", "hand", "gun"], highlightPhase: "activation",
    rules: "At the end of the Alien Ability step, all aliens in a spawn point move 2 spaces.",
};
var event2 = {
    id: 2, simple: false, name: "Exhaustion", icons: ["gun", "gun", "gun", "search", "gun", "search"], highlightPhase: "all",
    rules: "Hero's special abilities have no effect.",
};
var event3 = {
    id: 3, simple: false, name: "Shell Shock", icons: ["wrench", "wrench", "gun", "wrench", "gun", "wrench"], highlightPhase: "activation",
    rules: "At the beginning of the Alien Ability step, each hero suffers 1 damage.",
};
var event4 = {
    id: 4, simple: false, name: "Proxy Horde", icons: ["search", "wrench", "hand", "gun", "hand", "gun"], highlightPhase: "activation",
    rules: "During the Alien Activation phase add +1 to all aliens movement value.",
};
var event5 = {
    id: 5, simple: false, name: "Limited Equipments", icons: ["search", "search", "search", "search", "search", "search"], highlightPhase: "action",
    rules: "Heroes may not perform Search Actions or draw Alien Tech cards.",
};
var event6 = {
    id: 6, simple: false, name: "Sudden Attack", icons: ["hand", "hand", "wrench", "hand", "wrench", "hand"], highlightPhase: "activation",
    rules: "All aliens have an additional ability: \"Roll 1 Hit Die for each hero within range 1: each hero suffers 1 damage on 4+.\"",
};
var event7 = {
    id: 7, simple: false, name: "Proxies in Haste", icons: ["hand", "gun", "search", "wrench", "search", "wrench"], highlightPhase: "activation",
    rules: "Before the Alien Ability step, all aliens move 1 space.",
};
var event8 = {
    id: 8, simple: false, name: "Watch out for Bosses", icons: ["wrench", "hand", "gun", "search", "gun", "search"], highlightPhase: "spawn",
    rules: "At the end of the spawning phase, reveal 1 additional Boss Spawn card.",
};
var event9 = {
    id: 9, simple: false, name: "Large Numbers", icons: ["wrench", "wrench", "wrench", "wrench", "wrench", "wrench"], highlightPhase: "spawn",
    rules: "During the spawning phase, whenever you spawn a swarm, spawn 1 additional figure of that type.",
};
var event10 = {
    id: 10, simple: false, name: "Abrupt Shots", icons: ["hand", "hand", "hand", "gun", "hand", "gun"], highlightPhase: "activation",
    rules: "All aliens have an additional ability: \"Roll 1 Hit Die for each hero within range 3: each hero suffers 1 damage on 4+.\"",
};
var event11 = {
    id: 11, simple: false, name: "Out of Time", icons: ["wrench", "wrench", "hand", "hand", "hand", "hand"], highlightPhase: "action",
    rules: "The Action phase lasts 20 seconds less."
};
var event12 = {
    id: 12, simple: false, name: "Enraged Spawn", icons: ["hand", "hand", "search", "search", "search", "search"], highlightPhase: "spawn",
    rules: "All Swarm Spawn cards have <img class=\"inText\" src=\".\\assets\\images\\light\\danger.svg\">.",
};
var event13 = {
    id: 13, simple: false, name: "Overwhelmed", icons: ["gun", "search", "search", "wrench", "search", "wrench"], highlightPhase: "spawn",
    rules: "Before the spawning phase, each hero must move 3 spaces following the alien path.",
};
var event14 = {
    id: 14, simple: false, name: "Rampant Mutation", icons: ["wrench", "wrench", "wrench", "hand", "wrench", "hand"], highlightPhase: "spawn",
    rules: "At the end of the spawning phase, all bosses gain 3 health.",
};
var event15 = {
    id: 15, simple: false, name: "Endless Threat", icons: ["hand", "hand", "gun", "gun", "gun", "gun"], highlightPhase: "spawn",
    rules: "At the end of the spawning phase, spawn an additional Swarm Spawn card.",
};
var event16 = {
    id: 16, simple: false, name: "Toxic Proxies", icons: ["hand", "hand", "wrench", "wrench", "wrench", "wrench"], highlightPhase: "spawn",
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
];
// ██▄ ▄▀▄ ▄▀▀ ▄▀▀    ▄▀▀ ▄▀▄ █▀▄ █▀▄ ▄▀▀ 
// █▄█ ▀▄▀ ▄█▀ ▄█▀    ▀▄▄ █▀█ █▀▄ █▄▀ ▄█▀ 
var bossCards = [
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
];
var timerSounds = ["alarm_1", "alarm_2", "alarm_3", "alarm_4", "bell_1", "bell_2", "bell_3", "siren_1", "siren_2", "siren_3", "siren_4", "siren_5",];
var StaticData = /** @class */ (function () {
    function StaticData() {
    }
    StaticData.getRoundTime = function () {
        var nr = parseInt(localStorage.getItem(StaticData.storageid_roundTime));
        if (!nr) {
            nr = 2 * 60 * 1000;
            localStorage.setItem(StaticData.storageid_roundTime, "" + nr);
        }
        return nr;
    };
    StaticData.toggleRoundTime = function () {
        var nr = StaticData.getRoundTime();
        if (!nr)
            nr = 2 * 60 * 1000;
        nr += 15000;
        if (nr > 3 * 60 * 1000)
            nr = 15000;
        localStorage.setItem(StaticData.storageid_roundTime, nr + "");
    };
    //
    StaticData.getTimerSound = function () {
        var val = localStorage.getItem(StaticData.storageid_timerSound);
        if (!timerSounds.includes(val)) {
            val = timerSounds[0];
            localStorage.setItem(StaticData.storageid_timerSound, val);
        }
        return val;
    };
    StaticData.toggleTimerSound = function () {
        var val = localStorage.getItem(StaticData.storageid_timerSound);
        var newIndex = timerSounds.indexOf(val) + 1;
        if (newIndex >= timerSounds.length)
            newIndex = 0;
        localStorage.setItem(StaticData.storageid_timerSound, timerSounds[newIndex]);
    };
    //
    StaticData.getDifficulty = function () {
        var diff = localStorage.getItem(StaticData.storageid_difficulty);
        if (diff != "easy" && diff != "medium" && diff != "hard") {
            diff = "easy";
            localStorage.setItem(StaticData.storageid_difficulty, diff);
        }
        return diff;
    };
    StaticData.toggleDifficulty = function () {
        var diff = localStorage.getItem(StaticData.storageid_difficulty);
        if (diff === "easy")
            diff = "medium";
        else if (diff === "medium")
            diff = "hard";
        else if (diff === "hard")
            diff = "easy";
        localStorage.setItem(StaticData.storageid_difficulty, diff);
    };
    //
    StaticData.getNrOfPlayers = function () {
        var nr = parseInt(localStorage.getItem(StaticData.storageid_nrplayers));
        if (!nr) {
            nr = 4;
            localStorage.setItem(StaticData.storageid_nrplayers, "" + nr);
        }
        return nr;
    };
    StaticData.toggleNrOfPlayers = function () {
        var nr = StaticData.getNrOfPlayers();
        if (!nr)
            nr = 4;
        nr++;
        if (nr > 6)
            nr = 1;
        localStorage.setItem(StaticData.storageid_nrplayers, nr + "");
    };
    //
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
        var returnDeck = __spreadArray([], swarmCards, true);
        Util.shuffle(returnDeck);
        return returnDeck;
    };
    StaticData.makeEventDeck = function (diff) {
        var returnDeck = diff === "medium" ? this.makeEventsMedium() : diff === "hard" ? this.makeEventsHard() : this.makeEventsEasy();
        Util.shuffle(returnDeck);
        return returnDeck;
    };
    StaticData.initSavedGame = function () {
        var diff = StaticData.getDifficulty();
        var nPlayers = StaticData.getNrOfPlayers();
        var savedGame = {
            currentEvents: [],
            drawnSwarms: [],
            currentBosses: [],
            eventDeck: (diff === "medium" ? StaticData.makeEventsMedium() : diff === "hard" ? StaticData.makeEventsHard() : StaticData.makeEventsEasy()),
            swarmDeck: StaticData.makeSwarmDeck(),
            bossDeck: StaticData.makeBosses(),
        };
        savedGame.eventDeck.forEach(function (ev) {
            if (nPlayers < 6)
                ev.icons.splice(5, 1);
            if (nPlayers < 5)
                ev.icons.splice(4, 1);
            if (nPlayers < 4)
                ev.icons.splice(3, 1);
            if (nPlayers < 3)
                ev.icons.splice(2, 1);
        });
        StaticData.save(savedGame);
        console.log("Started new game with difficulty " + diff + " for " + nPlayers + " players");
        return savedGame;
    };
    StaticData.drawEvent = function (savedGame) {
        if (savedGame.eventDeck.length === 0)
            return undefined;
        var eventCard = savedGame.eventDeck.splice(0, 1)[0];
        if (!eventCard.simple)
            savedGame.currentEvents.push(eventCard);
        StaticData.save(savedGame);
        return eventCard;
    };
    StaticData.drawSwarm = function (savedGame) {
        if (savedGame.swarmDeck.length === 0)
            savedGame.swarmDeck = this.makeSwarmDeck();
        var swarmCard = savedGame.swarmDeck.splice(0, 1)[0];
        savedGame.drawnSwarms.push(swarmCard);
        StaticData.save(savedGame);
        return swarmCard;
    };
    StaticData.drawBoss = function (savedGame) {
        if (savedGame.bossDeck.length === 0)
            return undefined;
        var bossCard = savedGame.bossDeck.splice(0, 1)[0];
        savedGame.currentBosses.push(__assign(__assign({}, bossCard), { currentHealth: bossCard.health }));
        StaticData.save(savedGame);
        return bossCard;
    };
    StaticData.addDamageToBoss = function (savedGame, id, val) {
        var boss = savedGame.currentBosses.filter(function (x) { return x.id === id; })[0];
        boss.currentHealth -= val;
        StaticData.save(savedGame);
    };
    StaticData.removeEvent = function (savedGame, event) {
        var eventIndex = savedGame.currentEvents.findIndex(function (ev) { return ev.id == event.id; });
        if (eventIndex >= 0)
            savedGame.currentEvents.splice(eventIndex, 1);
        StaticData.save(savedGame);
    };
    StaticData.removeBoss = function (savedGame, boss) {
        var bossIndex = savedGame.currentBosses.findIndex(function (ev) { return ev.id == boss.id; });
        if (bossIndex >= 0)
            savedGame.currentBosses.splice(bossIndex, 1);
        StaticData.save(savedGame);
    };
    StaticData.load = function () {
        var savedGame = JSON.parse(localStorage.getItem(StaticData.storageid_savedGame));
        return savedGame;
    };
    StaticData.save = function (savedGame) {
        localStorage.setItem(StaticData.storageid_savedGame, JSON.stringify(savedGame));
    };
    // UTIL
    StaticData.getNrOfSwarmCardsDrawn = function () {
        return StaticData.getNrOfPlayers() + (StaticData.getDifficulty() === "hard" ? 1 : 0);
    };
    StaticData.storageid_difficulty = "project_elite_companion_difficulty";
    StaticData.storageid_nrplayers = "project_elite_companion_nr_of_players";
    StaticData.storageid_savedGame = "project_elite_companion_saved_game";
    StaticData.storageid_timerSound = "project_elite_timer_sound";
    StaticData.storageid_roundTime = "project_elite_round_time";
    return StaticData;
}());
var JScreen = /** @class */ (function () {
    function JScreen(id) {
        this.div = $("<div id=\"".concat(id, "\" class=\"panel\"></div>"));
        $('body').append(this.div);
        this.div.hide();
    }
    JScreen.prototype.show = function () {
        var _a;
        (_a = JScreen.currentScreen) === null || _a === void 0 ? void 0 : _a.div.hide();
        JScreen.currentScreen = this;
        this.div.show();
    };
    return JScreen;
}());
///<reference path="Data.ts" />
///<reference path="JScreen.ts" />
var GameScreen = /** @class */ (function (_super) {
    __extends(GameScreen, _super);
    function GameScreen(main) {
        var _this = _super.call(this, "game") || this;
        _this.main = main;
        _this.currentEventBox = $("<div class=\"currentEventBox\"></div>");
        _this.currentBossesBox = $("<div class=\"currentBossesBox\"></div>");
        var footerBox = $("<div class=\"footerBox\"></div>");
        _this.tabBox = $("<div class=\"tabBox\"></div>");
        _this.overlay = $("<div id=\"overlay\"></div>");
        _this.overlay.hide();
        {
            var iconEvent = $("<div class=\"footerIcon\"><img src=\"./assets/images/dark/event2.svg\"></div>");
            var iconSpawn = $("<div class=\"footerIcon\"><img src=\"./assets/images/dark/alien.svg\"></div>");
            var iconAction = $("<div class=\"footerIcon\"><img src=\"./assets/images/dark/dice.svg\"></div>");
            var iconActivate = $("<div class=\"footerIcon\"><img src=\"./assets/images/dark/alien_move.svg\"></div>");
            var iconSettings = $("<div class=\"footerIcon\"><img src=\"./assets/images/dark/settings.svg\"></div>");
            _this.tabIcons = [iconEvent, iconSpawn, iconAction, iconActivate, iconSettings,];
            _this.tabIcons.forEach(function (tab, i) { return tab.on("click", function () { return _this.selectTab(i); }); });
            footerBox.append(iconEvent);
            footerBox.append(iconSpawn);
            footerBox.append(iconAction);
            footerBox.append(iconActivate);
            footerBox.append(iconSettings);
        }
        _this.div.append(_this.currentEventBox);
        _this.div.append(_this.currentBossesBox);
        _this.div.append(_this.tabBox);
        _this.div.append(footerBox);
        _this.div.append(_this.overlay);
        return _this;
    }
    GameScreen.prototype.selectTab = function (i) {
        var phase = i < phases.length ? phases[i] : "settings";
        console.log(phase);
        this.remakeCurrentEventsBox(phase);
        this.remakeCurrentBossesBox(i, phase);
        this.tabIcons.forEach(function (tabIcon) { return tabIcon.removeClass("selected"); });
        this.tabIcons[i].addClass("selected");
        this.tabBox.empty();
        switch (i) {
            case 0: return this.remakeTabEvent();
            case 1: return this.remakeTabSpawn();
            case 2: return this.remakeTabAction();
            case 3: return this.remakeTabActivation();
            case 4: return this.remakeTabSettings();
        }
    };
    GameScreen.prototype.remakeCurrentEventsBox = function (phase) {
        var _this = this;
        this.currentEventBox.empty();
        if (!phase || phase === "settings" || phase === "event")
            return;
        this.savedGame.currentEvents.forEach(function (ev) {
            if (ev.highlightPhase === phase || ev.highlightPhase === "all") {
                var eventDiv = _this.makeEvent(ev, true);
                _this.currentEventBox.append(eventDiv);
            }
        });
    };
    GameScreen.prototype.remakeCurrentBossesBox = function (currentTab, phase) {
        var _this = this;
        this.currentBossesBox.empty();
        if (!phase || phase === "settings" || phase === "spawn")
            return;
        this.savedGame.currentBosses.forEach(function (card) { return _this.currentBossesBox.append(_this.makeBoss(card, currentTab)); });
    };
    // EVENT PHASE
    GameScreen.prototype.makeEvent = function (eventCard, isMini, isLight) {
        var _this = this;
        if (isMini === void 0) { isMini = false; }
        if (isLight === void 0) { isLight = false; }
        if (!eventCard)
            return;
        var eventWrapper = $("<div class=\"eventWrapper\"></div>");
        var eventDiv = $("<div class=\"event".concat(isMini ? " mini open" : "", "\"></div>"));
        eventDiv.on('click', function () { return eventDiv.hasClass('open') ? eventDiv.removeClass('open') : eventDiv.addClass('open'); });
        var title = $("<h3>".concat(eventCard.name, "</h3>"));
        var rulesStr = isLight ? eventCard.rules.replace("images\\light", "images\\dark") : eventCard.rules;
        var rules = $("<div class=\"rules\">".concat(rulesStr, "</div>"));
        var iconsDiv = $("<div class=\"icons\"></div>");
        eventCard.icons.forEach(function (icon) {
            var iconDiv = $("<div class=\"icon\"><img src=\"./assets/images/dark/".concat(icon, ".svg\"></div>"));
            iconsDiv.append(iconDiv);
        });
        eventDiv.append(title);
        eventDiv.append(rules);
        eventDiv.append(iconsDiv);
        var markAsDoneButton = $("<div class=\"button\">Mark as Done</div>");
        markAsDoneButton.on('click', function () {
            StaticData.removeEvent(_this.savedGame, eventCard);
            _this.selectTab(0);
        });
        var buttons = $("<div class=\"buttons\"></div>");
        buttons.append(markAsDoneButton);
        eventWrapper.append(eventDiv);
        eventWrapper.append(buttons);
        return eventWrapper;
    };
    GameScreen.prototype.remakeTabEvent = function () {
        var _this = this;
        var drawEvent = function () {
            var event = StaticData.drawEvent(_this.savedGame);
            if (!event)
                return;
            _this.selectTab(0);
            _this.showOverlay(_this.makeEvent(event, false, true));
        };
        this.tabBox.attr("tab", "event");
        this.tabBox.append($("<h3>EVENT PHASE</h3>"));
        var drawEventButton = $("<div class=\"button\">DRAW EVENT (".concat(this.savedGame.eventDeck.length, ")</div>"));
        drawEventButton.on('click', function () { return drawEvent(); });
        this.savedGame.currentEvents.forEach(function (ev) { return _this.tabBox.append(_this.makeEvent(ev)); });
        this.tabBox.append(drawEventButton);
    };
    // SPAWN PHASE
    GameScreen.prototype.makeSwarm = function (swarmCard, index, fromOverlay) {
        if (fromOverlay === void 0) { fromOverlay = false; }
        if (!swarmCard)
            return;
        var div = $("<div class=\"swarm\" style=\"opacity:".concat(100 - index * 15, "%\"></div>"));
        var title = $("<h3>".concat(swarmCard.alienType, "</h3>"));
        var number = $("<div class=\"number\">".concat(swarmCard.number, "x</div>"));
        var location = $("<div class=\"location\"><div class=\"circle\">".concat(swarmCard.location === 0 ? "?" : swarmCard.location, "</div></div>"));
        div.append(number);
        div.append(title);
        div.append(location);
        if (swarmCard.activate) {
            var danger = $("<img class=\"danger\" src=\"./assets/images/".concat(fromOverlay ? "dark" : "light", "/danger.svg\">"));
            location.append(danger);
        }
        return div;
    };
    GameScreen.prototype.makeBoss = function (bossCard, currentTab, isMini, fromOverlay) {
        var _this = this;
        if (isMini === void 0) { isMini = false; }
        if (fromOverlay === void 0) { fromOverlay = false; }
        if (!bossCard || bossCard.currentHealth <= 0)
            return;
        var light = fromOverlay ? "dark" : "light";
        var div = $("<div class=\"boss".concat(isMini ? " mini" : "", "\"></div>"));
        var title = $("<h3>".concat(bossCard.name, "</h3>"));
        var image = $("<img src=\"./assets/images/boss/".concat(light, "/").concat(bossCard.id, ".svg\">"));
        var rulesStr = fromOverlay ? bossCard.rules.replace("images\\light", "images\\dark") : bossCard.rules;
        var rules = $("<div class=\"rules\">".concat(rulesStr, "</div>"));
        var icons = $("<div class=\"icons\">\n                <div class=\"health\"><img src=\"./assets/images/".concat(light, "/health.svg\">").concat(bossCard.currentHealth, "</div>\n                <div class=\"activate").concat(bossCard.activate ? "" : " hide", "\"><img src=\"./assets/images/").concat(light, "/danger.svg\"></div>\n                <div class=\"movement\"><img src=\"./assets/images/").concat(light, "/alien_move.svg\">").concat(bossCard.movement, "</div>\n            </div>"));
        var left = $("<div class=\"left\"></div>");
        var right = $("<div class=\"right\"></div>");
        var row = $("<div class=\"row\"></div>");
        left.append(image);
        right.append(rules);
        row.append(left);
        row.append(right);
        div.append(title);
        div.append(row);
        div.append(icons);
        {
            var gotoTab_1 = currentTab;
            var addDamage_1 = function (v) {
                StaticData.addDamageToBoss(_this.savedGame, bossCard.id, v);
                _this.selectTab(gotoTab_1);
            };
            var buttons = $("<div class=\"buttons\"></div>");
            var leftButton = $("<div class=\"leftButton\"></div>");
            var rightButton = $("<div class=\"rightButton\"></div>");
            leftButton.on('click', function () { return addDamage_1(1); });
            rightButton.on('click', function () { return addDamage_1(-1); });
            buttons.append(leftButton);
            buttons.append(rightButton);
            div.append(buttons);
        }
        return div;
    };
    GameScreen.prototype.remakeTabSpawn = function () {
        var _this = this;
        var drawSwarmCard = function () {
            var swarmCard = StaticData.drawSwarm(_this.savedGame);
            if (!swarmCard)
                return;
            _this.selectTab(1);
            _this.showOverlay(_this.makeSwarm(swarmCard, 0, true));
        };
        var drawBossCard = function () {
            var bossCard = StaticData.drawBoss(_this.savedGame);
            if (!bossCard)
                return;
            _this.selectTab(1);
        };
        this.tabBox.attr("tab", "spawn");
        var drawSwarmCardButton = $("<div class=\"button\">DRAW SWARM (".concat(this.savedGame.swarmDeck.length, ")</div>"));
        drawSwarmCardButton.on('click', drawSwarmCard);
        var drawBossCardButton = $("<div class=\"button\">DRAW BOSS (".concat(this.savedGame.bossDeck.length, ")</div>"));
        drawBossCardButton.on('click', drawBossCard);
        (__spreadArray([], this.savedGame.drawnSwarms, true))
            .reverse()
            .splice(0, StaticData.getNrOfSwarmCardsDrawn())
            .forEach(function (card, index) { return _this.tabBox.prepend(_this.makeSwarm(card, index)); });
        this.tabBox.prepend($("<h3>ALIEN SPAWN</h3>"));
        this.tabBox.append(drawSwarmCardButton);
        this.tabBox.append($("<div class=\"separator\"><div/>"));
        this.savedGame.currentBosses.forEach(function (card) { return _this.tabBox.append(_this.makeBoss(card, 1)); });
        this.tabBox.append(drawBossCardButton);
    };
    GameScreen.prototype.stopTimer = function (shouldStopAudio) {
        var _a;
        clearInterval(this.timerInterval);
        this.savedGame.timerEnd = undefined;
        this.timer.html("00:00");
        if (shouldStopAudio)
            (_a = this.audio) === null || _a === void 0 ? void 0 : _a.pause();
    };
    GameScreen.prototype.intervalStep = function () {
        if (this.savedGame.timerEnd === undefined)
            this.stopTimer(false);
        var milisLeft = (this.savedGame.timerEnd - Date.now());
        if (milisLeft < 1000) {
            this.timer.html("00:00");
            this.audio = new Audio("./assets/sounds/".concat(StaticData.getTimerSound(), ".mp3"));
            this.audio.play();
            this.stopTimer(false);
        }
        var secondsLeft = Math.floor(milisLeft / 1000) % 60;
        var minutesLeft = Math.floor(milisLeft / 1000 / 60);
        this.timer.html((minutesLeft > 9 ? minutesLeft : "0" + minutesLeft) + ":" + (secondsLeft > 9 ? secondsLeft : "0" + secondsLeft));
    };
    GameScreen.prototype.startTimer = function () {
        var _this = this;
        this.stopTimer(true);
        this.savedGame.timerEnd = Date.now() + StaticData.getRoundTime();
        if (this.savedGame.currentEvents.find(function (ev) { return ev.id === 11; }))
            this.savedGame.timerEnd -= 20000;
        this.timerInterval = setInterval(function () { return _this.intervalStep(); }, 1000 / 60);
    };
    GameScreen.prototype.remakeTabAction = function () {
        var _this = this;
        this.tabBox.attr("tab", "action");
        this.tabBox.append($("<h3>ACTION PHASE</h3>"));
        this.timer = $("<div class=\"timer\">00:00</div>");
        var startButton = $("<div class=\"button\">START</div>");
        var stopButton = $("<div class=\"button\">STOP</div>");
        startButton.on('click', function () { return _this.startTimer(); });
        stopButton.on('click', function () { return _this.stopTimer(true); });
        var buttonsRow = $("<div class=\"buttonsRow\"></div>");
        buttonsRow.append(startButton);
        buttonsRow.append(stopButton);
        this.tabBox.append(this.timer);
        this.tabBox.append(buttonsRow);
    };
    // ACTIVATION PHASE
    GameScreen.prototype.remakeTabActivation = function () {
        this.tabBox.attr("tab", "activation");
        this.tabBox.append($("<h3>ALIEN ACTIVATION</h3>"));
        this.tabBox.append($("<div class=\"activationPart\">\n            <h4>ABILITY</h4>\n            <h5>players choose order by category</h5>\n            <div class=\"gridBox\">\n                <div class=\"cell\">\n                    <div>shooters</div>\n                    <div class=\"icons\">\n                        <img src=\"./assets/images/light/broadcast.svg\">\n                        <img src=\"./assets/images/light/pin.svg\">\n                        <span class=\"textIcon\">2</span>\n                    </div>\n                </div>\n                \n                <div class=\"cell\">\n                    <div>biters</div>\n                    <div class=\"icons\">\n                        <img src=\"./assets/images/light/broadcast.svg\">\n                        <img src=\"./assets/images/light/pin.svg\">\n                        <span class=\"textIcon\">1</span>\n                    </div>\n                </div>\n                \n                <div class=\"cell\">\n                    <div>bosses</div>\n                    <div class=\"icons\">\n                        <span class=\"textIcon\">?</span>\n                    </div>\n                </div>\n            </div>\n        </div>"));
        var isPlusOneMovement = this.savedGame.currentEvents.find(function (ev) { return ev.id == 4; });
        this.tabBox.append($("<div class=\"activationPart\">\n            <h4>MOVE</h4>\n            <h5>players choose order by alien</h5>\n            <div class=\"gridBox twoCols\">\n                <div class=\"cell\">\n                    <div>shooters</div>\n                    <div class=\"icons\">\n                        <img src=\"./assets/images/light/alien_move.svg\">\n                    </div>\n                    <div class=\"extra\">".concat(isPlusOneMovement ? '<span>+1</span>' : "", "</div>\n                </div>\n                \n                <div class=\"cell\">\n                    <div>biters</div>\n                    <div class=\"icons\">\n                        <img src=\"./assets/images/light/alien_move.svg\">\n                        <img src=\"./assets/images/light/alien_move.svg\">\n                    </div>\n                    <div class=\"extra\">").concat(isPlusOneMovement ? '<span>+1</span>' : "", "</div>\n                </div>\n                \n                <div class=\"cell\">\n                    <div>runners</div>\n                    <div class=\"icons\">\n                        <img src=\"./assets/images/light/alien_move.svg\">\n                        <img src=\"./assets/images/light/alien_move.svg\">\n                        <img src=\"./assets/images/light/alien_move.svg\">\n                    </div>\n                    <div class=\"extra\">").concat(isPlusOneMovement ? '<span>+1</span>' : "", "</div>\n                </div>\n                \n                <div class=\"cell\">\n                    <div>bosses</div>\n                    <div class=\"icons\">\n                        <span class=\"textIcon\">?</span>\n                        <div class=\"extra\">").concat(isPlusOneMovement ? '<span>+1</span>' : "", "</div>\n                    </div>\n                </div>\n            </div>\n        </div>")));
    };
    GameScreen.prototype.remakeTabSettings = function () {
        var buttonFullscreen = $("<div class=\"button\">Fullscreen</div>");
        buttonFullscreen.on('click', Util.fullscreen);
        var buttonLeave = $("<div class=\"button\">Leave Game</div>");
        buttonLeave.on('click', function () { return location.reload(); });
        var buttonsDiv = $("<div class=\"buttons\"></div>");
        buttonsDiv.append(buttonFullscreen);
        buttonsDiv.append(buttonLeave);
        this.tabBox.attr("tab", "settings");
        this.tabBox.append($("<h3>SETTINGS</h3>"));
        this.tabBox.append(buttonsDiv);
    };
    GameScreen.prototype.showOverlay = function (content) {
        var _this = this;
        var closeButton = $("<div class=\"button dark\">CLOSE</div>");
        closeButton.on('click', function () { return _this.overlay.hide(); });
        this.overlay.empty();
        this.overlay.append(content);
        this.overlay.append(closeButton);
        this.overlay.show();
    };
    GameScreen.prototype.show = function () {
        _super.prototype.show.call(this);
        this.savedGame = StaticData.load();
        if (!this.savedGame)
            this.savedGame = StaticData.initSavedGame();
        this.selectTab(0);
    };
    return GameScreen;
}(JScreen));
///<reference path="Data.ts" />
///<reference path="JScreen.ts" />
function makeSelect(options) {
    var select = $("<select></select>");
    options.forEach(function (o) { return select.append($("<option value=\"".concat(o, "\">").concat(o, "</option>"))); });
    return select;
}
var MenuScreen = /** @class */ (function (_super) {
    __extends(MenuScreen, _super);
    function MenuScreen(main) {
        var _this = _super.call(this, "menu") || this;
        _this.main = main;
        var wrapper = $("<div class=\"menuWrapper\"></div>");
        { // MENU
            _this.newGameButton = $("<a>New Game</a>");
            var continueButton = $("<a>Continue</a>");
            var settingsButton = $("<a>Settings</a>");
            var rulesButton = $("<a>Rules</a>");
            _this.newGameButton.on("click", function () { return _this.startNewGame(); });
            continueButton.on("click", function () { return _this.continueSavedGame(); });
            settingsButton.on("click", function () { return _this.showSettings(); });
            rulesButton.on("click", function () { return _this.showRules(); });
            if (!StaticData.load())
                continueButton.addClass("disabled");
            var menuBox = $("<div class=\"menuBox box\"></div>");
            menuBox.append(_this.newGameButton);
            menuBox.append(continueButton);
            menuBox.append(settingsButton);
            menuBox.append(rulesButton);
            wrapper.append(menuBox);
        }
        { // SETTINGS
            var title = $("<h3>Settings</h3>");
            _this.nrPlayersButton = $("<a>".concat(StaticData.getNrOfPlayers(), " Players</a>"));
            _this.difficultyButton = $("<a>".concat(_this.getDiffString(), "</a>"));
            _this.timerSoundButton = $("<a>".concat(StaticData.getTimerSound().replace("_", " "), "</a>"));
            _this.roundTimeButton = $("<a>".concat(_this.getRoundTimeString(), "</a>"));
            var fullscreenButton = $("<a>Fullscreen</a>");
            var backButton = $("<a>Back</a>");
            _this.nrPlayersButton.on("click", function () { return _this.changeNrPlayers(); });
            _this.difficultyButton.on("click", function () { return _this.changeDifficulty(); });
            _this.timerSoundButton.on("click", function () { return _this.changeTimerSound(); });
            _this.roundTimeButton.on("click", function () { return _this.changeRoundTimer(); });
            fullscreenButton.on("click", function () { return Util.fullscreen(); });
            backButton.on("click", function () { return _this.goBack(); });
            var settingsBox = $("<div class=\"settingsBox box\"></div>");
            settingsBox.append(title);
            settingsBox.append(_this.nrPlayersButton);
            settingsBox.append(_this.difficultyButton);
            settingsBox.append(_this.timerSoundButton);
            settingsBox.append(_this.roundTimeButton);
            settingsBox.append(fullscreenButton);
            settingsBox.append(backButton);
            wrapper.append(settingsBox);
        }
        { // RULES
            var title = $("<h3 class=\"title\">Rules</h3>");
            var downloadButton = $("<a href=\"./assets/rulebook.pdf\">Download</a>");
            // const rules = $(`<iframe src="./assets/rulebook.pdf" frameborder="0">`);
            var rules = $("<iframe src=\"http://docs.google.com/gview?url=https://cdn.1j1ju.com/medias/a8/51/97-project-elite-rulebook.pdf&embedded=true\" frameborder=\"0\"></iframe>");
            var backButton = $("<a>Back</a>");
            backButton.on("click", function () { return _this.goBack(); });
            var rulesBox = $("<div class=\"rulesBox box\"></div>");
            rulesBox.append(title);
            rulesBox.append(rules);
            // rulesBox.append(downloadButton);
            rulesBox.append(backButton);
            wrapper.append(rulesBox);
        }
        _this.div.append($("<img class=\"titleImage\" src=\"./assets/images/title2.svg\">"));
        _this.div.append(wrapper);
        var footer = $("<div class=\"footer\"><span style=\"float:left\"></span><span>version 0.1</span><span style=\"float:right\"></span></div>");
        _this.div.append(footer);
        _this.goBack();
        return _this;
    }
    MenuScreen.prototype.showSettings = function () {
        // $('.titleImage').hide();
        $('#menu').attr("menu", "settings");
        $('.menuBox').hide();
        $('.settingsBox').show();
        $('.rulesBox').hide();
    };
    MenuScreen.prototype.showRules = function () {
        Util.fullscreen();
        $('#menu').attr("menu", "rules");
        // $('.titleImage').hide();
        $('.menuBox').hide();
        $('.settingsBox').hide();
        $('.rulesBox').show();
    };
    MenuScreen.prototype.goBack = function () {
        $('#menu').attr("menu", "menu");
        // $('.titleImage').show();
        $('.menuBox').show();
        $('.settingsBox').hide();
        $('.rulesBox').hide();
    };
    MenuScreen.prototype.changeNrPlayers = function () {
        StaticData.toggleNrOfPlayers();
        this.nrPlayersButton.html("".concat(StaticData.getNrOfPlayers(), "  Players"));
    };
    MenuScreen.prototype.changeDifficulty = function () {
        StaticData.toggleDifficulty();
        this.difficultyButton.html(this.getDiffString());
    };
    MenuScreen.prototype.changeRoundTimer = function () {
        StaticData.toggleRoundTime();
        this.roundTimeButton.html(this.getRoundTimeString());
    };
    MenuScreen.prototype.changeTimerSound = function () {
        var _this = this;
        StaticData.toggleTimerSound();
        var val = StaticData.getTimerSound();
        this.timerSoundButton.html(val.replace("_", " "));
        if (this.audio)
            this.audio.pause();
        if (this.timeout)
            clearTimeout(this.timeout);
        this.audio = new Audio("./assets/sounds/".concat(val, ".mp3"));
        this.audio.play();
        this.timeout = setTimeout(function () { return _this.audio.pause(); }, 2000);
    };
    MenuScreen.prototype.getDiffString = function () {
        var diff = StaticData.getDifficulty();
        return diff === "medium" ? "Medium" : diff === "hard" ? "Hard" : "Easy";
    };
    MenuScreen.prototype.getRoundTimeString = function () {
        var roundTime = StaticData.getRoundTime();
        var secondsLeft = Math.floor(roundTime / 1000) % 60;
        var minutesLeft = Math.floor(roundTime / 1000 / 60);
        return (minutesLeft > 9 ? minutesLeft : "0" + minutesLeft) + ":" + (secondsLeft > 9 ? secondsLeft : "0" + secondsLeft);
    };
    MenuScreen.prototype.continueSavedGame = function () {
        if (!StaticData.load())
            return;
        this.main.gameScreen.show();
    };
    MenuScreen.prototype.startNewGame = function () {
        var _this = this;
        if (this.sure || !StaticData.load()) {
            StaticData.initSavedGame();
            this.main.gameScreen.show();
        }
        else {
            this.sure = true;
            this.newGameButton.html("SURE?");
            this.newGameButton.addClass("sure");
            setTimeout(function () {
                _this.sure = false;
                _this.newGameButton.html("New Game");
                _this.newGameButton.removeClass("sure");
            }, 2000);
        }
    };
    return MenuScreen;
}(JScreen));
///<reference path="Data.ts" />
///<reference path="MenuScreen.ts" />
///<reference path="GameScreen.ts" />
var Main = /** @class */ (function () {
    function Main() {
        this.menuScreen = new MenuScreen(this);
        this.gameScreen = new GameScreen(this);
        this.menuScreen.show();
        // setTimeout(() => this.menuScreen.startNewGame(), 333);
        // setTimeout(() => this.menuScreen.continueSavedGame(), 333);
        // setTimeout(() => {
        //     StaticData.drawEvent(this.gameScreen.savedGame);
        //     StaticData.drawEvent(this.gameScreen.savedGame);
        //     StaticData.drawEvent(this.gameScreen.savedGame);
        // }, 666);
        // setTimeout(() => this.gameScreen.selectTab(1), 666);
    }
    return Main;
}());
new Main();
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
    Util.fullscreen = function () {
        var element = document.body;
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        if (requestMethod)
            requestMethod.call(element);
    };
    return Util;
}());
