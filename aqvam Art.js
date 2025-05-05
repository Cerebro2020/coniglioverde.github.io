import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';
import { GLTFLoader } from './three_class/GLTFLoader.js';

const boxSpacingX = 0.044;
let prevY = 0;
let isPaused = false;
const colorsArray = [
  "#FF0000", // Rosso (mantenuto come richiesto)
  // 65 sfumature dal magenta all'arancio
  "#FF00FF", "#FF19F0", "#FF32E1", "#FF4BD2", "#FF64C3",
  "#FF7DB4", "#FF96A5", "#FFAF96", "#FFC887", "#FFE178",
  "#FFFA69", "#FFF25A", "#FFEA4B", "#FFE23C", "#FFDA2D",
  "#FFD31E", "#FFCB0F", "#FFC300", "#FFBB00", "#FFB400",
  "#FFAD00", "#FFA600", "#FF9F00", "#FF9800", "#FF9100",
  "#FF8A00", "#FF8300", "#FF7C00", "#FF7500", "#FF6E00",
  "#FF6700", "#FF6000", "#FF5900", "#FF5200", "#FF4B00",
  "#FF4400", "#FF3D00", "#FF3600", "#FF2F00", "#FF2800",
  "#FF2100", "#FF1A00", "#FF1300", "#FF0C00", "#FF0500",
  "#FF0000", "#FF0000", "#FF0000", "#FF0000", "#FF0000",
  "#FF0000", "#FF0000", "#FF0000", "#FF0000", "#FF0000",
  "#FF0000", "#FF0000", "#FF0000", "#FF0000", "#FF0000",
  "#FF0000", "#FF0000", "#FF0000", "#FF0000", "#FF0000",
  // 65 sfumature dal giallo al verde
  "#FFFF00", "#F7FF00", "#EFFF00", "#E7FF00", "#DFFF00",
  "#D7FF00", "#CFFF00", "#C7FF00", "#BFFF00", "#B7FF00",
  "#AFFF00", "#A7FF00", "#9FFF00", "#97FF00", "#8FFF00",
  "#87FF00", "#7FFF00", "#77FF00", "#6FFF00", "#67FF00",
  "#5FFF00", "#57FF00", "#4FFF00", "#47FF00", "#3FFF00",
  "#37FF00", "#2FFF00", "#27FF00", "#1FFF00", "#17FF00",
  "#0FFF00", "#07FF00", "#00FF00", "#00FF07", "#00FF0F",
  "#00FF17", "#00FF1F", "#00FF27", "#00FF2F", "#00FF37",
  "#00FF3F", "#00FF47", "#00FF4F", "#00FF57", "#00FF5F",
  "#00FF67", "#00FF6F", "#00FF77", "#00FF7F", "#00FF87",
  "#00FF8F", "#00FF97", "#00FF9F", "#00FFA7", "#00FFAF",
  "#00FFB7", "#00FFBF", "#00FFC7", "#00FFCF", "#00FFD7",
  "#008000", "#008A00", "#009400", "#009E00", "#00A800",
  "#00B200", "#00BC00", "#00C600", "#00D000", "#00DA00",
  "#00E400", "#00EE00", "#00F800", "#00FF04", "#00FF0E",
  "#00FF18", "#00FF22", "#00FF2C", "#00FF36", "#00FF40",
  "#00FF4A", "#00FF54", "#00FF5E", "#00FF68", "#00FF72",
  "#00FF7C", "#00FF86", "#00FF90", "#00FF9A", "#00FFA4",
  "#00FFAE", "#00FFB8", "#00FFC2", "#00FFCC", "#00FFD6",
  "#00FFE0", "#00FFEA", "#00FFF4", "#00FFFE", "#00FAFF",
  "#00F0FF", "#00E6FF", "#00DCFF", "#00D2FF", "#00C8FF",
  "#00BEFF", "#00B4FF", "#00AAFF", "#00A0FF", "#0096FF",
  "#008CFF", "#0082FF", "#0078FF", "#006EFF", "#0064FF",
  "#005AFF", "#0050FF", "#0046FF", "#003CFF", "#0032FF",
  "#0028FF", "#001EFF", "#0014FF", "#000AFF", "#0000FF"
];
const colorsArray2 = [
  "#FF0000", "#00F0FF", "#00F0FF",  
  "#00F0FF", "#00F0FF", "#00F0FF",  
  "#00F0FF", "#00F0FF", "#00F0FF",  
  "#00F0FF", "#00F0FF", "#00F0FF"
  ];
const colorsArray3 = [
  "#FF0000", "#00FFFFFF", "#FFFFF",  
  "#00FF00", "#FFFFFF", "#FFFFFF",  
  "#0000FF"  
];

const loader = new THREE.TextureLoader();
const uvMap = loader.load('./images/uvmap/fish_skin.jpg');

export default function(){ 
  const clock = new THREE.Clock(); 
  window.resetCamera = resetCamera;
  const scene = new THREE.Scene();
  const gridHelper = new THREE.GridHelper( 2000, 100 );
  //scene.add(gridHelper);
  //scene.background = new THREE.Color(0x000000);
  //scene.fog = new THREE.Fog( 0x000000, 4000, 5000 ); 
  const camera = new THREE.PerspectiveCamera( 50 , window.innerWidth / window.innerHeight, 0.1, 10000 );
  let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
  const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true}); 
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height );
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }); 
  camera.position.set( 0, 4000, 0 );
  camera.lookAt(new THREE.Vector3( 0, player.height, 0));
  camera.setFocalLength ( 35 );
  let initialCameraPosition = new THREE.Vector3();
  initialCameraPosition.copy(camera.position);
  function resetCamera() {
    camera.position.copy(initialCameraPosition);  
  } 
  const controls = new OrbitControls( camera, renderer.domElement );  
  controls.listenToKeyEvents( window );
  controls.minDistance =  0;    
  controls.maxDistance = 4000;
  //controls.maxPolarAngle = 1.5;
  const ambiente = new THREE.HemisphereLight( 0xffffff, 0x000000, 1 );
  const pointL = new THREE.PointLight(0xffffff,1,4000);
  pointL.position.set(0, 1000 ,0);
  let pointL2 = new THREE.PointLight(0xffffff,1,1600);
  pointL2.position.set(0,-1200,0);
  pointL.castShadow = true; 
  pointL.shadow.mapSize.width = 512*4; // default
  pointL.shadow.mapSize.height = 512*4; // default
  pointL.shadow.camera.near = 0.5; // default
  pointL.shadow.camera.far = 10; // default
  pointL.shadow.radius = 8;
  pointL2.castShadow = true;
  pointL2.shadow.mapSize.width = 512*4; // default
  pointL2.shadow.mapSize.height = 512*4; // default
  pointL2.shadow.camera.near = 0.5; // default
  pointL2.shadow.camera.far = 10; // default
  pointL2.shadow.radius = 8;
    
  scene.add( ambiente, pointL, /*pointL2*/);
  
  var video = document.createElement('video');
  video.src = "video/aqvam/aqvam_video.mp4";
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
  

  // BACKGROUND 
  const listenerBcg = new THREE.AudioListener();
  camera.add(listenerBcg);
  const audioLoader = new THREE.AudioLoader();
  const backgroundSound = new THREE.Audio( listenerBcg );
  audioLoader.load('audio/aqvam/659964__beussa__cavewaterdrops.mp3', function( buffer ) {
    backgroundSound.setBuffer( buffer );
    backgroundSound.setLoop( true );
    backgroundSound.setVolume(1);
    //backgroundSound.play();
  });
    
  // BACKGROUND 
  const listenerBcg2 = new THREE.AudioListener();
  camera.add(listenerBcg2);
  //const audioLoader2 = new THREE.AudioLoader();
  const backgroundSound2 = new THREE.Audio( listenerBcg );
  audioLoader.load('audio/aqvam/344762__briankennemer__orcas-island-ant-hill_cut.mp3', function( buffer ) {
    backgroundSound2.setBuffer( buffer );
    backgroundSound2.setLoop( true );
    backgroundSound2.setVolume(0.5);
    //backgroundSound2.play();
  });
 
  let audioButton = document.querySelector('#btn-audio-white button');
  let isPlaying = true;   
  audioButton.addEventListener('click', function() {
    if (isPlaying) {
      backgroundSound.pause();
      backgroundSound2.pause();
    } else {
      backgroundSound.play();
      backgroundSound2.play();
    }
    // Cambiamo lo stato
    isPlaying = !isPlaying;
  });

  // Aqvam SCENE
  const loderAqvam = new GLTFLoader();
  loderAqvam.load(    
    '3d/aqvam_scene.glb',
      function (glt) {
      const AqvamScene = glt.scene;
      AqvamScene.position.set( 0, -400, 0 );
      AqvamScene.rotation.set(0, Math.PI/2, 0 );      
      AqvamScene.scale.set( 10,10,10);      
      AqvamScene.traverse(function (node) {
        if (node.isMesh) {
          const material = new THREE.MeshPhysicalMaterial({
            color:0xaaaaaa,  
            roughness: 0,
            metalness: 0.5,
            //emissive: 0x000000,
            //emissiveIntensity: 1,
            //ior: 1.606265,
            reflectivity: 1,
            clearcoat: 1,
            clearcoatRoughness: 0,
            bumpMap:uvMap,
            bumpScale: 2,                    
            //flatShading: true,    
          });
          node.material = material;
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });      
      //scene.add(AqvamScene);
    },   
    undefined, // funzione di progresso opzionale da passare al caricatore
    function (error) {
      console.error(error);      
    }     
  ); 
    // TORUS //
  // colore
  let colorTorus = new THREE.Color('#C2028F');

  const torusMat = new THREE.MeshPhysicalMaterial({
    //color: colorTorus,
    color: 0xffffff,
    roughness: 0,
    metalness: 0,
  });

  const torus1G = new THREE.TorusGeometry( 600,0.9,128,128);
  const torus1 = new THREE.Mesh(torus1G, torusMat);
  torus1.position.set( 0, 0, 0 );
  torus1.rotation.set( Math.PI/2, 0, 0 );
  // let torusNewMat = torusMat.clone();
  // torusNewMat.color = new THREE.Color(0x000000);
  let torusZ = new THREE.Mesh(torus1G, torusMat);
  torusZ.position.set(0,300,0);
  torusZ.rotation.set( Math.PI/2, 0, 0 );
  //scene.add(torusZ);
  let torusU = torus1.clone(); 
  let torusD = torus1.clone();
  let torusC = torus1.clone();
  let torusM = torus1.clone();
  let torusDM = torus1.clone();
  let torusCM = torus1.clone();
  let torusMM = torus1.clone();
  torusU.position.set(0,0,0);
  torusD.position.set(0,0,0);
  torusC.position.set(0,0,0);
  torusM.position.set(0,0,0);  
  torusDM.position.set(0,0,0);
  torusCM.position.set(0,0,0);
  torusMM.position.set(0,0,0);    
  const scalU = 0.51; 
  const scalD = 0.61;
  const scalC = 0.71;
  const scalM = 0.81;
  const scalDM = 0.91; 
  const scalCM = 1.01;  
  const scalMM = 1.1; 
  torusU.scale.set(scalU,scalU,scalU); 
  torusD.scale.set(scalD,scalD,scalD);
  torusC.scale.set(scalC,scalC,scalC);
  torusM.scale.set(scalM,scalM,scalM);
  torusDM.scale.set(scalDM,scalDM,scalDM); 
  torusCM.scale.set(scalCM,scalCM,scalCM);
  torusMM.scale.set(scalMM,scalMM,scalMM);  
  const misuratore = new THREE.Group();
  misuratore.add(torusU, torusD, torusC, torusM,torusDM, torusCM, torusMM);
  misuratore.position.set(0,410,0);
  let scaleMis = 1;//1.2;
  misuratore.scale.set(scaleMis,scaleMis,scaleMis);
  scene.add(misuratore);

  const gSchermo = new THREE.CylinderGeometry(1000,1000,1,64,10);
  const mSchermo = new THREE.MeshPhysicalMaterial({
    map:vTexture,    
  })
  const schermo = new THREE.Mesh(gSchermo,mSchermo);
  schermo.position.set(0,400,0);

  //scene.add(schermo)

  const xhr = new XMLHttpRequest();
  xhr.open('GET', './texts/aqvam.csv', true);
  xhr.onload = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let rows = xhr.responseText.split('\n');
        let allCsvData = rows.slice(1).map(row => row.split(',').map(Number));
        let boxes1 = [];
        let boxes2 = [];
        let boxes3 = [];
        let gLuna = new THREE.SphereGeometry(20, 32, 32);
        let mLuna = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 0.5,
            metalness: 0.5,
            //flatShading: true,
        });
        // let mLuna2 = new THREE.MeshPhysicalMaterial({
        //     color: 0xffffff,
        //     roughness: 0,
        //     metalness: 0.5,
        //     emissive: 0x000000,
        //     emissiveIntensity: 1,
        //     ior: 1.606265,
        //     reflectivity: 1,
        //     clearcoat: 1,
        //     clearcoatRoughness: 0,
        //     //transparent: true,
        //     //opacity:0.5,
        //     //flatShading: true,
        // });
        const mTrans = new THREE.MeshPhysicalMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0,
        });
        let luna = new THREE.Mesh(gLuna, mLuna); // Mesh
        luna.position.set(0, 800, -840);
        luna.scale.set(1, 1, 1);       
        let gCentro = new THREE.SphereGeometry(800, 128, 128);
        let centro = new THREE.Mesh(gCentro, mTrans); //Centro
        centro.position.set(0,-400,0);
        centro.add(luna);
        centro.receiveShadow = true;
        centro.rotation.set(0, 0, 0);
        scene.add(centro);
        function createBoxSet(columnIndex, boxesArray) {
            for (let i = 0; i < allCsvData.length; i++) {
                let color;
                // materiale                 
                const gBox = new THREE.SphereGeometry(5, 8, 8);                  
                let mBoxColor = color !== undefined ? color : (columnIndex === 2 ? 0xaaaaaa/*0x0A9EE8*/ : (columnIndex === 3 ? 0xffffff : 0x555555/*colorsArray[i % colorsArray.length]*/));
                // let mBoxColor = color !== undefined ? color : (columnIndex === 2 ? 0x555555 : (columnIndex === 3 ? 0xaaaaaa : 0xffffff));
                const mBox = new THREE.MeshPhysicalMaterial({
                    color: mBoxColor,
                    roughness: 0,
                    metalness: 0.5,
                    //emissive: 0x000000,
                    //emissiveIntensity: 1,
                    //ior: 1.606265,
                    reflectivity: 1,
                    clearcoat: 1,
                    clearcoatRoughness: 0,
                    bumpMap:uvMap,
                    bumpScale: 2,                    
                    //flatShading: true,                    
                });               
                // testa
                let box = new THREE.Mesh(gBox, mTrans);
                box.position.set(0, -200, -3050);
                box.scale.set(1,1,1);
                box.castShadow = true;
                box.receiveShadow = true;
                // lina in testa
                let boxLine = new THREE.Mesh(gBox, mBox); 
                boxLine.castShadow = true;
                boxLine.receiveShadow = true;
                // testa rotonda
                let petalG = new THREE.SphereGeometry(10,64,64);
                let petal = new THREE.Mesh(petalG, mBox);
                petal.position.set(0,0,37);
                petal.scale.set(1.5,0.5,1);
                petal.castShadow = true;
                petal.receiveShadow = true;
                // centro
                boxLine.position.set(0,0,-10);
                boxLine.scale.set(0.3,0.3,50);
                //scene.add(boxLine);
                let lineG = new THREE.CylinderGeometry(5, 0.5, 70, 16, 4);
                let lineVer = new THREE.Mesh(lineG, mBox);
                // coda
                lineVer.position.set(0, 0, 0);
                lineVer.rotation.set(Math.PI / 2, 0, 0);
                lineVer.scale.set(3,1,1);
                lineVer.castShadow = true;
                lineVer.receiveShadow = true;
                box.add(lineVer, boxLine, petal);
                box.rotation.x = Math.PI / 2; 
                
                

                // centro trasparente
                let boxTrans = new THREE.Mesh(gBox,mTrans);                              
                boxTrans.add(box);
                box.castShadow = true;
                box.receiveShadow = true;
                scene.add(boxTrans);
                boxesArray.push(boxTrans);
            }
        }
        createBoxSet(1, boxes1 ); 
        createBoxSet(2, boxes2 ); 
        createBoxSet(3, boxes3 );  

        // Function to scale the boxes in the boxes1 array
      function scaleBoxes(boxesArray, scaleX, scaleY, scaleZ) {
        boxesArray.forEach(box => {
          box.scale.set(scaleX, scaleY, scaleZ);
        });
      }

      //Scale the boxes1 array
      scaleBoxes(boxes1,0.8, 1,0.8); 
      scaleBoxes(boxes2,0.9, 1,0.9); 
        
        const materialP = new THREE.LineBasicMaterial( { 
            color: 0xff00ff 
        } );

        let currentColumn = 0;
        let totalColumns = Math.floor(allCsvData[0].length / 3); // Numero totale di colonne da considerare (1 ogni 3)
        let rotationPerColumn = -2 * Math.PI / totalColumns; // Rotazione del boxTrans
        let currentRotation = 0;
        let targetRotation = rotationPerColumn;

        function animateScene() {
            requestAnimationFrame(animateScene);
            // posizione su asse y altezza
            if (allCsvData.length > 0) {
                function animateBoxes(boxesArray, startColumnIndex) {
                    for (let i = 0; i < allCsvData.length; i++) {
                        let targetY = allCsvData[i][startColumnIndex + currentColumn * 3];
                        if (targetY <= 10) { // u
                            targetY *= 10;
                        } else if (targetY <= 100) { // d
                            targetY += 90;
                        } else if (targetY <= 1000) { // c
                            targetY /= 10;
                            targetY += 190;
                        } else if (targetY <= 10000) { // m
                            targetY /= 100;
                            targetY += 290;
                        } else if (targetY <= 100000) { // dm
                            targetY /= 1000;
                            targetY += 390;
                        } else if (targetY <= 1000000) { // dm
                            targetY /= 10000;
                            targetY += 490;
                        }

                        if (!isPaused) {
                            let lerpFactor = 0.125/8;
                            let lerpFactor2 = 0.00002;
                            let currentY = boxesArray[i].
                            
                            position.y;
                            boxesArray[i].position.y = THREE.MathUtils.lerp(currentY, targetY, lerpFactor);
                            const targetRY = i * boxSpacingX;
                            const currentRY = boxesArray[i].rotation.y;
                            boxesArray[i].rotation.y = THREE.MathUtils.lerp(-currentRY, -targetRY, 1);
                            let scaleFactor = 0.6;
                            let boxTrans = boxesArray[i];
                            let box = boxTrans.children[0];
                            if (box) {
                                box.position.z = -300 - (boxTrans.position.y * scaleFactor);
                            }
                            prevY = boxesArray[i].position.y;
                            // rotazone coda
                            if (currentY > prevY) {
                                box.rotation.x = THREE.MathUtils.lerp(box.rotation.x, 0.75, lerpFactor);
                            } else if (currentY < prevY) {
                                box.rotation.x = THREE.MathUtils.lerp(box.rotation.x, -2.25, lerpFactor);
                            } else {
                                box.rotation.x = THREE.MathUtils.lerp(box.rotation.x, Math.PI / 2, lerpFactor);
                            }
                            // sparizione se inferiore a 1
                            if (boxesArray[i].position.y < 0.999999) {
                                boxesArray[i].visible = false;
                            } else {
                                boxesArray[i].visible = true;
                            }

                            if (Math.abs(currentRotation - targetRotation) < 1) {
                                if (currentColumn === 0) {
                                    currentRotation = 0;
                                }
                                targetRotation = rotationPerColumn * currentColumn;
                            }
                            currentRotation = THREE.MathUtils.lerp(currentRotation, targetRotation, lerpFactor2);
                            centro.rotation.y = currentRotation;  
                        if (clock.getElapsedTime() > 4) {
                            clock.start();
                            currentColumn = (currentColumn + 1) % totalColumns;
                          }
                        }                        
                    }
                }
                animateBoxes(boxes1, 1); 
                animateBoxes(boxes2, 2); 
                animateBoxes(boxes3, 3);             
            }
            controls.update(clock.getDelta());
            renderer.render(scene, camera);            
            }
            animateScene(); // Begin animation
        }
    };

    xhr.send(); 

      // calendar boxes
  for (let i = 0; i < 12; i++){  
    //let gCalendar = new THREE.BoxGeometry(1.5,1.5,40) 
    let gCalendar = new THREE.CylinderGeometry(20,20,1,64,64) 
    let mCalendar = new THREE.MeshPhysicalMaterial({
      //color:colorsArray2[i], 
      color: 0xffffff,
    })
    let calendar = new THREE.Mesh(gCalendar, mCalendar);
    scene.add(calendar);
    calendar.position.set(0,400,-840);
    let gCCalendar = new THREE.BoxGeometry(30,30,30)    
    const mCCalendar = new THREE.MeshPhysicalMaterial({
      color: 0xff2222,
      transparent: true,
      opacity: 0,       
    });
    let cCalendar = new THREE.Mesh(gCCalendar, mCCalendar);
    cCalendar.position.set(0,0,0);
    cCalendar.add(calendar);
    cCalendar.rotation.set(0,-i/1.91,0);
    scene.add(cCalendar);        
    cCalendar.castShadow = true;
    cCalendar.receiveShadow = true;
  }


};