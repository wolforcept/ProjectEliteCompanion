
function loopAudio(isLoop) {
    document.getElementById("myAudio").loop = isLoop;
}

function changeAudio(newAudioSource) {
    var myAudioSource = document.getElementById('myAudioSource');
    myAudioSource.src = "../assets/alarms/" + newAudioSource + ".mp3";
    var myAudio = document.getElementById("myAudio");
    myAudio.load(); //call this to just preload the audio without playing
}

function playAudio() {
    var myAudio = document.getElementById("myAudio");
    myAudio.play();
}

function pauseAudio() {
    var myAudio = document.getElementById("myAudio");
    myAudio.pause();
}

function stopAudio() {
    var myAudio = document.getElementById("myAudio");
    myAudio.pause();
    myAudio.currentTime = 0;
}