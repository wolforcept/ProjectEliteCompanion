///<reference path="Data.ts" />
///<reference path="JScreen.ts" />

function makeSelect(options: Array<string>) {
    const select = $(`<select></select>`);
    options.forEach(o => select.append($(`<option value="${o}">${o}</option>`)));
    return select;
}

class MenuScreen extends JScreen {

    newGameButton: JQuery<HTMLElement>;
    nrPlayersButton: JQuery<HTMLElement>;
    difficultyButton: JQuery<HTMLElement>;
    timerSoundButton: JQuery<HTMLElement>;
    roundTimeButton: JQuery<HTMLElement>;

    constructor(private main: Main) {
        super("menu");

        const wrapper = $(`<div class="menuWrapper"></div>`);

        { // MENU
            this.newGameButton = $(`<a>New Game</a>`);
            const continueButton = $(`<a>Continue</a>`);
            const settingsButton = $(`<a>Settings</a>`);
            const rulesButton = $(`<a>Rules</a>`);
            this.newGameButton.on("click", () => this.startNewGame());
            continueButton.on("click", () => this.continueSavedGame());
            settingsButton.on("click", () => this.showSettings());
            rulesButton.on("click", () => this.showRules());

            if (!StaticData.load()) continueButton.addClass("disabled");

            const menuBox = $(`<div class="menuBox box"></div>`);
            menuBox.append(this.newGameButton);
            menuBox.append(continueButton);
            menuBox.append(settingsButton);
            menuBox.append(rulesButton);

            wrapper.append(menuBox);
        }

        { // SETTINGS
            const title = $(`<h3>Settings</h3>`);
            this.nrPlayersButton = $(`<a>${StaticData.getNrOfPlayers()} Players</a>`);
            this.difficultyButton = $(`<a>${this.getDiffString()}</a>`);
            this.timerSoundButton = $(`<a>${StaticData.getTimerSound().replace("_", " ")}</a>`);
            this.roundTimeButton = $(`<a>${this.getRoundTimeString()}</a>`);
            const fullscreenButton = $(`<a>Fullscreen</a>`);
            const backButton = $(`<a>Back</a>`);

            this.nrPlayersButton.on("click", () => this.changeNrPlayers())
            this.difficultyButton.on("click", () => this.changeDifficulty())
            this.timerSoundButton.on("click", () => this.changeTimerSound())
            this.roundTimeButton.on("click", () => this.changeRoundTimer())
            fullscreenButton.on("click", () => Util.fullscreen())
            backButton.on("click", () => this.goBack())

            const settingsBox = $(`<div class="settingsBox box"></div>`);
            settingsBox.append(title);
            settingsBox.append(this.nrPlayersButton);
            settingsBox.append(this.difficultyButton);
            settingsBox.append(this.timerSoundButton);
            settingsBox.append(this.roundTimeButton);
            settingsBox.append(fullscreenButton);
            settingsBox.append(backButton);

            wrapper.append(settingsBox);
        }

        { // RULES
            const title = $(`<h3 class="title">Rules</h3>`);
            const downloadButton = $(`<a href="./assets/rulebook.pdf">Download</a>`);
            // const rules = $(`<iframe src="./assets/rulebook.pdf" frameborder="0">`);
            const rules = $(`<iframe src="http://docs.google.com/gview?url=https://cdn.1j1ju.com/medias/a8/51/97-project-elite-rulebook.pdf&embedded=true" frameborder="0"></iframe>`);
            const backButton = $(`<a>Back</a>`);
            backButton.on("click", () => this.goBack())

            const rulesBox = $(`<div class="rulesBox box"></div>`);
            rulesBox.append(title);
            rulesBox.append(rules);
            // rulesBox.append(downloadButton);
            rulesBox.append(backButton);

            wrapper.append(rulesBox);
        }

        this.div.append($(`<img class="titleImage" src="./assets/images/title2.svg">`));
        this.div.append(wrapper);
        const footer = $(`<div class="footer"><span style="float:left"></span><span>version 0.2</span><span style="float:right"></span></div>`);
        this.div.append(footer);

        this.goBack();
    }

    showSettings() {
        // $('.titleImage').hide();
        $('#menu').attr("menu", "settings");
        $('.menuBox').hide();
        $('.settingsBox').show();
        $('.rulesBox').hide();
    }

    showRules() {
        Util.fullscreen();
        $('#menu').attr("menu", "rules");
        // $('.titleImage').hide();
        $('.menuBox').hide();
        $('.settingsBox').hide();
        $('.rulesBox').show();
    }

    goBack() {
        $('#menu').attr("menu", "menu");
        // $('.titleImage').show();
        $('.menuBox').show();
        $('.settingsBox').hide();
        $('.rulesBox').hide();
    }

    changeNrPlayers() {
        StaticData.toggleNrOfPlayers();
        this.nrPlayersButton.html(`${StaticData.getNrOfPlayers()}  Players`);
    }

    changeDifficulty() {
        StaticData.toggleDifficulty();
        this.difficultyButton.html(this.getDiffString());
    }

    changeRoundTimer() {
        StaticData.toggleRoundTime();
        this.roundTimeButton.html(this.getRoundTimeString());
    }

    audio: HTMLAudioElement;
    timeout: number;

    changeTimerSound() {
        StaticData.toggleTimerSound();
        const val = StaticData.getTimerSound();
        this.timerSoundButton.html(val.replace("_", " "));

        if (this.audio) this.audio.pause();
        if (this.timeout) clearTimeout(this.timeout);
        this.audio = new Audio(`./assets/sounds/${val}.mp3`);
        this.audio.play();
        this.timeout = setTimeout(() => this.audio.pause(), 2000);
    }

    getDiffString() {
        const diff = StaticData.getDifficulty();
        return diff === "medium" ? "Medium" : diff === "hard" ? "Hard" : "Easy";
    }

    getRoundTimeString() {
        const roundTime = StaticData.getRoundTime();
        const secondsLeft = Math.floor(roundTime / 1000) % 60;
        const minutesLeft = Math.floor(roundTime / 1000 / 60);
        return (minutesLeft > 9 ? minutesLeft : "0" + minutesLeft) + ":" + (secondsLeft > 9 ? secondsLeft : "0" + secondsLeft);
    }

    continueSavedGame() {
        if (!StaticData.load()) return;
        this.main.gameScreen.show();
    }

    sure: boolean;
    startNewGame() {
        console.log("test")
        if (this.sure || !StaticData.load()) {
            this.main.setupScreen.init(()=>{
                StaticData.initSavedGame();
                this.main.gameScreen.show();
            });
        } else {
            this.sure = true;
            this.newGameButton.html("SURE?");
            this.newGameButton.addClass("sure");
            setTimeout(() => {
                this.sure = false;
                this.newGameButton.html("New Game");
                this.newGameButton.removeClass("sure");
            }, 2000)
        }
    }
}
