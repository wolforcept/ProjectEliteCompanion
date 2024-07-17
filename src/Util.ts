class Util {

    static shuffle<T>(array: Array<T>): Array<T> {
        let currentIndex = array.length;
        let randomIndex: number;
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    static fullscreen() {
        var element: any = document.body;
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        if (requestMethod) requestMethod.call(element);
    }

}