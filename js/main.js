// Pour les FPS
javascript: (function () {
    var script = document.createElement('script');
    script.onload = function () {
        var stats = new Stats();
        stats.domElement.style.cssText = 'position:fixed;left:0;top:0;z-index:10000';
        document.body.appendChild(stats.domElement);
        requestAnimationFrame(function loop() {
            stats.update();
            requestAnimationFrame(loop)
        });
    };
    script.src = '//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
    document.head.appendChild(script);
})()

//////////////////////////////////////////////////////////////////////////////////// LES VARIABLES GLOBALES C'EST LE BIEN
var SCENE = null;
var CAMERA = null;
var RENDERER = null;
var OBJECT = null;
var CANVAS = null;
var CONTROLS = null;

var mouseSpeed = 0.02;
var mouse = {
    pos: {
        x: 0,
        y: 0
    },
    deltaPos: {
        x: 0,
        y: 0
    },
    leftDown: false,
    middleButton: false,
    rightDown: false
}

// Pour faire une simulation unique à chaque lancement (en plus du nombreMagique)
var startTime = Date.now();

var music = null;
var sounds = {};

//////////////////////////////////////////////////////////////////////////////////// TRUCS PROCESSING
function preload() {
    music = loadSound('assets/music/titanium.mp3', function () {
        console.log('Music loaded !')
    });
    music.setVolume(0.1);

    sounds['A'] = loadSound('assets/sounds/A - AAAAH.mp3');
    sounds['A'].setVolume(0.1);

    sounds['B'] = loadSound('assets/sounds/B - bass.mp3');
    sounds['B'].setVolume(0.1);

    sounds['F'] = loadSound('assets/sounds/F - batard.mp3');
    sounds['F'].setVolume(0.1);

    sounds['H'] = loadSound('assets/sounds/H - HINHINHIN.mp3');
    sounds['H'].setVolume(0.1);

    sounds['K'] = loadSound('assets/sounds/K - Keuwa.mp3');
    sounds['K'].setVolume(0.2);

    sounds['M'] = loadSound('assets/sounds/M - mais je comprends pas.wav');
    sounds['M'].setVolume(0.2);

    sounds['N'] = loadSound('assets/sounds/N - non.mp3');
    sounds['N'].setVolume(0.2);

    sounds['S'] = loadSound('assets/sounds/S - You got completely shitfaced.wav');
    sounds['S'].setVolume(0.2);

    // Pour cacher le cnnvas processing
    $('#p5_loading').hide();
    $('#defaultCanvas0').hide();
}

function setup() {
    // Pour le chargement de la musique
}
var date = Date.now();
//////////////////////////////////////////////////////////////////////////////////// INIT SCENE
function init() {
    SCENE = new THREE.Scene();

    CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    RENDERER = new THREE.WebGLRenderer();
    RENDERER.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(RENDERER.domElement);

    var geometry = new THREE.BoxGeometry(1, 1, 1);

    // Material de base
    var material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });

    // Material avec des shaders
    var vShader = document.getElementById('shader-vs');
    var fShader = document.getElementById('shader-fs');
    material = new THREE.ShaderMaterial({

        vertexShader: vShader.textContent,
        fragmentShader: fShader.textContent
    });

    OBJECT = new THREE.Mesh(geometry, material);

    SCENE.add(OBJECT);

    CAMERA.position.z = 5;

    CANVAS = RENDERER.domElement;

    SCENE.fog = new THREE.FogExp2(0xcccccc, 0.002);
    RENDERER.setClearColor(SCENE.fog.color);

    CONTROLS = new THREE.OrbitControls(CAMERA, RENDERER.domElement);
    CONTROLS.enableDamping = true;
    CONTROLS.dampingFactor = 0.25;

    // MOUSE
    CANVAS.addEventListener('mousemove', function (evt) {
        var rect = CANVAS.getBoundingClientRect();

        var oldMousePos = mouse.pos;

        mouse.pos = {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };

        if (mouse.leftDown || mouse.middleButton || mouse.rightDown) {
            mouse.deltaPos = {
                x: mouse.pos.x - oldMousePos.x,
                y: mouse.pos.y - oldMousePos.y,
            }
        }
    }, false);

    CANVAS.addEventListener('mousedown', function (evt) {
        switch (event.button) {
        case 0:
            mouse.leftDown = true;
            break;
        case 1:
            mouse.middleButton = true;
            break;
        case 2:
            mouse.rightDown = true;
            break;
        }
    }, false);

    CANVAS.addEventListener('mouseup', function (evt) {
        switch (event.button) {
        case 0:
            mouse.leftDown = false;
            break;
        case 1:
            mouse.middleButton = false;
            break;
        case 2:
            mouse.rightDown = false;
            break;
        }
    }, false);

    window.addEventListener('resize', function () {
        CAMERA.aspect = window.innerWidth / window.innerHeight;
        CAMERA.updateProjectionMatrix();

        RENDERER.setSize(window.innerWidth, window.innerHeight);
    }, false);
}

//////////////////////////////////////////////////////////////////////////////////// "UPDATE" CLAVIER
document.addEventListener('keydown', function (evt) {
    if (evt.keyCode >= 65 && evt.keyCode <= 90) {
        if (sounds[String.fromCharCode(evt.keyCode)]) {
            sounds[String.fromCharCode(evt.keyCode)].play();
        }

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });

        var nombreMagique = Math.pow(2, evt.keyCode - 64);

        Math.seedrandom(nombreMagique + startTime);

        var radius = 20;
        var numberOfObjects = 40;

        var objects = [];

        for (var i = 0; i < numberOfObjects; i++) {
            var obj = new THREE.Mesh(geometry, material);

            obj.position.x = (Math.random() - 0.5) * radius;
            obj.position.y = (Math.random() - 0.5) * radius;
            obj.position.z = (Math.random() - 0.5) * radius;

            obj.scale.x = Math.random();
            obj.scale.y = Math.random();
            obj.scale.z = Math.random();

            obj.rotation.x = Math.random();
            obj.rotation.y = Math.random();
            obj.rotation.z = Math.random();

            obj.material.color.r = Math.random();
            obj.material.color.g = Math.random();
            obj.material.color.b = Math.random();

            SCENE.add(obj);

            objects.push(obj);
        }

        setTimeout(function () {
            for (var i = 0; i < numberOfObjects; i++) {
                SCENE.remove(objects[i]);
            }
        }, 200);
    }

    if (evt.keyCode === 101) {
        if (music.isLoaded()) {
            if (music.isPlaying()) {
                music.stop();
            } else {
                music.loop();
            }
        }
    }
});

//////////////////////////////////////////////////////////////////////////////////// UPDATE (SOURIS ET LOGIC)
function update() {

}

//////////////////////////////////////////////////////////////////////////////////// RENDER
function render() {
    // TODO: Faire un update avec une fréquence fixe
    update();

    // RENDER
    requestAnimationFrame(render);
    RENDERER.render(SCENE, CAMERA);
}


//////////////////////////////////////////////////////////////////////////////////// Le début quoi
$(document).ready(function () {
    init();
    render();
});