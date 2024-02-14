import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';

export default function(){
  
  window.resetCamera = resetCamera;

  // SCENE  
  const scene = new THREE.Scene();
  const gridHelper = new THREE.GridHelper( 1000, 1000 );
  //scene.fog = new THREE.Fog( 0xffffff, 600, 12000 );
  scene.background = new THREE.Color(  0x00000 );  
  //scene.add( gridHelper );

  //CAMERA
  const camera = new THREE.PerspectiveCamera( 50 , window.innerWidth / window.innerHeight, 0.1, 10000 );

  //PLAYER
  let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };

  //RENDERER
  const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true}); 
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;
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
  
  const clock = new THREE.Clock();
  
  // CAMERA
  camera.position.set( 0, 6000, 0/*2500*/ );
  //camera.rotation.z = Math.PI/2;
  camera.lookAt(new THREE.Vector3( 0, player.height, 0));
  //camera.setLens( 35 );
  camera.setFocalLength ( 70 );  

   // CONTROLS //////
  const controls = new OrbitControls( camera, renderer.domElement );  
  controls.listenToKeyEvents( window );
  controls.minDistance =  0;    
  controls.maxDistance = 6000;
  controls.maxPolarAngle = 1.5;

  let initialCameraPosition = new THREE.Vector3();
  initialCameraPosition.copy(camera.position);
  // Crea una funzione per resettare la camera
  function resetCamera() {
    camera.position.copy(initialCameraPosition);  
  } 

  // LIGHTS
  const ambiente = new THREE.AmbientLight ( 0xffffff, 1 )
  scene.add( ambiente);

  const sun = new THREE.DirectionalLight(0xffffff, 2, 20000);
  sun.position.set( 1600, 1500, 0);
  sun.castShadow = true;
  let sunHelper = new THREE.PointLightHelper(sun);
  scene.add(sun, /*sunHelper*/);

  const antiSun = new THREE.DirectionalLight(0xffffff, 0.01, 20000);
  antiSun.position.set( 0, -1500, 0);
  antiSun.castShadow = true;
  let antiSunHelper = new THREE.PointLightHelper(antiSun);
  //scene.add(antiSun, /*antiSunHelper*/);

  const sun2 = new THREE.PointLight(0xff00ff, 0.5, 6000);
  sun2.position.set( -800, 200, 0);
  sun2.castShadow = true;
  let sunHelper2 = new THREE.PointLightHelper(sun2);
  //scene.add(sun2, /*sunHelper2*/ );

  const sun3 = new THREE.PointLight(0xffff00, 0.5, 3000);
  sun3.position.set( 800, 20, 0);
  sun3.castShadow = true;
  let sunHelper3 = new THREE.PointLightHelper(sun3);
  //scene.add(sun3, sunHelper3);

  const sun4 = new THREE.PointLight(0xffffff, 0.5, 3000);
  sun4.position.set( 0, -20, -800);
  sun4.castShadow = true;
  let sunHelper4 = new THREE.PointLightHelper(sun4);
  //scene.add(sun4, /*sunHelper4*/);

  const sun5 = new THREE.PointLight(0xffffff, 0.5, 3000);
  sun5.position.set( 0, -20, 800);
  sun5.castShadow = true;
  let sunHelper5 = new THREE.PointLightHelper(sun5);
  //scene.add(sun5, /*sunHelper5*/);

  // TEXTURES
  const loader = new THREE.TextureLoader();
  const bumper = loader.load('images/textures/hearts/scrostato.jpg');
  const viefinder = loader.load('images/textures/aqvam/mirino3.jpg');


  // RANDOM ARRAY COLORS
  const colorsArray = [
      // Giallo al Rosso
      "ffffff", "ffcc00" 
    ];

  // ANIMATE SCENE ///////////////
  function animateScene(){
    requestAnimationFrame( animateScene );
    controls.update(clock.getDelta());
    //stats.update();
    renderer.render( scene, camera );
  };

  animateScene();

  // CSV IMPORT  
  let xhr = new XMLHttpRequest();
  // Configura la richiesta GET per il file CSV
  xhr.open('GET', './texts/batteri.csv', true);
  // Imposta il tipo di risposta come testo
  xhr.responseType = 'text';
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Converti il CSV in un array bidimensionale
      let rows = xhr.responseText.split('\n');
      let data = rows.map(function(row) {
        return row.split(',');
      });

      // Stampa l'array bidimensionale
      console.log(data);
    }
  };

  // Invia la richiesta
  xhr.send();

  // ARRAY
  let centroScenaArray = []; // Crea un array vuoto
  
  // BACTERIUM GEOMETRIES//////////////

  const gBody = new THREE.BoxGeometry(10, 10, 10);  
  const gCenterS = new THREE.BoxGeometry(0.5, 0.5, 0.5);  

  for(let i=0; i<600; i++){ 
    
    // CENTER
    const mCenter = new THREE.MeshPhysicalMaterial({
      color: 0Xffffff,           
      transparent: true,
      opacity: 0.,    
    });

    // MATERIAL
    const material = new THREE.MeshPhysicalMaterial({  
      color: 0Xffffff, 
      // roughness: 0,   
      // metalness: 0.5,      
      // ior: 0.1,
      // reflectivity: 1,
      // sheen: 1,
      // sheenColor: 0Xffffff, 
      // sheenRoughness: 0.2,    
      // clearcoat: 0,             
    });
      
    const mBacterium = material.clone();  

    let lineG = new THREE.CylinderGeometry( 0.1, 2, 80, 3, 1);        
    let lineVer = new THREE.Mesh(lineG, mBacterium);
    // lineVer.castShadow = true;
    // lineVer.receiveShadow = true;
    lineVer.position.set( -40, 0, 0),
    lineVer.rotation.set( Math.PI/2, 0, Math.PI/2 );    

    let p = -500 + i*0.8 //Math.random() * (-500 + 0) +0;// 0 punto più alto -500 più bassba -600 uguale a 0 quantità

    let values = [0.5, 1.5, 3.5]; 
    
    let randomIndex = Math.floor(Math.random() * values.length);

    let r =  values[randomIndex]; // 0 cresce, 1.5 uguale, 3 decresce 
   
     
    const body = new THREE.Mesh( gBody, mBacterium );
    // body.castShadow = true;
    // body.receiveShadow = true;
    body.position.set(600+(p*0.6),0,0);//al variare dell'altezza body si avvicina più o meno al centro 
    body.rotation.set(0,0, Math.PI-(r));//indica se sta crescendo o decrescendo rispetto ad uno stato precedente
    body.scale.set(1, 1, 0.5);
    body.add(lineVer);
        
    const centroScena = new THREE.Mesh(gCenterS, mCenter);
    
    centroScena.add(body);   
    centroScena.rotation.set( 0, i*0.0102, 0 );
    centroScena.position.set( 0, p, 0 );//

    scene.add(centroScena);
    
    centroScenaArray.push(centroScena); // Aggiungi centroScena all'array
    scene.add(centroScena);
        
  };

  // TORUS //
  const torusMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,      
    // roughness: 0,   
    // metalness: 0.5,
    // metalnessMap: bumper,   
    // ior: 0.1,
    // reflectivity: 1,
    // sheen: 1,
    // sheenRoughness: 0.2,
    // sheenColor: 0X08918A, 
    // clearcoat: 0,        
  });

  const torus1G = new THREE.TorusGeometry( 600,1, 32, 32 );
  const torus1 = new THREE.Mesh(torus1G, torusMat);
  torus1.position.set( 0, 0, 0 );
  torus1.rotation.set( Math.PI/2, 0, 0 );
  //scene.add(torus1);

  let torusNewMat = torusMat.clone();
  torusNewMat.color = new THREE.Color(0X06513E);
  let torusZ = new THREE.Mesh(torus1G, torusMat);
  torusZ.rotation.set( Math.PI/2, 0, 0 );
  scene.add(torusZ);

  let torusU = torus1.clone();
  let torusD = torus1.clone();
  let torusC = torus1.clone();
  let torusM = torus1.clone();
  let torusDM = torus1.clone();  

  torusU.position.set(0,-500, 0);
  torusD.position.set(0,-400, 0);
  torusC.position.set(0,-300, 0);
  torusM.position.set(0,-200, 0);  
  torusDM.position.set(0,-100, 0);  
 
  const scalU = 0.5; 
  const scalD = 0.6;
  const scalC = 0.7;
  const scalM = 0.8;
  const scalDM = 0.9;  
  
  torusU.scale.set(scalU,scalU,scalU); 
  torusD.scale.set(scalD,scalD,scalD);
  torusC.scale.set(scalC,scalC,scalC);
  torusM.scale.set(scalM,scalM,scalM);
  torusDM.scale.set(scalDM,scalDM,scalDM);  

  scene.add(torusU, torusD, torusC, torusM,torusDM );

  // COVER
  const coverM = new THREE.MeshPhysicalMaterial({
    color: 0x000000, 
    // roughness: 0,   
    // metalness: 0.5,
    // metalnessMap: bumper,   
    // ior: 0.1,
    // reflectivity: 1,
    // sheen: 1,
    // sheenRoughness: 0.2,    
    // clearcoat: 0,     
    // bumpMap: bumper,
    // bumpScale: 0.02,
    // //displacementMap: bumper, 
    side: THREE.DoubleSide,           
  });

  const gCoverU = new THREE.CylinderGeometry(300, 300, 60, 32);
  let coverU = new THREE.Mesh(gCoverU, coverM);
  coverU.position.set( 0, -540, 0);
  scene.add(coverU);

  
  
  //AUDIO//
  /*const listener = new THREE.AudioListener();
  camera.add(listener);
  const audioLoader = new THREE.AudioLoader();
  const backgroundSound = new THREE.Audio( listener );
  audioLoader.load('audio/436557__k2tr__major-drone02.mp3', function( buffer ) {
  backgroundSound.setBuffer( buffer );
  backgroundSound.setLoop( true );
  backgroundSound.setVolume( 0.4 );
  //backgroundSound.play();*/
  /*});*/ 

};