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
  
  const bumpP = loader.load ('images/textures/texture_planet.jpeg');
  bumpP.wrapS = THREE.RepeatWrapping;
  bumpP.wrapT = THREE.RepeatWrapping;
  bumpP.repeat.set( 1, 10);

  const textureC = loader.load ('images/textures/texture_planet.jpeg'); 
  textureC.wrapS = THREE.RepeatWrapping;
  textureC.wrapT = THREE.RepeatWrapping;
  textureC.repeat.set( 1, 10);
  
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
  scene.fog = new THREE.Fog( 0x000000, 160, 300);  
  // CAMERA
  camera.position.set( 0, 0, 0);
  camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
  camera.setFocalLength ( 35 );
  // LIGHTS  
  const ambiente = new THREE.AmbientLight ( 0xFFFFFF, 1 )
  scene.add( ambiente);
  const point1 = new THREE.PointLight ( 0xFFFFFF, 1,1000 );
  point1.position.set(0,0,-125);
  scene.add( point1);
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
    camera.position.set( 0, t * 0.04, t * 0.15 );    
  }
  document.body.onscroll = moveCamera;
  // RABBIT - HOME
  const loaderRabbit = new OBJLoader();
  let rabbit;   
  // LOAD A RESOURCE
  loaderRabbit.load('3d/rabbit/Rabbit.obj',
    function ( object ) {
      // object.position.set( 15, 0.5, -50 );
      object.position.set( 2, -19, -50 );
      object.rotation.set( 0, -Math.PI/2, 0 );      
      try{
      const matRabbit=new THREE.MeshPhysicalMaterial({
        color: 0xC1FF4D,
        color: 0xADE545,
        color: 0x79A030,        
        //map: vTexture1,
        wireframe: true,
        roughness:0,
        reflectivity: 1,
        iridescence: 1,   
        roughness:0,
        metalness:0,                 
      })      
      object.children[0].material=matRabbit;
      }catch(e){
      console.log(e);
      }
      rabbit=object;     
      console.log( 'body was loaded', rabbit );
      //scene.add( rabbit );      
      rabbit.scale.set( 2, 2, 2);    
      //RABBIT HOME - WRITING      
      let rabbitH = rabbit.clone();
      rabbitH.position.set( -12, -22, -50 );
      rabbitH.scale.set(5, 5, 5); 
      rabbitH.rotation.set( 0, -4, 0 );     
      scene.add( rabbitH );
      //RABBIT Data - WRITING      
      let rabbitData = rabbit.clone();
      // rabbitData.position.set( 5, -5, -360 );
      rabbitData.position.set( 5, -70, -200 );
      rabbitData.scale.set(10, 10, 10); 
      rabbitData.rotation.set( 0,Math.PI,0,0 );     
      scene.add( rabbitData );  
      //RABBIT 4 - WRITING      
      let rabbit4 = rabbit.clone();
      // rabbit4.position.set( 5, -5, -360 );
      rabbit4.position.set( 10, -165, -540 );
      rabbit4.scale.set(10, 10, 10); 
      rabbit4.rotation.set( 0, 3.5, 0 );     
      scene.add( rabbit4 ); 
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
    map: textureC,      
    //wireframe: true,
    side: THREE.DoubleSide,    
    // displacementMap: bumpP,
    // displacementScale: 5,
    roughness:0,
    reflectivity: 1,
    iridescence: 1,
    displacementMap: bumpP,
    displacementScale: 8,  
  });
  const material3 = new THREE.MeshPhysicalMaterial({
    color: 0XA2FF00,  
    color: 0XFF22C4,  
    map: textureC,  
    wireframe: true,
    displacementMap: vTexture2,
    displacementScale: 1, 
  });  
  const material4 = new THREE.MeshPhysicalMaterial({
    color: 0XA2FF00,
    color: 0XFF00A2,
    color: 0xCAA22C,
    color: 0x1c39bb,
    map: textureC,    
    wireframe: true,   
    side: THREE.DoubleSide,    
    displacementMap: bumpP,
    displacementScale: 8, 
  });  
  //PIANETA
  const gPianeta = new THREE.SphereGeometry( 10, 32, 32 );
  let pianeta = new THREE.Mesh( gPianeta, material1 );
  // pianeta.position.set( 15 , -3.5, -50);  
  pianeta.position.set( 15 , -84.5, -450); 
  pianeta.rotation.set( 0,0,1);
  scene.add(pianeta);  
  //CYLINDER
  const gCylinder = new THREE.CylinderGeometry( 40, 40, 1400, 128, 1400, 0, true  );
  const Cylinder1 = new THREE.Mesh(gCylinder, material4);
  Cylinder1.position.set( 0, 0, -100 );
  Cylinder1.rotation.set( 0, Math.PI/2, Math.PI/2.4);
  scene.add(Cylinder1);  
  //CYLINDER-2
  const gCylinder2 = new THREE.CylinderGeometry( 41, 41, 1400, 128, 1400, 0, true  );
  const Cylinder2A = new THREE.Mesh(gCylinder2, material2);
  Cylinder2A.position.set( 0, 0, -100 );
  Cylinder2A.rotation.set( 0, Math.PI/2, Math.PI/2.4);
  scene.add(Cylinder2A); 
  //DATA
  const gData = new THREE.CylinderGeometry ( 4, 4, 0.1, 64, 1,  true  );
  const dataForm = new THREE.Mesh(gData, material3 );  
  // dataForm.position.set( 0 , 0, -122 ); 
  dataForm.position.set( 0 , -40, -160 ); 
  dataForm.rotation.set( 0, Math.PI/2, Math.PI/2.4); 
  // scene.add(dataForm);
};