import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';
import { GLTFLoader } from './three_class/GLTFLoader.js';
import { OBJLoader } from './three_class/OBJLoader.js';
import { VRButton } from './three_class/VRButton.js';
import { XRControllerModelFactory } from './three_class/XRControllerModelFactory.js';
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
  window.resetCamera = resetCamera;
  // SCENE  
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(  0x5555ff );
  // CAMERA //////
  const camera = new THREE.PerspectiveCamera( 50 , window.innerWidth / window.innerHeight, 0.1, 4000 );
  let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };  
  camera.position.set(0, 100, 200 ); 
  camera.rotation.set( 1, 0, 0 );
  camera.lookAt(new THREE.Vector3( 0, player.height, 0));  
  camera.setFocalLength ( 25 );
  // RENDERER
  const renderer = new THREE.WebGLRenderer({
    alpha:true, 
    antialias:true
  });
  // CONTROLS //////
  const controls = new OrbitControls( camera, renderer.domElement );  
  controls.listenToKeyEvents( window );
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
  renderer.xr.enabled = true,    
  // RESIZE WINDOW //////
  window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height );
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  } );
      //VRBUTTON
      document.body.appendChild( VRButton.createButton( renderer ) );
      renderer.setAnimationLoop( function () {
          renderer.render( scene, camera );    
      } );
  // LIGHTS //////
  //AMBIENT
  const ambient = new THREE.AmbientLight( 0xFFFFFF, 0.6 );  
  scene.add( ambient);
  //POINTS 
  const pLight = new THREE.PointLight( 0xFFFFFF, 0.8, 5000 );  
  pLight.position.set( 800, 800, 800);  
  pLight.castShadow = true;  
  pLight.shadow.mapSize.width = 512; // default
  pLight.shadow.mapSize.height = 512; // default
  pLight.shadow.camera.near = 0.5; // default
  pLight.shadow.camera.far = 10; // default
  scene.add( pLight); 
  const pLight2 = new THREE.PointLight( 0xFFFFFF, 0.8, 5000 );  
  pLight2.position.set( -1020, 400, -1000);  
  pLight2.castShadow = true;   
  pLight2.shadow.mapSize.width = 512; // default
  pLight2.shadow.mapSize.height = 512; // default
  pLight2.shadow.camera.near = 0.5; // default
  pLight2.shadow.camera.far = 10; // default
  scene.add( pLight2);
  // ANIMATE SCENE //////
  function animateScene(){
    requestAnimationFrame( animateScene );
    renderer.render( scene, camera );
  };
  animateScene();
  //TEXTURES
  const loader = new THREE.TextureLoader();
  const TextureQ2 = loader.load('images/textures/hearts/quadretti2.jpg');
  const TextureB2 = loader.load('images/textures/hearts/quadretti5.jpg');
  TextureB2.wrapS = THREE.RepeatWrapping;
  TextureB2.wrapT = THREE.RepeatWrapping;
  TextureB2.repeat.set(4,4);  
  const alphaCielo =loader.load('images/textures/hearts/cieloalpha.jpg');
  // UV MAP //  
  const uvPaper = loader.load('images/uvmap/paper.jpg'); 
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
  
  const eleMat = new THREE.MeshPhysicalMaterial({ 
    color: new THREE.Color(colore0), 
    map: TextureQ2,
  }); 
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
    const nomiFormeGeometriche = ['dodecaedro','sfera', 'cubo','piramide'  ];
    const textureEspressioni = {
    'joy' : loader.load('./images/textures/hearts/quadretti2.jpg'),
    'love' : loader.load('./images/textures/hearts/quadretti2.jpg'),
    'sad' : loader.load('./images/textures/hearts/quadretti2.jpg'),
    'bad' : loader.load('./images/textures/hearts/quadretti2.jpg'),
    'none' : loader.load('./images/textures/hearts/quadretti2.jpg')
    };
    // texture espress0ini
    const nomiEspressioni = [
      'joy', 'love', 'sad', 'bad'
    ];    
    const colori = [
      'DEC414', 'FEF600', 'FEBE00', 'FFD700', 'C9A021',
      'FE005B', 'FF0000', 'A32590', 'FB46FF', 'DF73FF',
      '227BFF', '3E39FF', '222EFF', '001DEC', '2A23A3',
      '49C51A', '2D7121', '3C6232', '0A5C0A', '008000'
    ]; 
    // const totaleEmo = [
    //   'FEF600', 'FF0000', '3E39FF', '2D7121'
    // ];
    // let contatoreEmo = [0,0,0,0]; 
    // if (gruppiColori[1].includes(coloreCorrente)) {        
    //   contatoreEmo[1] += 1;
    //   console.log("contatore", contatoreEmo);
    // } else if (gruppiColori[2].includes(coloreCorrente)) {
    //   contatoreEmo[2] += 1;
    // }  else if (gruppiColori[3].includes(coloreCorrente)) {
    //   contatoreEmo[3] += 1;
    // }  else if (gruppiColori[4].includes(coloreCorrente)) {
    //   contatoreEmo[4] += 1;
    // } else contatoreEmo[1] += 0; 
    // }
    // Definisci i gruppi di colori
    const gruppiColori = [
      colori.slice(0, 5),  // Primi 5 colori
      colori.slice(5, 10), // Successivi 5 colori
      colori.slice(10, 15), // Successivi 5 colori
      colori.slice(15, 20)  // Ultimi 5 colori
    ];      
    const coloreCorrente = new THREE.Color(v[1]).getHexString().toUpperCase(); 
    console.log("questo è colore corrente", coloreCorrente);
    console.log("gruppiColori è questo", gruppiColori);
    let contaCorrente = [];
    for (let i = 0; i < gruppiColori.length; i++){
    contaCorrente.push('coloreCorrente');
    console.log("conta Corrente",contaCorrente);
    //const coloreCorrente = new THREE.Color(v[1]);
    }

    let forma;
    // nome espressioni
    let espressione; 

    for (let i = 0; i < gruppiColori.length; i++) {
      //console.log(`Checking group ${i}:`, gruppiColori[i]);
      //console.log(`Current color:`, coloreCorrente);
      //console.log(`Is color in group?`, gruppiColori[i].includes(coloreCorrente));
      if (gruppiColori[i].includes(coloreCorrente)) {
        forma = formeGeometriche[nomiFormeGeometriche[i]];
        espressione = textureEspressioni[nomiEspressioni[i]];        
        break; 
      }
    }   

    if (!forma) {
      forma = formeGeometriche['octaedro'];
      espressione = textureEspressioni['none'];
    }
    // EMOTION MATERIAL
    const emoMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(v[1]), 
      map: espressione, 
    }); 

    //  EMOTION 1
    const emotion1 = new THREE.Mesh( forma, emoMaterial);  
    emotion1.position.set(-7.1, 13.5, -0.3 );
    emotion1.rotation.set( 0, 0, 0);
    emotion1.scale.set( 1.5, 1.5, 1.5 );    
    emotion1.castShadow = true; 
    emotion1.receiveShadow = true;    
    //  EMOTION 2
    let newMat = emoMaterial.clone()
    newMat.color = new THREE.Color(v[2] ? v[2] : v[1]);
    let forma2;
    let espressione2; 
    for (let i = 0; i < gruppiColori.length; i++) {
      const coloreCorrente2 = newMat.color.getHexString().toUpperCase();
      if (gruppiColori[i].includes(coloreCorrente2)) {
        forma2 = formeGeometriche[nomiFormeGeometriche[i]]; 
        espressione2 = textureEspressioni[nomiEspressioni[i]];         
        break; 
      }
    }
    if (!forma2) {
      forma2 = formeGeometriche['octaedro'];
      espressione2 = textureEspressioni['none'];
    }
    newMat.map = espressione2;
    const emotion2 = new THREE.Mesh(forma2, newMat);  
    emotion2.position.set( -6.1, 12.5, -0.3 );
    emotion2.rotation.set( 0, 0, -Math.PI/3 );
    emotion2.scale.set( 1.3, 1.3, 1.3 );    
    emotion2.castShadow = true; 
    emotion2.receiveShadow = true;   
    // EMOTION 3 
    newMat = emoMaterial.clone();
    newMat.color = new THREE.Color(v[3] ? v[3] : v[1]);
    let forma3;
    let espressione3;
    for (let i = 0; i < gruppiColori.length; i++) {
      const coloreCorrente2 = newMat.color.getHexString().toUpperCase();
      if (gruppiColori[i].includes(coloreCorrente2)) {
        forma3 = formeGeometriche[nomiFormeGeometriche[i]];
        espressione3 = textureEspressioni[nomiEspressioni[i]];         
        break;
      }
    }  
    if (!forma3) {
      forma3 = formeGeometriche['octaedro'];
      espressione3 = textureEspressioni['none'];
    }   
    newMat.map = espressione3;
    const emotion3 = new THREE.Mesh(forma3, newMat);  
    emotion3.position.set( -7.7, 11.6, -0.3 );
    emotion3.rotation.set( 0, 0, Math.PI/1.5 );
    emotion3.scale.set( 1.1, 1.1, 1.1 ); 
    emotion3.castShadow = true; 
    emotion3.receiveShadow = true;
    const ret = emotionGroup.clone(true);
    ret.add(emotion1, emotion2, emotion3);
    ret.position.set( 2, k*1.1 + (0.2*Math.PI/Math.cos(k+8)), 0); // B Centro
    ret.rotation.set( 0, k/3, 0 );
    ret.scale.set( 2.2, 2.2, 2.2 );
    // EMOZIONI CLONATE    
    const ret2 = ret.clone();
    ret2.position.set( -155,k*1.1 + (0.2*Math.PI/Math.cos(k+8))+55, -160 );// S Alto 
    const ret3 = ret.clone();//D cielo
    ret3.position.set( 170, 350+k*1.1 + (0.2*Math.PI/Math.cos(k+8)), -180 ); 
    const ret4 = ret.clone();
    ret4.position.set( 160, 44+(k*1.1 + (0.2*Math.PI/Math.cos(k+8))), 80 );// D Cubo B 
    const ret5 = ret.clone();
    ret5.position.set( -40, k*1.1 + (0.2*Math.PI/Math.cos(k+8)) + 155, 150 );// A Octa        
    scene.add(ret, ret2, ret3, ret4, ret5);  
  })  
  // SCALA
  let leyerGroup = new THREE.Group();
  const livelli=_.map(choose,(v,k)=>{ 
    const gBox = new THREE.BoxGeometry( 4, 4, 4 );
    const mBox = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(v[1]),
      transparent:true,
      opacity: 1,      
    });  
    // SCALE 1
    const box1 = new THREE.Mesh ( gBox, mBox );     
    box1.position.set( 0, 568, -202 );
    box1.castShadow = true;
    box1.receiveShadow = true;
    // SCALE 2
    let newmatBox = mBox.clone(); 
    newmatBox.color= 0X000000;
    newmatBox.color = new THREE.Color(v[2] ? v[2] : v[1]);
    const box2 = new THREE.Mesh (gBox, newmatBox);
    box2.castShadow = true;
    box2.receiveShadow = true;
    box2.position.set( 0, 572, -206 );
    // SCALE 3
    newmatBox = mBox.clone(); 
    newmatBox.color = new THREE.Color(v[3] ? v[3] : v[1]);
    const box3 = new THREE.Mesh (gBox, newmatBox);
    box3.position.set( 0, 576, -210 );   
    box3.castShadow = true;
    box3.receiveShadow = true;
    leyerGroup.add( box1, box2, box3 ); 
    // CLONE SCALE
    const leyerScale = leyerGroup.clone(true);
    scene.add(leyerScale);
    leyerScale.position.set( -200, +(6*k), -(6*k) );
    leyerScale.rotation.set( 0, 0, 0 );
    leyerScale.scale.set( 5, 0.5, 0.5);
  })
  //// BUBBLE
  let leyerSnake = new THREE.Group();
  const livelli2=_.map(choose,(v,k)=>{
    const gSnake = new THREE.SphereGeometry( 1.5, 16, 16);
    const mSnake = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(v[1]),
    });   
    // BUBBLE 1
    const snake1 = new THREE.Mesh ( gSnake, mSnake );    
    snake1.castShadow = true;
    snake1.receiveShadow = true;    
    snake1.position.set( -290, 95, -20 );
    // BUBBLE 2
    let newmatSnake = mSnake.clone();     
    newmatSnake.color = new THREE.Color(v[2] ? v[2] : v[1]);
    const snake2 = new THREE.Mesh (gSnake, newmatSnake);
    snake2.castShadow = true;
    snake2.receiveShadow = true;
    snake2.position.set( -288, 93, -24);  
    snake2.scale.set( 0.8, 0.8, 0.8); 
    // BUBBLE 3
    let newmatSnake2 = mSnake.clone(); 
    newmatSnake2.color = new THREE.Color(v[3] ? v[3] : v[1]);
    const snake3 = new THREE.Mesh (gSnake, newmatSnake2);
    snake3.castShadow = true;
    snake3.receiveShadow = true;
    snake3.position.set( -284, 90, -20);
    snake3.scale.set( 0.6, 0.6, 0.6); 
    leyerSnake.add( snake1, snake2, snake3 );   
    // CLONE BUBBLE
    const leyerSnake2 = leyerSnake.clone(true);
    leyerSnake2.position.set(-k*4, 165, 165); 
    leyerSnake2.rotation.set(k/150,-k/150,k/150);              
    scene.add(leyerSnake2);
  })


  // ROOM ////
  const gPavimento = new THREE.BoxGeometry(440, 40, 440);
  const pavimento = new THREE.Mesh(gPavimento, eleMat);
  pavimento.position.set( 0, -20, 0 );  
  pavimento.receiveShadow = true; 
   const pareteS = new THREE.Mesh(gPavimento, eleMat)  
   pareteS.position.set(-230, 180, 0);  
   pareteS.rotation.set(Math.PI/2, 0, -Math.PI/2 ); 
   pareteS.scale.set(1,1,1);
   pareteS.castShadow = true;
   pareteS.receiveShadow = true; 
   const gPareteF = new THREE.BoxGeometry(470, 40, 440);
   const pareteF = new THREE.Mesh(gPareteF, eleMat );
   pareteF.position.set(-15,180,-240);  
   pareteF.rotation.set( Math.PI/2, 0, 0 ); 
   pareteF.castShadow = true;
   pareteF.receiveShadow = true;  
   const room = new THREE.Group();
   room.add(pavimento,pareteS, pareteF);
   scene.add(room);
   room.scale.set( 1, 1, 1 );
   const material2 = new THREE.MeshPhysicalMaterial({
     map: TextureQ2,
   })  
   // TREE
   const loaderTree = new GLTFLoader();
   loaderTree.load(    
     '3d/Tree/toon_tree.glb',
     function (glt) {
       const tree = glt.scene;
       tree.position.set(0, 0.4, 0);
       tree.rotation.set(0, Math.PI/-2, 0);     
       tree.scale.set(0.9, 0.9, 0.9);
       tree.traverse(function (node) {
         if (node.isMesh) {
           const material = eleMat;          
           node.material = material;
           node.castShadow = true;
           node.receiveShadow = true;
         }
       });
       scene.add(tree);      
       let treeC1 = tree.clone(true);       
       treeC1.position.set(-160, 60, -160);// S alto
       treeC1.rotation.set(0, 0.2, 0.01);      
       treeC1.scale.set(0.8, 0.8, 0.8)
       let treeC2 = tree.clone(true);
       treeC2.position.set(170, 360, -180);//D Sospeso 
       treeC2.rotation.set(0, 0.4, 0.01); 
       let treeC3 = tree.clone(true);
       treeC3.position.set(160,50, 80); //D cubo B
       treeC3.rotation.set(0, 2, 0.01);      
       treeC3.scale.set(0.9, 0.9, 0.9);
       let treeC4 = tree.clone(true);
       treeC4.position.set(-40, 162, 150);//S S Octa
       treeC4.rotation.set(0, 1, 0.01);      
       treeC4.scale.set(0.9, 0.9, 0.9); 
       scene.add( treeC1,treeC2, treeC3, treeC4 );
       tree.castShadow = true; 
       tree.receiveShadow = true; 
     },    
     undefined, // funzione di progresso opzionale da passare al caricatore
     function (error) {
       console.error(error);      
     }
   );
   // TREE 2
   const loaderTree2 = new GLTFLoader();
   loaderTree2.load(    
     '3d/Tree/tree_03.glb',
     function (glt) {
       const tree2 = glt.scene;
       tree2.position.set( -140, 1, 10 );
       tree2.rotation.set(0, Math.PI/-2, 0 );      
       tree2.scale.set( 9, 9, 9 );  
       tree2.traverse(function (node) {
         if (node.isMesh) {
           const material = eleMat;
           node.material = material;
           node.castShadow = true;
           node.receiveShadow = true;
         }
       });  
       //scene.add(tree2);
       let tree2C0 = tree2.clone(true);
       tree2C0.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore1);//S grande
           }
       }); 
       tree2C0.position.set( -100, 1, 10 );
       tree2C0.rotation.set(0, Math.PI/-2, 0 );      
       tree2C0.scale.set( 9, 9, 9 );               
       let tree2C1 = tree2.clone(true);
       tree2C1.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore2);//S Alto
           }
       }); 
       tree2C1.position.set( -215, 360, 200);       
       tree2C1.scale.set( 9, 9, 9 ); 
       tree2C1.rotation.set( 0, Math.PI, Math.PI/2 );
       let tree2C2 = tree2.clone(true);
       tree2C2.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore3);//D sospeso
           }
       }); 
       tree2C2.position.set( 190, 128, -100);
       tree2C2.scale.set( 8, 8, 8  );
       let tree2C3 = tree2.clone(true);
       tree2C3.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore4);// Pool
           }
       }); 
       tree2C3.position.set(40, 1, 30);
       tree2C3.scale.set( 7, 7, 7  );
       let tree2C4 = tree2.clone(true);
       tree2C4.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore5);// Frontale
           }
       }); 
       tree2C4.position.set( 25, 190, -170);
       tree2C4.rotation.set( 0, Math.PI/2, Math.PI/2 );
       tree2C4.scale.set( 9, 9, 9  ); 
       let tree2C5 = tree2.clone(true);
       tree2C5.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore6);// S Metà
           }
       }); 
       tree2C5.position.set( -210, 240, 0 );
       tree2C5.rotation.set( 0, Math.PI, Math.PI/2 );
       tree2C5.scale.set( 10, 10, 10  );
       let tree2C6 = tree2.clone(true);
       tree2C6.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore7);//Angolo
           }
       }); 
       tree2C6.position.set( 190, 0, 190 );
       tree2C6.rotation.set( 0, 0, 0 );
       tree2C6.scale.set( 8, 8, 8  );
       let tree2C7 = tree2.clone(true);
       tree2C7.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
              child.material = child.material.clone(); 
              child.material.color.set(colore8);// frontale
            }
       }); 
       tree2C7.position.set( -80, 280, -230 );
       tree2C7.rotation.set( 0, Math.PI/2, Math.PI/2 );
       tree2C7.scale.set( 9, 9, 9  );
       scene.add(tree2C0, tree2C1, tree2C2, tree2C3, tree2C4, tree2C5,tree2C6, tree2C7 );
     },      
     undefined, // funzione di progresso opzionale da passare al caricatore
     function (error) {
       console.error(error);      
     } 
   );
   // PARK
   const loaderPark = new GLTFLoader();
   loaderPark.load(    
     '3d/parkb.glb',
       function (glt) {
         const park = glt.scene;
         park.position.set( 32, 280, -220 );
         park.rotation.set(Math.PI/2, Math.PI, 0 );      
         park.scale.set( 1, 1, 1 );     
         park.traverse(function (node) {
           if (node.isMesh) {
             const material = new THREE.MeshPhysicalMaterial({
               map: TextureQ2,
             });
             node.material = material;
             node.castShadow = true;
             node.receiveShadow = true;
           }
         });        
       let materialV = new THREE.MeshPhysicalMaterial({              
         map: TextureQ2,        
       });
       scene.add(park);
       let park2 = park.clone();
       park2.position.set(100,0,-120);
       park2.rotation.set(0,0,0);
       let park3 = park.clone();
       park3.position.set(-214,320, 100);
       park3.rotation.set(0, 0, -Math.PI/2 );
       let park4 = park.clone();
       park4.position.set(-80, 0, -110);
       park4.rotation.set(0, 0, 0 );
       scene.add(park2, park3, park4); 
     }, 
     undefined, // funzione di progresso opzionale da passare al caricatore
     function (error) {
       console.error(error);      
     }
   );
   // PARK2
   const loaderPark2 = new GLTFLoader();
   loaderPark2.load(    
     '3d/parkb2.glb',
       function (glt) {
       const park2 = glt.scene;
       park2.position.set( -100, 160, -220 );
       park2.rotation.set(Math.PI/2, Math.PI, 0 );      
       park2.scale.set( 1, 1, 1 );    
       park2.traverse(function (node) {
         if (node.isMesh) {
           const material = new THREE.MeshPhysicalMaterial({ 
             map: TextureQ2,      
           });
           node.material = material;
           node.castShadow = true;
           node.receiveShadow = true;
         }
       });      
       let materialV = new THREE.MeshPhysicalMaterial({              
          map: TextureQ2,       
      });
      scene.add(park2);
      let park2B = park2.clone();
      park2B.position.set(30,0,140);
      park2B.rotation.set(0,0,0);
      let park3B = park2.clone();
      park3B.position.set(106, 0, 16);
      park3B.scale.set( 0.9, 0.9, 0.9);
      park3B.rotation.set(0, 0, 0 );
      let park4B = park2.clone();
      park4B.position.set(-214,180, -60);
      park4B.rotation.set(1, 0, -Math.PI/2 ); 
      let park5B = park2.clone();
      park5B.position.set(-140,0,130);
      park5B.rotation.set(0,0,0);
      scene.add(park2B, park3B, park4B, park5B);   
    },        
     undefined, // funzione di progresso opzionale da passare al caricatore
     function (error) {
       console.error(error);      
     }   
   );
   // BENCH
   const loaderBench = new GLTFLoader();
   loaderBench.load(    
     '3d/bench/bench1.glb',
       function (glt) {
       const bench = glt.scene;
       bench.position.set( 47, 0.5, 50 );
       bench.rotation.set(0, Math.PI/-2, 0 );      
       bench.scale.set( 1, 1, 1 );    
       bench.traverse(function (node) {
         if (node.isMesh) {
           const material = new THREE.MeshPhysicalMaterial({       
             color: colore1,       
             map: TextureQ2,      
           });
           node.material = material;
           node.castShadow = true;
           node.receiveShadow = true;
         }
       });      
       scene.add(bench);     
     },        
     undefined, // funzione di progresso opzionale da passare al caricatore
     function (error) {
       console.error(error);      
     }   
   );
   // BENCH 2
   const loaderBench2 = new GLTFLoader();
   loaderBench2.load(    
     '3d/bench/bench.glb',
       function (glt) {
       const bench2 = glt.scene;
       bench2.position.set( -9, 0.5, 45 );
       bench2.rotation.set(0, Math.PI/2, 0 );      
       bench2.scale.set( 1, 1, 1 );      
       bench2.traverse(function (node) {
         if (node.isMesh) {
           const material = new THREE.MeshPhysicalMaterial({
             color:colore2,  
             map: TextureQ2, 
           });
           node.material = material;
           node.castShadow = true;
           node.receiveShadow = true;
         }
       });
       let bench2B = bench2.clone();
       bench2B.position.set(160, 0, 45);
       bench2B.rotation.set(0, -Math.PI/2, 0 );      
       bench2B.scale.set( 1, 1, 1 );
       scene.add(bench2, bench2B);
     },   
     undefined, // funzione di progresso opzionale da passare al caricatore
     function (error) {
       console.error(error);      
     }     
   ); 
   // MOUNT
   const loaderMount = new GLTFLoader();
   loaderMount.load(    
     '3d/mountains3.glb',
       function (glt) {
       const mount = glt.scene;
       mount.position.set(40, 240, -260 );
       mount.rotation.set(Math.PI/2, -Math.PI/2, -Math.PI );      
       mount.scale.set( 1, 1, 1 );      
       mount.traverse(function (node) {
         if (node.isMesh) {
           const material = new THREE.MeshPhysicalMaterial({
             //color: 0xDA3A2B,  
             map: TextureQ2, 
           });
           node.material = material;
           node.castShadow = true;
           node.receiveShadow = true;
         }
       });  
       scene.add(mount);
     },      
     undefined, // funzione di progresso opzionale da passare al caricatore
     function (error) {
       console.error(error);      
     } 
   ); 
   // OCEAN
   const loaderOcean = new GLTFLoader();
   loaderOcean.load(    
     '3d/ocean2.glb',
     function (glt) {
       const ocean = glt.scene;
       ocean.position.set( -250, 200, 20 );
       ocean.rotation.set(Math.PI/2, Math.PI, -Math.PI/2 );
       ocean.scale.set( 1, 1, 1 );       
       ocean.traverse(function (node) {
         if (node.isMesh) {
           const material = new THREE.MeshPhysicalMaterial({
           //color: 0x89F1EE,
           map: TextureQ2, 
           });
           node.material = material;
           node.castShadow = true;
           node.receiveShadow = true;
         }
       });    
       scene.add(ocean);   
     },           
     undefined, // funzione di progresso opzionale da passare al caricatore
     function (error) {
       console.error(error);      
     }      
   );    
   // CONIGLIO
   const loaderRabbit = new OBJLoader();
   let rabbit;
   // LOAD A RESOURCE
   loaderRabbit.load('3d/rabbit/RabbitO.obj',
   function ( object ) {
       object.position.set( 180, 0.51, 130 );      
       object.rotation.set( 0, -Math.PI/2, 0 );      
       try{
       const matRabbit=new THREE.MeshPhysicalMaterial({
         color: 0xC1FF4D,
         roughness: 0,
         metalness: 0.5,                         
         }) 
       object.children[0].material=matRabbit;
       }catch(e){
       console.log(e);
       }
       object.castShadow = true;
       rabbit=object;     
       console.log( 'body was loaded', rabbit );
       scene.add( rabbit );      
       rabbit.scale.set( 3, 3, 3); 
       //RABBIT 2       
       let rabbit2 = rabbit.clone();
       rabbit2.position.set( -20, 0.51, -80 );
       rabbit2.rotation.set( 0, 5, 0 );     
       scene.add( rabbit2 );
       rabbit2.castShadow = true; 
       rabbit2.receiveShadow = true; 
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
   // HUMANS 1
   const loaderH1 = new GLTFLoader();
   loaderH1.load(    
     './3d/humans/Low_person_1.glb',
     function (glt) {
       const human1 = glt.scene;
       human1.position.set( 85, 0, -30 );
       human1.rotation.set(0, Math.PI/4, 0 );      
       human1.scale.set( 10, 10, 10 );        
       human1.traverse(function (node) {
         if (node.isMesh) {
           const material = new THREE.MeshPhysicalMaterial({
             color: colore1,
             map: TextureQ2,
           });   
           node.material = material;
           node.castShadow = true;
           node.receiveShadow = true;
         }
       });   
       scene.add(human1);        
       human1.castShadow = true; 
       human1.receiveShadow = true;       
     },       
     undefined, // funzione di progresso opzionale da passare al caricatore
     function (error) {
       console.error(error);      
     }   
   );
   // HUMANS 2
   const loaderH2 = new GLTFLoader();
   loaderH2.load(    
     './3d/humans/Low_person_2.glb',
     function (glt) {
       const human2 = glt.scene;
       human2.position.set( -200, 323, -139 );
       human2.rotation.set(0, Math.PI/2, 0 );      
       human2.scale.set( 10, 10, 10 );        
       human2.traverse(function (node) {
         if (node.isMesh) {
           const material = new THREE.MeshPhysicalMaterial({
             color: colore0,
             map: TextureQ2, 
           });   
           node.material = material;
           node.castShadow = true;
           node.receiveShadow = true;
         }
       });   
       scene.add(human2);        
       human2.castShadow = true; 
       human2.receiveShadow = true; 
       let human2A = human2.clone(true);
       human2A.position.set(-267.7, 50, -120);
       human2A.rotation.set(Math.PI/2 , Math.PI, -Math.PI/2 );   
       human2A.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = child.material.clone(); 
            child.material.color.set(colore4);
          }
      }); 
      scene.add(human2A);

     },       
     undefined, // funzione di progresso opzionale da passare al caricatore
     function (error) {
       console.error(error);      
     }   
   ); 
   // HUMANS 3
   const loaderH3 = new GLTFLoader();
   loaderH3.load(    
     './3d/humans/Low_person_3.glb',
     function (glt) {
       const human3 = glt.scene;
       human3.position.set( 0, 200, -164);
       human3.rotation.set(0, Math.PI/2, Math.PI/2 );      
       human3.scale.set( 10, 10, 10 );        
       human3.traverse(function (node) {
         if (node.isMesh) {
           const material = new THREE.MeshPhysicalMaterial({
             color: colore2,
             map: TextureQ2,
           });   
           node.material = material;
           node.castShadow = true;
           node.receiveShadow = true;
         }
       });   
       scene.add(human3);        
       human3.castShadow = true; 
       human3.receiveShadow = true;       
     },       
     undefined, // funzione di progresso opzionale da passare al caricatore
     function (error) {
       console.error(error);      
      }   
    );
   // HUMANS 4
   const loaderH4 = new GLTFLoader();
   loaderH3.load(    
     './3d/humans/Low_person_4.glb',
     function (glt) {
       const human4 = glt.scene;
       human4.position.set( 3, 0, 70 );
       human4.rotation.set(0, Math.PI/5, 0 );      
       human4.scale.set( 10, 10, 10 );        
       human4.traverse(function (node) {
         if (node.isMesh) {
           const material = new THREE.MeshPhysicalMaterial({
             color: colore3, 
             map: TextureQ2, 
           });     
           node.material = material;
           node.castShadow = true;
           node.receiveShadow = true;
         }
       }); 
       scene.add(human4);        
       human4.castShadow = true; 
       human4.receiveShadow = true;
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
   pool.position.set( 17, 1, 50);
   pool.scale.set (0.5,0.5,0.5);
   scene.add(pool);
   const pool2 = pool.clone();
   pool2.position.set( -209, 180, -80);    
   pool2.rotation.set( -Math.PI/2, 0, -Math.PI/2 );   
   scene.add(pool2);  
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
       sphereFish.position.set( 17, 0.5, 50 );      
       sphereFish.add(fishG, Fish2, Fish3, Fish4);
       let sphereFish2 = sphereFish.clone();
       scene.add(sphereFish, sphereFish2);
       sphereFish2.position.set(-209,180,-80);
       sphereFish2.rotation.set( -Math.PI/2, 0, -Math.PI/2 ); 
       let t2 = 0;
       function animatefish() {      
       requestAnimationFrame(animatefish);
       t2 -= 0.1;
       sphereFish.rotation.y += 0.005;      
       sphereFish.position.y += 0.003*Math.sin(t2);
       sphereFish.position.x += 0.003*Math.sin(t2);
       sphereFish2.rotation.x += 0.005;      
       sphereFish2.position.x += 0.003*Math.sin(t2);
       sphereFish2.position.z += 0.003*Math.sin(t2);
       renderer.render(scene, camera);
       } 
       animatefish();      
     },    
     undefined, // funzione di progresso opzionale da passare al caricatore
     function (error) {
       console.error(error);      
     }
   );   
    const gElemento1 = new THREE.BoxGeometry( 10, 10, 10 );  
    const elemento1 = new THREE.Mesh(gElemento1, eleMat); 
    elemento1.position.set(0, 20, 0);
    const elemento0 = elemento1.clone();  
    elemento0.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
       child.material.color.set(colore9);//D tree Basso
      }
    }); 
    scene.add(elemento0); 
    elemento0.position.set( 160,30, 80);
    elemento0.scale.set( 4, 4, 4);
    elemento0.castShadow = true;
    elemento0.receiveShadow = true;    
    const elemento2 = elemento1.clone();
    elemento2.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore10);// D Tree Alto
      }
    }); 
    elemento2.position.set( 170, 335, -180 );
    elemento2.scale.set( 5, 5, 5);
    scene.add(elemento2);
    elemento2.castShadow = true;
    elemento2.receiveShadow = true;
    const elemento3 = elemento1.clone();
    elemento3.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
          child.material = child.material.clone(); 
          child.material.color.set(colore11);
        }
    }); 
    elemento3.position.set( -160, 36, -160 );
    elemento3.scale.set( 5, 5, 5);   
    elemento3.castShadow = true;
    elemento3.receiveShadow = true;
    const elemento4 = elemento1.clone();// regge albero sospeso
    elemento4.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
          child.material = child.material.clone(); 
          child.material.color.set(colore16);
        }
    }); 
    elemento4.position.set( 185, 110, -100 );
    elemento4.scale.set( 4, 4, 4);    
    elemento4.castShadow = true;
    elemento4.receiveShadow = true;
    const elemento5 = elemento1.clone(); 
    elemento5.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
          child.material = child.material.clone(); 
          child.material.color.set(colore12);// D Sosp
        }
    }); 
    elemento5.position.set( -109, 340, 104 );//Porta
    elemento5.scale.set( 4, 4, 4);    
    elemento5.castShadow = true;
    elemento5.receiveShadow = true;
    const elemento6 = elemento1.clone();
    elemento6.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
          child.material = child.material.clone(); 
          child.material.color.set(colore13);
        }
    }); 
    elemento6.position.set( 10, 300, 10 );
    elemento6.scale.set( 5, 5, 5);    
    elemento6.castShadow = true;
    elemento6.receiveShadow = true; 
  scene.add( elemento2, elemento3, elemento4,elemento5, elemento6);

  const Deers=_.map(choose,(v,k)=>{ 
    const loaderDeerC = new GLTFLoader();
    loaderDeerC.load(    
      './3d/deer_4.glb',
      function (glt) {
        const deerColored = glt.scene;
        // deerColored.position.set( -210,70+(Math.cos(k)), -60*-Math.cos(k+2) );
        deerColored.position.set(-210,70 + Number(k*10),60-Number(k*5));
        deerColored.rotation.set(Math.PI/k, 0, -Math.PI/2 );           
        deerColored.scale.set( 0.7, 0.7, 0.7 );        
        deerColored.traverse(function (node) {
          if (node.isMesh) {
            const material = new THREE.MeshPhysicalMaterial({
              color: new THREE.Color(choose[k-1][1]), 
              map: TextureQ2,
            });             
            node.material = material;
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });   
        //scene.add(deerColored);        
        deerColored.castShadow = true; 
        deerColored.receiveShadow = true;       
      },       
      undefined, // funzione di progresso opzionale da passare al caricatore
      function (error) {
        console.error(error);      
      }   
    );    
  });
  // CLOUDS
  const clouds=_.map(choose,(v,k)=>{ 
    const loaderCloud = new GLTFLoader();
    loaderCloud.load(    
      './3d/cartoon_cloud.glb',
      function (glt) {
        const cloudColored = glt.scene;
        cloudColored.position.set( -88-(k*3), 263, -346-Number(k));
        cloudColored.rotation.set(0, 0, k );
        let smkScl = 1+(k/10);  
        cloudColored.scale.set( smkScl, smkScl, smkScl );        
        cloudColored.traverse(function (node) {
          if (node.isMesh) {
            const material = new THREE.MeshPhysicalMaterial({
              color: new THREE.Color(choose[k-1][1]), 
              map: TextureQ2,
            });   
            node.material = material;
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });   
        scene.add(cloudColored);        
        cloudColored.castShadow = true; 
        cloudColored.receiveShadow = true;       
      },       
      undefined, // funzione di progresso opzionale da passare al caricatore
      function (error) {
        console.error(error);      
      }   
    );    
  });
  const gPalla1 = new THREE.SphereGeometry( 10, 16, 16 );
  const palla1 = new THREE.Mesh(gPalla1, eleMat )
  palla1.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore14);
      }
  }); 
  palla1.position.set( 100, 240, 10 );
  palla1.scale.set(3,3,3);
  palla1.castShadow = true;
  palla1.receiveShadow = true;  
  const palla2 = palla1.clone();
  palla2.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore15);//S parete
      }
  });   
  palla2.position.set( -205, 115, 150 );
  palla2.scale.set(3,3,3);
  palla2.castShadow = true;
  palla2.receiveShadow = true;  
  const palla3 = palla1.clone();
  palla3.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore0);// C grande
      }
  }); 
  palla3.position.set( 0, 180, -210 );
  palla3.scale.set( 5, 5, 5);
  palla3.castShadow = true;
  palla3.receiveShadow = true;
  scene.add(palla1, palla2, palla3);
  /// PIRAMIDI
  const gPiramid = new THREE.ConeGeometry( 5, 10, 4 );
  const piramid = new THREE.Mesh(gPiramid, eleMat);
  piramid.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore17);
      }
  });   
  piramid.position.set( 90, 220, -140 ); 
  piramid.scale.set( 5, 5, 5);
  piramid.castShadow = true;
  piramid.receiveShadow = true;
  const piramid2 = piramid.clone();
  piramid2.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore18);
      }
  });  
  piramid2.position.set( 140, 220, -200 ); 
  piramid2.scale.set( 8, 8, 8);
  piramid2.rotation.set(Math.PI/2, Math.PI/4, 0);
  piramid2.castShadow = true;
  piramid2.receiveShadow = true;
  const piramid3 = piramid.clone();
  piramid3.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore19);
      }
  });   
  piramid3.position.set( 100, 200, 100 ); 
  piramid3.scale.set( 6, 6, 6);
  piramid3.rotation.set(0, 0, 0);
  piramid3.castShadow = true;
  piramid3.receiveShadow = true;
  scene.add(piramid, piramid2, piramid3); 
  const gDodeca = new THREE.DodecahedronGeometry(40,0);
  const dodeca = new THREE.Mesh(gDodeca, eleMat);
  dodeca.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore20);
      }
  });
  dodeca.position.set( -200 , 340, -40 );
  dodeca.scale.set(0.6,0.6,0.6); 
  dodeca.castShadow = true;
  dodeca.receiveShadow = true; 
  const dodeca2 = dodeca.clone(); 
  dodeca2.position.set(-40,140,140);
  dodeca2.scale.set(0.8,0.8,0.8); 
  const dodeca3 = dodeca.clone();
  scene.add(dodeca, dodeca2, dodeca3);
  dodeca3.position.set( 80,100, -180);
  dodeca3.scale.set(0.6,0.6,0.6);  
  // CIELO
  const gCielo = new THREE.SphereGeometry(800, 16, 16);
  const mCielo = new THREE.MeshPhysicalMaterial({
    map: TextureQ2,
    side: THREE.DoubleSide, 
    alphaMap: alphaCielo,
    transparent: true,
  })
  const cielo = new THREE.Mesh(gCielo, mCielo);
  cielo.rotation.set(0,1.4,0);
  scene.add(cielo);
  const gCielo2 = new THREE.SphereGeometry(1800, 16, 16);
  const mCielo2 = new THREE.MeshPhysicalMaterial({
    map: TextureB2,
    side: THREE.DoubleSide,     
  })
  const cielo2 = new THREE.Mesh(gCielo2, mCielo2);
  cielo2.castShadow = true,
  scene.add(cielo2);  
  // BACKGROUND 
  const listenerBcg = new THREE.AudioListener();
  camera.add(listenerBcg);
  const audioLoader = new THREE.AudioLoader();
  const backgroundSound = new THREE.Audio( listenerBcg );
  // audioLoader.load('audio/hearts/gardenbcg2.mp3', function( buffer )
  audioLoader.load('audio/hearts/gardenbcg2.mp3', function( buffer ) {
    backgroundSound.setBuffer( buffer );
    backgroundSound.setLoop( true );
    backgroundSound.setVolume( 1 );
    backgroundSound.play();
  });
  // Selezioniamo i pulsanti
  let cameraButton = document.querySelector('#btn-camera button');  
  let audioButton = document.querySelector('#btn-audio button');
  let isPlaying = true;
  cameraButton.addEventListener('click', function() {
    resetCamera();
  });
  audioButton.addEventListener('click', function() {
    if (isPlaying) {
      backgroundSound.pause();
    } else {
      backgroundSound.play();
    }
    // Cambiamo lo stato
    isPlaying = !isPlaying;
  });
  // Funzione per resettare la camera
  function resetCamera() {
    camera.position.set( 200, 40, 200 ); 
    camera.rotation.set( 1, 0, 0 );
    camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
    controls.listenToKeyEvents( window );
    controls.minDistance =  5;    
    controls.maxDistance = 1400;
    controls.maxPolarAngle = 1.5; 
  }    
};