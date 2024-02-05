import * as THREE from 'three';
import {OrbitControls} from './three_class/OrbitControls.js';
import { MapControls } from './three_class/MapControls.js';
import { GLTFLoader } from './three_class/GLTFLoader.js';
import { OBJLoader } from './three_class/OBJLoader.js';

export default function(choose,quadri){

  const clock = new THREE.Clock();
  window.resetCamera = resetCamera;

  // SCENE  
  const scene = new THREE.Scene();

  // CAMERA //////
  const camera = new THREE.PerspectiveCamera( 50 , window.innerWidth / window.innerHeight, 0.1, 4000 );

  let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
  
  camera.position.set( 200, 40, 200 );  /* 200, 40*/
  camera.rotation.set( 1, 0, 0 );
  camera.lookAt(new THREE.Vector3( 0, player.height, 0)); 
  /*camera.setFocalLength ( 70 );*/
  camera.setFocalLength ( 30 );

  // RENDERER
  const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});  

  // CONTROLS //////
  const controls = new OrbitControls( camera, renderer.domElement );  
  controls.listenToKeyEvents( window );
  controls.minDistance =  5;    
  controls.maxDistance = 1400;
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
    
  // RESIZE WINDOW //////
  window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height );
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  } );

  // SCENE & FOG //////
  scene.background = new THREE.Color(  0x5555ff );    
  //scene.fog = new THREE.Fog(0x00ffff, 1, 100);

  // LIGHTS //////
  //AMBIENT
  const ambient = new THREE.AmbientLight( 0xffeeee, 0.5 );  
  scene.add( ambient);

  //HEMISPHERE    
  const eLight = new THREE.HemisphereLight( 0xffffff, 0x555555, 0.5 );  
  //scene.add(eLight);

  //POINTS 
  const pLight = new THREE.PointLight( 0xaaaaff, 0.5, 5000 );
  //pLight.castShadow = true;
  pLight.position.set( 1020, 400, 1000);
  const pHelper = new THREE.PointLightHelper(pLight); 
  pLight.castShadow = true; 
  //Set up shadow properties for the light
  pLight.shadow.mapSize.width = 2048; // default
  pLight.shadow.mapSize.height = 2048; // default
  pLight.shadow.camera.near = 0.5; // default
  pLight.shadow.camera.far = 10; // default

  scene.add( pLight, /*pHelper*/ );

  // ANIMATE SCENE //////
  function animateScene(){
    requestAnimationFrame( animateScene );
    renderer.render( scene, camera );
  };

  animateScene();

  //TEXTURES
  const gLoader = new THREE.TextureLoader();
  const TextureQ2 = gLoader.load('images/textures/hearts/quadretti2.jpg');
  TextureQ2.wrapS = THREE.RepeatWrapping;
  TextureQ2.wrapT = THREE.RepeatWrapping;
  TextureQ2.repeat.set(1, 1); 

  const g2Loader = new THREE.TextureLoader();
  const TextureQ = gLoader.load('images/textures/hearts/quadretti_q.jpg');
  TextureQ.wrapS = THREE.RepeatWrapping;
  TextureQ.wrapT = THREE.RepeatWrapping;
  TextureQ.repeat.set(1, 1);

  const g3Loader = new THREE.TextureLoader();
  const TextureV = g3Loader.load('images/textures/hearts/quadretti3.jpg');
  TextureV.wrapS = THREE.RepeatWrapping;
  TextureV.wrapT = THREE.RepeatWrapping;
  TextureV.repeat.set(1,1);


  const g4Loader = new THREE.TextureLoader();
  const TextureB = g4Loader.load('images/textures/hearts/quadretti4.jpg');
  TextureB.wrapS = THREE.RepeatWrapping;
  TextureB.wrapT = THREE.RepeatWrapping;
  TextureB.repeat.set(1,1);

  const TextureB2 = g4Loader.load('images/textures/hearts/quadretti5.jpg');
  TextureB2.wrapS = THREE.RepeatWrapping;
  TextureB2.wrapT = THREE.RepeatWrapping;
  TextureB2.repeat.set(10,10);

  const g5Loader = new THREE.TextureLoader();
  const gardenTexture5 = g5Loader.load('images/textures/hearts/quadretti5.jpg');
  gardenTexture5.wrapS = THREE.RepeatWrapping;
  gardenTexture5.wrapT = THREE.RepeatWrapping;
  gardenTexture5.repeat.set(1,1);

  const g6Loader = new THREE.TextureLoader();
  const alphaCielo = g6Loader.load('images/textures/hearts/cieloalpha.jpg');
  alphaCielo.wrapS = THREE.RepeatWrapping;
  alphaCielo.wrapT = THREE.RepeatWrapping;
  alphaCielo.repeat.set( 1, 1 );

  // UV MAP //
  const uvLoader = new THREE.TextureLoader();
  const uvPaper = uvLoader.load('images/uvmap/paper.jpg');
  uvPaper.wrapS = THREE.RepeatWrapping;
  uvPaper.wrapT = THREE.RepeatWrapping;
  uvPaper.repeat.set(4, 4); 

  // VIDEO
  var video = document.createElement('video');
  video.src = "video/video_textures/water_loop.mp4";
  video.style.display = 'none'; 
  video.loop = true; 
  document.body.appendChild(video);  

  video.load();
  video.play();

  var vTexture = new THREE.VideoTexture(video);
  vTexture.minFilter = THREE.LinearFilter;
  vTexture.magFilter = THREE.LinearFilter;
  vTexture.format = THREE.RGBAFormat;
      
  // ROOM ////
  const gPavimento = new THREE.BoxGeometry(440, 40, 440);
  const mPavimento = new THREE.MeshPhysicalMaterial({
    map: TextureQ2,
    bumpMap: uvPaper,
    bumpScale: 0.3,
  })

  const gParete = new THREE.BoxGeometry(500, 40, 440);
  const gPareteF = new THREE.BoxGeometry(460, 40, 440);

  const pavimento = new THREE.Mesh(gPavimento, mPavimento);
  pavimento.position.set( 0, -20, 0 );  
  pavimento.receiveShadow = true; 

  const material2 = new THREE.MeshPhysicalMaterial({
    map: TextureQ2,
    bumpMap: uvPaper,
    bumpScale: 0.1,
  })

  const mPareteS = new THREE.MeshPhysicalMaterial({
    map: TextureQ2,
    bumpMap: uvPaper,
    bumpScale: 0.1,     
  })


  const pareteS = new THREE.Mesh(gPavimento, mPareteS)  
  pareteS.position.set(-230, 180, 0);  
  pareteS.rotation.set(Math.PI/2, 0, -Math.PI/2 ); 
  pareteS.scale.set(1,1,1);
  pareteS.castShadow = true;
  pareteS.receiveShadow = true;

  const pareteD = pareteS.clone();
  pareteD.position.set(230,180,0);
  pareteD.rotation.set(Math.PI/2, 0, Math.PI/2 );
  pareteD.castShadow = true;
  pareteD.receiveShadow = true;

  const pareteF = new THREE.Mesh(gPareteF, mPareteS );
  pareteF.position.set(-10,180,-240);  
  pareteF.rotation.set( Math.PI/2, 0, 0 ); 
  pareteF.castShadow = true;
  pareteF.receiveShadow = true;
  
  const room = new THREE.Group();
  room.add(pavimento,pareteS, /*pareteD,*/ pareteF);
  scene.add(room);
  room.scale.set( 1, 1, 1 );
  
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
          const material = new THREE.MeshPhysicalMaterial({           
            map: TextureQ2,
            bumpMap: uvPaper,
            bumpScale: 0.1,            
          });

          node.material = material;
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });

      scene.add(tree);
    
      // Clonazione dell'oggetto
      let treeC1 = tree.clone(true);
      treeC1.position.set(-60, 1, -60);
      treeC1.rotation.set(0, 0.2, 0.01);      
      treeC1.scale.set(0.8, 0.8, 0.8)

      let treeC2 = tree.clone(true);
      treeC2.position.set(95, 1, -40);
      treeC2.rotation.set(0, 0.4, 0.01);      
      
      let treeC3 = tree.clone(true);
      treeC3.position.set(160,30, 80);
      treeC3.rotation.set(0, 2, 0.01);      
      treeC3.scale.set(0.9, 0.9, 0.9);

      let treeC4 = tree.clone(true);
      treeC4.position.set(-110, 1, 120);
      treeC4.rotation.set(0, 1, 0.01);      
      treeC4.scale.set(0.9, 0.9, 0.9);

      /*let treeC5 = tree.clone(true);
      treeC5.position.set(-120, 280, -220);
      treeC5.rotation.set(0,Math.PI/2, Math.PI/2);      
      treeC5.scale.set(0.9, 0.9, 0.9);*/
      
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
    '3d/Tree/tree_02.glb',
    function (glt) {
      const tree2 = glt.scene;
      tree2.position.set( -150, 60, -165 );
      tree2.rotation.set(0, Math.PI/-2, 0 );      
      tree2.scale.set( 6, 6, 6 );
  
      tree2.traverse(function (node) {
        if (node.isMesh) {
          const material = new THREE.MeshPhysicalMaterial({
            map: TextureQ2,
            bumpMap: uvPaper,
            bumpScale: 0.1,             
          });
          node.material = material;
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
  
      scene.add(tree2);
      
      // Clonazione dell'oggetto
      let tree2C1 = tree2.clone(true);
      tree2C1.position.set( -90, 1, 40); 
      tree2C1.scale.set( 6, 6, 6 );  
      
      let tree2C2 = tree2.clone(true);
      tree2C2.position.set( 174, 108, -176);
      tree2C2.scale.set( 8, 8, 8  );

      let tree2C3 = tree2.clone(true);
      tree2C3.position.set(40, 1, 30);
      tree2C3.scale.set( 5, 5, 5  );

      let tree2C4 = tree2.clone(true);// frontale
      tree2C4.position.set( 25, 190, -166 );
      tree2C4.rotation.set( 0, Math.PI/2, Math.PI/2 );
      tree2C4.scale.set( 5, 5, 5  ); 
      
      let tree2C5 = tree2.clone(true);//  sinistra
      tree2C5.position.set( -210, 200, 0 );
      tree2C5.rotation.set( 0, Math.PI, Math.PI/2 );
      tree2C5.scale.set( 10, 10, 10  );

      let tree2C6 = tree2.clone(true);//  destra
      tree2C6.position.set( 210, 300, -50 );
      tree2C6.rotation.set( 0, Math.PI, -Math.PI/2 );
      tree2C6.scale.set( 10, 10, 10  );

      let tree2C7 = tree2.clone(true);// frontale
      tree2C7.position.set( -80, 280, -220 );
      tree2C7.rotation.set( 0, Math.PI/2, Math.PI/2 );
      tree2C7.scale.set( 10, 10, 10  );

      scene.add(tree2C1, tree2C2, tree2C3, tree2C4, tree2C5,tree2C6, tree2C7 );
  
    },
      
    undefined, // funzione di progresso opzionale da passare al caricatore
    function (error) {
      console.error(error);      
    }
 
  );

   // PARK
   const loaderPark = new GLTFLoader();

   loaderPark.load(    
     '3d/park.glb',
       function (glt) {
       const park = glt.scene;
       park.position.set( 32, 280, -220 );
       park.rotation.set(Math.PI/2, Math.PI, 0 );      
       park.scale.set( 1, 1, 1 );
     
       park.traverse(function (node) {
         if (node.isMesh) {
           const material = new THREE.MeshPhysicalMaterial({  
                        
             map: TextureQ2, 
             bumpMap: uvPaper,
             bumpScale: 0.1,        
           });
           node.material = material;
           node.castShadow = true;
           node.receiveShadow = true;
         }
       }); 
       
       let materialV = new THREE.MeshPhysicalMaterial({              
          map: TextureQ2, 
          bumpMap: uvPaper,
          bumpScale: 0.1,        
      });

      scene.add(park); 

      let park2 = park.clone();
      park2.position.set(100,0,-120);
      park2.rotation.set(0,0,0);
      scene.add(park2);

      let park3 = park.clone();
      park3.position.set(-214,280, 100);
      park3.rotation.set(0, 0, -Math.PI/2 );
      scene.add(park3);
     
    },
         
     undefined, // funzione di progresso opzionale da passare al caricatore
     function (error) {
       console.error(error);      
     }
    
   );

  // PARK2
  const loaderPark2 = new GLTFLoader();

  loaderPark2.load(    
    '3d/park2.glb',
      function (glt) {
      const park2 = glt.scene;
      park2.position.set( -100, 160, -220 );
      park2.rotation.set(Math.PI/2, Math.PI, 0 );      
      park2.scale.set( 1, 1, 1 );
    
      park2.traverse(function (node) {
        if (node.isMesh) {
          const material = new THREE.MeshPhysicalMaterial({  
                       
            map: TextureQ2, 
            bumpMap: uvPaper,
            bumpScale: 0.1,        
          });
          node.material = material;
          node.castShadow = true;
          node.receiveShadow = true;
        }
      }); 
      
      let materialV = new THREE.MeshPhysicalMaterial({              
         map: TextureQ2, 
         bumpMap: uvPaper,
         bumpScale: 0.1,        
     });

     scene.add(park2); 

     let park2B = park2.clone();
     park2B.position.set(-10,0,140);
     park2B.rotation.set(0,0,0);
     scene.add(park2B);

     let park3B = park2.clone();
     park3B.position.set(-210,280, 100);
     park3B.rotation.set(0, 0, -Math.PI/2 );
     //scene.add(park3B);
    
   },
        
    undefined, // funzione di progresso opzionale da passare al caricatore
    function (error) {
      console.error(error);      
    }
   
  );


  // BENCH
  const loaderBench = new GLTFLoader();

  loaderBench.load(    
    '3d/bench/bench.glb',
      function (glt) {
      const bench = glt.scene;
      bench.position.set( 47, 0.5, 50 );
      bench.rotation.set(0, Math.PI/-2, 0 );      
      bench.scale.set( 1, 1, 1 );
    
      bench.traverse(function (node) {
        if (node.isMesh) {
          const material = new THREE.MeshPhysicalMaterial({              
            map: TextureQ2, 
            bumpMap: uvPaper,
            bumpScale: 0.1,        
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
                
              map: TextureQ2,        
              bumpMap: uvPaper,
              bumpScale: 0.1, 
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

  // CONIGLIO
  const loaderRabbit = new OBJLoader();
  let rabbit;

  // LOAD A RESOURCE
  loaderRabbit.load('3d/rabbit/Rabbit.obj',
  function ( object ) {
      object.position.set( 180, 0.51, 130 );      
      object.rotation.set( 0, -Math.PI/2, 0 );      
      try{
      const matRabbit=new THREE.MeshPhysicalMaterial({
        color: 0xC1FF4D,
        roughness:0.0,
        metalness:0.5,                    
        })     
      
      object.children[0].material=matRabbit;
      }catch(e){
      console.log(e);
      }

      object.castShadow = true;
      rabbit=object;     
      console.log( 'body was loaded', rabbit );
      scene.add( rabbit );      
      rabbit.scale.set( 0.8, 0.8, 0.8);      
      
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
            color: 0x55ff55,
            map: TextureQ2, 
            bumpMap: uvPaper,
            bumpScale: 0.1,
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
      human2.position.set( -200, 60, -40 );
      human2.rotation.set(0, Math.PI/2, 0 );      
      human2.scale.set( 10, 10, 10 );        
      human2.traverse(function (node) {
        if (node.isMesh) {
          const material = new THREE.MeshPhysicalMaterial({
            color: 0xff2255,
            map: TextureQ2, 
            bumpMap: uvPaper,
            bumpScale: 0.1,
          });   
          node.material = material;
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });   
      scene.add(human2);        
      human2.castShadow = true; 
      human2.receiveShadow = true;       
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
            color: 0x5656ff,
            map: TextureQ2, 
            bumpMap: uvPaper,
            bumpScale: 0.1,
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
            color: 0x00ffff, 
            map: TextureQ2, 
            bumpMap: uvPaper,
            bumpScale: 0.1,
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
  
    // PIANETA     
    const gPlanet = new THREE.SphereGeometry ( 10, 32, 32 );
    const mPlanet = new THREE.MeshPhysicalMaterial({                    
      map: TextureQ2,
      color: 0xff1c00,      
      bumpMap: uvPaper,
      bumpScale: 0.3, 
      side: THREE.DoubleSide,      
    });

  const planet = new THREE.Mesh(gPlanet, mPlanet); 
  planet.position.set( -80, 800, 1800 );
  scene.add(planet);
    
  // LAGHETTO
  const gTorus = new THREE.TorusGeometry (30, 1.5, 32, 100);
  const mTorus = new THREE.MeshPhysicalMaterial({                
    map: TextureQ2,
    bumpMap: uvPaper,
    bumpScale: 0.1, 
  })

  const torus = new THREE.Mesh(gTorus, mTorus); 
  torus.scale.set(1,1,3); 
  torus.position.set( 0, 1.2, 0 );
  torus.rotation.set( Math.PI/2, 0, 0 );
  torus.castShadow = true;
  torus.receiveShadow = true; 

  const gCylinder = new THREE.CylinderGeometry(30, 30, 2, 32, 1 );  
  const mCylinder = new THREE.MeshPhysicalMaterial({    
    roughness: 0,
    metalness: 0,
    transparent: true,
    opacity: 0.4,   
    clearcot: 1,
    clearcoatRoughness: 0,      
    map: vTexture, 
    side: THREE.DoubleSide,
    displacementMap: vTexture,
    displacementScale: 1,
            
  })

  const water = new THREE.Mesh( gCylinder, mCylinder );  
  water.position.set( 0, 2.5, 0 );
  water.scale.set( 1, 0.05, 1 );
  water.rotation.set( 0, Math.PI/2, 0 );

  const gCylinder2 = new THREE.CylinderGeometry (30, 30, 0.2, 32, 1 );
  const mCylinder2 = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,    
    bumpMap: uvPaper,
    bumpScale: 0.1,
  })

  const basePool = new THREE.Mesh( gCylinder2, mPareteS ); 
  basePool.position.set( 0, 0.1, 0);
  basePool.rotation.set( 0, Math.PI/2, 0 );
  basePool.receiveShadow = true; 

  const pool = new THREE.Group();
  pool.add(torus, water, basePool);
  pool.position.set( 17, 1, 50);
  pool.scale.set (0.5,0.5,0.5);
  scene.add(pool);

  const pool2 = pool.clone();
  pool2.position.set( 210, 180, 80);    
  pool2.rotation.set( Math.PI/2, 0, Math.PI/2 ); 
   
  //scene.add(pool2);
  
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
            bumpMap: uvPaper,
            bumpScale: 0.1, 
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

  // GRUPPO EMOZIONI //////
  let emotionGroup = new THREE.Group();
  const emozioni=_.map(choose,(v,k)=>{

    const formeGeometriche = {
      'sfera': new THREE.SphereGeometry( 0.8, 25, 25 ),
      'piramide': new THREE.ConeGeometry( 1, 2, 4 ),      
      'cubo': new THREE.BoxGeometry( 1.2, 1.2, 1.2 ),
      'dodecaedro': new THREE.DodecahedronGeometry( 1, 0 ),
      'octaedro': new THREE.OctahedronGeometry( 1, 1 )
    };
 
    const nomiFormeGeometriche = ['dodecaedro','sfera', 'cubo','piramide'  ];
 
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
      console.log(`Checking group ${i}:`, gruppiColori[i]);
      console.log(`Current color:`, coloreCorrente);
      console.log(`Is color in group?`, gruppiColori[i].includes(coloreCorrente));
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
      metalness: 0,
      roughness: 0,
      //*metalness: 0,     
    }); 
     
    //  EMOTION 1
    const emotion1 = new THREE.Mesh( forma, emoMaterial);  
    emotion1.position.set(-7.1, 13.5, -0.3 );
    emotion1.rotation.set( 0, 0, 0);
    emotion1.scale.set( 1.6, 1.6, 1.6 ); 
    
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
      forma2 = formeGeometriche['octaedro'];
    }

    const emotion2 = new THREE.Mesh(forma2, newMat);  
    emotion2.position.set( -6.1, 12.5, -0.3 );
    emotion2.rotation.set( 0, 0, -Math.PI/3 );
    emotion2.scale.set( 1.4, 1.4, 1.4 );  
    
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
    emotion3.position.set( -7.7, 11.6, -0.3 );
    emotion3.rotation.set( 0, 0, Math.PI/1.5 );
    emotion3.scale.set( 1.2, 1.2, 1.2 );   
    
    emotion3.castShadow = true; 
    emotion3.receiveShadow = true; 
        
    const ret = emotionGroup.clone(true);
    ret.add(emotion1, emotion2, emotion3,/*centro*/);
    scene.add(ret);

    // CODICE PRECEDENTE PRIMA DI BING//
    ret.position.set( 2, k*1.1 + (0.2*Math.PI/Math.cos(k+8)), 0); //+ 2 aumeta distanza tra sfere
    ret.rotation.set( 0, k/3, 0 );
    ret.scale.set( 2.2, 2.2, 2.2 );

    // EMOZIONI CLONATE
    const ret2 = ret.clone();
    ret2.position.set( -60,k*1.1 + (0.2*Math.PI/Math.cos(k+8)), -55 ); //+ 2 aumeta distanza tra sfere
   
    
    scene.add(ret2); 

    const ret3 = ret.clone();
    ret3.position.set( 95, k*1.1 + (0.2*Math.PI/Math.cos(k+8)), -40 ); //+ 2 aumeta distanza tra sfere
        
    scene.add(ret3); 

    const ret4 = ret.clone();
    ret4.position.set( 160, 24+(k*1.1 + (0.2*Math.PI/Math.cos(k+8))), 80 ); //+ 2 aumeta distanza tra sfere
       
    scene.add(ret4);

    const ret5 = ret.clone();
    ret5.position.set( -110, k*1.1 + (0.2*Math.PI/Math.cos(k+8)), 120 ); //+ 2 aumeta distanza tra sfere
        
    scene.add(ret5);   

    // CLONE     
    const gcentro = new THREE.CylinderGeometry( 3, 3, 0.4, 25 );
    const mcentro = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      //roughness: 0,
      //metalness: 0,
      transparent: true,  
      opacity: 0,    
    });
 
    let centro = new THREE.Mesh(gcentro, mcentro);
    centro.position.set( 0, 0, 0 );
    centro.castShadow = true;
    centro.receiveShadow = true;

    const emotionC1 = emotion1.clone();  
    emotionC1.position.set( -25, 0.7, 1.4 ); 
    emotionC1.scale.set( 1, 1, 1 ); 

    const emotionC2 = emotion2.clone();   
    emotionC2.position.set( -25, 0.7, 0.6 );
    emotionC2.rotation.set( 0, 0, 0 );
    emotionC2.scale.set( 0.9, 0.9, 0.9 );

    const emotionC3 = emotion3.clone();
    emotionC3.position.set( -25, 0.7, 0 );
    emotionC3.rotation.set( 0, 0, 0 );
    emotionC3.scale.set( 0.8,0.8, 0.8);

  })

  let leyerGroup = new THREE.Group();
  const livelli=_.map(choose,(v,k)=>{ 

    //BOX //////
    const gBox = new THREE.BoxGeometry( 4, 4, 4 );
    const mBox = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(v[1]),
      transparent:true,
      opacity: 1,      
    });   
    
    // BOX 1
    const box1 = new THREE.Mesh ( gBox, mBox );     
    box1.position.set( 0, 10, 30 );
    box1.castShadow = true;
    box1.receiveShadow = true;

    //BOX 2
    let newmatBox = mBox.clone(); 
    newmatBox.color= 0X000000;
    newmatBox.color = new THREE.Color(v[2] ? v[2] : v[1]);
    const box2 = new THREE.Mesh (gBox, newmatBox);
    box2.castShadow = true;
    box2.receiveShadow = true;
    box2.position.set( 3, 11, 26 );

    //BOX 2
    newmatBox = mBox.clone(); 
    newmatBox.color = new THREE.Color(v[3] ? v[3] : v[1]);
    const box3 = new THREE.Mesh (gBox, newmatBox);
    box3.position.set( -2, 12, 22 );   
    box3.castShadow = true;
    box3.receiveShadow = true;

    leyerGroup.add( box1, box2, box3 );

    // CLONE 1
    const leyers = leyerGroup.clone(true);
    //scene.add(leyers);
    leyers.position.set( 170, 98, -(9.3*k) );
    leyers.rotation.set( 0, 1.6, 0 );
    leyers.scale.set( 1, 1, 1);

     // CLONE 3 
     const leyerSky2 = leyerGroup.clone(true);
     //scene.add(leyerSky2);
     leyerSky2.position.set( 4*k, 4*k, -4*k );
     leyerSky2.rotation.set( 0, 0, 0 );
     leyerSky2.scale.set( 1, 1, 1 );

    // CLONE 4 
    const leyerSky3 = leyerGroup.clone(true);
    scene.add(leyerSky3);
    leyerSky3.position.set( -200, +(6*k), -(6*k) );
    leyerSky3.rotation.set( 0, 0, 0 );
    leyerSky3.scale.set( 2, 0.5, 0.5);

  })

  const gElemento1 = new THREE.BoxGeometry( 10, 10, 10 );
  const elemento1 = new THREE.Mesh(gElemento1, material2);
  scene.add(elemento1); //sorregge albero destra
  elemento1.position.set( 160,10, 80 ); 
  elemento1.scale.set( 4, 4, 4);
  elemento1.castShadow = true;
  elemento1.receiveShadow = true;

  const elemento2 = elemento1.clone();
  elemento2.position.set( 180, 370, -195 );
  elemento2.scale.set( 8, 6, 3);
  scene.add(elemento2);
  elemento2.castShadow = true;
  elemento2.receiveShadow = true;

  const elemento3 = elemento1.clone();
  elemento3.position.set( -175, 10, -190 );
  elemento3.scale.set( 10, 10, 10);
  scene.add(elemento3);
  elemento3.castShadow = true;
  elemento3.receiveShadow = true;

  const elemento4 = elemento1.clone();
  elemento4.position.set( 185, 100, -190 );
  elemento4.scale.set( 5, 2, 4);
  scene.add(elemento4);
  elemento4.castShadow = true;
  elemento4.receiveShadow = true;

  const elemento5 = elemento1.clone();/* Porta*/
  elemento5.position.set( -199, 136, -104 );
  elemento5.scale.set( 1.8, 2.7, 0.1);
  scene.add(elemento5);
  elemento5.castShadow = true;
  elemento5.receiveShadow = true;

  const elemento6 = elemento1.clone();/* Porta*/
  elemento6.position.set( -190, 300, -180 );
  elemento6.scale.set( 6, 6, 6);
  scene.add(elemento6);
  elemento6.castShadow = true;
  elemento6.receiveShadow = true;

  const gPalla1 = new THREE.SphereGeometry( 10, 64, 64 );
  const palla1 = new THREE.Mesh(gPalla1, material2 )
  palla1.position.set( -20, 10, -110 )
  palla1.castShadow = true;
  palla1.receiveShadow = true;
  scene.add(palla1); 

  const palla2 = palla1.clone();
  palla2.position.set( -210, 140, 90 );
  palla2.scale.set(4,4,4);
  palla2.castShadow = true;
  palla2.receiveShadow = true;
  scene.add(palla2);

  
  const palla3 = new THREE.Mesh(gPalla1, material2);
  /*palla1.clone();/* CENTRALE PARETE */
  
  palla3.position.set( 0, 180, -210 );
  palla3.scale.set( 5, 5, 5);
  palla3.castShadow = true;
  palla3.receiveShadow = true;
  scene.add(palla3);

  const gPiramid = new THREE.ConeGeometry( 5, 10, 4 );
  const piramid = new THREE.Mesh(gPiramid, material2);
  scene.add(piramid); 
  piramid.position.set( 90, 0, -140 ); 
  piramid.scale.set( 5, 5, 5);
  piramid.castShadow = true;
  piramid.receiveShadow = true;

  const piramid2 = piramid.clone();
  scene.add(piramid2); 
  piramid2.position.set( 140, 220, -200 ); 
  piramid2.scale.set( 8, 4, 8);
  piramid2.rotation.set(Math.PI/2, Math.PI/4, 0);
  piramid2.castShadow = true;
  piramid2.receiveShadow = true;

  const piramid3 = piramid.clone();
  scene.add(piramid3); 
  piramid3.position.set( -160, 30, 140 ); 
  piramid3.scale.set( 6, 6, 6);
  piramid3.rotation.set(0, 0, 0);
  piramid3.castShadow = true;
  piramid3.receiveShadow = true;  

  const gDodeca = new THREE.DodecahedronGeometry(50,0);
  const dodeca = new THREE.Mesh(gDodeca, material2);
  dodeca.position.set( -190 , 340, -10 );
  dodeca.castShadow = true;
  dodeca.receiveShadow = true;
  scene.add(dodeca);

  const dodeca2 = dodeca.clone();
  scene.add(dodeca2);
  dodeca2.position.set(-40,0,140);
  dodeca2.scale.set(0.25,0.25,0.25);
  

  const dodeca3 = dodeca.clone();
  scene.add(dodeca3);
  dodeca3.position.set( 140,1,160);
  dodeca3.scale.set(0.4,0.4,0.4);
  

  // CIELO
  const gCielo = new THREE.SphereGeometry(800, 32, 32);
  const mCielo = new THREE.MeshPhysicalMaterial({
    map: TextureQ2,
    bumpMap: uvPaper,
    bumpScale: 0.1,  
    side: THREE.DoubleSide, 
    alphaMap: alphaCielo,
    transparent: true,
  })
  const cielo = new THREE.Mesh(gCielo, mCielo);
  cielo.rotation.set(0,1.4,0);
  scene.add(cielo);

  const gCielo2 = new THREE.SphereGeometry(1800, 32, 32);
  const mCielo2 = new THREE.MeshPhysicalMaterial({
    map: TextureB2,
    bumpMap: uvPaper,
    bumpScale: 0.1,  
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
  audioLoader.load('audio/hearts/gardenbcg2.mp3', function( buffer ) {
    backgroundSound.setBuffer( buffer );
    backgroundSound.setLoop( true );
    backgroundSound.setVolume( 10 );
    backgroundSound.play();
  });
    
};