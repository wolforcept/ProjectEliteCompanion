class UiManager {

    addSwarmCardToFlip(onReveal: () => void) {
        const card = this.generateCardToFlip(
            front => {
                front.append($(`<img src="../assets/cards/card_event_back.png">`))
            },
            back => {
                back.append($(`<h3 id="new-event-card-name"></h3>`));
                back.append($(`<div id="new-event-card-icons"></div>`));
                back.append($(`<div id="new-event-card-rules"></div>`));
                back.append($(`<img id="new-event-card-face" src="../assets/cards/card_event_empty.png">`));
            },
            onReveal
        );
        $("#phase-spawn .cards").append(card);
    }

    addEventCardToFlip(onReveal: () => void) {
        const card = this.generateCardToFlip(
            front => {
                front.append($(`<img src="../assets/cards/card_event_back.png">`))
            },
            back => {
                back.append($(`<h3 id="new-event-card-name"></h3>`));
                back.append($(`<div id="new-event-card-icons"></div>`));
                back.append($(`<div id="new-event-card-rules"></div>`));
                back.append($(`<img id="new-event-card-face" src="../assets/cards/card_event_empty.png">`));
            },
            onReveal
        );
        $("#phase-event .cards").append(card);
    }

    generateCardToFlip(
        addToFront: (front: JQuery<HTMLElement>) => void,
        addToBack: (back: JQuery<HTMLElement>) => void,
        onReveal: () => void
    ): JQuery<HTMLElement> {
        const flipcard = $(`<div class="flipcard"></div>`);
        const inner = $(`<div class="flipcard-inner"></div>`);
        const front = $(`<div class="flipcard-front"></div>`);
        front.on("click", () => {
            flipcard.addClass("flipped");
            onReveal();
        });
        const back = $(`<div class="flipcard-back"></div>`);
        addToFront(front);
        addToBack(back);
        inner.append(front);
        inner.append(back);
        flipcard.append(inner);
        return flipcard;
    }

    updateCurrentEvents(currentPhase: Phase, currentEvents: EventCard[]) {
        if (currentEvents.length === 0) {
            $("#events").hide();
            return;
        }
        $("#events").show();
        const events = $("#currentEvents");
        events.empty();
        currentEvents.forEach(event => {
            const div = $(`<div class="current-event"></div>`);

            const title = $(`<div class=".title">${event.name}</div>`);
            div.append(title);

            const icons = $(`<div class="icons"></div>`);
            div.append(icons);

            const rules = $(`<div class="rules">${event.rules}</div>`);
            div.append(rules);

            event.icons.forEach(iconName => {
                if (event.simple)
                    icons.append(`<img src="../assets/svgs/${iconName}.svg" class="current-events-icon white">`)
                else
                    icons.append(`<img src="../assets/pngs/icon_red_${iconName}.png" class="current-events-icon">`)
            })

            if (event.highlightPhase === currentPhase) div.addClass("highlighted");

            events.append(div);
        })
    }

    enableButton(phase: Phase, enable: boolean = true) {
        if (enable)
            $(`#phase-${phase} button`).removeClass("disabled");
        else
            $(`#phase-${phase} button`).addClass("disabled");

    }

    isButtonDisabled(phase: string): boolean {
        return $(`#phase-${phase} button`).hasClass("disabled");
    }

    showMainMenu() {
        $('#title').show();
        $('#settings').show();
        $('#menu').show();

        $('#content').hide();
    }

    setSetting(setting: Setting, value: any) {
        $(`#setting-${setting} select`).val(value).trigger("change");
    }

    resetGame() {
        this.updateCurrentEvents("event", []);
        this.resetPhases();
        this.showContent();
        this.showPhase("event");
    }

    showContent() {
        $('#title').hide();
        $('#settings').hide();
        $('#menu').hide();

        $('#content').show();
    }

    showPhase(phase: Phase) {
        phases.forEach(p => $('#phase-' + p).hide());
        $('#phase-' + phase).show();
        $(`.selected`).removeClass("selected");
        $(`.selected`).removeClass("selected");
        $(`.phaseIcon.${phase}`).addClass("selected");
    }

    resetPhases() {
        $("#phase-event button").addClass("disabled");
        $("#phase-spawn button").addClass("disabled");
        $("#phase-boss button").addClass("disabled");
        $("#phase-action button").addClass("disabled");
        $("#phase-ability button").addClass("disabled");
        $("#phase-movement button").addClass("disabled");
        $("#phase-check button").addClass("disabled");
    }

    // EVENT PHASE

    setNewEvent(event: EventCard, nPlayers: number) {
        console.log({ event })
        // $("#new-event-card-face").attr("src", event.name);
        $('#new-event-card-name').text(event.name);
        const icons = $('#new-event-card-icons');
        icons.empty();
        event.icons.forEach((element, i) => {
            if ((i + 1) > nPlayers) return
            if (event.simple)
                icons.append(`<img src="../assets/svgs/${element}.svg" class="card-icon white">`)
            else
                icons.append(`<img src="../assets/pngs/icon_red_${element}.png" class="card-icon">`)
        });
        $("#new-event-card-rules").text(event.rules);
    }

}