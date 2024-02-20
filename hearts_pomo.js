import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';
import { GLTFLoader } from './three_class/GLTFLoader.js';
import { FlakesTexture } from './three_class/FlakesTexture.js';

export default function(choose,quadri){

  const clock = new THREE.Clock();
  window.resetCamera = resetCamera;

  // SCENE  
  const scene = new THREE.Scene();

  // CAMERA //////
  const camera = new THREE.PerspectiveCamera( 50 , window.innerWidth / window.innerHeight, 0.1, 4000 );

  let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
  
  camera.position.set( -20, 0, 400 );  /* 200, 40*/
  camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
  /*camera.setFocalLength ( 70 );*/
  camera.setFocalLength ( 35 );

  // RENDERER
  const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});  

  // CONTROLS //////
  const controls = new OrbitControls( camera, renderer.domElement );  
  controls.listenToKeyEvents( window );
  controls.minDistance =  20;    
  controls.maxDistance = 400;
  //controls.maxPolarAngle = 1.5; 

  let initialCameraPosition = new THREE.Vector3();
  initialCameraPosition.copy(camera.position);
  // Crea una funzione per resettare la camera
  function resetCamera() {
    camera.position.copy(initialCameraPosition);  
  } 

  // RENDERER
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;  
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
    
  // RESIZE WINDOW //////
  window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height );
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  } );

  // SCENE & FOG //////
  scene.background = new THREE.Color(  0x000000 );    
  //scene.fog = new THREE.Fog(0x00ffff, 1, 100);

  // LIGHTS //////
  //AMBIENT
  const ambient = new THREE.AmbientLight( 0xffffff, 1 );  
  scene.add( ambient); 

  //POINTS 
  const pLight = new THREE.PointLight( 0xffffff, 0.35, 2000 );  
  pLight.position.set( 0, 1, 0);
  const pHelper = new THREE.PointLightHelper(pLight); 
  pLight.castShadow = true; 
  //Set up shadow properties for the light
  pLight.shadow.mapSize.width = 1024; // default
  pLight.shadow.mapSize.height = 1024; // default
  pLight.shadow.camera.near = 0.5; // default
  pLight.shadow.camera.far = 10; // default

  let pLight2 = pLight.clone();
  let pLight3 = pLight.clone();
  let pLight4 = pLight.clone();
  let pLight5 = pLight.clone();
  let pLight6 = pLight.clone();
  let pLight7 = pLight.clone();

  pLight2.position.set(0,400,0);
  pLight3.position.set(0,-400,0);
  pLight4.position.set(0,0,400);
  pLight5.position.set(0,0,-400);
  pLight6.position.set(400,0,0);
  pLight7.position.set(-400,0,0);

  scene.add(pLight, pLight2, pLight3, pLight4, pLight5, pLight6, pLight7 );

  // ANIMATE SCENE //////
  function animateScene(){
    requestAnimationFrame( animateScene );
    renderer.render( scene, camera );
  };

  animateScene();

  //TEXTURES
  const loader = new THREE.TextureLoader();   
  
  let TextureF = new THREE.CanvasTexture(new FlakesTexture());
  TextureF.wrapS = THREE.RepeatWrapping;
  TextureF.wrapT = THREE.RepeatWrapping;
  TextureF.repeat.set(15, 15); 

  const exhib = loader.load('./images/equirectangulars/space.jpg');

  // TORSOLO
  const loaderTorsolo = new GLTFLoader();

  loaderTorsolo.load(    
    './3d/Torsolo17.glb',
    function (glt) {
      const torsolo = glt.scene;
      torsolo.position.set(0, -5, 0);
      torsolo.rotation.set(0, -Math.PI/1.4, 0);      
      torsolo.scale.set(10, 10, 10);  
      
      torsolo.traverse(function (node) {
        if (node.isMesh) {
          const material = new THREE.MeshPhysicalMaterial({
            color: 0xc0652b,          
            metalness: 0.9,            
            roughness: 0.5,
            ior: 2.3,
            reflectivity: 1,
            sheen: 1,
            sheenRoughness: 0.2,
            sheenColor: 0xc0652b, 
            clearcoat: 1, 
            clearcoatRoughness: 0,               
            normalMap: TextureF, 
            normalScale: new THREE.Vector2(0.005,0.005),
            
          });
  
          node.material = material;
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
  
      scene.add(torsolo);
       
      torsolo.castShadow = true; 
      torsolo.receiveShadow = true;       
  
    },
      
    undefined, // funzione di progresso opzionale da passare al caricatore
    function (error) {
      console.error(error);      
      }
  
  );  
  

  // GRUPPO EMOZIONI //////
  let emotionGroup = new THREE.Group();
  const emozioni=_.map(choose,(v,k)=>{

    const formeGeometriche = {
      'sfera': new THREE.SphereGeometry( 0.8, 64, 64 ),
      'piramide': new THREE.ConeGeometry( 1, 2, 4 ),      
      'cubo': new THREE.BoxGeometry( 1.2, 1.2, 1.2 ),
      'dodecaedro': new THREE.DodecahedronGeometry( 1, 0 ),
      'torus': new THREE.BoxGeometry( 1.2, 1.2, 1.2 ),
    };
 
    const nomiFormeGeometriche = ['dodecaedro','sfera', 'cubo','piramide'  ];
 
    const colori = [
      'DEC414', 'FEF600', 'FEBE00', 'FFD700', 'C9A021',
      'FE005B', 'FF0000', 'A32590', 'FB46FF', 'DF73FF',
      '227BFF', '3E39FF', '222EFF', '001DEC', '2A23A3',
      '49C51A', '2D7121', '3C6232', '0A5C0A', '008000',
    ];
   
    // Definisci i gruppi di colori
    const gruppiColori = [
      colori.slice(0, 5),  // Primi 5 colori
      colori.slice(5, 10), // Successivi 5 colori
      colori.slice(10, 15), // Successivi 5 colori
      colori.slice(15, 20)  // Ultimi 5 colori
    ];
    
    const coloreCorrente = new THREE.Color(v[1]).getHexString().toUpperCase();
 
    let forma;
 
    for (let i = 0; i < gruppiColori.length; i++) {
      console.log(`Checking group ${i}:`, gruppiColori[i]);
      console.log(`Current color:`, coloreCorrente);
      console.log(`Is color in group?`, gruppiColori[i].includes(coloreCorrente));
      if (gruppiColori[i].includes(coloreCorrente)) {
        forma = formeGeometriche[nomiFormeGeometriche[i]];         
        break; 
      }
    }

    

    // EMOTION MATERIAL
    const emoMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(v[1]),
      sheenColor: new THREE.Color(v[1]),                  
      metalness: 0.9,            
      roughness: 0.5,
      ior: 2.3,
      reflectivity: 1,
      sheen: 1,
      sheenRoughness: 0.2,
      sheenColor: 0xc0652b, 
      clearcoat: 1, 
      clearcoatRoughness: 0,               
      normalMap: TextureF, 
      normalScale: new THREE.Vector2(0.005,0.005),             
    }); 

    if (!forma) {
      forma = formeGeometriche['torus'];
      emoMaterial.color = new THREE.Color(0XC0652B);
    }
     
    //  EMOTION 1
    const emotion1 = new THREE.Mesh( forma, emoMaterial);  
    emotion1.position.set(-7.1, -3.5, 0 );
    emotion1.rotation.set( 0, 0, 0);
    emotion1.scale.set( 1.5, 1.5, 1.5 ); 
    
    emotion1.castShadow = true; 
    emotion1.receiveShadow = true; 
    
    //  EMOTION 2
    let newMat = emoMaterial.clone()
    newMat.color = new THREE.Color(v[2] ? v[2] : v[1]);
    let forma2;
 
    for (let i = 0; i < gruppiColori.length; i++) {
      const coloreCorrente2 = newMat.color.getHexString().toUpperCase();
      if (gruppiColori[i].includes(coloreCorrente2)) {
        forma2 = formeGeometriche[nomiFormeGeometriche[i]];         
        break; 
      }
    }

    if (!forma2) {
      forma2 = formeGeometriche['torus'];
      newMat.color = new THREE.Color(0XC0652B);
    }

    const emotion2 = new THREE.Mesh(forma2, newMat);  
    emotion2.position.set( -9.1, -5.5, 0 );
    emotion2.rotation.set( 0, 0, Math.PI/2 );
    emotion2.scale.set( 1.3, 1.3, 1.3 );  
    
    emotion2.castShadow = true; 
    emotion2.receiveShadow = true; 
   
    // EMOTION 3 
    newMat = emoMaterial.clone();
    newMat.color = new THREE.Color(v[3] ? v[3] : v[1]);

    let forma3;
    for (let i = 0; i < gruppiColori.length; i++) {
      const coloreCorrente2 = newMat.color.getHexString().toUpperCase();
      if (gruppiColori[i].includes(coloreCorrente2)) {
        forma3 = formeGeometriche[nomiFormeGeometriche[i]];         
        break;
      }
    }
  
    if (!forma3) {
      forma3 = formeGeometriche['torus'];
      newMat.color = new THREE.Color(0XC0652B);
    }

    const emotion3 = new THREE.Mesh(forma3, newMat);  
    emotion3.position.set( -7.7, -7, 0 );
    emotion3.rotation.set( 0, 0, Math.PI/1.5 );
    emotion3.scale.set( 1.1, 1.1, 1.1 );   
    
    emotion3.castShadow = true; 
    emotion3.receiveShadow = true; 
        
    const ret = emotionGroup.clone(true);
    ret.add(emotion1, emotion2, emotion3,/*centro*/);
    scene.add(ret);

    // CODICE PRECEDENTE PRIMA DI BING//
    //ret.position.set( 2, k*1.1 + (0.2*Math.PI/Math.cos(k+8)), 0); //+ 2 aumeta distanza tra sfere
    ret.position.set(2,k,0);
    ret.rotation.set( 0, k/3.4, 0 );
    ret.scale.set( 3,3,3 );   

  })

   // BACKGROUND 
   const listenerBcg = new THREE.AudioListener();
   camera.add(listenerBcg);
 
   const audioLoader = new THREE.AudioLoader();

  const backgroundSound = new THREE.Audio( listenerBcg );
  audioLoader.load('audio/hearts/436557__k2tr__major-drone02.mp3', function( buffer ) {
    backgroundSound.setBuffer( buffer );
    backgroundSound.setLoop( true );
    backgroundSound.setVolume( 0.1 );
    backgroundSound.play();
  });  

};