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

  // TEXTURES
  const loader = new THREE.TextureLoader();
  const textureP = loader.load ('images/bcg/Sfondo.jpg'); 
  textureP.wrapS = THREE.RepeatWrapping;
  textureP.WrapT = THREE.RepeatWrapping;

  const textureP2 = loader.load ('images/bcg/Sfondo2.jpg');
  const textureP3 = loader.load ('images/bcg/SfondoS.jpg');
  const textureSpace = loader.load ('images/equirectangulars/space.jpg');

  const bumpP = loader.load ('images/textures/texture_planet.jpeg');
  bumpP.wrapS = THREE.RepeatWrapping;
  bumpP.wrapT = THREE.RepeatWrapping;
  bumpP.repeat.set( 1, 10);

  // VIDEO  
  // VIDEO 1
  var video1 = document.createElement('video');
  video1.src = "./video/cinematic/butterfly_spot.mp4";
  video1.style.display = 'none';
  video1.muted = true; 
  video1.loop = true; 
  document.body.appendChild(video1); 
  video1.load();
  video1.play();
  var vTexture1 = new THREE.VideoTexture(video1);
  vTexture1.minFilter = THREE.LinearFilter;
  vTexture1.magFilter = THREE.LinearFilter;
  vTexture1.format = THREE.RGBAFormat;

  // VIDEO 2
  var video2 = document.createElement('video');
  video2.src = "./video/cinematic/02_genomachines.mp4";
  video2.style.display = 'none';
  video2.muted = true;  
  video2.loop = true; 
  document.body.appendChild(video2);  
  video2.load();
  video2.play();
  var vTexture2 = new THREE.VideoTexture(video2);
  vTexture2.minFilter = THREE.LinearFilter;
  vTexture2.magFilter = THREE.LinearFilter;
  vTexture2.format = THREE.RGBAFormat;

  // SCENE & FOG
  scene.background = new THREE.Color( 0x000000 );
  scene.fog = new THREE.Fog( 0x000000, 1, 40 );  

  const gridHelper = new THREE.GridHelper( 1000, 1000 );
  gridHelper.position.set(0, -3, -40);  
  scene.add(gridHelper);
   
  // CAMERA
  camera.position.set( 0, 0, 0);
  camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
  camera.setFocalLength ( 35 );

  // LIGHTS
  //AMBIENT
  const ambiente = new THREE.AmbientLight ( 0xffffff, 0.5 )
  scene.add( ambiente);
  //POINT
  const pointLight = new THREE.PointLight( 0xffffff, 0.5, 100); 
  pointLight.position.set( 0, 0, -40 );
  const pointLight2 = new THREE.PointLight( 0xffffff, 0.5, 100);    
  pointLight2.position.set(0,0, -79);   
  scene.add( pointLight, pointLight2);
  
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
    camera.position.set( 0, 0, t * 0.05 );    
  }

  document.body.onscroll = moveCamera;
  // MATERIALS
  const material1 = new THREE.MeshPhysicalMaterial({
    color: 0xac2ac2,    
    //side: THREE.DoubleSide,   
    //map: vTexture2,   
    //bumpMap: bumpP, 
    //bumpScale: 0.1,
    //wireframe: true,
    //displacementMap: vTexture2 ,
    displacementScale: 0.3, 
  });

  const material2 = new THREE.MeshPhysicalMaterial({
    color: 0x555555,    
    wireframe: true,
    side: THREE.DoubleSide,    
    displacementMap: bumpP,
    displacementScale: 0.4, 
  });

  const materialButter = new THREE.MeshPhysicalMaterial({    
    side: THREE.DoubleSide,
    map: vTexture1,
  });

  const materialGeno = new THREE.MeshPhysicalMaterial({
    map: vTexture2,
    side: THREE.DoubleSide, 
  });

  //SALA
  const gPavimento = new THREE.BoxGeometry( 8, 4.5, 400, 16, 9, 400 );
  let pavimento = new THREE.Mesh( gPavimento, material2 );
  pavimento.position.set( 0, 2, -200 );  
  scene.add(pavimento);

  const gSchermo = new THREE.BoxGeometry( 1.6, 0.9, 0.1);
  let schermo = new THREE.Mesh( gSchermo, materialButter );
  schermo.position.set( 0, 0.3, -41 );  
  //scene.add(schermo);

  let schermo2 = new THREE.Mesh( gSchermo, materialGeno );
  schermo2.position.set( 0, 0.3, -78 );  
  //scene.add(schermo2);
 
};