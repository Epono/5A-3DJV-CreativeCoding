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

        //var objects = [];

        for (var i = 0; i < numberOfObjects; i++) {

            /*
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
            */

            //SCENE.add(particleSystem);

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

    for (var i = 0; i < OBJECTS_FRONT.length; i++) {
        //OBJECTS_FRONT[i].position.x += move;
    }

    for (var i = 0; i < OBJECTS_FRONT.length; i += 2) {
        //OBJECTS_FRONT[i].position.x += move;
        //OBJECTS_FRONT[i].scale.x += scaleValue;
    }

    for (var i = 1; i < OBJECTS_FRONT.length; i += 5) {
        //OBJECTS_FRONT[i].position.x += move;

        //OBJECTS_FRONT[i].scale.x += scaleValue + anotherScaleValue;
        //OBJECTS_MID[i].scale.z += scaleValue + anotherScaleValue * 9;
        //OBJECTS_BACK[i].scale.y += scaleValue + anotherAnotherScaleValue * 3;
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
        var basse = mySoundAnalyser.getEnergy("bass");
        var treble = mySoundAnalyser.getEnergy("treble");
        var mid = mySoundAnalyser.getEnergy("mid");
        //console.log(mySoundAnalyser.getEnergy("bass") / 255.0);
        uniforms.colors.value.x = mySoundAnalyser.getEnergy("bass") / 255.0;
        uniforms.colors.value.y = mySoundAnalyser.getEnergy("mid") / 255.0;
        uniforms.colors.value.z = mySoundAnalyser.getEnergy("treble") / 255.0;
        //        if (yolo > 185) {
        //            uniforms.colors.value.x = 1.0;
        //
        //        } else {
        //            uniforms.colors.value.x = 0.0;
        //        }

        OBJ_SPHERE.scale.x = basse / 200;
        OBJ_SPHERE.scale.y = basse / 200;
        OBJ_SPHERE.scale.z = basse / 200;

        for (var index = 0; index < OBJECTS_FRONT.length; index += 1) {
            if (basse > 0) {
                OBJECTS_FRONT[index].scale.x = basse / 5;
                //OBJECTS_FRONT[index].scale.y = basse / 80;
                //OBJECTS_FRONT[index].scale.z = basse / 5;
            }
        }

        for (var index = 0; index < OBJECTS_MID.length; index += 5) {
            OBJECTS_MID[index].scale.z = treble;
            OBJECTS_BACK[index].scale.y = mid; //scaleValue + anotherAnotherScaleValue * 3;
        }
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
                // Yep, that's really it.  Spawning particles is super cheap, and once you spawn them, the rest of
                // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
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