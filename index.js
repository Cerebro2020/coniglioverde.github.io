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
  // TEXTURES
  const loader = new THREE.TextureLoader();  
  const bumpP = loader.load ('images/textures/bump_planet_3.jpg');
  bumpP.wrapS = THREE.RepeatWrapping;
  bumpP.wrapT = THREE.RepeatWrapping;
  bumpP.repeat.set( 1, 10);
  // VIDEO  
  // VIDEO 1
  var video1 = document.createElement('video');
  video1.src = "./video/cinematic/00_Lupin.mp4";
  video1.style.display = 'none'; 
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
  video2.src = "./video/cinematic/sphere_skin.mp4";
  video2.style.display = 'none'; 
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
  scene.fog = new THREE.Fog( 0x000000, 40, 170);  
  // CAMERA
  camera.position.set( 0, 0, 0);
  camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
  camera.setFocalLength ( 35 );
  // LIGHTS  
  const ambiente = new THREE.AmbientLight ( 0xFFFFFF, 1 )
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
    camera.position.set( 0, 0, t * 0.15 );    
  }
  document.body.onscroll = moveCamera;
  // RABBIT - HOME
  const loaderRabbit = new OBJLoader();
  let rabbit;   
  // LOAD A RESOURCE
  loaderRabbit.load('3d/rabbit/Rabbit.obj',
    function ( object ) {
      object.position.set( 15, 0.5, -50 );
      object.rotation.set( 0, -Math.PI/2, 0 );      
      try{
      const matRabbit=new THREE.MeshPhysicalMaterial({
        color: 0xC1FF4D,        
        map: vTexture1, 
        roughness:0,
        metalness:0,                 
      })      
      object.children[0].material=matRabbit;
      }catch(e){
      console.log(e);
      }
      rabbit=object;     
      console.log( 'body was loaded', rabbit );
      scene.add( rabbit );      
      rabbit.scale.set( 2, 2, 2);    
      //RABBIT 2 - DATA       
      let rabbit2 = rabbit.clone();
      rabbit2.position.set( 10, -8, -150 );
      rabbit2.rotation.set( 0, -0.5, 0 );  
      //rabbit2.scale.set(2, 2, 2);       
      scene.add( rabbit2 );      
      //RABBIT 3 - CINEMATIC      
      let rabbit3 = rabbit.clone();
      rabbit3.position.set( 7, -5, -250 );
      rabbit3.scale.set(1, 1, 1); 
      rabbit3.rotation.set( 0, 5, 0.4 );     
      scene.add( rabbit3 );
      //RABBIT 4 - WRITING      
      let rabbit4 = rabbit.clone();
      rabbit4.position.set( 7, -5, -360 );
      rabbit4.scale.set(1, 1, 1); 
      rabbit4.rotation.set( 0, 3.5, 0 );     
      scene.add( rabbit4 );
      //RABBIT 5 - STATIC      
      let rabbit5 = rabbit.clone();
      rabbit5 .position.set( -6, -6, -470 );
      rabbit5 .scale.set(1, 1, 1); 
      rabbit5 .rotation.set( 0, -4.5, 0 );     
      scene.add( rabbit5  );
    },
    // called when loading is in progresses
    function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
      console.log( 'An error happened' );
    }
  );   
  // MATERIALS
  const material1 = new THREE.MeshPhysicalMaterial({
    color: 0xac2ac2,   
    map: vTexture2,
    roughness:0,
    metalness:0, 
  });
  const material2 = new THREE.MeshPhysicalMaterial({
    color: 0x222222,       
    wireframe: true,
    side: THREE.DoubleSide,    
    displacementMap: bumpP,
    displacementScale: 5, 
  });
  const material3 = new THREE.MeshPhysicalMaterial({
    color: 0XA2FF00,    
    wireframe: true,       
    displacementMap: vTexture2,
    displacementScale: 0.4, 
  });
  //PIANETA
  const gPianeta = new THREE.SphereGeometry( 4.2, 32, 32 );
  let pianeta = new THREE.Mesh( gPianeta, material1 );
  pianeta.position.set( 15 , -3.5, -50);  
  pianeta.rotation.set( 0,0,1);
  scene.add(pianeta);  
  //CYLINDER
  const gCylinder = new THREE.CylinderGeometry( 20, 20, 1400, 64, 700, 0, true  );
  const Cylinder1 = new THREE.Mesh(gCylinder, material2);
  Cylinder1.position.set( 0, 0, -120 );
  Cylinder1.rotation.set( 0, Math.PI/2, Math.PI/2);
  scene.add(Cylinder1);  
  //DATA
  const gData = new THREE.CylinderGeometry ( 2, 2, 0.1, 64, 1,  true  );
  const dataForm = new THREE.Mesh(gData, material3 );  
  dataForm.position.set( -1 , 4.5, -142 ); 
  dataForm.rotation.set( 0, Math.PI/2, Math.PI/2); 
  scene.add(dataForm);
};