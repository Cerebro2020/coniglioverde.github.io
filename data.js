import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';
import { GLTFLoader } from './three_class/GLTFLoader.js';

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
  const Texture = loader.load('images/textures/hearts/quadretti2.jpg');
  Texture.wrapS = THREE.RepeatWrapping;
  Texture.wrapT = THREE.RepeatWrapping;
  Texture.repeat.set(1, 1);

  const Texture2 = loader.load('images/bcg/SfondoI2.jpg');

  const bcTexture = loader.load('images/bcg/SfondoI.jpg');  

  // SCENE & FOG
  //scene.background = new THREE.Color( 0x000000 );
  
  // CAMERA
  camera.position.set( 0, 0, 0);
  camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
  camera.setFocalLength ( 35 );

  // LIGHTS
  //AMBIENT
  const ambiente = new THREE.AmbientLight ( 0xffffff, 1)
  scene.add( ambiente);
  //POINT
  const pointLight = new THREE.PointLight( 0xffffff, 0.6, 100); 
  pointLight.position.set(0, 60, -30);
  scene.add( pointLight); 

  const pointLight2 = new THREE.PointLight( 0xffffff, 0.6, 100); 
  pointLight2.position.set(0, 0, -30);
  scene.add( pointLight2); 

  const pointLight3 = new THREE.PointLight( 0xffffff, 0.6, 100); 
  pointLight3.position.set(10, -40, -30);
  scene.add( pointLight3); 
  
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
    camera.position.set( 0, t*0.02, t*0.002 );    
  }

  document.body.onscroll = moveCamera;

  // HEARTS
  const loaderHeart = new GLTFLoader();
   
  loaderHeart.load(
    '3d/heart/heart.glb',
    function (gltfg) {
      const heart = gltfg.scene;
      heart.position.set( 8, -18, -24 );      
      heart.rotation.set( 0, 0, 0 );
      heart.scale.set( 4, 4, 4 );

      heart.traverse(function (node) {
        if (node.isMesh) {          
          const material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            map: Texture2,
            roughness: 0,
            metalness: 0,                            
          });
         
          node.material = material;          
                  
        }    
      });    

      scene.add(heart); 

    },   
       
    undefined, // funzione di progresso opzionale da passare al caricatore
    function (error) {
      console.error(error);      
    } 

  );
  
  // SFERA
  const gSfera = new THREE.SphereGeometry( 5, 32, 32 );
  const materialN = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    map: Texture2,
    roughness: 0,
    metalness: 0,      
    //bumpMap: uvTexture,
    //bumpScale: 0.01,
    //clearcoat: true,
    //clearcoatMap: uvTexture,

  });

  // SFERA
  let sfera = new THREE.Mesh( gSfera, materialN );
  sfera.position.set(-7 , 4, -28);
  scene.add(sfera);

  let sfera2 = sfera.clone();
  sfera2.position.set(17 , -50, -50);
  scene.add(sfera2);

  
  // CUBE
  const gBox = new THREE.BoxGeometry( 4, 4, 4 ); 
  const Box = new THREE.Mesh( gBox, materialN );
  Box.position.set( -14, -30, -40 );
  Box.rotation.set( 0, -0.4, 0.5 );

  let Box2 = Box.clone();
  Box.position.set( 8, 6, -40 );
  Box.rotation.set( 0, 0.4, -0.5 );
  scene.add( Box, Box2 );

  const gPiramid = new THREE.ConeGeometry( 10, 20, 3 ); 
  let piramid = new THREE.Mesh( gPiramid, materialN );
  piramid.position.set( 30, 0, -80 );
  piramid.rotation.set( 0, -2, -0.5 );

  let piramid2 = piramid.clone();
  piramid2.position.set( -40, -60, -120 );
  piramid2.rotation.set( 0.7, 0.2, -0.6 );
  scene.add( piramid, piramid2 ); 

  const gOctagon = new THREE.OctahedronGeometry( 4, 1 ); 
  let octagon = new THREE.Mesh( gOctagon, materialN );
  octagon.position.set( 10, -40, -40 );
  octagon.rotation.set( -0.2, 2, -1.5 );

  let octagon2 = octagon.clone();
  octagon2.position.set( -15, -18, -40 );
  octagon2.rotation.set( 0.2, 2, -0.5 );
  scene.add( octagon, octagon2 ); 

};