import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';

//create a scene
const scene = new THREE.Scene();

//initializae camera
//fov, aspect ratio, view limits(0.1-1000 is everything)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);


const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);


const geometry = new THREE.TorusGeometry(10,3 , 16, 100);
const material = new THREE.MeshStandardMaterial({
    color: 0xFF00FF
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//color and intensity of ambient light (acts like a floodlight illuminating everything)
const lighting = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(lighting);



//grid to visualize 3d aspects more easily
const gridHelper = new THREE.GridHelper(200,50);
scene.add(gridHelper);



//add in mouse orbit controls to investigate the scene
const controls = new OrbitControls(camera, renderer.domElement);

//generates a white sphere in a random location
function addStars(){
    const geometry = new THREE.SphereGeometry(0.25,24,24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry, material);

    //fill 3 array with a mapping of 3 random floats with magnitude 100 or less
    const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));
    star.position.set(x,y,z);
    scene.add(star);

}

//this will call addstar 200 times
Array(200).fill().forEach(addStars);


//let's load in a space texture
const spaceTexture = new THREE.TextureLoader().load('static/greenNebStars.jpg');
scene.background = spaceTexture;


//texture mapping examples



//map an image to a box
//const myface = new THREE.TextureLoader().load('myface.png');
//const moi = new THREE.Mesh(
//    new THREE.BoxGeometry(3,3,3),
//    new THREE.MeshBasicMaterial( {map: myface})
//); 
//scene.add(moi);


//give 3D illusion with a "normalmap"
//const moonTexture = new THREE.TextureLoader().load('moon.jpg');

//const moon = new THREE.Mesh(
//    new THREE.SphereGeometry(3,32,32),
//    new THREE.MeshStandardMaterial({
//        map: moonTexture,
//        normalMap: normalTexture
//    })
//);

//scene.add(moon);


function moveCamera(){

    const t = document.body.getBoundingClientRect().top;

    camera.position.z = t*0.01
    camera.position.x = Math.cos(0.001*t)*30
    camera.position.y = Math.sin(0.001*t)*50
}

document.body.onscroll = moveCamera







//function to rerender the animation every time page is repainted 
function animate(){
    //UPON REPAINTING RUN THIS FUNCTION
    window.requestAnimationFrame(animate);

    //update scaling if user resizes the browser window
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();

    //keep that torus alive
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    torus.rotation.z += 0.01;

    //orbit controls positional update
    controls.update();

    //rerender the scene upon completion
    renderer.render(scene, camera);
}

animate()


