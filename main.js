import './style.css';
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

//scene
const scene  = new THREE.Scene()

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);


//renderer
const renderer =  new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera)


//creating the geometry (the shape)
const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({
  color:'#CC7722',
  // wireframe:true
});
const torus = new THREE.Mesh( geometry,material )
scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(25,5,5)

const ambientLight= new THREE.AmbientLight(0xffffff)
scene.add(pointLight,ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)
// scene.add(lightHelper,gridHelper)

//controls
const controls = new OrbitControls(camera, renderer.domElement)


function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({
    color:0xffffff
  });
  const star = new THREE.Mesh( geometry,material )

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)


//background image
const spaceBg = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceBg



//avatar
const myPic = new THREE.TextureLoader().load('abhishek.jpg')
const abhi = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:myPic})
);
scene.add(abhi)

//moon
const moonBg = new THREE.TextureLoader().load('moon.jpg')
const normalBg = new THREE.TextureLoader().load('normal.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(4,32,32),
  new THREE.MeshBasicMaterial({    
    map:moonBg,
    normalMap:normalBg
  })

)

scene.add(moon)
moon.position.z = 30
moon.position.setX(-10)

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;
 
  abhi.rotation.y  += 0.01;
  abhi.rotation.z  += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera


//Resize (responsiveness)
// window.addEventListener("resize",() => {
  //update size
  // sizes.width = window.innerWidth,
  // sizes.height = window.innerHeight

  //update camera
//   camera.aspect = sizes.width / sizes.height;
//   camera.updateProjectionMatrix();
//   renderer.setSize(sizes.width, sizes.height);
// })


//animate 
function animate(){
  requestAnimationFrame( animate );
  torus.rotation.x += 0.01;
  torus.rotation.y +=  +0.005;
  torus.rotation.z += +0.01;
  renderer.render(scene,camera)
}

animate()