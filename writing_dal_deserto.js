import * as THREE from 'three';
export default function(){
  const clock = new THREE.Clock();
  const time = clock.getElapsedTime; 
  let isMouseDown = false;
  let scrollPos = 0;
  let currentKeyframeIndex = 0;
  let lerpDuration = []; 
  // SCENE  
  const scene = new THREE.Scene();
  // var gridHelper = new THREE.GridHelper(100, 100);
  //scene.add(gridHelper);       
  scene.background = new THREE.Color( 0xc35831 );
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
  //videoA1.muted = true; 
  videoA1.loop = true; 
  document.body.appendChild(videoA1); 
  var vTextureA1 = new THREE.VideoTexture(videoA1);
  vTextureA1.minFilter = THREE.LinearFilter;
  vTextureA1.magFilter = THREE.LinearFilter;
  vTextureA1.format = THREE.RGBAFormat; 
  videoA1.load();
  videoA1.play();
  // MARTE
  const gSphere = new THREE.SphereGeometry( 8, 640, 640 );
  const mSphere = new THREE.MeshPhysicalMaterial({ 
    color: 0xff0000,       
    //map: texturMars,  
    //bumpMap: uvMap,    
    //bumpScale: 0.2,
    //displacementMap: uvMap,
    //displacementScale: 0.1,
  });
  const sphere = new THREE.Mesh(gSphere, mSphere); 
  sphere.position.set( 0, 0, 0 );
  sphere.rotation.set( Math.PI/2, 0, 0);
  scene.add( sphere );
  // PALLA VIDEO
  // PALLA VIDEO
  const gSphere2 = new THREE.BoxGeometry( 1.6,0.9,2);
  const mSphere2 = new THREE.MeshPhysicalMaterial({ 
    map: vTextureA1,    
  });
  const sphere2 = new THREE.Mesh(gSphere2, mSphere2); 
  sphere2.position.set( 0, 0, 8);
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
  const keyframes = [
    new THREE.Vector3(0, 0, 25),
    new THREE.Vector3(0, 10, 5),
    new THREE.Vector3(0, 0, 35),  
  ];
  let lookAtPoints = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 10, -10),
    new THREE.Vector3(0, -10, 0),
  ];

  let lerpDurations = [
    2,
    2,
    2
  ];  
  window.addEventListener('mousedown', function() {
    currentKeyframeIndex = (currentKeyframeIndex + 1) % keyframes.length;  
    const targetPosition = keyframes[currentKeyframeIndex];
    const targetLookAt = lookAtPoints[currentKeyframeIndex];
    const lerpDuration = lerpDurations[currentKeyframeIndex];
    const startTime = Date.now();
    function updateCameraPosition() {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000; 
      const lerpProgress = Math.min(elapsedTime / lerpDuration, 1); 
      camera.position.lerpVectors(camera.position, targetPosition, lerpProgress);
      sphere2.position.lerpVectors(sphere2.position, targetLookAt, lerpProgress);
      const lookAtDirection = targetLookAt.clone().sub(sphere2.position).normalize();

      console.log(lerpDuration);

      camera.lookAt(sphere2.position.clone().add(lookAtDirection));
      if (lerpProgress < 1) {
        requestAnimationFrame(updateCameraPosition); 
      }
    }  
    updateCameraPosition();
  });
  // window.addEventListener('mousedown', function() {
  //   isMouseDown = true;
  // });
  // window.addEventListener('mouseup', function() {
  //    isMouseDown = false;
  // });
  // function handleScroll() {
  //   if (isMouseDown) {
  //     scrollPos += 1;
  //     const keyframeIndex = Math.floor(scrollPos / 500 % keyframes.length); 
  //     const keyframeProgress = (scrollPos % 500) / 500; 
  //     camera.position.lerpVectors(
  //       keyframes[keyframeIndex],
  //       keyframes[(keyframeIndex + 1) % keyframes.length],
  //       keyframeProgress
  //     );
  //     camera.lookAt(
  //       lookAtPoints[keyframeIndex].clone().lerp(
  //       lookAtPoints[(keyframeIndex + 1) % lookAtPoints.length],
  //       keyframeProgress
  //       )
  //   );  
  //   }
  // }
  //window.addEventListener('scroll', handleScroll);
  camera.lookAt(sphere2.position);
};