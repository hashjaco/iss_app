// eslint-disable-next-line no-unused-vars
import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./index.css";

class Scene extends React.Component {
  constructor(props) {
    super(props);

    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.addSphere = this.addSphere.bind(this);
    this.initializeCamera = this.initializeCamera.bind(this);
    this.initializeOrbits = this.initializeOrbits.bind(this);

    this.onWindowResize = this.onWindowResize.bind(this);
  }

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const VIEW_ANGLE = 45;
    const ASPECT = width / height;
    const NEAR = 0.1;
    const FAR = 10000;

    /* Initialize scene and camera */
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x000 );
    this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.addEventListener( 'change', this.renderScene ); // use if there is no animation loop
    // this.controls.minDistance = 2;
    // this.controls.maxDistance = 10
    // this.controls.target.set( 0, 0, - 0.2 );
    this.controls.update();

    this.renderer.setClearColor("#000000");
    this.renderer.setSize(width, height);

    this.mount.appendChild(this.renderer.domElement);
    this.initializeOrbits();
    this.initializeCamera();

    this.earth = this.addSphere()
    window.addEventListener("resize", this.onWindowResize, false);

    this.animate()
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  addSphere = () => {
    const geometry = new THREE.SphereGeometry(10, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0xFF00FF });

    // TODO: Experiment with custom mesh after basic test
    const texture = new THREE.TextureLoader().load('land_ocean_ice_cloud_2048.jpg')
    const wrapper = new THREE.MeshBasicMaterial({ map: texture })

    const sphere = new THREE.Mesh(geometry, wrapper);
    this.scene.add(sphere);
    return sphere;
  };

  addGlobe = () => {
    let loader = new GLTFLoader();
    // Load a glTF resource
    loader.load(
        // resource URL
        'earth.glb',
        // called when the resource is loaded
        function ( gltf ) {

          this.scene.add( gltf.scene );
        },
        // called while loading is progressing
        function ( xhr ) {

          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },
        // called when loading has errors
        function ( error ) {

          console.log( 'An error happened' );

        }
    );
  };


    // const globe = new THREE.Group();
    //
    // const RADIUS = 200;
    // const SEGMENTS = 50;
    // const RINGS = 50;
    //
    // let loader = new THREE.TextureLoader();
    //
    // loader.load( 'land_ocean_ice_cloud_2048.jpg', function ( texture ) {
    //
    //   // Create the sphere
    //   let sphere = new THREE.SphereGeometry( RADIUS, SEGMENTS, RINGS );
    //   // Map the texture to the material.
    //   let material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
    //   // Create a new mesh with sphere geometry.
    //   let mesh = new THREE.Mesh( sphere, material );
    //
    //   // Add mesh to globe
    //   globe.add(mesh);
    // } );
    //
    // this.scene.add(globe);
    //
    // globe.position.z = -300;
    // return globe;

  addLights = () => {
    const pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 400;

    this.scene.add(pointLight);
  }


  initializeOrbits = () => {
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
  };

  initializeCamera = () => {
    this.scene.add(this.camera)
    this.camera.position.set(0, 0, 40);
  };

  // Stop scene animation
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  // animation behaviors
  animate = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
    this.renderScene()
    this.earth.rotation.x += 0.01
    this.earth.rotation.y += 0.01
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);

  }

  onWindowResize = () => {
    this.camera.aspect = this.mount.clientWidth / this.mount.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight * .8);
  }

  render() {
    return (
      <div
        id="scene"
        style={{ width: "100vw", height: "80vh" }}
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default Scene;
