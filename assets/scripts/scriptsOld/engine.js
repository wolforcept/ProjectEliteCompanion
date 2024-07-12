function startActionPhase() {
    const duration = 6;
    var endTime = Date.now() + duration * 1000;
    let timerVar;
    timerVar = setInterval(() => {
        const time = Math.floor((endTime - Date.now()) / 1000);
        if (time <= 0) {
            showTimer("0:00")
            clearInterval(timerVar)
            return;
        }
        console.log(time);
        const mins = Math.floor(time / 60);
        let secs = time % 60;
        if (secs <= 9)
            secs = "0" + secs;
        showTimer(mins + ":" + secs)
    }, 100)
}

function setObjectiveComplete() {

}

function nextTurn() {
    const newTurn = Number(getTurn()) + 1;
    showPhase('event');
    setTurn(newTurn);
    $("#turn").text(newTurn);
}

//
//

function showPhase(phaseName) {
    $("#phase-event").hide();
    $("#phase-spawn").hide();
    $("#phase-boss").hide();
    $("#phase-action").hide();
    $("#phase-activate").hide();
    $("#phase-move").hide();
    $("#phase-check").hide();
    $("#phase-" + phaseName).show();
    $(".phaseIcon.selected").removeClass("selected");
    $(".phaseIcon." + phaseName).addClass("selected");
}

function startNewGame() {
    setRound(1)

    if (getSetting("difficulty"))
        setGameData("eventDeck", [...makeEventsEasy()]);
    setGameData("currentEventCards", []);
    setGameData("eventCardsDiscarded", []);

    setGameData("swarmDeck", []);
    setGameData("currentSwarmCards", []);
    setGameData("swarmDiscard", []);

    setGameData("turn", 1);

    showContent();
    showPhase("event");
}
