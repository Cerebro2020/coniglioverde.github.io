import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';
import { OBJLoader } from './three_class/OBJLoader.js';

export default function(){

  // SCENE  
  const scene = new THREE.Scene();  

  //CAMERA
  const camera = new THREE.PerspectiveCamera( 50 , window.innerWidth / window.innerHeight, 0.1, 10000 );
  let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };

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
  const TextureQ2 = loader.load('images/textures/hearts/quadretti2i.jpg');
  TextureQ2.wrapS = THREE.RepeatWrapping;
  TextureQ2.wrapT = THREE.RepeatWrapping;
  TextureQ2.repeat.set(1, 40); 

  const bumpP = loader.load ('images/statics/textures/bump_planet_3.jpg');
  bumpP.wrapS = THREE.RepeatWrapping;
  bumpP.wrapT = THREE.RepeatWrapping;
  bumpP.repeat.set( 1, 10);

  // SCENE & FOG
  scene.background = new THREE.Color( 0x000000 );
  //scene.fog = new THREE.Fog( 0x000000, 1, 40 );  

  const gridHelper = new THREE.GridHelper( 1000, 1000 );
  gridHelper.position.set(0, -2, -40);  
  //scene.add(gridHelper);
   
  // CAMERA
  camera.position.set( 0, 0, 0);
  camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
  camera.setFocalLength ( 35 );

  // LIGHTS
  //AMBIENT
  const ambiente = new THREE.AmbientLight ( 0xffffff, 4 )
  scene.add( ambiente);
  //POINT
  const pointLight = new THREE.PointLight( 0xffffff, 0.5, 100); 
  pointLight.position.set( 0, 0, -40 );
  const pointLight2 = new THREE.PointLight( 0xffffff, 0.5, 100);    
  pointLight2.position.set(0,0, -79);   
  //scene.add( pointLight, pointLight2);
  
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
    camera.position.set( 0, t * 0.05, 0 );    
  }

  document.body.onscroll = moveCamera;
  // MATERIALS
  const material1 = new THREE.MeshPhysicalMaterial({
    color: 0xac2ac2,    
  });

  const material = new THREE.MeshPhysicalMaterial({
    color: 0x090909,    
    wireframe: true,
    //map: TextureQ2,
    side: THREE.DoubleSide,    
    displacementMap: bumpP,
    displacementScale: 0.2, 
  });


  //SALA
  const gSala = new THREE.BoxGeometry( 2, 800, 20, 8, 3200, 80 );
  let sala = new THREE.Mesh( gSala, material );
  sala.position.set( 0, -90, 0 );  
  scene.add(sala); 
};