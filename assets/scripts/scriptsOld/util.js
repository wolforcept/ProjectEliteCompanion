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
