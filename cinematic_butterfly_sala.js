import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';
import { OBJLoader } from './three_class/OBJLoader.js';

export default function(){

  // SCENE  
  const scene = new THREE.Scene();
  
  //CAMERA
  const camera = new THREE.PerspectiveCamera( 25 , window.innerWidth / window.innerHeight, 0.1, 10000 );
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
  const textureP1 = loader.load ('images/bcg/AI (1).jpg'); 
  const textureP2 = loader.load ('images/bcg/AI (2).jpeg');
  const textureP3 = loader.load ('images/bcg/AI (3).jpeg');
  const textureP4 = loader.load ('images/bcg/SfondoI.jpg');
  const TextureQ2 = loader.load('images/textures/hearts/quadretti2.jpg');
  TextureQ2.wrapS = THREE.RepeatWrapping;
  TextureQ2.wrapT = THREE.RepeatWrapping;
  TextureQ2.repeat.set(1, 1); 

  // SCENE & FOG
  //scene.background = new THREE.Color( 0xff0000 );
  
  // CAMERA
  camera.position.set( 0, 0, 30);
  camera.lookAt(new THREE.Vector3( 0, player.height, -200)); 
  camera.setFocalLength ( 35 );

  const h = 1.2;

  // LIGHTS
  //AMBIENT
  const ambiente = new THREE.AmbientLight ( 0xffffff, 1 )
  scene.add( ambiente);
  //POINT
  const pointLight = new THREE.PointLight( 0xffffff, 0.02, 250);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024; // default
  pointLight.shadow.mapSize.height = 1024; // default
  pointLight.shadow.camera.near = 0.01; // default
  pointLight.shadow.camera.far = 0.1; // default

  pointLight.position.set(0,0,-86);

  let pointLight2 = pointLight.clone();
  let pointLight2a = pointLight.clone();
  let pointLight3 = pointLight.clone();
  let pointLight3a = pointLight.clone();
  pointLight2.position.set(-24,0,-66);
  pointLight2a.position.set(24,0,-66);
  pointLight3.position.set(-24,0,-36);
  pointLight3a.position.set(24,0,-36);

  let helper = new THREE.PointLightHelper(pointLight2);   
  scene.add( pointLight, /*helper,*/ pointLight2, pointLight2a, pointLight3, pointLight3a ); 
  
  // ANIMATE SCENE
  function animateScene(){
    requestAnimationFrame( animateScene );
    renderer.render( scene, camera );
  };
  animateScene();

  // ORBIT CONTROLS
  const controls = new OrbitControls( camera, renderer.domElement );  
  controls.listenToKeyEvents( window ); 
  controls.minDistance = 1;
  controls.maxDistance = 60;

  //let grid = new THREE.GridHelper();
  //scene.add(grid);

   // UV MAP //
   const uvLoader = new THREE.TextureLoader();
   const uvPaper = uvLoader.load('images/uvmap/paper.jpg');
   uvPaper.wrapS = THREE.RepeatWrapping;
   uvPaper.wrapT = THREE.RepeatWrapping;
   uvPaper.repeat.set(8, 8); 

  // VIDEO  
  // VIDEO 1
  var video1 = document.createElement('video');
  video1.src = "./video/cinematic/butterfly_spot.mp4";
  //video1.src = "/video/writing/dal_deserto_rosso (1).mp4";
  //video1.src = "/video/writing/traccia_fantasma (1).mp4";
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
  
  // MATERIALS
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    map: vTexture1,       
  }); 

  const material2 = new THREE.MeshPhysicalMaterial({
    color: 0x080808, 
    roughness: 0.5,
    metalness: 0,  
    bumpMap: uvPaper,
    bumpScale: 0.05,

  });

  const material3 = new THREE.MeshPhysicalMaterial({
    color: 0xff0000,               
  });
  
  //SALA  

  // DESTRA
  const gParteDestra = new THREE.BoxGeometry(0.1,h,9.245);
  let pDestra = new THREE.Mesh( gParteDestra, material);
  pDestra.position.set( (4.82/2),h/2,0.1);  
  scene.add(pDestra);

  // SINISTRA 1
  const gParteSinistra1 = new THREE.BoxGeometry(0.1,h,3.609);
  let pSinistra1 = new THREE.Mesh( gParteSinistra1, material);
  pSinistra1.position.set(-(4.88/2), h/2, (3.709-(3.509/4)));  
  scene.add(pSinistra1);
  // SINISTRA 2
  const gParteSinistra2 = new THREE.BoxGeometry(1.166,h,0.1);
  let pSinistra2 = new THREE.Mesh( gParteSinistra2, material);
  pSinistra2.position.set(-((4.88+1.166)/2), h/2, 1.054 );  
  scene.add(pSinistra2);
  // SINISTRA 3
  const gParteSinistra3 = new THREE.BoxGeometry(1.166,h,0.1);
  let pSinistra3 = new THREE.Mesh( gParteSinistra3, material);
  pSinistra3.position.set(-((4.88+1.166)/2), h/2, 0);  
  scene.add(pSinistra3);
  // SINISTRA 3
  const gParteSinistra4 = new THREE.BoxGeometry(0.1,h,1.056);
  let pSinistra4 = new THREE.Mesh( gParteSinistra4, material);
  pSinistra4.position.set(-((4.88+(1.166*2))/2), h/2, (1.056/2));  
  scene.add(pSinistra4);
  // SINISTRA 5
  const gParteSinistra5 = new THREE.BoxGeometry(0.1,h,4.582);
  let pSinistra5 = new THREE.Mesh( gParteSinistra5, material);
  pSinistra5.position.set(-(4.88/2), h/2, -(4.582/2));  
  scene.add(pSinistra5);  

  //FRONTALE
  const gPareteFrontale = new THREE.BoxGeometry( 4.78, h, 0.1 );
  let pFrontale = new THREE.Mesh( gPareteFrontale, material);
  pFrontale.position.set( 0, h/2, -(9.245/2) );  
  scene.add(pFrontale);

  // PAVIMENTO
  const gPavimento = new THREE.BoxGeometry( 8, 0.1, 10.245, );
  let pavimento = new THREE.Mesh( gPavimento, material2);
  pavimento.position.set( 0, -0.05, 0 );
  pavimento.receiveShadow = true;  
  
  scene.add(pavimento);

  // TETTO
  const tetto = pavimento.clone();
  tetto.position.set(0,(h+0.1),0);

  const gCopertura = new THREE.BoxGeometry(4,h+0.1,0.1);
  let copertura = new THREE.Mesh(gCopertura, material2);
  copertura.position.set(4.3, h/2, 4.75);
  let coperturaS = copertura.clone();
  coperturaS.position.set(-4.3, h/2, 4.75)
  scene.add(copertura, coperturaS);

  let sala = new THREE.Group();
  sala.add(pDestra, pSinistra1, pSinistra2, pSinistra3, pSinistra4, pSinistra5, pFrontale, pavimento, tetto, copertura, coperturaS );
  sala.position.set(0,-5,-40);
  sala.scale.set(10,10,10);  
  scene.add(sala);

  const gColonna = new THREE.CylinderGeometry(0.5,0.5,12,64);
  let colonna1 = new THREE.Mesh(gColonna, material2);
  colonna1.position.set(-14,-4, 31);
  colonna1.castShadow = true; //default is false
  colonna1.receiveShadow = true;


  let colonna1a = colonna1.clone();
  colonna1a.position.set(-14,-4, 28);
  let colonne2 = new THREE.Group();
  colonne2.add(colonna1,colonna1a);
  let colonne2a = colonne2.clone();
  colonne2a.position.set(0,0,-18);
  let colonne4 = new THREE.Group();
  colonne4.add(colonne2, colonne2a);
  let colonne4a = colonne4.clone();
  colonne4a.position.set(0,0,-32);  
  let colonne8 = new THREE.Group();  
  colonne8.add(colonne4, colonne4a);
  let colonne8a = colonne8.clone();
  colonne8a.position.set(28,0,0);
  let colonne16 = new THREE.Group();
  colonne16.add(colonne8, colonne8a);
  colonne16.position.set(0,5,-40);
  scene.add(colonne16);

 

  // FEMALE    
  const loaderHousewife = new OBJLoader();
  let housewife;
     
  // LOAD A RESOURCE
  loaderHousewife.load('3d/humans/housewife.obj',
    function ( objHousewife ) {
      objHousewife.position.set( -5, -4, -10 );
      objHousewife.rotation.set( 0, Math.PI/2.2, 0 );      
      try{
        const matHousewife = new THREE.MeshPhysicalMaterial({
         color: 0x555555,          
          //clearcoat: 1.0,
          //clearcoatRoughness: 0.1                  
        })     
        
        objHousewife.children[0].material=matHousewife;
      }catch(e){
        console.log(e);
      }
      housewife=objHousewife;     
      console.log( 'body was loaded', housewife );
      housewife.position.set(0,-5,-30);
      housewife.rotation.set(0, Math.PI,0); 
      housewife.castShadow = true;     
      scene.add( housewife );
      let hh = 0.08;

      housewife.scale.set( hh, hh, hh);        
     
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

  animateScene();  
 
};