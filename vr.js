import * as THREE from 'three';
import { VRButton } from './three_class/VRButton.js';

export default function(){

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    //RENDERER
    const renderer = new THREE.WebGLRenderer({    
        alpha:true, 
        antialias:true
    }) ;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( renderer.domElement );
    
    // RESIZE WINDOW
    window.addEventListener('resize', function(){
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize( width, height );
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    } );

    document.body.appendChild(renderer.domElement);
    document.body.appendChild( VRButton.createButton( renderer ) );

    renderer.setAnimationLoop( function () {
        renderer.render( scene, camera );    
    } );

    const ambiente = new THREE.AmbientLight(0xffffff, 0.2); 
    const point = new THREE.PointLight(0xffffff, 1, 1000);
    point.position.set(0,4,2);
    scene.add(point, ambiente);

    const cubeGeometry = new THREE.TorusGeometry(1,0.01, 16, 64, 10);
    const cubeMaterial1 = new THREE.MeshPhysicalMaterial({ 
        color: 0xff0000,
        roughness: 0,
        metalness:0,    
    });

    const cubeMaterial2 = new THREE.MeshPhysicalMaterial({ 
        color: 0x00ff00,
        roughness: 0,
        metalness:0,    
    });

    const cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial1);
    cube1.position.set(-2, 0, 0);
    scene.add(cube1);

    const cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial2);
    cube2.position.set(2, 0, 0);
    scene.add(cube2);

    const controller = renderer.xr.getController(0);
    scene.add(controller);

    let selectedCube = null;

    controller.addEventListener('selectstart', onSelectStart);
    controller.addEventListener('selectend', onSelectEnd);

    function onSelectStart(event) {
        const controller = event.target;
        const intersections = getIntersections(controller);
        if (intersections.length > 0) {
            selectedCube = intersections[0].object;
            selectedCube.material.color.set(0xffff00); // Cambia il colore quando selezionato
        }
    }

    function onSelectEnd(event) {
        if (selectedCube) {
            selectedCube.material.color.set(0x00ff00); // Ripristina il colore
            selectedCube = null;
        }
    }

    function getIntersections(controller) {
        const tempMatrix = new THREE.Matrix4();
        const direction = new THREE.Vector3();
        const origin = new THREE.Vector3();

        direction.set(0, 0, -1).applyMatrix4(controller.matrixWorld);
        origin.setFromMatrixPosition(controller.matrixWorld);

        const raycaster = new THREE.Raycaster(origin, direction);
        const intersects = raycaster.intersectObjects([cube1, cube2]);

        return intersects;
    }

    camera.position.z = 5;

    function animate() {
        renderer.setAnimationLoop(render);
    }

    function render() {
        cube1.rotation.x += 0.01;
        cube1.rotation.y += 0.01;
        cube2.rotation.x -= 0.01;
        cube2.rotation.y -= 0.01;
        renderer.render(scene, camera);
    }

    animate();

}