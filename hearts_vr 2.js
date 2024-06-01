import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';
import { GLTFLoader } from './three_class/GLTFLoader.js';
import { VRButton } from './three_class/VRButton.js';
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
  scene.background = new THREE.Color(  0x0A9EE8 );
  //scene.fog = new THREE.Fog( 0x0A9EE8, 1100, 1400 );
  scene.position.set(0,-10,-25);
  // CAMERA //////
  const camera = new THREE.PerspectiveCamera( 50 , window.innerWidth / window.innerHeight, 0.1, 4000 );
  let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };  
  camera.position.set(0, 0, 0 ); 
  camera.rotation.set( 1, 0, 0 );
  camera.lookAt(new THREE.Vector3( 0, player.height, 0));  
  camera.setFocalLength ( 15 );
  // RENDERER
  const renderer = new THREE.WebGLRenderer({
    alpha:true, 
    antialias:true
  });
  // CONTROLS //////
  const controls = new OrbitControls( camera, renderer.domElement );  
  controls.listenToKeyEvents( window );
  controls.listenToKeyEvents( window );
  controls.minDistance =  25;    
  controls.maxDistance = 1100;
  controls.maxPolarAngle = 1.5;
 
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
  pLight.position.set( 300, 600, 300);  
  pLight.castShadow = true;  
  pLight.shadow.mapSize.width = 512; // default
  pLight.shadow.mapSize.height = 512; // default
  pLight.shadow.camera.near = 0.5; // default
  pLight.shadow.camera.far = 10; // default
  scene.add( pLight); 
  const pLight2 = new THREE.PointLight( 0xFFFFFF, 0.8, 5000 );  
  pLight2.position.set( -320, 300, -300);  
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
  const alphaCielo =loader.load('images/textures/hearts/cieloalpha2.jpg');
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
    
    // Definisci i gruppi di colori
    const gruppiColori = [
      colori.slice(0, 5),  // Primi 5 colori
      colori.slice(5, 10), // Successivi 5 colori
      colori.slice(10, 15), // Successivi 5 colori
      colori.slice(15, 20)  // Ultimi 5 colori
    ];      
    const coloreCorrente = new THREE.Color(v[1]).getHexString().toUpperCase(); 
    let contaCorrente = [];
    for (let i = 0; i < gruppiColori.length; i++){
    contaCorrente.push('coloreCorrente');
    }

    let forma;
    let espressione;     

///////////////////////////////////////////////

// Inizializza un array per tenere traccia del conteggio delle aree
let conteggioAree = [0, 0, 0, 0];

let mappaColori = {
  'area1': '#FFFF00', // giallo
  'area2': '#FF0000', // rosso
  'area3': '#0000FF', // blu
  'area4': '#008000'  // verde
};

// Itera su ogni colore scelto
for (let quad in choose) {
  // Ottieni il colore corrente
  let coloreCorrente = new THREE.Color(choose[quad][1]).getHexString().toUpperCase();

  // Determina a quale area appartiene il colore
  let indiceArea;
  for (let i = 0; i < gruppiColori.length; i++) {
    if (gruppiColori[i].includes(coloreCorrente)) {
      indiceArea = i;
      break;
    }
  }

  // Aggiorna il conteggio per l'area
  if (indiceArea !== undefined && choose[quad][1] !== '#FFFFFF') {
    conteggioAree[indiceArea]++;
  }
}

// Trova l'area con il maggior numero di scelte
let areaPiuScelta = conteggioAree.indexOf(Math.max(...conteggioAree));

console.log(`L'area con il maggior numero di scelte è l'area ${areaPiuScelta + 1}.`);

let coloreOggetto;
// Assegna il colore corrispondente all'oggetto
coloreOggetto = mappaColori[`area${areaPiuScelta + 1}`];

console.log(`Il colore dell'oggetto è ${coloreOggetto}.`);

let gTotale = new THREE.SphereGeometry(1200, 16, 16);
let matTotale = new THREE.MeshPhysicalMaterial ({
  color: new THREE.Color(coloreOggetto), 
  map: TextureQ2,
  side: THREE.DoubleSide, 
  alphaMap: alphaCielo,
  transparent: true,
});
let emotionTotale = new THREE.Mesh(gTotale, matTotale);
emotionTotale.rotation.set(0,0,0);
scene.add(emotionTotale);

/////////////////////////////////////////////

    for (let i = 0; i < gruppiColori.length; i++) {
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
    //TREEC1 
    const ret2 = ret.clone();
    ret2.position.set( -195,k*1.1 + (0.2*Math.PI/Math.cos(k+8))+155, -100 );// S Alto 
    // TREEC2
    const ret3 = ret.clone();//D cielo
    ret3.position.set( 270, 350+k*1.1 + (0.2*Math.PI/Math.cos(k+8)), -100 ); 
    // TREEC3
    const ret4 = ret.clone();    
    ret4.position.set( 240, 144+(k*1.1 + (0.2*Math.PI/Math.cos(k+8))), 80 );// D Cubo B 
    // TREEC4
    const ret5 = ret.clone();
    ret5.position.set( -40, k*1.1 + (0.2*Math.PI/Math.cos(k+8)) + 155, 150 );// A Octa        
    scene.add(ret, ret2, ret3, ret4,ret5);  
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
    box1.position.set( 30, 68, 560 );
    box1.castShadow = true;
    box1.receiveShadow = true;
    // SCALE 2
    let newmatBox = mBox.clone(); 
    newmatBox.color= 0X000000;
    newmatBox.color = new THREE.Color(v[2] ? v[2] : v[1]);
    const box2 = new THREE.Mesh (gBox, newmatBox);
    box2.castShadow = true;
    box2.receiveShadow = true;
    box2.position.set( 30, 72, 556 );
    // SCALE 3
    newmatBox = mBox.clone(); 
    newmatBox.color = new THREE.Color(v[3] ? v[3] : v[1]);
    const box3 = new THREE.Mesh (gBox, newmatBox);
    box3.position.set( 30, 76, 552 );   
    box3.castShadow = true;
    box3.receiveShadow = true;
    leyerGroup.add( box1, box2, box3 ); 
    // CLONE SCALE
    const leyerScale = leyerGroup.clone(true);
    scene.add(leyerScale);
    leyerScale.position.set( -50, 90+(6*k), -(6*k)+180 );
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
    snake1.position.set( -320, 3, -740 );
    // BUBBLE 2
    let newmatSnake = mSnake.clone();     
    newmatSnake.color = new THREE.Color(v[2] ? v[2] : v[1]);
    const snake2 = new THREE.Mesh (gSnake, newmatSnake);
    snake2.castShadow = true;
    snake2.receiveShadow = true;
    snake2.position.set( -319, 3, -741);  
    snake2.scale.set( 0.8, 0.8, 0.8); 
    // BUBBLE 3
    let newmatSnake2 = mSnake.clone(); 
    newmatSnake2.color = new THREE.Color(v[3] ? v[3] : v[1]);
    const snake3 = new THREE.Mesh (gSnake, newmatSnake2);
    snake3.castShadow = true;
    snake3.receiveShadow = true;
    snake3.position.set( -318, 3, -740);;
    snake3.scale.set( 0.6, 0.6, 0.6); 
    leyerSnake.add( snake1, snake2, snake3 );   
    // CLONE BUBBLE
    const leyerSnake2 = leyerSnake.clone(true);
    leyerSnake2.position.set(-k*2, 22, 130); 
    leyerSnake2.rotation.set(k/150,-k/150,k/150);              
    scene.add(leyerSnake2);
  })

  // ROOM ////
  const gPavimento = new THREE.CylinderGeometry(250, 250,10, 64,64, false, -Math.PI/2, Math.PI);
  const pavimento = new THREE.Mesh(gPavimento, eleMat);
  pavimento.position.set( 10, -5, -340 ); 
  pavimento.scale.set(6,1,6); 
  scene.add(pavimento);
   // TREE TOON
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
       treeC1.position.set(-200, 160, -100);// S alto
       treeC1.rotation.set(0, 0.2, 0.01);      
       treeC1.scale.set(0.8, 0.8, 0.8)
       let treeC2 = tree.clone(true);
       treeC2.position.set(270, 360, -100);//D Sospeso 
       treeC2.rotation.set(0, 0.4, 0.01); 
       let treeC3 = tree.clone(true);
       treeC3.position.set(240,150, 80); //D cubo B
       treeC3.rotation.set(0, 2, 0.01);      
       treeC3.scale.set(0.9, 0.9, 0.9);
       let treeC4 = tree.clone(true);
       treeC4.position.set(-40, 162, 150);//S S Octa
       treeC4.rotation.set(0, 1, 0.01);      
       treeC4.scale.set(0.9, 0.9, 0.9); 
      scene.add( treeC1, treeC2, treeC3, treeC4 );
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
       tree2.position.set( -44, 1, 50 );
       tree2.rotation.set(0, Math.PI/-2, 0 );      
       tree2.scale.set( 9, 9, 9 );  
       tree2.traverse(function (node) {
         if (node.isMesh) {
          const material =new THREE.MeshPhysicalMaterial({
          color: 0XFFFFFF,                        
          }) 
           node.material = material;
           node.castShadow = true;
           node.receiveShadow = true;
         }
       });        
        
       scene.add(tree2);     

       let tree2C1 = tree2.clone(true);
       tree2C1.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore1);//S Alto
           }
       }); 
       tree2C1.position.set( 10, 1, 460);       
       tree2C1.scale.set( 9, 9, 9 ); 
       tree2C1.rotation.set( 0, Math.PI/-2, 0 );
       let tree2C2 = tree2.clone(true);

       tree2C2.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore2);//D sospeso
           }
       }); 
       tree2C2.position.set( 50, 1, 500);
       tree2C2.scale.set( 8, 8, 8  );
       let tree2C3 = tree2.clone(true);

       tree2C3.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore3);// Pool
           }
       }); 
       tree2C3.position.set(26, 1, 570);
       tree2C3.scale.set( 9, 9, 9  );

       let tree2C4 = tree2.clone(true);
       tree2C4.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore4);// Frontale
           }
       }); 
       tree2C4.position.set( -20, 1, 560);
       tree2C4.rotation.set( 0, Math.PI/2, 0 );
       tree2C4.scale.set( 9, 9, 9  ); 

       let tree2C5 = tree2.clone(true);
       tree2C5.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore5);// S Metà
           }
       }); 
       tree2C5.position.set( -50, 1, 500 );
       tree2C5.rotation.set( 0, Math.PI, 0 );
       tree2C5.scale.set( 10, 10, 10  );

       let tree2C6 = tree2.clone(true);
       tree2C6.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore6);//Angolo
           }
       }); 
       tree2C6.position.set( -24, 0, 480);
       tree2C6.rotation.set( 0, 0, 0 );
       tree2C6.scale.set( 8, 8, 8  );

       let tree2C7 = tree2.clone(true);
       tree2C7.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
              child.material = child.material.clone(); 
              child.material.color.set(colore7);// frontale
            }
       }); 
       tree2C7.position.set(-60,0,360);
       tree2C7.rotation.set( 0, Math.PI/2, 0 );
       tree2C7.scale.set( 9, 9, 9  );

       let tree2C8 = tree2.clone(true);
       tree2C8.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore8);//S grande
           }
       }); 
       tree2C8.position.set(60,1,360);
       tree2C8.rotation.set(0, Math.PI/-2, 0 );      
       tree2C8.scale.set( 9, 9, 9 );

       let tree2C9 = tree2.clone(true);
       tree2C9.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore9);//S grande
           }
       }); 
       tree2C9.position.set(-60,1,650 );
       tree2C9.rotation.set(0, Math.PI/-2, 0 );      
       tree2C9.scale.set( 9, 9, 9 );

       let tree2C10 = tree2.clone(true);
       tree2C10.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore10);//S grande
           }
       }); 
       tree2C10.position.set(60,1,650);
       tree2C10.rotation.set(0, Math.PI/-2, 0 );      
       tree2C10.scale.set( 9, 9, 9 );

       let tree2C11 = tree2.clone(true);
       tree2C11.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore11);//S Alto
           }
       }); 
       tree2C11.position.set( -150, 1, 520);       
       tree2C11.scale.set( 9, 9, 9 ); 
       tree2C11.rotation.set( 0, Math.PI/-2, 0 );
       let tree2C12 = tree2.clone(true);

       tree2C12.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore12);//D sospeso
           }
       }); 
       tree2C12.position.set( -250, 1, 520);
       tree2C12.scale.set( 8, 8, 8  );
       let tree2C13 = tree2.clone(true);

       tree2C13.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore13);// Pool
           }
       }); 
       tree2C13.position.set(-350, 1, 520);
       tree2C13.scale.set( 9, 9, 9  );

       let tree2C14 = tree2.clone(true);
       tree2C14.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore14);
           }
       }); 
       tree2C14.position.set(-600, 1, 520);
       tree2C14.rotation.set( 0, Math.PI/2, 0 );
       tree2C14.scale.set( 9, 9, 9  ); 

       let tree2C15 = tree2.clone(true);
       tree2C15.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore15);
           }
       }); 
       tree2C15.position.set(-700, 1, 520);
       tree2C15.rotation.set( 0, Math.PI, 0 );
       tree2C15.scale.set( 10, 10, 10  );

       let tree2C16 = tree2.clone(true);
       tree2C16.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore16);//Angolo
           }
       }); 
       tree2C16.position.set(150, 1, 520);
       tree2C16.rotation.set( 0, 0, 0 );
       tree2C16.scale.set( 8, 8, 8  );

       let tree2C17 = tree2.clone(true);
       tree2C17.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
              child.material = child.material.clone(); 
              child.material.color.set(colore17);// frontale
            }
       }); 
       tree2C17.position.set(250, 1, 520);
       tree2C17.rotation.set( 0, Math.PI/2, 0 );
       tree2C17.scale.set( 9, 9, 9  );

       let tree2C18 = tree2.clone(true);
       tree2C18.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore18);//S grande
           }
       }); 
       tree2C18.position.set(350, 1, 520);
       tree2C18.rotation.set(0, Math.PI/-2, 0 );      
       tree2C8.scale.set( 9, 9, 9 );

       let tree2C19 = tree2.clone(true);
       tree2C19.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore19);//S grande
           }
       }); 
       tree2C19.position.set(600, 1, 520);
       tree2C19.rotation.set(0, Math.PI/-2, 0 );      
       tree2C19.scale.set( 9, 9, 9 );

       let tree2C20 = tree2.clone(true);
       tree2C20.traverse(function (child) {
           if (child instanceof THREE.Mesh) {
               child.material = child.material.clone(); 
               child.material.color.set(colore20);//S grande
           }
       }); 
       tree2C20.position.set(700, 1, 520);
       tree2C20.rotation.set(0, Math.PI/-2, 0 );      
       tree2C20.scale.set( 9, 9, 9 );

      scene.add(tree2C1,tree2C2,tree2C3,tree2C4,tree2C5,tree2C6,tree2C7,tree2C8,tree2C9,tree2C10,tree2C11,tree2C12,tree2C13,tree2C14,tree2C15,tree2C16,tree2C17,tree2C18,tree2C19,tree2C20);
     },      
     undefined, 
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
       bench.position.set( 5, 0.5, 470 );
       bench.rotation.set(0, 0, 0 );      
       bench.scale.set( 1, 1, 1 );    
       bench.traverse(function (node) {
         if (node.isMesh) {
           const material = new THREE.MeshPhysicalMaterial({    
             color: 0XFFFFFF,      
             //color: colore1,       
             map: TextureQ2,      
           });
           node.material = material;
           node.castShadow = true;
           node.receiveShadow = true;
         }
       });      
       scene.add(bench);
       let bench2 = bench.clone();
       bench2.position.set(50, 0, 520);
       bench2.rotation.set(0, -Math.PI/2, 0 );      
       bench2.scale.set( 1, 1, 1 ); 
       bench2.traverse(function (node) {
        if (node.isMesh) {
          const material = new THREE.MeshPhysicalMaterial({       
            color: 0XFFFFFF,  
            // color: colore2,       
            map: TextureQ2,      
          });
          node.material = material;
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });         
      let bench3 = bench.clone();
      bench3.position.set(-50, 0, 520);
      bench3.rotation.set(0, Math.PI/2, 0 );      
      bench3.scale.set( 1, 1, 1 );
      bench3.traverse(function (node) {
        if (node.isMesh) {
          const material = new THREE.MeshPhysicalMaterial({   
            color: 0XFFFFFF,      
            // color: colore3,       
            map: TextureQ2,      
          });
          node.material = material;
          node.castShadow = true;
          node.receiveShadow = true;
        }
      }); 

      let bench4 = bench.clone();
      bench4.position.set(-5, 0, 570);
      bench4.rotation.set(0, -Math.PI, 0 );      
      bench4.scale.set( 1, 1, 1 );
      bench4.traverse(function (node) {
        if (node.isMesh) {
          const material = new THREE.MeshPhysicalMaterial({  
            
            color: 0XFFFFFF,  
            // color: colore4,       
            map: TextureQ2,      
          });
          node.material = material;
          node.castShadow = true;
          node.receiveShadow = true;
        }
      }); 
      scene.add(bench2, bench3, bench4);     
     },        
     undefined, // funzione di progresso opzionale da passare al caricatore
     function (error) {
       console.error(error);      
     }   
   );

   // MOUNT
   const loaderMount = new GLTFLoader();
   loaderMount.load(    
     '3d/mountains6B.glb',
       function (glt) {
       const mount = glt.scene;
       mount.position.set(0, 0.5, -160 );
       mount.rotation.set(0, 0, 0 );      
       mount.scale.set( 1, 1, 1 ); 
       mount.traverse(function (node) {
         if (node.isMesh) {
           const material = new THREE.MeshPhysicalMaterial({
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
   const loaderMount2 = new GLTFLoader();
   loaderMount.load(    
     '3d/mountains6C.glb',
       function (glt) {
       const mount = glt.scene;
       mount.position.set(0, 0.5, -160 );
       mount.rotation.set(0, 0, 0 );      
       mount.scale.set( 1, 1, 1 ); 
       mount.traverse(function (node) {
         if (node.isMesh) {
           const material = new THREE.MeshPhysicalMaterial({
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
   const loaderMount3 = new GLTFLoader();
   loaderMount.load(    
     '3d/mountains6Cast.glb',
       function (glt) {
       const mount = glt.scene;
       mount.position.set(0, 0.5, -160 );
       mount.rotation.set(0, 0, 0 );      
       mount.scale.set( 1, 1, 1 ); 
       mount.traverse(function (node) {
         if (node.isMesh) {
           const material = new THREE.MeshPhysicalMaterial({
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
   const loaderMount4 = new GLTFLoader();
   loaderMount.load(    
     '3d/mountains6O.glb',
       function (glt) {
       const mount = glt.scene;
       mount.position.set(0, 0.5, -160 );
       mount.rotation.set(0, 0, 0 );      
       mount.scale.set( 1, 1, 1 ); 
       mount.traverse(function (node) {
         if (node.isMesh) {
           const material = new THREE.MeshPhysicalMaterial({
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
   const loaderMount5 = new GLTFLoader();
   loaderMount.load(    
     '3d/mountains6T.glb',
       function (glt) {
       const mount = glt.scene;
       mount.position.set(0, 0.5, -160 );
       mount.rotation.set(0, 0, 0 );      
       mount.scale.set( 1, 1, 1 ); 
       mount.traverse(function (node) {
         if (node.isMesh) {
           const material = new THREE.MeshPhysicalMaterial({
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
  // RABBIT 
  const loaderRabbitg = new GLTFLoader();
  loaderRabbitg.load(    
    '3d/rabbit/RabbitO.glb',
    function (glt) {
      const rabbitG = glt.scene;
      rabbitG.position.set(-900, 0.51, 80  );      
      rabbitG.rotation.set( 0, -Math.PI/2, 0 ); 
      rabbitG.scale.set( 3, 3, 3);        
      rabbitG.traverse(function (node) {
        if (node.isMesh) {
          const materialR =new THREE.MeshPhysicalMaterial({
            color: 0xC1FF4D,
            roughness: 0,
            metalness: 0.5,                         
            })                  
          node.material = materialR;
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
      scene.add(rabbitG);
      //RABBIT 2       
      let rabbitG2 = rabbitG.clone();
      rabbitG2.position.set( 900, 0.51, 80 );
      rabbitG2.rotation.set( 0, 5, 0 );     
      scene.add( rabbitG2 );
      rabbitG2.castShadow = true; 
      rabbitG2.receiveShadow = true;    
    },    
     undefined, // funzione di progresso opzionale da passare al caricatore
     function (error) {
       console.error(error);      
     }
   );    
    // HUMANS 1
    const loaderH1 = new GLTFLoader();
    loaderH1.load(    
      './3d/humans/Low_person_1.glb',
      function (glt) {
        const human1 = glt.scene;
        human1.position.set( -20, 0, 0 );
        human1.rotation.set(0, Math.PI/4, 0 );      
        human1.scale.set( 10, 10, 10 );        
        human1.traverse(function (node) {
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
        //scene.add(human1);        
        human1.castShadow = true; 
        human1.receiveShadow = true; 
        let human1A = human1.clone(true);
        human1A.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = child.material.clone(); 
                child.material.color.set(colore1);
            }
        }); 
        human1A.position.set(20,0,0);
        human1A.rotation.set(0, Math.PI/4,0);      
        human1A.scale.set(10,10,10); 
        scene.add(human1A);   
        
        let human1B = human1.clone(true);
        human1B.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = child.material.clone(); 
                child.material.color.set(colore2);
            }
        });        
        human1B.position.set(0,0, 44);
        human1B.rotation.set(0, Math.PI/4,0);      
        human1B.scale.set(10,10,10); 
        scene.add(human1B);
        
        let human1C = human1.clone(true);
        human1C.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = child.material.clone(); 
                child.material.color.set(colore3);
            }
        });        
        human1C.position.set(-30,0,120);
        human1C.rotation.set(0, Math.PI/4,0);      
        human1C.scale.set(10,10,10); 
        scene.add(human1C);
        
        let human1D = human1.clone(true);
        human1D.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = child.material.clone(); 
                child.material.color.set(colore4);
            }
        });        
        human1D.position.set(24,0,130);
        human1D.rotation.set(0, Math.PI/4,0);      
        human1D.scale.set(10,10,10); 
        scene.add(human1D); 

        let human1E = human1.clone(true);
        human1E.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = child.material.clone(); 
                child.material.color.set(colore5);
            }
        });        
        human1E.position.set(5,0,140);
        human1E.rotation.set(0, Math.PI/4,0);      
        human1E.scale.set(10,10,10); 
        scene.add(human1E); 
      },       
      undefined, 
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
        human2.position.set( -20, 0, 80 );
        human2.rotation.set( 0, Math.PI/4, 0 );      
        human2.scale.set( 10, 10, 10 );        
        human2.traverse(function (node) {
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
        //scene.add(human2);        
        human2.castShadow = true; 
        human2.receiveShadow = true; 

        let human2A = human2.clone(true);
        human2A.position.set(30, 0, 200);
        human2A.rotation.set( 0, Math.PI/4, 0 );   
        human2A.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = child.material.clone(); 
            child.material.color.set(colore6);
          }
      }); 
      scene.add(human2A);
      let human2B = human2.clone(true);
      human2B.position.set(0, 0, 100);
      human2B.rotation.set( 0, Math.PI/4, 0 );   
      human2B.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = child.material.clone(); 
            child.material.color.set(colore7);
          }
      }); 
      scene.add(human2B);

      let human2C = human2.clone(true);
      human2C.position.set(-10, 0, -9);
      human2C.rotation.set( 0, Math.PI/4, 0 );   
      human2C.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
          child.material = child.material.clone(); 
          child.material.color.set(colore8);
        }
    }); 
    scene.add(human2C);

    let human2D = human2.clone(true);
    human2D.position.set(0, 0, 120);
    human2D.rotation.set( 0, Math.PI/4, 0 );   
    human2D.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
          child.material = child.material.clone(); 
          child.material.color.set(colore9);
        }
    }); 
    scene.add(human2D);

    let human2E = human2.clone(true);
    human2E.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = child.material.clone(); 
            child.material.color.set(colore10);
        }
    });        
    human2E.position.set(-0,0,430);
    human2E.rotation.set(0, Math.PI/4,0);      
    human2E.scale.set(10,10,10); 
    scene.add(human2E); 

      },       
      undefined, 
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
        human3.position.set( -20, 0, 140);
        human3.rotation.set( 0, Math.PI/4, 0 );      
        human3.scale.set( 10, 10, 10 );        
        human3.traverse(function (node) {
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
        //scene.add(human3);        
        human3.castShadow = true; 
        human3.receiveShadow = true;  

        let human3A = human3.clone(true);
        human3A.position.set(30, 0, 150);
        human3A.rotation.set( 0, Math.PI/4, 0 );   
        human3A.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = child.material.clone(); 
            child.material.color.set(colore11);
          }
        });
      
        let human3B = human3.clone(true);
        human3B.position.set(20, 0, 160);
        human3B.rotation.set( 0, Math.PI/4, 0 );   
        human3B.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = child.material.clone(); 
            child.material.color.set(colore12);
          }
        }); 

        let human3C = human3.clone(true);
        human3C.position.set(35, 0, 170);
        human3C.rotation.set( 0, Math.PI/4, 0 );   
        human3C.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = child.material.clone(); 
            child.material.color.set(colore13);
          }
        });

        let human3D = human3.clone(true);
        human3D.position.set(-20, 0, 180);
        human3D.rotation.set( 0, Math.PI/4, 0 );   
        human3D.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = child.material.clone(); 
            child.material.color.set(colore14);
          }
        });
        
        let human3E = human3.clone(true);
        human3E.position.set(0, 0, 190);
        human3E.rotation.set( 0, Math.PI/4, 0 );   
        human3E.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = child.material.clone(); 
            child.material.color.set(colore15);
          }
        }); 

        scene.add(human3A, human3B, human3C, human3D, human3E);
      },       
      undefined, 
      function (error) {
        console.error(error);      
      }   
    );
    // HUMANS 4
    const loaderH4 = new GLTFLoader();
    loaderH4.load(    
      './3d/humans/Low_person_4.glb',
      function (glt) {
        const human4 = glt.scene;
        human4.position.set( 28, 0, 200 );
        human4.rotation.set(0, Math.PI/4, 0 );      
        human4.scale.set( 10, 10, 10 );        
        human4.traverse(function (node) {
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
        //scene.add(human4);        
        human4.castShadow = true; 
        human4.receiveShadow = true;

        let human4A = human4.clone(true);
        human4A.position.set(-22, 0, 280);
        human4A.rotation.set( 0, Math.PI/4, 0 );   
        human4A.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = child.material.clone(); 
            child.material.color.set(colore16);
          }
        });

        let human4B = human4.clone(true);
        human4B.position.set(-10, 0, 380);
        human4B.rotation.set( 0, Math.PI/4, 0 );   
        human4B.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = child.material.clone(); 
            child.material.color.set(colore17);
          }
        }); 

        let human4C = human4.clone(true);
        human4C.position.set(20, 0, 400);
        human4C.rotation.set( 0, Math.PI/4, 0 );   
        human4C.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = child.material.clone(); 
            child.material.color.set(colore18);
          }
        }); 

        let human4D = human4.clone(true);
        human4D.position.set(-30, 0, 440);
        human4D.rotation.set( 0, Math.PI/4, 0 );   
        human4D.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = child.material.clone(); 
            child.material.color.set(colore19);
          }
        }); 

        let human4E = human4.clone(true);
        human4E.position.set(0, 0, 450);
        human4E.rotation.set( 0, Math.PI/4, 0 );   
        human4E.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = child.material.clone(); 
            child.material.color.set(colore20);
          }
        }); 

        scene.add(human4A, human4B, human4C, human4D, human4E);
      }, 
      undefined, 
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
   pool.position.set( 0, 1, 520);
   pool.scale.set (1,1,1);
   scene.add(pool);
   // FISH 2 GLTF ///  
   const loaderfishG = new GLTFLoader();
   loaderfishG.load(
     '3d/fish/fish_G.glb',
     function (gltfishG) {
      const fishG = gltfishG.scene;
      fishG.position.set( 20, 1.5, 10 ); 
      fishG.rotation.set( 0, -0.4, 0);     
      fishG.scale.set( 0.5, 0.5, 0.5 );
      fishG.traverse(function (node4) {
        if (node4.isMesh) {          
          const mFish = new THREE.MeshPhysicalMaterial({
            color: 0XFF0000,
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
      Fish2.position.set( 16, 1.4, 17);
      Fish2.rotation.set( 0, -0.4, 0);     
      Fish2.scale.set( 0.6, 0.6, 0.6 );
      const Fish3 = fishG.clone();
      Fish3.position.set( 18, 1.6, 18);
      Fish3.rotation.set( 0, -0.4, 0);     
      Fish3.scale.set( 0.5, 0.5, 0.5 );
      const Fish4 = fishG.clone();
      Fish4.position.set( 22, 1.4, 9);
      Fish4.rotation.set( 0, -0.4, 0);     
      Fish4.scale.set( 0.7, 0.7, 0.7 );
      const Fish5 = fishG.clone();
      Fish5.position.set( 22, 1.4, 12);
      Fish5.rotation.set( 0, -0.4, 0);     
      Fish5.scale.set( 0.5, 0.5, 0.5 );
      //ANCORAGGIO FISH
      sphereFish.position.set( 0, 0.5, 520 );      
      sphereFish.add(fishG, Fish2, Fish3, Fish4,Fish5);
      let sphereFish2 = sphereFish.clone();
      scene.add(sphereFish, /*sphereFish2*/);
      sphereFish2.position.set(160,1,480);
      //sphereFish2.rotation.set( -Math.PI/2, 0, -Math.PI/2 ); 
       let t2 = 0;
       function animatefish() {      
       requestAnimationFrame(animatefish);
       t2 -= 0.3;
       sphereFish.rotation.y += 0.005;      
       sphereFish.position.y += 0.003*Math.sin(t2);
       sphereFish.position.x += 0.003*Math.sin(t2);
       sphereFish2.rotation.y += 0.005;      
       sphereFish2.position.y += 0.003*Math.sin(t2);
       sphereFish2.position.x += 0.003*Math.sin(t2);
       renderer.render(scene, camera);
       } 
       animatefish();      
     },    
     undefined, // funzione di progresso opzionale da passare al caricatore
     function (error) {
       console.error(error);      
     }
   );

  const Deers=_.map(choose,(v,k)=>{ 
    const loaderDeerC = new GLTFLoader();
    loaderDeerC.load(    
      './3d/deer_2.glb',
      function (glt) {
        const deerColored = glt.scene;
        // deerColored.position.set( -210,70+(Math.cos(k)), -60*-Math.cos(k+2) );
        deerColored.position.set(710+(k*10), -0.2,300-Number(k*30));
        deerColored.rotation.set(0, Math.PI/2, 0 );
        deerColored.scale.set( 0.9, 0.9, 0.9 );        
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
        scene.add(deerColored);        
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
        cloudColored.position.set( -64, 370, -546-Number(k*4));
        cloudColored.rotation.set(Math.PI, 0, k );
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

  // ELEMENTO  // ELEMENTO
  const gElemento1 = new THREE.BoxGeometry( 10, 10, 10 );  
  const elemento1 = new THREE.Mesh(gElemento1, eleMat);
  elemento1.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      child.material = child.material.clone(); 
     child.material.color.set(colore1);
    }
  }); 
  elemento1.position.set( 240,130, 80);
  elemento1.scale.set( 4, 4, 4);
  elemento1.castShadow = true;
  elemento1.receiveShadow = true; 
  // TREEC2   
  const elemento2 = new THREE.Mesh(gElemento1, eleMat);
  elemento2.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      child.material = child.material.clone(); 
      child.material.color.set(colore2);
    }
  }); 
  elemento2.position.set( 270, 335, -100 );
  elemento2.scale.set( 5, 5, 5);
  elemento2.castShadow = true;
  elemento2.receiveShadow = true;

  // TREEC1
  const elemento3 = new THREE.Mesh(gElemento1, eleMat);
  elemento3.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore3);
      }
  }); 
  elemento3.position.set( -200, 136, -100 );
  elemento3.scale.set( 5, 5, 5);   
  elemento3.castShadow = true;
  elemento3.receiveShadow = true;

  const elemento4 = new THREE.Mesh(gElemento1, eleMat);
  elemento4.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore4);
      }
  }); 
  elemento4.position.set( 585, 140, 300 );
  elemento4.scale.set( 4, 4, 4);    
  elemento4.castShadow = true;
  elemento4.receiveShadow = true;

  const elemento5 = new THREE.Mesh(gElemento1, eleMat); 
  elemento5.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore5);// D Sosp
      }
  }); 
  elemento5.position.set( 500, 60, 520 );//Porta
  elemento5.scale.set( 4, 4, 4);    
  elemento5.castShadow = true;
  elemento5.receiveShadow = true;
  scene.add(elemento1,elemento2,elemento3, elemento4,elemento5 );

  // PALLA 
  const gPalla1 = new THREE.SphereGeometry( 10, 16, 16 );
  const palla1 = new THREE.Mesh(gPalla1, eleMat );
  palla1.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore6);
      }
  }); 
  palla1.position.set( 100, 240, 310 );
  palla1.scale.set(3,3,3);
  palla1.castShadow = true;
  palla1.receiveShadow = true;  

  const palla2 = new THREE.Mesh(gPalla1, eleMat );
  palla2.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore7);
      }
  });   
  palla2.position.set( -220, 160, 450 );
  palla2.scale.set(3,3,3);
  palla2.castShadow = true;
  palla2.receiveShadow = true;  

  const palla3 = new THREE.Mesh(gPalla1, eleMat );
  palla3.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore8);
      }
  }); 
  palla3.position.set( 700, 180, -210 );
  palla3.scale.set( 3, 3, 3);
  palla3.castShadow = true;
  palla3.receiveShadow = true;

  const palla4 = new THREE.Mesh(gPalla1, eleMat );
  palla4.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore9);// C grande
      }
  }); 
  palla4.position.set( -600, 280, -210 );
  palla4.scale.set( 3, 3, 3);
  palla4.castShadow = true;
  palla4.receiveShadow = true;

  const palla5 = new THREE.Mesh(gPalla1, eleMat );
  palla5.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore10);// C grande
      }
  }); 
  palla5.position.set( 0, 400, 300 );
  palla5.scale.set( 3, 3, 3);
  palla5.castShadow = true;
  palla5.receiveShadow = true;
  scene.add(palla1, palla2, palla3,palla4,palla5);
  
  /// PIRAMIDI
  const gPiramid = new THREE.ConeGeometry( 5, 10, 4 );
  const piramid = new THREE.Mesh(gPiramid, eleMat);
  piramid.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore11);
      }
  });   
  piramid.position.set( 190, 220, 640 ); 
  piramid.scale.set( 5, 5, 5);
  piramid.castShadow = true;
  piramid.receiveShadow = true;

  const piramid2 = new THREE.Mesh(gPiramid, eleMat);
  piramid2.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore12);
      }
  });  
  piramid2.position.set( -500, 60, 520 ); 
  piramid2.scale.set( 8, 8, 8);
  piramid2.rotation.set(0, 0, 0);
  piramid2.castShadow = true;
  piramid2.receiveShadow = true;

  const piramid3 = new THREE.Mesh(gPiramid, eleMat);
  piramid3.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore13);
      }
  });   
  piramid3.position.set( -600, 200, 500 ); 
  piramid3.scale.set( 6, 6, 6);
  piramid3.rotation.set(0, 0, 0);
  piramid3.castShadow = true;
  piramid3.receiveShadow = true;

  const piramid4 = new THREE.Mesh(gPiramid, eleMat);
  piramid4.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore14);
      }
  });   
  piramid4.position.set( 600, 400, 400 ); 
  piramid4.scale.set( 6, 6, 6);
  piramid4.rotation.set(0, 0, 0);
  piramid4.castShadow = true;
  piramid4.receiveShadow = true;

  const piramid5 = new THREE.Mesh(gPiramid, eleMat);
  piramid5.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore15);
      }
  });   
  piramid5.position.set( -250, 500, 300 ); 
  piramid5.scale.set( 6, 6, 6);
  piramid5.rotation.set(0, 0, 0);
  piramid5.castShadow = true;
  piramid5.receiveShadow = true;
  scene.add(piramid, piramid2, piramid3, piramid4, piramid5); 

  //DODECA
  const gDodeca = new THREE.DodecahedronGeometry(40,0);
  const dodeca = new THREE.Mesh(gDodeca, eleMat);
  dodeca.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore16);
      }
  });
  dodeca.position.set( 0 , 60, 920 );
  dodeca.scale.set(0.6,0.6,0.6); 
  dodeca.castShadow = true;
  dodeca.receiveShadow = true; 


  // TREEC4 
  const dodeca2 = new THREE.Mesh(gDodeca, eleMat);    
  dodeca2.position.set(-40,140,140);
  dodeca2.scale.set(0.8,0.8,0.8);
  dodeca2.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore17);
      }
  }); 

  const dodeca4 = new THREE.Mesh(gDodeca, eleMat);
  dodeca4.position.set( 280,100, 180);
  dodeca4.scale.set(0.6,0.6,0.6);  
  dodeca4.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore18);
      }
  });

  const dodeca5 = new THREE.Mesh(gDodeca, eleMat);
  dodeca5.position.set( 680,400, -180);
  dodeca5.scale.set(0.6,0.6,0.6);  
  dodeca5.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore19);
      }
  });

  const dodeca3 = new THREE.Mesh(gDodeca, eleMat);
  dodeca3.position.set( -680,320, 180);
  dodeca3.scale.set(0.6,0.6,0.6);  
  dodeca3.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
        child.material = child.material.clone(); 
        child.material.color.set(colore20);
      }
  });
  scene.add(dodeca, dodeca2, dodeca3,dodeca4,dodeca5);

  // CIELO
  const gCielo = new THREE.SphereGeometry(1200, 16, 16);
  const mCielo = new THREE.MeshPhysicalMaterial({
    map: TextureQ2,
    side: THREE.DoubleSide, 
    alphaMap: alphaCielo,
    transparent: true,
  })
  const cielo = new THREE.Mesh(gCielo, mCielo);
  cielo.rotation.set(0,1.4,0);
  //scene.add(cielo);

  const gCielo2 = new THREE.SphereGeometry(1300, 16, 16);
  const mCielo2 = new THREE.MeshPhysicalMaterial({
    map: TextureB2,
    side: THREE.DoubleSide,     
  })
  const cielo2 = new THREE.Mesh(gCielo2, mCielo2);
  cielo2.castShadow = true;
  scene.add(cielo2);  
  // BACKGROUND 
  const listenerBcg = new THREE.AudioListener();
  camera.add(listenerBcg);
  const audioLoader = new THREE.AudioLoader();
  const backgroundSound = new THREE.Audio( listenerBcg );
  // audioLoader.load('audio/hearts/gardenbcg2.mp3', function( buffer )
  audioLoader.load('audio/garden-of-eden-186428.mp3', function( buffer ) {
    backgroundSound.setBuffer( buffer );
    backgroundSound.setLoop( true );
    backgroundSound.setVolume( 0.05 );
    //backgroundSound.play();
  });
    // BACKGROUND MUSIC
    const listenerBcgM = new THREE.AudioListener();
    camera.add(listenerBcgM);
    const audioLoaderM = new THREE.AudioLoader();
    const backgroundSoundM = new THREE.Audio( listenerBcgM );
    audioLoaderM.load('audio/midnight-forest-184304.mp3', function( buffer ) {
      backgroundSoundM.setBuffer( buffer );
      backgroundSoundM.setLoop( true );
      backgroundSoundM.setVolume( 0.5 );
      backgroundSoundM.play();
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
    camera.position.set( 0, 0, 0 ); 
    camera.rotation.set( 1, 0, 0 );
    camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
    controls.listenToKeyEvents( window );
    controls.minDistance =  5;    
    controls.maxDistance = 1100;
    controls.maxPolarAngle = 1.5; 
  } 

  let positions = [
    {moveTime:0, waitTime: 5, pos: {x:0,y:-10,z:-25}},
    {moveTime: 20, waitTime: 0, pos: {x:0,y:-57,z:-25}},    
    
    {moveTime: 20, waitTime: 0, pos: {x:0,y:-20,z:-520}},
    {moveTime: 10, waitTime: 0, pos: {x:-100,y:-160,z:-476}},
    {moveTime: 10, waitTime: 5, pos: {x:-100,y:-280,z:-330}},
    {moveTime: 10, waitTime: 1, pos: {x:-540,y:-100,z:-940}},
    {moveTime: 10, waitTime: 0, pos: {x:340,y:-100,z: -840}},
    {moveTime: 10, waitTime: 0, pos: {x:340,y:-20,z:540}},
    {moveTime: 10, waitTime: 10, pos: {x:70,y:-376,z:520}},
    {moveTime: 4, waitTime: 1, pos: {x:-540,y:-26,z:520}},
    {moveTime: 10, waitTime: 10, pos: {x:-730,y:-26,z:-340}},

    {moveTime: 10, waitTime: 0, pos: {x:0,y:-57,z:-25}}, 
    {moveTime:20,waitTime:0,pos: {x:0,y:-10,z:-25}},
  ];
  
  let tweenScene = function(index) {
    if (index >= positions.length) index = 0;
  
    gsap.to(scene.position, {
      duration: positions[index].moveTime,
      x: positions[index].pos.x,
      y: positions[index].pos.y,
      z: positions[index].pos.z,
      onComplete: function() {
        gsap.delayedCall(positions[index].waitTime, function() {
          tweenScene(index + 1);
        });
      }    
    });
  };  
  tweenScene(0);  
  
};