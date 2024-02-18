import * as THREE from 'three';
import {FirstPersonControls} from './three_class/FirstPersonControls.js';
import { OBJLoader } from './three_class/OBJLoader.js';
import { GLTFLoader } from './three_class/GLTFLoader.js';

export default function(){

  const clock = new THREE.Clock();
  window.resetCamera = resetCamera;

  // SCENE  
  const scene = new THREE.Scene();

  //CAMERA
  const camera = new THREE.PerspectiveCamera( 50 , window.innerWidth / window.innerHeight, 0.1, 10000 );
  let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
  camera.position.set( 0, 0, -150 ) ;

  //RENDERER
  const renderer = new THREE.WebGLRenderer({    
    alpha:true, 
    antialias:true}) ;
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

  // SCENE & FOG
  scene.background = new THREE.Color( 0x008888 );  
  scene.fog = new THREE.Fog(0x008888, 10, 100);
  const gridHelper = new THREE.GridHelper( 250,50 );  
  //scene.add(gridHelper);
    
  // CAMERA  
  camera.lookAt(new THREE.Vector3( 0, player.height, 10));
  camera.lookAt( 0, 60, 800); 
  camera.setFocalLength ( 25 );

  // CONTROLS
  const controls = new FirstPersonControls(camera, renderer.domElement);  
  
  controls.movementSpeed = 7;
  controls.lookSpeed = 0.02;
  // controls.constrainVertical = true; 
  // controls.verticalMin = 0.1; 
  // controls.lookVertical = 0;

  // LIGHTS
  //AMBIENT
  const ambiente = new THREE.AmbientLight ( 0xffffff, 0.5 )
  scene.add( ambiente);

  let int = 0.15;
  let dist = 1000;
  let decay = 0.5;
  let pointcolor = 0Xddddff;
  //let yp = 50;

  //POINT
  const pointLight = new THREE.PointLight( pointcolor, int, dist, decay); 
  pointLight.position.set( 0, 0, -100 );
  const pointLight2 = new THREE.PointLight( pointcolor, int, dist, decay);    
  pointLight2.position.set( 0, 0, 0);
  const pointLight3 = new THREE.PointLight( pointcolor, int, dist, decay); 
  pointLight3.position.set( 0, 0, 100 );
  const pointLight4 = new THREE.PointLight( pointcolor, int, dist, decay); 
  pointLight4.position.set( 0, 0, -200 ); 

  const helper1 = new THREE.PointLightHelper(pointLight);
  const helper2 = new THREE.PointLightHelper(pointLight2);
  const helper3 = new THREE.PointLightHelper(pointLight3);
  const helper4 = new THREE.PointLightHelper(pointLight4);
  
  //scene.add( helper1, helper2,helper3, helper4);
  scene.add( pointLight, pointLight2,pointLight3,pointLight4 );

  pointLight.castShadow = true;

  let initialCameraPosition = new THREE.Vector3();
  initialCameraPosition.copy(camera.position);
  // Crea una funzione per resettare la camera
  function resetCamera() {
    camera.position.copy(initialCameraPosition);  
  } 

  //TEXTURES
  const loader = new THREE.TextureLoader();
  const texture1 = loader.load('./images/statics/Glitches/glitches_01 (6).jpg');
  texture1.wrapS = THREE.RepeatWrapping;
  texture1.wrapT = THREE.RepeatWrapping;
  texture1.repeat.set(1, 1);  
 
  const texture2 = loader.load('./images/statics/Glitches/glitches_01 (2).jpg');
  texture2.wrapS = THREE.RepeatWrapping;
  texture2.wrapT = THREE.RepeatWrapping;
  texture2.repeat.set(1, 1); 

  //AUDIO
  // POETRY 1
  var listenerAlbero = new THREE.AudioListener();
  camera.add(listenerAlbero);  
  var soundAlbero = new THREE.Audio(listenerAlbero); 
  var loaderAlbero = new THREE.AudioLoader(); 

  loaderAlbero.load('audio/neutropoli/Albero.m4a', function(buffer) {
    soundAlbero.setBuffer(buffer);
    soundAlbero.setLoop(true);
    //sound.setVolume(0.5);
    soundAlbero.play();
  });

  // POETRY 2
  var listenerFotogramma = new THREE.AudioListener();
  camera.add(listenerFotogramma);  
  var soundFotogramma = new THREE.Audio(listenerAlbero); 
  var loaderFotogramma = new THREE.AudioLoader(); 
  
  loaderFotogramma.load('audio/neutropoli/Fotogramna.m4a', function(buffer) {
  soundFotogramma.setBuffer(buffer);
  soundFotogramma.setLoop(true);
  //sound.setVolume(0.5);
  soundFotogramma.play();
  });
  
 // BACKGROUND 
 const listenerBcg = new THREE.AudioListener();
 camera.add(listenerBcg);

 const audioLoader = new THREE.AudioLoader();

 const backgroundSound = new THREE.Audio( listenerBcg );
 audioLoader.load('audio/neutropoli/Milano metro bcg.mp3', function( buffer ) {
   backgroundSound.setBuffer( buffer );
   backgroundSound.setLoop( true );
   backgroundSound.setVolume( 0.125 );
   backgroundSound.play();
 });

 const listenerBcg2 = new THREE.AudioListener();
 camera.add(listenerBcg2);

 const audioLoader2 = new THREE.AudioLoader();

//  const backgroundSound2 = new THREE.Audio( listenerBcg2 );
//  audioLoader2.load('audio/neutropoli/Milano bcg.mp4', function( buffer ) {
//    backgroundSound2.setBuffer( buffer );
//    backgroundSound2.setLoop( true );
//    backgroundSound2.setVolume( 0 );
//    backgroundSound2.play();
//  });

 // AUDIO DISTANCE  
  resetCamera();
    
  function animateScene(){
    requestAnimationFrame( animateScene );   
    controls.update(clock.getDelta());
    renderer.render( scene, camera );

    var distance = camera.position.distanceTo(cube.position); 
    var distance2 = camera.position.distanceTo(cube2.position);

    var volume = 1 - Math.min(distance / 20, 1); 
    var volume2 = 1 - Math.min(distance2 / 20, 1); 

    soundAlbero.setVolume(volume);
    soundFotogramma.setVolume(volume2)
  };

  // SUBWAY GLB
  const subwayGLoader = new GLTFLoader();

  subwayGLoader.load(    
   './3d/subway/subway6.glb',
    function (glt) {
      const subwayG = glt.scene;
      subwayG.position.set( 0, 0, 0 );
      subwayG.rotation.set( 0, -Math.PI/2, 0 );      
      subwayG.scale.set( 3, 3, 3 );        
      subwayG.traverse(function (node) {
        if (node.isMesh) {

          const materialSGL = new THREE.MeshPhysicalMaterial({
            color: 0xffffff, 
            emissive: 0x000000,
            map: texture1,  
            bumpMap: texture1, 
            bumpScale: 0.1,
            //displacementMap: texture1,
            //displacementScale: 0.01,        
            roughness: 0.5,
            metalness: 0.5,
            //clearcoat: 1,
            //clearcoatRoughness: 0,
           //reflectivity: 0,
          });   

          node.material = materialSGL;
          node.castShadow = true;
          node.receiveShadow = true;
        }

      });   
      
      scene.add(subwayG);        
      subwayG.castShadow = true; 
      subwayG.receiveShadow = true; 
        
      let subwayG2 = subwayG.clone();
      subwayG2.castShadow = true; 
      subwayG2.receiveShadow = true; 
      subwayG2.position.set( 7, 9, 86 ); 
      //scene.add(subwayG2);

    }, 

    undefined, // funzione di progresso opzionale da passare al caricatore
    function (error) {
    console.error(error);      
    }   

  ); 
  
  // CUBE
  const gCube = new THREE.BoxGeometry( 1, 1, 1 );
  const mCube = new THREE.MeshPhysicalMaterial({
    color: 0Xff5555,
  });

  const cube = new THREE.Mesh(gCube, mCube);
  scene.add(cube);
  cube.position.set( 0, 0, -50 );
  cube.rotation.set( 0, 0, 0 );

  const cube2 = new THREE.Mesh(gCube, mCube);
  scene.add(cube2);
  cube2.position.set( 0, -20, -50 );
  cube2.rotation.set( 0, 0, 0 );
  scene.add(cube2);

  animateScene();

};

