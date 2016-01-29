//////////////////////////////////////////////////////////////////////////////////// LES VARIABLES GLOBALES C'EST LE BIEN
var SCENE = null;
var CAMERA = null;
var RENDERER = null;
var CANVAS = null;
var CONTROLS = null;


var glitchPass = null;
var composer = null;

var OBJ_SPHERE = null;
var OBJ_SPHERE2 = null;
var OBJ_SPHERE3 = null;
var OBJ_SKYBOX = null;
var OBJ_SKYBOX2 = null

var OBJECTS_FRONT = [];
var OBJECTS_MID = [];
var OBJECTS_BACK = [];

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
};

// Pour faire une simulation unique à chaque lancement (en plus du nombreMagique)
var startTime = Date.now();

var elapsedTime = 0;
var previousTime = Date.now();
var deltaTime = 0;

var MaxValue = 0.2;
var MinValue = -0.2;
var actualValue = 0;
var move = 0.01;
var actualScale = 0;
var scaleValue = 0.1;
var anotherScaleValue = 0.2;
var anotherAnotherScaleValue = 0.7;





// COLORS FOR EACH FORM
var uniformsSphere = {
    colors: {
        type: 'v3',
        value: new THREE.Vector3(0.0, 0.0, 0.0)
    },
    Alpha: {
        type: 'f',
        value: 0.3
    },
    light: {
        type: 'v3',
        value: new THREE.Vector3(0.5, 0.2, 1.0)
    }
};

var uniformsObjFront = {
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


var uniformsObjMid = {
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


var uniformsObjBack = {
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

// SKYBOX
var uniformsSkyboxLeft = {
    time: {
        type: 'f',
        value: 0
    },
    color: {
        type: 'v3',
        value: new THREE.Vector3(1.0, 0.34, 0.0)
    }
}
var uniformsSkyboxRight = {
    time: {
        type: 'f',
        value: 0
    },
    color: {
        type: 'v3',
        value: new THREE.Vector3(0.8, 0.1, 0.3)
    }
}
var uniformsSkyboxTop = {
    time: {
        type: 'f',
        value: 0
    },
    color: {
        type: 'v3',
        value: new THREE.Vector3(0.0, 1.0, 0.0)
    }
}
var uniformsSkyboxBottom = {
    time: {
        type: 'f',
        value: 0
    },
    color: {
        type: 'v3',
        value: new THREE.Vector3(0.0, 0.0, 1.0)
    }
}
var uniformsSkyboxBack = {
    time: {
        type: 'f',
        value: 0
    },
    color: {
        type: 'v3',
        value: new THREE.Vector3(1.0, 1.0, 1.0)
    }
}

var uniformsSkyboxFront = {
    time: {
        type: 'f',
        value: 0
    },
    color: {
        type: 'v3',
        value: new THREE.Vector3(1.0, 1.0, 0.0)
    }
}

var uniformsSkybox2 = {
    texture: {
        type: 't',
        value: new THREE.ImageUtils.loadTexture("assets/textures/lucas.jpg")
    }
}

var skyboxRotationEnabled = false;
var rotationFrontObjects = 0;
var rotationFrontObjectsMax = 3 * Math.PI;
var rotationFrontObjectsStep = Math.PI / 15;

var tick = 0,
    clock = new THREE.Clock(true),
    gui = new dat.GUI(),
    options, spawnerOptions, particleSystems = [];

// options passed during each spawned
options = [{
    position: new THREE.Vector3(0, 0, 0),
    positionRandomness: 0.,
    velocity: new THREE.Vector3(),
    velocityRandomness: 5.,
    color: 0xaa88ff,
    colorRandomness: .2,
    turbulence: 0.,
    lifetime: .5,
    size: 20,
    sizeRandomness: 1
}, {
    position: new THREE.Vector3(0, 0, 0),
    positionRandomness: 0.,
    velocity: new THREE.Vector3(),
    velocityRandomness: 5.,
    color: 0xaa88ff,
    colorRandomness: .2,
    turbulence: 0.,
    lifetime: .5,
    size: 20,
    sizeRandomness: 1
}, {
    position: new THREE.Vector3(0, 0, 0),
    positionRandomness: 0.,
    velocity: new THREE.Vector3(),
    velocityRandomness: 5.,
    color: 0xaa88ff,
    colorRandomness: .2,
    turbulence: 0.,
    lifetime: .5,
    size: 20,
    sizeRandomness: 1
}, {
    position: new THREE.Vector3(0, 0, 0),
    positionRandomness: 0.,
    velocity: new THREE.Vector3(),
    velocityRandomness: 5.,
    color: 0xaa88ff,
    colorRandomness: .2,
    turbulence: 0.,
    lifetime: .5,
    size: 20,
    sizeRandomness: 1
}, {
    position: new THREE.Vector3(0, 0, 0),
    positionRandomness: 0.,
    velocity: new THREE.Vector3(),
    velocityRandomness: 5.,
    color: 0xaa88ff,
    colorRandomness: .2,
    turbulence: 0.,
    lifetime: .5,
    size: 20,
    sizeRandomness: 1
}];

spawnerOptions = {
    spawnRate: 15000,
    horizontalSpeed: 1.5,
    verticalSpeed: 1.33,
    timeScale: 1
}

var particleSystemEnabled = false;

//////////////////////////////////////////////////////////////////////////////////// INIT SCENE
function init() {
    SCENE = new THREE.Scene();

    CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    CAMERA.position.z = 5;

    RENDERER = new THREE.WebGLRenderer();
    RENDERER.setSize(window.innerWidth, window.innerHeight);
    RENDERER.setClearColor(0x000000);
    document.body.appendChild(RENDERER.domElement);

    CANVAS = RENDERER.domElement;

    CONTROLS = new THREE.OrbitControls(CAMERA, RENDERER.domElement);
    CONTROLS.enableDamping = true;
    CONTROLS.dampingFactor = 0.25;

    // MATERIALS
    var materialSphere = new THREE.ShaderMaterial({
        uniforms: uniformsSphere,
        vertexShader: document.getElementById("simple.vs").textContent,
        fragmentShader: document.getElementById("simple.fs").textContent
    });
    
     var materialObjFront = new THREE.ShaderMaterial({
        uniforms: uniformsObjFront,
        vertexShader: document.getElementById("simple.vs").textContent,
        fragmentShader: document.getElementById("simple.fs").textContent
    });
    
     var materialObjMid = new THREE.ShaderMaterial({
        uniforms: uniformsObjMid,
        vertexShader: document.getElementById("simple.vs").textContent,
        fragmentShader: document.getElementById("simple.fs").textContent
    });
    
     var materialObjBack = new THREE.ShaderMaterial({
        uniforms: uniformsObjBack,
        vertexShader: document.getElementById("simple.vs").textContent,
        fragmentShader: document.getElementById("simple.fs").textContent
    });

    var mats = []; // gauche, droite, haut, bas, derriere, devant
    mats.push(new THREE.ShaderMaterial({
        uniforms: uniformsSkyboxLeft,
        // color: 0xff5800,
        vertexShader: document.getElementById("quasicrystal.vs").textContent,
        fragmentShader: document.getElementById("quasicrystal.fs").textContent,
        side: THREE.DoubleSide
    }));
    mats.push(new THREE.ShaderMaterial({
        uniforms: uniformsSkyboxRight,
        // color: 0xC41E3A,
        vertexShader: document.getElementById("quasicrystal.vs").textContent,
        fragmentShader: document.getElementById("quasicrystal.fs").textContent,
        side: THREE.DoubleSide
    }));
    mats.push(new THREE.ShaderMaterial({
        uniforms: uniformsSkyboxTop,
        // color: 0x009e60,
        vertexShader: document.getElementById("quasicrystal.vs").textContent,
        fragmentShader: document.getElementById("quasicrystal.fs").textContent,
        side: THREE.DoubleSide
    }));
    mats.push(new THREE.ShaderMaterial({
        uniforms: uniformsSkyboxBottom,
        // color: 0x0051ba,
        vertexShader: document.getElementById("quasicrystal.vs").textContent,
        fragmentShader: document.getElementById("quasicrystal.fs").textContent,
        side: THREE.DoubleSide
    }));
    mats.push(new THREE.ShaderMaterial({
        uniforms: uniformsSkyboxBack,
        // color: 0xffffff,
        vertexShader: document.getElementById("quasicrystal.vs").textContent,
        fragmentShader: document.getElementById("quasicrystal.fs").textContent,
        side: THREE.DoubleSide
    }));
    mats.push(new THREE.ShaderMaterial({
        uniforms: uniformsSkyboxFront,
        // color: 0xffd500,
        vertexShader: document.getElementById("quasicrystal.vs").textContent,
        fragmentShader: document.getElementById("quasicrystal.fs").textContent,
        side: THREE.DoubleSide
    }));

    var materialSkybox = new THREE.MeshFaceMaterial(mats);

    var textureLoader = new THREE.TextureLoader();
    textureLoader.load('assets/textures/lucas.jpg', function (texture) {
        console.log(texture);

        var mats2 = [];
        for (var i = 0; i < 6; i++) {
            mats2.push(new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide
            }));
        }
        var materialSkybox2 = new THREE.MeshFaceMaterial(mats2);

        OBJ_SKYBOX2 = new THREE.Mesh(geometrySkybox2, materialSkybox2)

        SCENE.add(OBJ_SKYBOX2);
    });

    // GEOMETRIES
    var geometrySphere = new THREE.SphereGeometry(0.25, 32, 32);

    var geometrySkybox = new THREE.BoxGeometry(30, 30, 30);
    var geometrySkybox2 = new THREE.BoxGeometry(500, 500, 500);


    var geometryObjFront = new THREE.BoxGeometry(0.1, 0.2, 0.1);
    var geometryObjMid = new THREE.BoxGeometry(0.05, 0.1, 0.1);
    var geometryObjBack = new THREE.BoxGeometry(.125, 0.05, 0.3);

    // CERCLES D'OBJETS
    var PI = 3.14;
    var theta_scale = 0.03;

    var numberOfObjectsFront = 0;
    for (var theta = 0; theta < 2 * PI; theta += theta_scale) {
        var x = 3 * Math.cos(theta);
        var y = 3 * Math.sin(theta);
        OBJECTS_FRONT[numberOfObjectsFront] = new THREE.Mesh(geometryObjFront, materialObjFront);
        OBJECTS_FRONT[numberOfObjectsFront].position.x = x;
        OBJECTS_FRONT[numberOfObjectsFront].position.z = 0;
        OBJECTS_FRONT[numberOfObjectsFront].position.y = y;
        OBJECTS_FRONT[numberOfObjectsFront].rotation.z = theta;
        SCENE.add(OBJECTS_FRONT[numberOfObjectsFront]);
        numberOfObjectsFront++;
    }

    var numberOfObjectsMid = 0;
    for (var theta = 0; theta < 2 * PI; theta += theta_scale) {
        var x = 2 * Math.cos(theta);
        var y = 2 * Math.sin(theta);
        OBJECTS_MID[numberOfObjectsMid] = new THREE.Mesh(geometryObjMid, materialObjMid);
        OBJECTS_MID[numberOfObjectsMid].position.x = x;
        OBJECTS_MID[numberOfObjectsMid].position.z = -3;
        OBJECTS_MID[numberOfObjectsMid].position.y = y;
        OBJECTS_MID[numberOfObjectsMid].rotation.z = theta;

        SCENE.add(OBJECTS_MID[numberOfObjectsMid]);
        numberOfObjectsMid++;
    }

    var numberOfObjectsBack = 0;
    for (var theta = 0; theta < 2 * PI; theta += theta_scale) {
        var x = 1 * Math.cos(theta);
        var y = 1 * Math.sin(theta);
        OBJECTS_BACK[numberOfObjectsBack] = new THREE.Mesh(geometryObjBack, materialObjBack);
        OBJECTS_BACK[numberOfObjectsBack].position.x = x;
        OBJECTS_BACK[numberOfObjectsBack].position.z = -5;
        OBJECTS_BACK[numberOfObjectsBack].position.y = y;
        OBJECTS_BACK[numberOfObjectsBack].rotation.z = theta;

        SCENE.add(OBJECTS_BACK[numberOfObjectsBack]);
        numberOfObjectsBack++;
    }

    // SPHERE  + "SKYBOX"

    OBJ_SPHERE = new THREE.Mesh(geometrySphere, materialSphere);
    OBJ_SPHERE2 = new THREE.Mesh(geometrySphere, materialSphere);
    OBJ_SPHERE3 = new THREE.Mesh(geometrySphere, materialSphere);

    OBJ_SPHERE2.position.x = 5
    OBJ_SPHERE3.position.x = -5
    OBJ_SPHERE2.position.y = 5
    OBJ_SPHERE3.position.y = 5

    OBJ_SKYBOX = new THREE.Mesh(geometrySkybox, materialSkybox);

    SCENE.add(OBJ_SPHERE);
   // SCENE.add(OBJ_SPHERE2);
   // SCENE.add(OBJ_SPHERE3);
    SCENE.add(OBJ_SKYBOX);

    for (var i = 0; i < 5; i++) {
        var particleSystem = new THREE.GPUParticleSystem({
            maxParticles: 250000
        });
        SCENE.add(particleSystem);
        particleSystems.push(particleSystem);
    }

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
    
    
    
    
    ////TEST YOLO
    
    // postprocessing

				composer = new THREE.EffectComposer( RENDERER );
				composer.addPass( new THREE.RenderPass( SCENE, CAMERA ) );

				glitchPass = new THREE.GlitchPass();
				glitchPass.renderToScreen = true;
				composer.addPass( glitchPass );
    
    
    
}