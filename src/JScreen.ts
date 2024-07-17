abstract class JScreen {

    private static currentScreen: JScreen;

    protected div: JQuery<HTMLElement>;

    constructor(id: string) {
        this.div = $(`<div id="${id}" class="panel"></div>`);
        $('body').append(this.div);
        this.div.hide();
    }

    public show() {
        JScreen.currentScreen?.div.hide();
        JScreen.currentScreen = this;
        this.div.show();
    }

}