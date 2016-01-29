/* global OBJECTS_FRONT */
//////////////////////////////////////////////////////////////////////////////////// "UPDATE" CLAVIER
document.addEventListener('keydown', function (evt) {
    if (evt.keyCode >= 65 && evt.keyCode <= 90 && evt.shiftKey) {
        if (sounds[String.fromCharCode(evt.keyCode)]) {
            sounds[String.fromCharCode(evt.keyCode)].play();
        }

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });

        var nombreMagique = Math.pow(2, evt.keyCode - 64);

        Math.seedrandom(nombreMagique + startTime);

        var radius = 10;
        var numberOfObjects = 5;

        for (var i = 0; i < numberOfObjects; i++) {
            options[i].position.x = (Math.random() - 0.5) * radius;
            options[i].position.y = (Math.random() - 0.5) * radius;
            options[i].position.z = (Math.random() - 0.5) * radius;
        }

        particleSystemEnabled = true;

        setTimeout(function () {
            for (var i = 0; i < numberOfObjects; i++) {
                //SCENE.remove(objects[i]);
                particleSystemEnabled = false;
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
    } else if (evt.keyCode === 100) {
        skyboxRotationEnabled = !skyboxRotationEnabled;
    } else if (evt.keyCode === 102) {
        rotationFrontObjects = rotationFrontObjectsMax;
    }
});

//////////////////////////////////////////////////////////////////////////////////// UPDATE (SOURIS ET LOGIC)
function update() {
    deltaTime = Date.now() - previousTime;
    elapsedTime += deltaTime;
    previousTime = Date.now();

    for (var i = 0; i < OBJECTS_MID.length; i++) {
        OBJECTS_MID[i].rotation.y += move;
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

    //////////////////////////////////////////////////////LUCAS TEST////////////////////////////
    //Modification des couleures en fonction du son
    if (mySoundAnalyser) {
        var analyseResult = mySoundAnalyser.analyze(1024);
        var basse = mySoundAnalyser.getEnergy("bass");
        var treble = mySoundAnalyser.getEnergy("treble");
        var mid = mySoundAnalyser.getEnergy("mid");
        //console.log(mySoundAnalyser.getEnergy("bass") / 255.0);
        uniformsObjFront.colors.value.x = 1.0; //mySoundAnalyser.getEnergy("bass") / 255.0;
        uniformsObjFront.colors.value.y = mySoundAnalyser.getEnergy("mid") / 255.0;
        uniformsObjFront.colors.value.z = 0.7; // mySoundAnalyser.getEnergy("treble") / 255.0;

        uniformsObjMid.colors.value.x = 0.0; //mySoundAnalyser.getEnergy("bass") / 255.0;
        uniformsObjMid.colors.value.y = 0.9;
        uniformsObjMid.colors.value.z = 0.5; // mySoundAnalyser.getEnergy("treble") / 255.0;


        uniformsObjBack.colors.value.x = 0.6; //mySoundAnalyser.getEnergy("bass") / 255.0;
        uniformsObjBack.colors.value.y = 0.0;
        uniformsObjBack.colors.value.z = 0.0; // mySoundAnalyser.getEnergy("treble") / 255.0;

        uniformsSphere.colors.value.x = 24 / 255; //mySoundAnalyser.getEnergy("bass") / 255.0;
        uniformsSphere.colors.value.y = 234 / 255;
        uniformsSphere.colors.value.z = 245 / 255; // mySoundAnalyser.getEnergy("treble") / 255.0;

        var sphereScale = basse / 100;
        if (mouseSpeed > 0) {
            OBJ_SPHERE.scale.x = sphereScale;
            OBJ_SPHERE.scale.y = sphereScale;
            OBJ_SPHERE.scale.z = sphereScale;
        }

        for (var index = 0; index < OBJECTS_MID.length; index += 1) {
            if (analyseResult[index] > 0) {
                OBJECTS_MID[index].scale.z = analyseResult[index];
            }
        }

        for (var index = 0; index < OBJECTS_FRONT.length; index += 1) {
            if (basse / 20 > 0) {
                OBJECTS_FRONT[index].scale.x = basse / 20;
            }
        }

        for (var index = 0; index < OBJECTS_MID.length; index += 5) {
            if (mid * 3 > 0) {
                OBJECTS_BACK[index].scale.y = mid * 3;
            }
        }

        OBJ_SKYBOX.scale.x = basse / 300;
        OBJ_SKYBOX.scale.y = basse / 300;
        OBJ_SKYBOX.scale.z = basse / 300;
    }

    if (skyboxRotationEnabled) {
        OBJ_SKYBOX.rotateX(0.01);
        OBJ_SKYBOX.rotateY(0.02);
        OBJ_SKYBOX.rotateZ(0.03);
    }

    if (OBJ_SKYBOX2) {
        OBJ_SKYBOX2.rotateX(-0.03);
        OBJ_SKYBOX2.rotateY(-0.02);
        OBJ_SKYBOX2.rotateZ(-0.01);
    }

    uniformsSkyboxLeft.time.value = (elapsedTime / 900.);
    uniformsSkyboxRight.time.value = (elapsedTime / 800.);
    uniformsSkyboxTop.time.value = (elapsedTime / 1000.);
    uniformsSkyboxBottom.time.value = (elapsedTime / 1200.);
    uniformsSkyboxBack.time.value = (elapsedTime / 1100.);
    uniformsSkyboxFront.time.value = (elapsedTime / 1000.);

    if (rotationFrontObjects > 0) {
        for (var i = 0; i < OBJECTS_FRONT.length; i++) {
            OBJECTS_FRONT[i].rotateX(rotationFrontObjectsStep);
        }
        rotationFrontObjects -= rotationFrontObjectsStep;
    }

    // PARTICLES
    var delta = clock.getDelta() * spawnerOptions.timeScale;
    tick += delta;

    if (tick < 0) tick = 0;

    if (delta > 0 && particleSystemEnabled) {
        for (var i = 0; i < 5; i++) {
            for (var x = 0, maxLoop = spawnerOptions.spawnRate * delta; x < maxLoop; x++) {
                particleSystems[i].spawnParticle(options[i]);
            }
        }
    }

    for (var i = 0; i < 5; i++) {
        particleSystems[i].update(tick);
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