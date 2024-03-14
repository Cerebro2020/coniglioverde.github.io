import * as THREE from 'three';
import { VRButton } from './three_class/VRButton.js';
export default function(){
  let isMouseDown = false;   
  // SCENE  
  const scene = new THREE.Scene();
  // var gridHelper = new THREE.GridHelper(100, 100);
  //scene.add(gridHelper);       
  scene.background = new THREE.Color( 0xc35831 );
  scene.fog = new THREE.Fog(0xc35831 , 0, 20);  
  // CAMERA
  const camera = new THREE.PerspectiveCamera( 50 , window.innerWidth / window.innerHeight, 0.1, 10000 );
  //PALYER
  let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };  
  //RENDERER
  const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true}) ;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement ); 
  renderer.setAnimationLoop( function () {
    renderer.render( scene, camera );
  } );
  //VRBUTTON
  document.body.appendChild( VRButton.createButton( renderer ) );
  // RESIZE WINDOW
  window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height );
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  } );  
  // CAMERA
  camera.position.set( 0, 0, 25);  
  camera.lookAt(new THREE.Vector3( 0, 0, 0)); 
  camera.setFocalLength ( 35 );
  // LIGHTS
  const ambiente = new THREE.AmbientLight ( 0xffffff, 0.5)
  scene.add( ambiente);
  const pointLight = new THREE.PointLight( 0xffffff, 1, 250);     
  pointLight.position.set( 10, 25, 40 ); 
  const pointHelper = new THREE.PointLightHelper(pointLight, 1);   
  scene.add( pointLight, /*pointHelper*/ );  
  // VIDEO A1
  var videoA1 = document.createElement('video');
  videoA1.src = "./video/writing/dal_deserto_rosso (1).mp4";
  videoA1.style.display = 'none';
  //videoA1.muted = true; 
  videoA1.loop = true; 
  document.body.appendChild(videoA1); 
  var vTextureA1 = new THREE.VideoTexture(videoA1);
  vTextureA1.minFilter = THREE.LinearFilter;
  vTextureA1.magFilter = THREE.LinearFilter;
  vTextureA1.format = THREE.RGBAFormat; 
  videoA1.load();
  videoA1.play();
  // ANIMATE SCENE
  function animateScene(){
    requestAnimationFrame( animateScene );
    handleScroll();
    renderer.render( scene, camera );
  };
  animateScene();
  let Loader = new THREE.TextureLoader();
  let texturMars = Loader.load('./images/textures/Mars.jpg');
  let uvMap = Loader.load('./images/textures/Mars_2.jpg');
  // MARTE
  const gSphere = new THREE.SphereGeometry( 8, 64, 64 );
  const mSphere = new THREE.MeshPhysicalMaterial({ 
    map: texturMars,
  });
  const sphere = new THREE.Mesh(gSphere, mSphere); 
  sphere.position.set( 0, 0, 0 );
  sphere.rotation.set( 0, 0, 0);
  scene.add(sphere);
  // PALLA VIDEO
  const gSphere2 = new THREE.BoxGeometry( 1.6,0.9,2);
  const mSphere2 = new THREE.MeshPhysicalMaterial({ 
    map: vTextureA1,    
  });
  const sphere2 = new THREE.Mesh(gSphere2, mSphere2); 
  sphere2.position.set( 0, 0, -7.5);
  sphere2.rotation.set( 0, 0, 0);
  scene.add(sphere2);

  // ANIMATION MARS
  function mars(){
    requestAnimationFrame(mars);
    sphere.rotation.y -=0.00001;
    renderer.render(scene, camera);  
  }
  mars();
  // ANIMATION MOUSE   
  let scrollPos = 0;
  const keyframes = [
    new THREE.Vector3(0, 0, 25),
    new THREE.Vector3(15, 10, 0),
    new THREE.Vector3(0, -10, -15),
    new THREE.Vector3(0, -9, -15),
    new THREE.Vector3(0, 10, -15),
    new THREE.Vector3(-15, 0, 0)
  ];
  let lookAtPoints = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 10, 0),
    new THREE.Vector3(10, 0, 0),
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(5, 10, 0),
    new THREE.Vector3( -5, 0, 0)
  ];
  window.addEventListener('mousedown', function() {
    isMouseDown = true;
  });
  window.addEventListener('mouseup', function() {
    isMouseDown = false;
  });
  function handleScroll() {
    if (isMouseDown) {
      scrollPos += 1;
      const keyframeIndex = Math.floor(scrollPos / 1000 % keyframes.length); 
      const keyframeProgress = (scrollPos % 1000) / 1000; 
      camera.position.lerpVectors(
        keyframes[keyframeIndex],
        keyframes[(keyframeIndex + 1) % keyframes.length],
        keyframeProgress
      );
      camera.lookAt(
        lookAtPoints[keyframeIndex].clone().lerp(
          lookAtPoints[(keyframeIndex + 1) % lookAtPoints.length],
          keyframeProgress
        )
      );    
    }
  }
  window.addEventListener('scroll', handleScroll);
};