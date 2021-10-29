import { Scene, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh, WebGLRenderer } from 'three';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const geometry = new BoxGeometry();
const materal = new MeshBasicMaterial({ color: 0x00ff00 });
const cube = new Mesh(geometry, materal);

let renderer: WebGLRenderer;
scene.add(cube);
camera.position.z = 5;

const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
};

const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

export const createScene = (el) => {
    renderer = new WebGLRenderer({ antialias: true, canvas: el });
    resize();
    animate();
};

window.addEventListener('resize', resize);