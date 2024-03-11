import * as THREE from 'three';
import { GLTFLoader } from './three_class/GLTFLoader.js';
import { VRButton } from './three_class/VRButton.js';
import { XRControllerModelFactory } from './three_class/XRControllerModelFactory.js';
import {FirstPersonControls} from './three_class/FirstPersonControls.js';
export default function(choose, quadri){

  const colore0 = choose[0][0]; 
  const colore1 = choose[0][1]; 
  const colore2 = choose[1][1];
  const colore3 = choose[2][1]; 
  const colore4 = choose[3][1];
  const colore5 = choose[4][1]; 
  const colore6 = choose[5][1];
  const colore7 = choose[6][1]; 
  const colore8 = choose[7][1];
  const colore9 = choose[8][1]; 
  const colore10 = choose[9][1];
  const colore11 = choose[10][1]; 
  const colore12 = choose[11][1];
  const colore13 = choose[12][1]; 
  const colore14 = choose[13][1];
  const colore15 = choose[14][1]; 
  const colore16 = choose[15][1];
  const colore17 = choose[16][1]; 
  const colore18 = choose[17][1];
  const colore19 = choose[18][1]; 
  const colore20 = choose[19][1];

  const clock = new THREE.Clock();
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(  0xF466CA );
  scene.fog = new THREE.Fog( 0xF466CA, 5, 15 ); 
  let helperG = new THREE.GridHelper(10,10);
  scene.add(helperG);
  //CAMERA
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };  
  camera.position.set( 0, 1.74, 5 ); 
  camera.rotation.set( 1, 0, 0 );
  camera.lookAt(new THREE.Vector3( 0, player.height, 0));  
  camera.setFocalLength ( 35 );
  //RENDERER
  const renderer = new THREE.WebGLRenderer({    
    alpha:true, 
    antialias:true
  }) ;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio( window.devicePixelRatio );
  document.body.appendChild( renderer.domElement );
  renderer.xr.enabled = true,   
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;  
  renderer.setSize( window.innerWidth, window.innerHeight ); 
  // RESIZE WINDOW
  window.addEventListener('resize', function(){
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize( width, height );
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    } );
    document.body.appendChild(renderer.domElement);
  //VRBUTTON
  document.body.appendChild( VRButton.createButton( renderer ) );
  renderer.setAnimationLoop( function () {
    renderer.render( scene, camera );    
  } );
  // CONTROLS
  const controls = new FirstPersonControls(camera, renderer.domElement);    
  controls.movementSpeed = 6;
  controls.lookSpeed = 0.015;
  // LIGHTS
  const ambiente = new THREE.AmbientLight ( 0xFFFFFF, 0.5);
  const pointL = new THREE.PointLight(0X68F466, 0.5, 2000);    
  pointL.position.set(-2, 5, 2);  
  pointL.castShadow = true;
  pointL.shadow.mapSize.width = 512; // default
  pointL.shadow.mapSize.height = 512; // default
  pointL.shadow.camera.near = 0.5; // default
  pointL.shadow.camera.far = 1; // default
  scene.add( ambiente, pointL);  
  //TEXTURES  
  const loader = new THREE.TextureLoader();
  const TextureQ2 = loader.load('images/textures/hearts/quadretti2.jpg');
    // VIDEO
    var video = document.createElement('video');
    video.src = "video/video_textures/water_loop.mp4";
    video.style.display = 'none'; 
    video.muted = true;
    video.loop = true; 
    document.body.appendChild(video);
    video.load();
    video.play();
    var vTexture = new THREE.VideoTexture(video);
    vTexture.minFilter = THREE.LinearFilter;
    vTexture.magFilter = THREE.LinearFilter;
    vTexture.format = THREE.RGBAFormat;
  // ANIMATE  
  function animateScene(){
    requestAnimationFrame(animateScene);
    controls.update(clock.getDelta());
    renderer.render(scene, camera);
  }
  animateScene();  
    //MATERIAL
    const eleMat = new THREE.MeshPhysicalMaterial({ 
      color: new THREE.Color(colore0), 
      map: TextureQ2,
    });
  //CONSTS
  // GRUPPO EMOZIONI //////
  let emotionGroup = new THREE.Group();
  const emozioni=_.map(choose,(v,k)=>{
    const formeGeometriche = {
      'sfera': new THREE.SphereGeometry( 0.8, 16, 16 ),
      'piramide': new THREE.ConeGeometry( 1, 2, 4 ),      
      'cubo': new THREE.BoxGeometry( 1.2, 1.2, 1.2 ),
      'dodecaedro': new THREE.DodecahedronGeometry( 1, 0 ),
      'octaedro': new THREE.OctahedronGeometry( 1, 1 )
    };   
    const nomiFormeGeometriche = ['dodecaedro','sfera', 'cubo','piramide'];
    const colori = [
      'DEC414', 'FEF600', 'FEBE00', 'FFD700', 'C9A021',
      'FE005B', 'FF0000', 'A32590', 'FB46FF', 'DF73FF',
      '227BFF', '3E39FF', '222EFF', '001DEC', '2A23A3',
      '49C51A', '2D7121', '3C6232', '0A5C0A', '008000'
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
      if (gruppiColori[i].includes(coloreCorrente)) {
        forma = formeGeometriche[nomiFormeGeometriche[i]];        
        break; 
      }
    }
    if (!forma) {
      forma = formeGeometriche['octaedro'];
    }
     // EMOTION MATERIAL
     const emoMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(v[1]), 
      map: TextureQ2,     
    });
    // EMOTION 1
    const emotion1 = new THREE.Mesh( forma, emoMaterial);  
    emotion1.position.set(-0.7, 1.35, -0.3 );
    emotion1.rotation.set( 0, 0, 0);
    emotion1.scale.set( 0.15,0.15, 0.15 );    
    emotion1.castShadow = true; 
    emotion1.receiveShadow = true;    
    // EMOTION 2
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
      forma2 = formeGeometriche['octaedro'];     
    }
    const emotion2 = new THREE.Mesh(forma2, newMat);  
    emotion2.position.set( -0.61, 1.25, -0.3 );
    emotion2.rotation.set( 0, 0, -Math.PI/3 );
    emotion2.scale.set( 0.13, 0.13, 0.13 );    
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
      forma3 = formeGeometriche['octaedro'];    
    }   
      const emotion3 = new THREE.Mesh(forma3, newMat);  
      emotion3.position.set( -0.77, 1.1, -0.3 );
      emotion3.rotation.set( 0, 0, Math.PI/1.5 );
      emotion3.scale.set( 0.1, 0.1, 0.1 ); 
      emotion3.castShadow = true; 
      emotion3.receiveShadow = true;
      const ret = emotionGroup.clone(true);
      ret.add(emotion1, emotion2, emotion3);
      ret.position.set( 0, k/10+((Math.cos(k)/9)), -2.5); 
      ret.rotation.set( 0, k/3, 0 );
      ret.scale.set( 2.2, 2.2, 2.2 );
      scene.add(ret); 
  });
  //OBJS
  //TREE
  const loaderTree = new GLTFLoader();
  loaderTree.load(    
    '3d/Tree/toon_tree.glb',
    function (glt) {
    const tree = glt.scene;
    tree.position.set(0, 0, -2.5);
      tree.rotation.set(0, Math.PI/-2, 0);     
      tree.scale.set(0.1, 0.1, 0.1);
      tree.traverse(function (node) {
        if (node.isMesh) {
          const material = eleMat;          
          node.material = material;
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
      scene.add(tree);  
    },    
    undefined, 
    function (error) {
      console.error(error);      
    }
    );
  

  //PANORAMA
  const gPavimento = new THREE.BoxGeometry(40,0.1,40);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0XFFFFFF,
    map: TextureQ2,
  });  
  const material2 = new THREE.MeshPhysicalMaterial({
      color: 0X0C56FA,
      map: TextureQ2,
    });
    let pavimento = new THREE.Mesh(gPavimento, material);
    pavimento.position.set(0,0,0);
    pavimento.receiveShadow = true;
    scene.add(pavimento);
  // PARK
  const loaderPark = new GLTFLoader();
  loaderPark.load(    
    '3d/parkb.glb',
      function (glt) {
        const park = glt.scene;
        park.position.set( 0, 0, -8 );
        park.rotation.set(0, 0, 0 );      
        park.scale.set( 0.1, 0.1, 0.1 );     
        park.traverse(function (node) {
          if (node.isMesh) {
            const material = new THREE.MeshPhysicalMaterial({
              color: 0XFFFFFF,
              map: TextureQ2,
            });
            node.material = material;
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });   
      scene.add(park);
      const park2 = park.clone(true);      
      park2.position.set(-5,0,0.05);
      park2.scale.set(0.5,0.5,0.5);
      scene.add(park2);
    }, 
    undefined, // funzione di progresso opzionale da passare al caricatore
    function (error) {
      console.error(error);      
    }
  );

  // LAGHETTO
  const gTorus = new THREE.TorusGeometry (30, 1.5, 16, 12);
  const mTorus = new THREE.MeshPhysicalMaterial({                
    map: TextureQ2,
  })
  const torus = new THREE.Mesh(gTorus, mTorus); 
  torus.scale.set(1,1,3); 
  torus.position.set( 0, 1.2, 0 );
  torus.rotation.set( Math.PI/2, 0, 0 );
  torus.castShadow = true;
  torus.receiveShadow = true;
  const gCylinder = new THREE.CylinderGeometry(30, 30, 2, 16, 1 );  
  const mCylinder = new THREE.MeshPhysicalMaterial({    
    roughness: 0,
    metalness: 0,
    transparent: true,
    opacity: 0.4,            
    map: vTexture, 
    side: THREE.DoubleSide,         
  })
  const water = new THREE.Mesh( gCylinder, mCylinder );  
  water.position.set( 0, 2.5, 0 );
  water.scale.set( 1, 0.05, 1 );
  water.rotation.set( 0, Math.PI/2, 0 );
  const gCylinder2 = new THREE.CylinderGeometry (30, 30, 0.2, 32, 1 );
  const basePool = new THREE.Mesh( gCylinder2, eleMat ); 
  basePool.position.set( 0, 0.1, 0);
  basePool.rotation.set( 0, Math.PI/2, 0 );
  basePool.receiveShadow = true;
  const pool = new THREE.Group();
  pool.add(torus, water, basePool);
  pool.position.set( 0, 0, 0);
  pool.scale.set (0.5,0.5,0.5);
  scene.add(pool);
  // FISH 2 GLTF ///  
  const loaderfishG = new GLTFLoader();
  loaderfishG.load(
    '3d/fish/fish_G.glb',
    function (gltfishG) {
      const fishG = gltfishG.scene;
      fishG.position.set( 0, 1.5, 10 ); 
      fishG.rotation.set( 0, -1.5, 0);     
      fishG.scale.set( 0.5, 0.5, 0.5 );
      fishG.traverse(function (node4) {
        if (node4.isMesh) {          
          const mFish = new THREE.MeshPhysicalMaterial({
            color: 0xff0000,
          });    
          node4.material = mFish;      
          node4.castShadow = true;
          node4.receiveShadow = true;
        }        
      });
      scene.add(fishG);    
      const gSphereFish = new THREE.SphereGeometry( 0.1, 30,30);
      const mFish2 = new THREE.MeshPhysicalMaterial({
        color: 0xff0000, 
        transparent: true,
        opacity: 0,              
      });
      const sphereFish = new THREE.Mesh(gSphereFish, mFish2 );
      const Fish2 = fishG.clone();
      Fish2.position.set( 0, 1.4, 5);
      Fish2.rotation.set( 0, -1.5, 0);     
      Fish2.scale.set( 0.4, 0.4, 0.4 );
      const Fish3 = fishG.clone();
      Fish3.position.set( -2, 1.6, 6);
      Fish3.rotation.set( 0, -1.5, 0);     
      Fish3.scale.set( 0.3, 0.3, 0.3 );
      const Fish4 = fishG.clone();
      Fish4.position.set( 2, 1.4, 7);
      Fish4.rotation.set( 0, -1.5, 0);     
      Fish4.scale.set( 0.5, 0.5, 0.5 );      
      //ANCORAGGIO FISH
      sphereFish.position.set( 0, 0, 0 );      
      sphereFish.add(fishG, Fish2, Fish3, Fish4);  
      scene.add(sphereFish);    
      let t2 = 0;
      function animatefish() {      
      requestAnimationFrame(animatefish);
      t2 -= 0.1;
      sphereFish.rotation.y += 0.005;      
      sphereFish.position.y += 0.003*Math.sin(t2);
      sphereFish.position.x += 0.003*Math.sin(t2);     
      renderer.render(scene, camera);
      } 
      animatefish();      
    },    
    undefined, // funzione di progresso opzionale da passare al caricatore
    function (error) {
      console.error(error);      
    }
  );   
  // BACKGROUND 
  const listenerBcg = new THREE.AudioListener();
  camera.add(listenerBcg); 
  const audioLoader = new THREE.AudioLoader();
  const backgroundSound = new THREE.Audio( listenerBcg );
  audioLoader.load('audio/deep-meditation-192828.mp3', function(buffer){
    backgroundSound.setBuffer( buffer );
    backgroundSound.setLoop( true );
    backgroundSound.setVolume( 0.1 );
    backgroundSound.play();
  });   
  
  

}