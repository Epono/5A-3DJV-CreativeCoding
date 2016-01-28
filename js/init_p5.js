var music = null;
var sounds = {};
var mySoundAnalyser = null;

//////////////////////////////////////////////////////////////////////////////////// TRUCS PROCESSING
function preload() {
    music = loadSound('assets/musics/DJ Sona K.mp3', function () {
        console.log('Music loaded !');
        music.setVolume(0.1);
        music.play();

        mySoundAnalyser = new p5.FFT();
    });
    music.setVolume(0.1);

    sounds['A'] = loadSound('assets/sounds/A - AAAAH.mp3');
    sounds['A'].setVolume(0.1);

    sounds['B'] = loadSound('assets/sounds/B - bass.mp3');
    sounds['B'].setVolume(0.1);

    sounds['F'] = loadSound('assets/sounds/F - batard.mp3');
    sounds['F'].setVolume(1);

    sounds['H'] = loadSound('assets/sounds/H - HINHINHIN.mp3');
    sounds['H'].setVolume(0.1);

    sounds['K'] = loadSound('assets/sounds/K - Keuwa.mp3');
    sounds['K'].setVolume(0.2);

    sounds['M'] = loadSound('assets/sounds/M - mais je comprends pas.wav');
    sounds['M'].setVolume(0.2);

    sounds['N'] = loadSound('assets/sounds/N - non.mp3');
    sounds['N'].setVolume(0.2);

    sounds['S'] = loadSound('assets/sounds/S - You got completely shitfaced.wav');
    sounds['S'].setVolume(1);

    // Pour cacher le cnnvas processing
    $('#p5_loading').hide();
    $('#defaultCanvas0').hide();
}

function setup() {
    // Pour le chargement de la musique
}