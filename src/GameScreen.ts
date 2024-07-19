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
        const phase: Phase | "settings" = i < phases.length ? phases[i] : "settings";
        console.log(phase);
        this.remakeCurrentEventsBox(phase);
        this.remakeCurrentBossesBox(i, phase);
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

    remakeCurrentEventsBox(phase: Phase | "settings") {
        this.currentEventBox.empty();
        if (!phase || phase === "settings" || phase === "event") return;
        this.savedGame.currentEvents.forEach(ev => {
            if (ev.highlightPhase === phase || ev.highlightPhase === "all") {
                const eventDiv = this.makeEvent(ev, true);
                this.currentEventBox.append(eventDiv);
            }
        });
    }

    remakeCurrentBossesBox(currentTab: number, phase: Phase | "settings") {
        this.currentBossesBox.empty();
        if (!phase || phase === "settings" || phase === "spawn") return;
        this.savedGame.currentBosses.forEach(card => this.currentBossesBox.append(this.makeBoss(card, currentTab)));
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

    makeSwarm(swarmCard: SwarmCard, index: number, fromOverlay = false) {
        if (!swarmCard) return;

        const div = $(`<div class="swarm" style="opacity:${100 - index * 15}%"></div>`);
        const title = $(`<h3>${swarmCard.alienType}</h3>`);
        const number = $(`<div class="number">${swarmCard.number}x</div>`);
        const location = $(`<div class="location"><div class="circle">${swarmCard.location === 0 ? "?" : swarmCard.location}</div></div>`);

        div.append(number);
        div.append(title);
        div.append(location);

        if (swarmCard.activate) {
            const danger = $(`<img class="danger" src="./assets/images/${fromOverlay ? "dark" : "light"}/danger.svg">`);
            location.append(danger);
        }

        return div;
    }

    makeBoss(bossCard: SavedBossCard, currentTab: number, isMini = false, fromOverlay = false) {
        if (!bossCard || bossCard.currentHealth <= 0) return;

        const light = fromOverlay ? "dark" : "light";

        const div = $(`<div class="boss${isMini ? " mini" : ""}"></div>`);

        const title = $(`<h3>${bossCard.name}</h3>`);
        const image = $(`<img src="./assets/images/boss/${light}/${bossCard.id}.svg">`);
        const rulesStr = fromOverlay ? bossCard.rules.replace("images\\light", "images\\dark") : bossCard.rules;
        const rules = $(`<div class="rules">${rulesStr}</div>`);
        const icons = $(`<div class="icons">
                <div class="health"><img src="./assets/images/${light}/health.svg">${bossCard.currentHealth}</div>
                <div class="activate${bossCard.activate ? "" : " hide"}"><img src="./assets/images/${light}/danger.svg"></div>
                <div class="movement"><img src="./assets/images/${light}/alien_move.svg">${bossCard.movement}</div>
            </div>`);

        const left = $(`<div class="left"></div>`);
        const right = $(`<div class="right"></div>`);
        const row = $(`<div class="row"></div>`);

        left.append(image);
        right.append(rules);

        row.append(left);
        row.append(right);

        div.append(title);
        div.append(row);
        div.append(icons);

        {
            const gotoTab = currentTab;
            const addDamage = (v: number) => {
                StaticData.addDamageToBoss(this.savedGame, bossCard.id, v);
                this.selectTab(gotoTab);
            }
            const buttons = $(`<div class="buttons"></div>`);
            const leftButton = $(`<div class="leftButton"></div>`);
            const rightButton = $(`<div class="rightButton"></div>`);
            leftButton.on('click', () => addDamage(1));
            rightButton.on('click', () => addDamage(-1));
            buttons.append(leftButton);
            buttons.append(rightButton);
            div.append(buttons);
        }

        return div;
    }

    remakeTabSpawn() {

        const drawSwarmCard = () => {
            const swarmCard: SwarmCard | undefined = StaticData.drawSwarm(this.savedGame);
            if (!swarmCard) return;
            this.selectTab(1);
            this.showOverlay(this.makeSwarm(swarmCard, 0, true));
        }

        const drawBossCard = () => {
            const bossCard: BossCard | undefined = StaticData.drawBoss(this.savedGame);
            if (!bossCard) return;
            this.selectTab(1);
        }

        this.tabBox.attr("tab", "spawn");

        const drawSwarmCardButton = $(`<div class="button">DRAW SWARM (${this.savedGame.swarmDeck.length})</div>`);
        drawSwarmCardButton.on('click', drawSwarmCard);
        const drawBossCardButton = $(`<div class="button">DRAW BOSS (${this.savedGame.bossDeck.length})</div>`);
        drawBossCardButton.on('click', drawBossCard);
        ([...this.savedGame.drawnSwarms])
            .reverse()
            .splice(0, StaticData.getNrOfSwarmCardsDrawn())
            .forEach((card: SwarmCard, index: number) => this.tabBox.prepend(this.makeSwarm(card, index)));

        this.tabBox.prepend($(`<h3>ALIEN SPAWN</h3>`));
        this.tabBox.append(drawSwarmCardButton);
        this.tabBox.append($(`<div class="separator"><div/>`));
        this.savedGame.currentBosses.forEach((card: SavedBossCard) => this.tabBox.append(this.makeBoss(card, 1)));
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