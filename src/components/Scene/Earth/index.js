import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Earth = () => {
  const loader = new GLTFLoader();

  let earth = loader.load("src/assets/earth.glb", (gltf) => {
    return gltf.scene;
  });

  return earth;
};

export default Earth;
