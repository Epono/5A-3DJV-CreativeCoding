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
    for (var i = 0; i < OBJECTS_FRONT.length; i++) {
        //OBJECTS_FRONT[i].position.x += move;
    }

    for (var i = 0; i < OBJECTS_FRONT.length; i += 2) {
        //OBJECTS_FRONT[i].position.x += move;
        OBJECTS_FRONT[i].scale.x += scaleValue;
    }

    for (var i = 1; i < OBJECTS_FRONT.length; i += 5) {
        //OBJECTS_FRONT[i].position.x += move;
        OBJECTS_FRONT[i].scale.x += scaleValue + anotherScaleValue;
        OBJECTS_MID[i].scale.z += scaleValue + anotherScaleValue * 9;
        OBJECTS_BACK[i].scale.y += scaleValue + anotherAnotherScaleValue * 3;
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

        OBJ_SPHERE.scale.x = yolo / 100;
        OBJ_SPHERE.scale.y = yolo / 100;
        OBJ_SPHERE.scale.z = yolo / 100;
    }
}

//////////////////////////////////////////////////////////////////////////////////// RENDER
function run() {
    update();
    requestAnimationFrame(run);
    RENDERER.render(SCENE, CAMERA);
}

//////////////////////////////////////////////////////////////////////////////////// Le début quoi
$(document).ready(function () {
    init();
    run();
});