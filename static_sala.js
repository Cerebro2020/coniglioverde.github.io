import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';
import { GLTFLoader } from './three_class/GLTFLoader.js';

export default function(){

  // SCENE  
  const scene = new THREE.Scene();  

  //CAMERA
  const camera = new THREE.PerspectiveCamera( 50 , window.innerWidth / window.innerHeight, 0.1, 10000 );
  let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
  camera.position.set( 0, 0, 0);
  camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
  camera.setFocalLength ( 35 );

  //RENDERER
  const renderer = new THREE.WebGLRenderer({    
    alpha:true, 
    antialias:true}) ;
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

  // TEXTURS
  const loader = new THREE.TextureLoader();
  const bumpP = loader.load ('./images/textures/bump_planet_3.jpg');
  bumpP.wrapS = THREE.RepeatWrapping;
  bumpP.wrapT = THREE.RepeatWrapping;
  bumpP.repeat.set( 2, 800);

  // SCENE & FOG
  scene.background = new THREE.Color( 0x000000 );
  //scene.fog = new THREE.Fog( 0x000000, 1, 40 );  

  const gridHelper = new THREE.GridHelper( 1000, 1000 );
  gridHelper.position.set(0, -2, -40);  
  //scene.add(gridHelper);

  // LIGHTS
  //AMBIENT
  const ambiente = new THREE.AmbientLight ( 0xffffff, 1 )
  scene.add( ambiente);
  
  // ANIMATE SCENE
  function animateScene(){
    requestAnimationFrame( animateScene );
    renderer.render( scene, camera );
  };
  animateScene();

  // ORBIT CONTROLS
  const controls = new OrbitControls( camera, renderer.domElement );  
  controls.listenToKeyEvents( window ); 
  controls.minDistance = 30;
  controls.maxDistance = 30;

  //SCROLLING
  function moveCamera () {
    const t = document.body.getBoundingClientRect().top;
    camera.position.set( (t/20000), t * 0.0075, 0 );
    camera.rotation.set(0,(t/100) * 0.0025,0);    
  }

  document.body.onscroll = moveCamera;

  // MATERIALS
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x090909,        
    wireframe: true,        
  });
  
  //SALA
  const gSala = new THREE.BoxGeometry( 3, 1000, 20, 8, 4200, 80 );
  let sala = new THREE.Mesh( gSala, material );
  sala.position.set( 0, -190, 0 ); 
  // scene.add(sala);
  
  // OBJ
  for (let i=0; i<150; i++){
    
    const material3 = new THREE.MeshPhysicalMaterial( {
      color: 0x090909,      
    } );  
    // Creazione della geometria del cubo
    const gObj = new THREE.BoxGeometry(4,4,4);
    // Creazione della geometria degli spigoli
    const edges = new THREE.EdgesGeometry(gObj);

    // Creazione del cubo con solo le linee
    let objectS = new THREE.LineSegments(edges, material3);
    objectS.position.set(0,40,-10);
    objectS.rotation.set(0,0,0); 
    // Aggiunta del cubo alla scena

    const objectSclone = objectS.clone();
    objectSclone.position.set(0,i*-4,-10);
    objectSclone.rotation.set(0,i*-2,-10);
    //scene.add(objectSclone);
  };

  const loaderPlanet = new GLTFLoader();
  loaderPlanet.load('3d/hallway2.glb', (gltf) => {

    const model = gltf.scene;

    // Attiva proiezione e ricezione ombre per ogni mesh nel modello
    model.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;    // Proietta ombre
        node.receiveShadow = true; // Riceve ombre
      }
    });

    scene.add(model); // Aggiungi il modello alla scena
    model.position.set(0, -120, -38);
    model.rotation.set(0, Math.PI/2, Math.PI/2);
    model.scale.set(15,15,15);

    let model2 = model.clone();
    scene.add(model2);
    model2.position.set(0, -240, -60);
    model2.rotation.set(0, Math.PI/2, Math.PI/2);
    model2.scale.set(15,15,15);    
  });

};