import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';

export default function(){
  // SCENE  
  const scene = new THREE.Scene();
  //var gridHelper = new THREE.GridHelper(100, 100);
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
  scene.background = new THREE.Color( 0xc35831 );
  scene.fog = new THREE.Fog(0xc35831 , 0, 100);
  
  // CAMERA
  camera.position.set( 0, 10, 82);  
  camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
  camera.setFocalLength ( 35 );

  // LIGHTS
  const ambiente = new THREE.AmbientLight ( 0xffffff, 0.5)
  scene.add( ambiente);
  const pointLight = new THREE.PointLight( 0xffffff, 1, 250);     
  pointLight.position.set( -10, 25, 0 ); 
  const pointHelper = new THREE.PointLightHelper(pointLight, 1);
  scene.add( pointLight, /*pointHelper*/ );
  
  // ANIMATE SCENE
  function animateScene(){
    requestAnimationFrame( animateScene );
    renderer.render( scene, camera );
  };
  animateScene();

  // ORBIT CONTROLS
  const controls = new OrbitControls( camera, renderer.domElement );  
  controls.listenToKeyEvents( window ); 
  controls.minDistance = 82;
  controls.maxDistance = 120;

  // VIDEO
  var video = document.createElement('video');
  video.src = "./video/writing/dal_deserto_rosso (1).mp4";
  video.style.display = 'none';  // Nasconde l'elemento video
  video.loop = true; 
  document.body.appendChild(video);  // Aggiunge l'elemento video al corpo del documento

  video.load();
  video.play();

  var vTexture = new THREE.VideoTexture(video);
  vTexture.minFilter = THREE.LinearFilter;
  vTexture.magFilter = THREE.LinearFilter;
  vTexture.format = THREE.RGBAFormat;
  vTexture.wrapS = THREE.RepeatWrapping;
  vTexture.wrapT = THREE.RepeatWrapping;
  vTexture.repeat.set( 1, 1 );

  let Loader = new THREE.TextureLoader();
  let texturMars = Loader.load('./images/textures/Mars.jpg');


  // MARTE
  const gSphere = new THREE.SphereGeometry( 40, 64, 64 );
  const mSphere = new THREE.MeshPhysicalMaterial({ 
    //color: 0xff0000,       
    map: texturMars,
    
    bumpMap: texturMars,
    bumpScale: 0.1,

  });

  const sphere = new THREE.Mesh(gSphere, mSphere); 
  sphere.position.set( 0, -35, 0 );
  sphere.rotation.set( 0, 0, 0);

  scene.add( sphere );

};