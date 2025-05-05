import * as THREE from 'three';
export default function(){
  const clock = new THREE.Clock();
  const time = clock.getElapsedTime; 
  // SCENE  
  const scene = new THREE.Scene();
  // var gridHelper = new THREE.GridHelper(100, 100);
  //scene.add(gridHelper);       
  //scene.background = new THREE.Color( 0xc35831 );
  scene.background = new THREE.Color( 0x000000 );
  //scene.fog = new THREE.Fog(0xc35831 , 0, 20);  
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
  // ANIMATE SCENE
  function animateScene(){
    requestAnimationFrame( animateScene );
    //handleScroll();
    renderer.render( scene, camera );
  };
  animateScene();
  // TEXTURES
  let Loader = new THREE.TextureLoader();
  let texturMars = Loader.load('./images/textures/Mars.jpg');
  let uvMap = Loader.load('./images/textures/Mars_2.jpg');
  // VIDEO A1
  var videoA1 = document.createElement('video');
  videoA1.src = "./video/writing/dal_deserto_rosso (1).mp4";
  videoA1.style.display = 'none';
  videoA1.muted = false; 
  videoA1.volume = 1;
  videoA1.loop = true; 
  document.body.appendChild(videoA1); 
  var vTextureA1 = new THREE.VideoTexture(videoA1);
  vTextureA1.minFilter = THREE.LinearFilter;
  vTextureA1.magFilter = THREE.LinearFilter;
  vTextureA1.format = THREE.RGBAFormat; 
  videoA1.load();
  videoA1.play();
  // MARTE
  const gSphere = new THREE.SphereGeometry( 16, 640, 640 );
  const mSphere = new THREE.MeshPhysicalMaterial({ 
    color: 0xff8855,       
    map: texturMars,  
    bumpMap: uvMap,    
    bumpScale: 0.2,
    displacementMap: uvMap,
    displacementScale: 0.1,
  });
  const marte = new THREE.Mesh(gSphere, mSphere); 
  marte.position.set( 0, 0, 0 );
  marte.rotation.set( Math.PI, 0, 0);
  scene.add( marte );  
  // PALLA VIDEO
  const gSphere2 = new THREE.SphereGeometry( 2,32,32);
  const mSphere2 = new THREE.MeshPhysicalMaterial({ 
    //color: 0Xffffff,
    map: vTextureA1,    
  });
  const sphere2 = new THREE.Mesh(gSphere2, mSphere2); 
  sphere2.position.set( 0, 0, 8);
  scene.add(sphere2);

  function animateMoon() {
    requestAnimationFrame(animateMoon);        
    marte.rotation.y += 0.0003;
    renderer.render( scene, camera );
  };

  animateMoon();


};