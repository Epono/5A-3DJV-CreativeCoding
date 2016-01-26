var mousePos;

function init()
{
    SCENE = new THREE.Scene();
    
    CAMERA = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    
    RENDERER = new THREE.WebGLRenderer();
    RENDERER.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(RENDERER.domElement);
    
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    OBJECT = new THREE.Mesh( geometry, material );
	
    SCENE.add( OBJECT );
    
    CAMERA.position.z = 5;

    KEYBOARD = new THREEx.KeyboardState();

    console.log(RENDERER);

    CANVAS = RENDERER.domElement;

    CANVAS.addEventListener('mousemove', function(evt) {
        var rect = CANVAS.getBoundingClientRect();
        mousePos = {
          x : evt.clientX - rect.left,
          y : evt.clientY - rect.top
        };
        //console.log(mousePos);
    }, false);

    CANVAS.addEventListener('mousedown', function(evt) {
        console.log(evt);
    }, false);

    CANVAS.addEventListener('mouseup', function(evt) {
        console.log(evt);
    }, false);
}

function render()
{
    if( KEYBOARD.pressed("z") ) 
    {
        console.log('lol');
    }

    requestAnimationFrame( render );

    OBJECT.rotation.x += 0.05;
    OBJECT.rotation.y += 0.05;

    RENDERER.render(SCENE, CAMERA);   
}

$(document).ready(function() 
{
    init();
    render();
});


      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return 
      }


