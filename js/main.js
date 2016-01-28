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

var MaxValue = 2;
var MinValue = 0;
var actualValue = 0;
var move = 0.01;
var actualScale = 0;
var scaleValue = 0.1;
var anotherScaleValue = 0.2;
var anotherAnotherScaleValue = 0.7;

var uniforms = {
    colors: {
        type: 'v3',
        value: new THREE.Vector3(0.0, 0.0, 0.0)
    },
    Alpha: {
        type: 'f',
        value: 1.0
    },
    light: {
        type: 'v3',
        value: new THREE.Vector3(0.5, 0.2, 1.0)
    }
};

var OBJECT2 = null;



var SKYBOX = null;
var OBJECTS = [];
var CIRCLEOBJECTS1 = [];
var CIRCLEOBJECTS2 = [];

var mySound = null;
var mySoundAnalyser = null;

//////////////////////////////////////////////////////////////////////////////////// TRUCS PROCESSING
function preload() {
    music = loadSound('assets/musics/Lancelot - You\'ll Never Be Mine.mp3', function () {
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

    //mySoundAnalyser.setInput(mySound);
}
var date = Date.now();
//////////////////////////////////////////////////////////////////////////////////// INIT SCENE
function init() {

    var geometry = new THREE.BoxGeometry(0.1, 0.2, 0.1);
    var geometry2 = new THREE.BoxGeometry(0.05, 0.1, 0.1);
    var geometry3 = new THREE.BoxGeometry(0.025, 0.05, 0.1);

    SCENE = new THREE.Scene();

    CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    RENDERER = new THREE.WebGLRenderer();
    RENDERER.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(RENDERER.domElement);



    CAMERA.position.z = 5;

    CANVAS = RENDERER.domElement;

    RENDERER.setClearColor(0xfff000);

    CONTROLS = new THREE.OrbitControls(CAMERA, RENDERER.domElement);
    CONTROLS.enableDamping = true;
    CONTROLS.dampingFactor = 0.25;









    //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.ShaderMaterial({
        uniforms: {
            Rcolor: {
                type: 'f',
                value: 0.6
            },
            Gcolor: {
                type: 'f',
                value: 0.1
            },
            Bcolor: {
                type: 'f',
                value: 0.3
            },
            Alpha: {
                type: 'f',
                value: 1.0
            }
        },
        vertexShader: document.getElementById("simple.vs").textContent,
        fragmentShader: document.getElementById("simple.fs").textContent


    });
    OBJECT = new THREE.Mesh(geometry, material);


    //var geometrySkybox = new THREE.BoxGeometry(10,10,10);
    var geometrySkybox = new THREE.PlaneGeometry(20, 20);
    var materialSkybox = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });


    //MY TEST ZONE

    var geometryObj = new THREE.SphereGeometry(1, 32, 32);
    var materialObj = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById("simple.vs").textContent,
        fragmentShader: document.getElementById("simple.fs").textContent


    });

    OBJECT2 = new THREE.Mesh(geometryObj, materialObj);

    SKYBOX = new THREE.Mesh(geometrySkybox, materialSkybox);



    //JON TEST

    var PI = 3.14;
    var theta_scale = 0.03;
    var i = 0;
    var j = 0;
    var k = 0;
    for (var theta = 0; theta < 2 * PI; theta += theta_scale) {
        var x = 3 * Math.cos(theta);
        var y = 3 * Math.sin(theta);
        OBJECTS[i] = new THREE.Mesh(geometry, materialObj);
        OBJECTS[i].position.x = x;
        OBJECTS[i].position.z = 0;
        OBJECTS[i].position.y = y;
        OBJECTS[i].rotation.z = theta;
        SCENE.add(OBJECTS[i]);
        i++;
    }

    for (var theta = 0; theta < 2 * PI; theta += theta_scale) {
        var x2 = 2 * Math.cos(theta);
        var y2 = 2 * Math.sin(theta);
        CIRCLEOBJECTS1[j] = new THREE.Mesh(geometry2, materialObj);
        CIRCLEOBJECTS1[j].position.x = x2;
        CIRCLEOBJECTS1[j].position.z = -3;
        CIRCLEOBJECTS1[j].position.y = y2;
        CIRCLEOBJECTS1[j].rotation.z = theta;

        SCENE.add(CIRCLEOBJECTS1[j]);
        j++;
    }
    for (var theta = 0; theta < 2 * PI; theta += theta_scale) {
        var x3 = 1 * Math.cos(theta);
        var y3 = 1 * Math.sin(theta);
        CIRCLEOBJECTS2[k] = new THREE.Mesh(geometry3, materialObj);
        CIRCLEOBJECTS2[k].position.x = x3;
        CIRCLEOBJECTS2[k].position.z = -5;
        CIRCLEOBJECTS2[k].position.y = y3;
        CIRCLEOBJECTS2[k].rotation.z = theta;

        SCENE.add(CIRCLEOBJECTS2[k]);
        k++;
    }
    //


    SCENE.add(OBJECT2);
    //SCENE.add(SKYBOX);









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

    for (var i = 0; i < OBJECTS.length; i++) {
        //OBJECTS[i].position.x += move;

    }

    for (var i = 0; i < OBJECTS.length; i += 2) {
        //OBJECTS[i].position.x += move;
        OBJECTS[i].scale.x += scaleValue;
    }
    for (var i = 1; i < OBJECTS.length; i += 5) {
        //OBJECTS[i].position.x += move;
        OBJECTS[i].scale.x += scaleValue + anotherScaleValue;
        CIRCLEOBJECTS1[i].scale.z += scaleValue + anotherScaleValue * 9;
        CIRCLEOBJECTS2[i].scale.y += scaleValue + anotherAnotherScaleValue * 3;
    }

    actualValue += move;
    actualScale += scaleValue;

    if (actualValue > MaxValue || actualValue < MinValue) {
        move *= -1;

    }

    if (actualScale > MaxValue || actualScale < MinValue) {
        scaleValue *= -1;
    }

    if (actualScale > 6 || actualScale < 0) {
        anotherScaleValue *= -1;
        anotherAnotherScaleValue *= -1
    }


    //Modification des couleures en fonction du son
    if (mySoundAnalyser) {
        var analyseResult = mySoundAnalyser.analyze();
        var yolo = mySoundAnalyser.getEnergy("bass");
        if (yolo > 185) {
            uniforms.colors.value.x = 1.0;

        } else {
            uniforms.colors.value.x = 0.0;
        }



        OBJECT2.scale.x = yolo / 100;
        OBJECT2.scale.y = yolo / 100;
        OBJECT2.scale.z = yolo / 100;
    }


    RENDERER.render(SCENE, CAMERA);
}


//////////////////////////////////////////////////////////////////////////////////// Le début quoi
$(document).ready(function () {
    init();
    render();
});