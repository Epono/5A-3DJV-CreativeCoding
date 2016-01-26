var SCENE = null;
var CAMERA = null;
var RENDERER = null;
var OBJECT = null;
var KEYBOARD = null;
var CANVAS = null;

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

function init() {
    SCENE = new THREE.Scene();

    CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    RENDERER = new THREE.WebGLRenderer();
    RENDERER.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(RENDERER.domElement);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
    OBJECT = new THREE.Mesh(geometry, material);

    SCENE.add(OBJECT);

    CAMERA.position.z = 5;

    KEYBOARD = new THREEx.KeyboardState();

    CANVAS = RENDERER.domElement;

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
}

function render() {
    //// UPDATE
    // KEYBOARD
    if (KEYBOARD.pressed("a") || KEYBOARD.pressed("z") || KEYBOARD.pressed("e") || KEYBOARD.pressed("r") || KEYBOARD.pressed("t") || KEYBOARD.pressed("y") || KEYBOARD.pressed("u") || KEYBOARD.pressed("i") || KEYBOARD.pressed("o") || KEYBOARD.pressed("p") || KEYBOARD.pressed("q") || KEYBOARD.pressed("s") || KEYBOARD.pressed("d") || KEYBOARD.pressed("f") || KEYBOARD.pressed("g") || KEYBOARD.pressed("h") || KEYBOARD.pressed("j") || KEYBOARD.pressed("k") || KEYBOARD.pressed("l") || KEYBOARD.pressed("m") || KEYBOARD.pressed("w") || KEYBOARD.pressed("x") || KEYBOARD.pressed("c") || KEYBOARD.pressed("v") || KEYBOARD.pressed("b") || KEYBOARD.pressed("n")) {
        //console.log(KEYBOARD.keyCodes);

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
        var obj = new THREE.Mesh(geometry, material);

        var nombreMagique = 0;
        for (var i = 0; i < 26; i++) {
            if (KEYBOARD.keyCodes[65 + i]) {
                nombreMagique += Math.pow(2, i);
            }
        }

        Math.seedrandom(nombreMagique);
        console.log(Math.random());
        console.log(Math.random());
        console.log(Math.random());
        console.log(Math.random());

        var radius = 10;
        obj.position.x = (Math.random() - 0.5) * radius;
        obj.position.y = (Math.random() - 0.5) * radius;

        // TODO: Faire toutes ces modifs en fonction du nombre magique, et pas du random
        obj.material.color.r = Math.random();
        obj.material.color.g = Math.random();
        obj.material.color.b = Math.random();

        obj.scale.x = Math.random();
        obj.scale.y = Math.random();
        obj.scale.z = Math.random();

        obj.rotation.x = Math.random();
        obj.rotation.y = Math.random();
        obj.rotation.z = Math.random();

        SCENE.add(obj);

        setTimeout(function () {
            SCENE.remove(obj);

        }, 1000);
    }

    // MOUSE
    if (mouse.leftDown) {
        OBJECT.position.x += mouse.deltaPos.x * mouseSpeed;
        OBJECT.position.y -= mouse.deltaPos.y * mouseSpeed;
    }

    // OTHER
    OBJECT.rotation.x += 0.05;
    OBJECT.rotation.y += 0.05;

    // RENDER
    requestAnimationFrame(render);

    RENDERER.render(SCENE, CAMERA);
}

$(document).ready(function () {
    init();
    render();
});



var CustomRandom = function (nseed) {

    var seed,
        constant = Math.pow(2, 13) + 1,
        prime = 37,
        maximum = Math.pow(2, 50);

    if (nseed) {
        seed = nseed;
    }

    if (seed == null) {
        //if there is no seed, use timestamp
        seed = (new Date()).getTime();
    }

    return {
        next: function () {
            seed *= constant;
            seed += prime;
            seed %= maximum;

            return seed;
        }
    }
}