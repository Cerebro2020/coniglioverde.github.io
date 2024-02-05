import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';
import { OBJLoader } from './three_class/OBJLoader.js';
import { GLTFLoader } from './three_class/GLTFLoader.js';

export default function(){
  // SCENE  
  const scene = new THREE.Scene();
  var gridHelper = new THREE.GridHelper(100, 100);
  //scene.add(gridHelper);  
  
  // CAMERA
  const camera = new THREE.PerspectiveCamera( 50 , window.innerWidth / window.innerHeight, 0.1, 10000 );
  let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
  const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true}) ;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
  renderer.setSize( window.innerWidth, window.innerHeight );
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
  scene.background = new THREE.Color( 0xffffff  );
  scene.fog = new THREE.Fog(0xffffff , 0, 1400);
  
  // CAMERA
  camera.position.set( 0, 0, 300);
  camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
  camera.setFocalLength ( 15 );

  // LIGHTS
  // AMBIENT
  const ambiente = new THREE.AmbientLight ( 0x0000ff, 10)
  scene.add( ambiente);

  const emisfera = new THREE.HemisphereLight( 0x771c04, 0x0000ff, 4);
  scene.add( emisfera);

  //SPOT1
  const L1 = new THREE.SpotLight( 0xffffff, 5, 3000 );     
  L1.position.set( -1000, 800, 800 ); 
  L1.angle = 0.5;
  const LH1 = new THREE.SpotLightHelper(L1, 1);  
  //scene.add( L1, LH1 );

  let L2 = L1.clone();
  L2.position.set( -1000, 800, -800 ); 
  L2.angle = 0.5;
  //scene.add( L2 );
  
  
  // ANIMATE SCENE
  function animateScene(){
    requestAnimationFrame( animateScene );
    renderer.render( scene, camera );
  };
  animateScene();

  // ORBIT CONTROLS
  const controls = new OrbitControls( camera, renderer.domElement );  
  controls.listenToKeyEvents( window ); 
  controls.minDistance = 2;
  controls.maxDistance = 300;
  controls.maxPolarAngle = 1.5; 

  // VIDEO
  var video = document.createElement('video');
  video.src = "./video/writing/traccia_fantasma (1).mp4";
  video.loop = true;
  video.style.display = 'none';  // Nasconde l'elemento video
  document.body.appendChild(video);  // Aggiunge l'elemento video al corpo del documento

  video.load();
  video.play();

  var vTexture = new THREE.VideoTexture(video);
  vTexture.minFilter = THREE.LinearFilter;
  vTexture.magFilter = THREE.LinearFilter;
  vTexture.format = THREE.RGBAFormat;

  // CITY
  // SUBWAY GLB
  const cityLoader = new GLTFLoader();

  cityLoader.load(    
   './3d/city3.glb',
    function (glt) {
      const city = glt.scene;
      city.position.set( 0, -10, 0 );
      city.rotation.set( 0, 0, 0 );      
      city.scale.set( 10, 10, 10 );        
      city.traverse(function (node) {
        if (node.isMesh) {

          const materialSGL = new THREE.MeshPhysicalMaterial({
            color: 0x882dc15,
            roughness: 0,
            metalness: 0.9,
            side: THREE.DoubleSide,                         
          });   

          node.material = materialSGL;
          node.castShadow = true;
          node.receiveShadow = true;
        }

      });   
      
      scene.add(city); 
    
    }, 

    undefined, // funzione di progresso opzionale da passare al caricatore
    function (error) {
    console.error(error);      
    }   

  ); 

  // SPHERE
  const gSphere = new THREE.SphereGeometry(620, 32, 32);
  const mSphere = new THREE.MeshPhysicalMaterial({ 
    color: 0x000000,
    //map: vTexture, 
    side: THREE.DoubleSide,    
  });  
  const sphere = new THREE.Mesh(gSphere, mSphere);

  // SCHERMO
  let coef = 20;  
  const gBox = new THREE.BoxGeometry( 1.6*(coef), 0.9*(coef), 1.6*(coef), 200, 200, 200);
  const mBox = new THREE.MeshPhysicalMaterial({ 
    map: vTexture, 
    side: THREE.DoubleSide,    
  });
  const schermo = new THREE.Mesh(gBox, mBox); 
  schermo.position.set( -300, 0, 0 );
  schermo.rotation.set( 0, 0, 0 );
  schermo.scale.set( 0.5, 0.5, 0.5 );

  SL2.target = schermo;
  scene.add(SL2.target);  

  scene.add(schermo); 
  //scene.add(sphere); 

};