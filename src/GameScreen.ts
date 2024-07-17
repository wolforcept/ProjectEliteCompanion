///<reference path="Data.ts" />
///<reference path="JScreen.ts" />

class GameScreen extends JScreen {

    savedGame: SavedGame;

    // currentEventDiv: JQuery<HTMLElement>;
    tabIcons: Array<JQuery<HTMLElement>>;
    tabBox: JQuery<HTMLElement>;
    currentEventBox: JQuery<HTMLElement>;
    currentBossesBox: JQuery<HTMLElement>;
    overlay: JQuery<HTMLElement>;

    constructor(private main: Main) {
        super("game");

        this.currentEventBox = $(`<div class="currentEventBox"></div>`);
        this.currentBossesBox = $(`<div class="currentBossesBox"></div>`);
        const footerBox = $(`<div class="footerBox"></div>`);
        this.tabBox = $(`<div class="tabBox"></div>`);
        this.overlay = $(`<div id="overlay"></div>`);
        this.overlay.hide();

        {
            const iconEvent = $(`<div class="footerIcon"><img src="./assets/images/dark/event2.svg"></div>`);
            const iconSpawn = $(`<div class="footerIcon"><img src="./assets/images/dark/alien.svg"></div>`);
            const iconAction = $(`<div class="footerIcon"><img src="./assets/images/dark/dice.svg"></div>`);
            const iconActivate = $(`<div class="footerIcon"><img src="./assets/images/dark/alien_move.svg"></div>`);
            const iconSettings = $(`<div class="footerIcon"><img src="./assets/images/dark/settings.svg"></div>`);

            this.tabIcons = [iconEvent, iconSpawn, iconAction, iconActivate, iconSettings,];
            this.tabIcons.forEach((tab, i) => tab.on("click", () => this.selectTab(i)));

            footerBox.append(iconEvent);
            footerBox.append(iconSpawn);
            footerBox.append(iconAction);
            footerBox.append(iconActivate);
            footerBox.append(iconSettings);
        }

        this.div.append(this.currentEventBox);
        this.div.append(this.currentBossesBox);
        this.div.append(this.tabBox);
        this.div.append(footerBox);
        this.div.append(this.overlay);
    }

    selectTab(i: number) {
        this.remakeCurrentEventsBox(i < phases.length ? phases[i] : undefined);
        this.remakeCurrentBossesBox();
        this.tabIcons.forEach(tabIcon => tabIcon.removeClass("selected"));
        this.tabIcons[i].addClass("selected");
        this.tabBox.empty();
        switch (i) {
            case 0: return this.remakeTabEvent();
            case 1: return this.remakeTabSpawn();
            case 2: return this.remakeTabAction();
            case 3: return this.remakeTabActivation();
            case 4: return this.remakeTabSettings();
        }
    }

    remakeCurrentEventsBox(phase?: Phase) {
        this.currentEventBox.empty();
        if (!phase) return;
        this.savedGame.currentEvents.forEach(ev => {
            if (ev.highlightPhase === phase || phase === "event" || ev.highlightPhase === "all") {
                const eventDiv = this.makeEvent(ev, true);
                this.currentEventBox.append(eventDiv);
            }
        });
    }

    remakeCurrentBossesBox(phase?: Phase) {
        this.currentBossesBox.empty();
        if (!phase) return;
        this.savedGame.currentBosses.forEach(ev => this.currentEventBox.append(this.makeBoss(ev)));
    }

    makeBoss(bossCard: BossCard, isMini = false, isLight = false) {
        if (!bossCard) return;

        const eventDiv = $(`<div class="event${isMini ? " mini" : ""}"></div>`);

        const title = $(`<h3>${bossCard.name}</h3>`);
        const rulesStr = isLight ? bossCard.rules.replace("images\\light", "images\\dark") : bossCard.rules;
        const rules = $(`<div class="rules">${rulesStr}</div>`);
        console.log(bossCard.rules)

        // const iconsDiv = $(`<div class="icons"></div>`);
        // bossCard.icons.forEach(icon => {
        //     const iconDiv = $(`<div class="icon"><img src="./assets/images/dark/${icon}.svg"></div>`);
        //     iconsDiv.append(iconDiv);
        // })

        eventDiv.append(title);
        eventDiv.append(rules);
        // eventDiv.append(iconsDiv);
        return eventDiv;
    }

    // EVENT PHASE

    makeEvent(eventCard: EventCard, isMini = false, isLight = false) {
        if (!eventCard) return;

        const eventWrapper = $(`<div class="eventWrapper"></div>`);

        const eventDiv = $(`<div class="event${isMini ? " mini open" : ""}"></div>`);
        eventDiv.on('click', () => eventDiv.hasClass('open') ? eventDiv.removeClass('open') : eventDiv.addClass('open'));

        const title = $(`<h3>${eventCard.name}</h3>`);
        const rulesStr = isLight ? eventCard.rules.replace("images\\light", "images\\dark") : eventCard.rules;
        const rules = $(`<div class="rules">${rulesStr}</div>`);
        const iconsDiv = $(`<div class="icons"></div>`);
        eventCard.icons.forEach(icon => {
            const iconDiv = $(`<div class="icon"><img src="./assets/images/dark/${icon}.svg"></div>`);
            iconsDiv.append(iconDiv);
        })

        eventDiv.append(title);
        eventDiv.append(rules);
        eventDiv.append(iconsDiv);

        const markAsDoneButton = $(`<div class="button">Mark as Done</div>`);
        markAsDoneButton.on('click', () => {
            StaticData.removeEvent(this.savedGame, eventCard);
            this.selectTab(0);
        });
        const buttons = $(`<div class="buttons"></div>`);
        buttons.append(markAsDoneButton);
        eventWrapper.append(eventDiv);
        eventWrapper.append(buttons);

        return eventWrapper;
    }

    remakeTabEvent() {

        const drawEvent = () => {
            const event = StaticData.drawEvent(this.savedGame);
            if (!event) return;
            this.selectTab(0);
            this.showOverlay(this.makeEvent(event, false, true));
        }

        this.tabBox.attr("tab", "event");
        this.tabBox.append($(`<h3>EVENT PHASE</h3>`));

        const drawEventButton = $(`<div class="button">DRAW EVENT (${this.savedGame.eventDeck.length})</div>`);
        drawEventButton.on('click', () => drawEvent());

        this.savedGame.currentEvents.forEach((ev: EventCard) => this.tabBox.append(this.makeEvent(ev)));

        this.tabBox.append(drawEventButton);
    }

    // SPAWN PHASE

    remakeTabSpawn() {

        const drawSwarmCard = () => {
            const swarmCard: SwarmCard | undefined = StaticData.drawSwarm(this.savedGame);
            if (!swarmCard) return;
            this.selectTab(1);
            // show last drawn swarm cards
        }

        const drawBossCard = () => {
            const bossCard: BossCard | undefined = StaticData.drawBoss(this.savedGame);
            if (!bossCard) return;
            this.selectTab(1);
            // show last drawn swarm cards
        }

        this.tabBox.attr("tab", "spawn");
        this.tabBox.append($(`<h3>ALIEN SPAWN</h3>`));

        const drawSwarmCardButton = $(`<div class="button">DRAW SWARM (${this.savedGame.swarmDeck.length})</div>`);
        drawSwarmCardButton.on('click', () => drawSwarmCard());
        const drawBossCardButton = $(`<div class="button">DRAW BOSS (${this.savedGame.bossDeck.length})</div>`);
        drawBossCardButton.on('click', () => drawBossCard());

        // draw last boss and swarm cards
        // this.savedGame.currentEvents.forEach((ev: EventCard) => this.tabBox.append(this.makeEvent(ev)));

        this.tabBox.append(drawSwarmCardButton);
        this.tabBox.append(drawBossCardButton);

    }

    // ACTION PHASE

    timerInterval: number;
    timer: JQuery<HTMLElement>;
    audio: HTMLAudioElement;

    stopTimer(shouldStopAudio: boolean) {
        clearInterval(this.timerInterval);
        this.savedGame.timerEnd = undefined;
        this.timer.html("00:00");
        if (shouldStopAudio) this.audio?.pause();
    }

    intervalStep() {
        if (this.savedGame.timerEnd === undefined) this.stopTimer(false);
        const milisLeft = (this.savedGame.timerEnd - Date.now());
        if (milisLeft < 1000) {
            this.timer.html("00:00");
            this.audio = new Audio(`./assets/sounds/${StaticData.getTimerSound()}.mp3`);
            this.audio.play();
            this.stopTimer(false);
        }
        const secondsLeft = Math.floor(milisLeft / 1000) % 60;
        const minutesLeft = Math.floor(milisLeft / 1000 / 60);
        this.timer.html((minutesLeft > 9 ? minutesLeft : "0" + minutesLeft) + ":" + (secondsLeft > 9 ? secondsLeft : "0" + secondsLeft));
    }

    startTimer() {
        this.stopTimer(true);
        this.savedGame.timerEnd = Date.now() + StaticData.getRoundTime();
        if (this.savedGame.currentEvents.find(ev => ev.id === 11))
            this.savedGame.timerEnd -= 20000;
        this.timerInterval = setInterval(() => this.intervalStep(), 1000 / 60)
    }

    remakeTabAction() {

        this.tabBox.attr("tab", "action");
        this.tabBox.append($(`<h3>ACTION PHASE</h3>`));
        this.timer = $(`<div class="timer">00:00</div>`);

        const startButton = $(`<div class="button">START</div>`);
        const stopButton = $(`<div class="button">STOP</div>`);
        startButton.on('click', () => this.startTimer());
        stopButton.on('click', () => this.stopTimer(true));

        const buttonsRow = $(`<div class="buttonsRow"></div>`);
        buttonsRow.append(startButton);
        buttonsRow.append(stopButton);

        this.tabBox.append(this.timer);
        this.tabBox.append(buttonsRow);
    }

    // ACTIVATION PHASE

    remakeTabActivation() {
        this.tabBox.attr("tab", "activation");
        this.tabBox.append($(`<h3>ALIEN ACTIVATION</h3>`));
        this.tabBox.append($(`<div class="activationPart">
            <h4>ABILITY</h4>
            <h5>players choose order by category</h5>
            <div class="gridBox">
                <div class="cell">
                    <div>shooters</div>
                    <div class="icons">
                        <img src="./assets/images/light/broadcast.svg">
                        <img src="./assets/images/light/pin.svg">
                        <span class="textIcon">2</span>
                    </div>
                </div>
                
                <div class="cell">
                    <div>biters</div>
                    <div class="icons">
                        <img src="./assets/images/light/broadcast.svg">
                        <img src="./assets/images/light/pin.svg">
                        <span class="textIcon">1</span>
                    </div>
                </div>
                
                <div class="cell">
                    <div>bosses</div>
                    <div class="icons">
                        <span class="textIcon">?</span>
                    </div>
                </div>
            </div>
        </div>`));

        const isPlusOneMovement = this.savedGame.currentEvents.find(ev => ev.id == 4);
        this.tabBox.append($(`<div class="activationPart">
            <h4>MOVE</h4>
            <h5>players choose order by alien</h5>
            <div class="gridBox twoCols">
                <div class="cell">
                    <div>shooters</div>
                    <div class="icons">
                        <img src="./assets/images/light/alien_move.svg">
                    </div>
                    <div class="extra">${isPlusOneMovement ? '<span>+1</span>' : ""}</div>
                </div>
                
                <div class="cell">
                    <div>biters</div>
                    <div class="icons">
                        <img src="./assets/images/light/alien_move.svg">
                        <img src="./assets/images/light/alien_move.svg">
                    </div>
                    <div class="extra">${isPlusOneMovement ? '<span>+1</span>' : ""}</div>
                </div>
                
                <div class="cell">
                    <div>runners</div>
                    <div class="icons">
                        <img src="./assets/images/light/alien_move.svg">
                        <img src="./assets/images/light/alien_move.svg">
                        <img src="./assets/images/light/alien_move.svg">
                    </div>
                    <div class="extra">${isPlusOneMovement ? '<span>+1</span>' : ""}</div>
                </div>
                
                <div class="cell">
                    <div>bosses</div>
                    <div class="icons">
                        <span class="textIcon">?</span>
                        <div class="extra">${isPlusOneMovement ? '<span>+1</span>' : ""}</div>
                    </div>
                </div>
            </div>
        </div>`));

    }

    remakeTabSettings() {

        const buttonFullscreen = $(`<div class="button">Fullscreen</div>`);
        buttonFullscreen.on('click', Util.fullscreen);

        const buttonLeave = $(`<div class="button">Leave Game</div>`);
        buttonLeave.on('click', () => location.reload());

        const buttonsDiv = $(`<div class="buttons"></div>`);
        buttonsDiv.append(buttonFullscreen);
        buttonsDiv.append(buttonLeave);

        this.tabBox.attr("tab", "settings");
        this.tabBox.append($(`<h3>SETTINGS</h3>`));
        this.tabBox.append(buttonsDiv);
    }

    showOverlay(content: JQuery<HTMLElement>) {

        const closeButton = $(`<div class="button dark">CLOSE</div>`);
        closeButton.on('click', () => this.overlay.hide());

        this.overlay.empty();
        this.overlay.append(content);
        this.overlay.append(closeButton);

        this.overlay.show();
    }

    override show(): void {
        super.show();

        this.savedGame = StaticData.load();
        if (!this.savedGame) this.savedGame = StaticData.initSavedGame();

        this.selectTab(0);
    }
}