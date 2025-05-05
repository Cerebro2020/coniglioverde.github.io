import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';

const boxSpacingX = 0.042;
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

export default function(){ 
  const clock = new THREE.Clock(); 
  window.resetCamera = resetCamera;
  const scene = new THREE.Scene();
  const gridHelper = new THREE.GridHelper( 2000, 100 );
  //scene.add(gridHelper);
  scene.background = new THREE.Color(  0x000000 );
  scene.fog = new THREE.Fog( 0x000000, 4000, 5000 ); 
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
  camera.position.set( 0, 3900, 0 );
  camera.lookAt(new THREE.Vector3( 0, player.height, 0));
  camera.setFocalLength ( 35 );
  let initialCameraPosition = new THREE.Vector3();
  initialCameraPosition.copy(camera.position);
  function resetCamera() {
    camera.position.copy(initialCameraPosition);  
  } 
  const controls = new OrbitControls( camera, renderer.domElement );  
  controls.listenToKeyEvents( window );
  controls.minDistance =  0.1;    
  controls.maxDistance = 3900;
  //controls.maxPolarAngle = 1.5;
  const ambiente = new THREE.AmbientLight ( 0xffffff, 1.5 );
  const pointL = new THREE.PointLight(0xffffff, 1, 2000);
  pointL.position.set(0, 5 ,0);
  let pointL2 = new THREE.PointLight(0xffffff, 2, 1600);
  pointL2.position.set(0,1200,0);
  scene.add( ambiente, /*pointL, pointL2*/);
  // XHR
 
  const xhr = new XMLHttpRequest();
  xhr.open('GET', './texts/aqvam.csv', true);
  xhr.onload = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let rows = xhr.responseText.split('\n');
      let allCsvData = rows.slice(1).map(row => row.split(',').map(Number));
      let boxes1 = [];
      let boxes2 = [];
      let boxes3 = [];
      let gLuna = new THREE.SphereGeometry(20, 64, 64);
      let mLuna = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
      });
      const mTrans = new THREE.MeshPhysicalMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0,
      });
      let luna = new THREE.Mesh(gLuna, mLuna);
      luna.position.set(0, 400, -700);
      luna.castShadow = true;
      luna.receiveShadow = true;
      let gCentro = new THREE.SphereGeometry(0.1, 8, 8);
      let centro = new THREE.Mesh(gCentro, mTrans);
      centro.add(luna);
      centro.rotation.set(0, 0, 0);
      scene.add(centro);
  
      let currentColumn = 0;
      let totalColumns = Math.floor(allCsvData[0].length / 3); // Numero totale di colonne da considerare (1 ogni 3)
      let rotationPerColumn = -2 * Math.PI / totalColumns; // Rotazione per ogni colonna
      let currentRotation = 0;
      let targetRotation = rotationPerColumn;
  
      function animateScene() {
        requestAnimationFrame(animateScene);
        if (allCsvData.length > 0) {
          if (!isPaused && allCsvData.length > 0) {
            function animateBoxes(boxesArray, startColumnIndex) {
              for (let i = 0; i < allCsvData.length; i++) {
                let targetY = allCsvData[i][startColumnIndex + currentColumn * 3];
                // Aggiustiamo la logica per calcolare targetY come nel tuo esempio
                if (targetY <= 9) {
                  targetY *= 10;
                } else if (targetY <= 99) {
                  targetY += 100;
                } else if (targetY <= 999) {
                  targetY /= 10;
                  targetY += 200;
                } else if (targetY <= 9999) {
                  targetY /= 100;
                  targetY += 300;
                } else if (targetY <= 99999) {
                  targetY /= 1000;
                  targetY += 400;
                } else if (targetY <= 99999999) {
                  targetY /= 10000;
                  targetY += 500;
                }
  
                if (!isPaused) {
                  let lerpFactor = 0.125 / 2;
                  let lerpFactor2 = 0.00008;
                  let currentY = boxesArray[i].position.y;
                  let prevY = allCsvData[i][startColumnIndex + (currentColumn - 1 + totalColumns) % totalColumns * 3];
  
                  boxesArray[i].position.y = THREE.MathUtils.lerp(currentY, targetY, lerpFactor);
                  const targetRY = i * boxSpacingX;
                  const currentRY = boxesArray[i].rotation.y;
                  boxesArray[i].rotation.y = THREE.MathUtils.lerp(-currentRY, -targetRY, 1);
                  let scaleFactor = 0.6;
                  let boxTrans = boxesArray[i];
                  let box = boxTrans.children[0];
                  if (box) {
                    box.position.z = -302.5 - (boxTrans.position.y * scaleFactor);
                  }
  
                  if (currentY > prevY) {
                    box.rotation.x = THREE.MathUtils.lerp(box.rotation.x, 0.95, lerpFactor);
                  } else if (currentY < prevY) {
                    box.rotation.x = THREE.MathUtils.lerp(box.rotation.x, -2, lerpFactor);
                  } else {
                    box.rotation.x = THREE.MathUtils.lerp(box.rotation.x, Math.PI / 2, lerpFactor);
                  }
  
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
      }
  
      function jumpToNextColumn() {
        if (!isPaused) {
          currentColumn = (currentColumn + 1) % totalColumns;
          updateBoxesToCurrentColumn();
          updateCenterRotation();
        }
      }
  
      function goToPreviousColumn() {
        if (!isPaused) {
          currentColumn = (currentColumn - 1 + totalColumns) % totalColumns;
          updateBoxesToCurrentColumn();
          updateCenterRotation();
        }
      }
  
      function updateBoxesToCurrentColumn() {
        animateBoxes(boxes1, 1);
        animateBoxes(boxes2, 2);
        animateBoxes(boxes3, 3);
      }
  
      function updateCenterRotation() {
        targetRotation = rotationPerColumn * currentColumn;
        centro.rotation.y = targetRotation;
      }
  
      document.getElementById('btn-pause').addEventListener('click', function() {
        document.getElementById('submenu').style.display = 'block';
        document.getElementById('jump-controls').style.display = 'block';
        isPaused = true;
        updateBoxesToCurrentColumn(); // Aggiorniamo le scatole alla colonna corrente quando si va in pausa
      });
  
      document.getElementById('btn-play').addEventListener('click', function() {
        document.getElementById('submenu').style.display = 'none';
        document.getElementById('jump-controls').style.display = 'none';
        isPaused = false;
      });
  
      document.getElementById('btn-jump-to-column').addEventListener('click', function() {
        if (isPaused) {
          jumpToNextColumn();
        }
      });
  
      document.getElementById('btn-previous-column').addEventListener('click', function() {
        if (isPaused) {
          goToPreviousColumn();
        }
      });
  
      animateScene(); // Avvia l'animazione
    }
  };
  xhr.send();
  
  // TORUS //
  // colore
  let colorTorus = new THREE.Color('#C2028F');

  const torusMat = new THREE.MeshPhysicalMaterial({
    color: colorTorus,   
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
  torusU.position.set(0,-490, 0);
  torusD.position.set(0,-390, 0);
  torusC.position.set(0,-290, 0);
  torusM.position.set(0,-190, 0);  
  torusDM.position.set(0,-90, 0);
  torusCM.position.set(0, 10, 0);
  torusMM.position.set(0, 100, 0);    
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
  scene.add(misuratore);
  misuratore.position.set(0,300,0);
  const btnQuantity = document.getElementById('btn-quantity');
    btnQuantity.addEventListener('click', () => {
    misuratore.visible = !misuratore.visible;       
  });
  const colorsArray2 = [
    "#AD0D28", colorTorus, colorTorus,  
    colorTorus, colorTorus, colorTorus,  
    colorTorus, colorTorus, colorTorus, 
    colorTorus, colorTorus, colorTorus 
  ];  
  for (let i = 0; i < 60; i++){
    const torus2Mat = new THREE.MeshPhysicalMaterial({
      color: 0xB020C6,  
      roughness: 0,
      metalness: 0.5,  
    });
    const torus2G = new THREE.TorusGeometry( 300,0.25, 128, 128 );
    const torus2 = new THREE.Mesh(torus2G, torus2Mat);
    torus2.position.set(0,-189.5+(i*10),0);
    torus2.rotation.set( Math.PI/2, 0, 0 );
    let scaleTorus2 = 1.02 + i/50;
    torus2.scale.set(scaleTorus2, scaleTorus2,1);
    scene.add(torus2); 
    torus2.visible = !torus2.visible; 
    const btnCount = document.getElementById('btn-count');
    btnCount.addEventListener('click', () => {
      torus2.visible = !torus2.visible;     
    });
  }
  // calendar boxes
  for (let i = 0; i < 12; i++){  
    //let gCalendar = new THREE.BoxGeometry(1.5,1.5,40) 
    let gCalendar = new THREE.CylinderGeometry(30,30,1,64,64) 
    let mCalendar = new THREE.MeshPhysicalMaterial({
      color:colorsArray2[i], 
      // color: 0xffffff,
    })
    let calendar = new THREE.Mesh(gCalendar, mCalendar);
    scene.add(calendar);
    calendar.position.set(0,400,-700);
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
  const btnCameraC = document.getElementById('btn-cameraC');
  btnCameraC.addEventListener('click', () => {
    camera.position.set( 0, 500, 0 );
  });
  const btnCameraH = document.getElementById('btn-cameraH');
  btnCameraH.addEventListener('click', () => {
    camera.position.set( 0, 3900, 0 );          
  });
  const btnPause = document.getElementById('btn-pause');
  btnPause.addEventListener('click', () => {
    isPaused = true;
  });
  const btnPlay = document.getElementById('btn-play');
  btnPlay.addEventListener('click', () => {
    isPaused = false;    
  });  
};