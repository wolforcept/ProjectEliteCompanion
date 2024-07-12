

//
//
//

const SETTING_nr_players = "SETTING_nr_players";
// const SETTING_animations = "SETTING_animations";
const SETTING_difficulty = "SETTING_difficulty";
const SETTING_round_time = "SETTING_round_time";
const SETTING_alarm = "SETTING_alarm";
const SETTING_alarm_loop = "SETTING_alarm_loop";
const SETTING_warnings = "SETTING_warnings";
const SETTING_animations = "SETTING_animations";

var firstTimeSettingAlarmDoesntRing = false;
function setSetting(setting, value) {
    localStorage.setItem(setting, value + "");

    if (("SETTING_" + setting) === SETTING_alarm_loop) {
        loopAudio(value === "on" ? true : false);
    }

    if (("SETTING_" + setting) === "setting-alarm") {
        if (!firstTimeSettingAlarmDoesntRing) {
            changeAudio(value);
            playAudio();
            setTimeout(() => {
                stopAudio();
            }, 2000);
        } else {
            firstTimeSettingAlarmDoesntRing = true;
        }
    }
}

function getSetting(setting) {
    const ret = localStorage.getItem(setting);
    if (ret !== null)
        return ret;
    switch (setting) {
        case SETTING_nr_players: return '4';
        case SETTING_round_time: return '120';
        case SETTING_alarm: return 'alarm_1';
        case SETTING_alarm_loop: return 'off';
        case SETTING_difficulty: return 'easy';
        case SETTING_warnings: return '0';
        case SETTING_animations: return 'on';
    }
}

//
//
//

function setGameData(id, value) {
    localStorage.setItem("gameData-" + id, value);
}

function getGameData(id) {
    return localStorage.getItem("gameData-" + id);
}


const DATA_turn = "turn";

function setTurn(turn) {
    setGameData(DATA_turn, turn);
}

function getTurn() {
    return getGameData(DATA_turn);
}

//

const DATA_round = "round";

function setRound(round) {
    setGameData(DATA_round, round);
}

function getRound() {
    return getGameData(DATA_round);
}


//

const DATA_eventDeck = "event_deck";

function initEventDeck() {
    switch (getSetting(SETTING_difficulty)) { }
    setGameData(DATA_eventDeck, [...makeEventsEasy])
}
function setRound(round) {
    setGameData(DATA_eventDeck, round);
}

function getRound() {
    return getGameData(DATA_eventDeck);
}
