import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import vertexShader from './shaders/vertex.glsl?raw'
import fragmentShader from './shaders/fragment.glsl?raw'

const canvas = document.querySelector<HTMLCanvasElement>('#webgl')!

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x0a0a12)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 3)

// Plane 
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: { value: 0 },
  },
})
const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 3, 256, 1), material)
scene.add(plane)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
})

const timer = new THREE.Timer()

renderer.setAnimationLoop((timestamp) => {
  timer.update(timestamp)
  material.uniforms.uTime.value = timer.getElapsed()

  controls.update()
  renderer.render(scene, camera)
})
