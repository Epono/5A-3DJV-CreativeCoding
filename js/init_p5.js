var music = null;
var sounds = {};
var mySoundAnalyser = null;

//////////////////////////////////////////////////////////////////////////////////// TRUCS PROCESSING
function preload() {
    music = loadSound("assets/musics/Lancelot - You'll Never Be Mine.mp3", function () {
        console.log('Music loaded !');
        music.setVolume(0.1);
        music.play();

        mySoundAnalyser = new p5.FFT();
    });
    music.setVolume(0.1);

    sounds['W'] = loadSound('assets/sounds/drumkit1.mp3');
    sounds['W'].setVolume(1);

    sounds['X'] = loadSound('assets/sounds/drumkit2.mp3');
    sounds['X'].setVolume(1);

    sounds['C'] = loadSound('assets/sounds/drumkit3.mp3');
    sounds['C'].setVolume(1);

    sounds['V'] = loadSound('assets/sounds/drumkit4.mp3');
    sounds['V'].setVolume(1);

    sounds['B'] = loadSound('assets/sounds/HINHINHIN.mp3');
    sounds['B'].setVolume(0.5);

    sounds['N'] = loadSound('assets/sounds/non.mp3');
    sounds['N'].setVolume(0.5);

    // Pour cacher le cnnvas processing
    $('#p5_loading').hide();
    $('#defaultCanvas0').hide();
}

function setup() {
    // Pour le chargement de la musique
}