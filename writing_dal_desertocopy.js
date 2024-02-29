import * as THREE from 'three';
export default function(){
  // SCENE  
  const scene = new THREE.Scene();
  // var gridHelper = new THREE.GridHelper(100, 100);
  //scene.add(gridHelper);       
  scene.background = new THREE.Color( 0xc35831 );
  scene.fog = new THREE.Fog(0xc35831 , 0, 20);  
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

  let isMouseDown = false;

  scene.add( pointLight, /*pointHelper*/ );  
  // ANIMATE SCENE
  function animateScene(){
    requestAnimationFrame( animateScene );

      // Aggiungi questa chiamata a handleScroll
  handleScroll();

    renderer.render( scene, camera );
  };
  animateScene();
  let Loader = new THREE.TextureLoader();
  let texturMars = Loader.load('./images/textures/Mars.jpg');
  let uvMap = Loader.load('./images/textures/Mars_2.jpg');

  // MARTE
  const gSphere = new THREE.SphereGeometry( 8, 640, 640 );
  const mSphere = new THREE.MeshPhysicalMaterial({ 
    //color: 0xff0000,       
    map: texturMars,  
    bumpMap: uvMap,    
    bumpScale: 0.2,
    displacementMap: uvMap,
    displacementScale: 0.1,
  });
  const sphere = new THREE.Mesh(gSphere, mSphere); 
  sphere.position.set( 0, 0, 0 );
  sphere.rotation.set( 0, 0, 0);
  scene.add( sphere );
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
      const keyframeIndex = Math.floor(scrollPos / 500 % keyframes.length); 
      const keyframeProgress = (scrollPos % 500) / 500; 
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