"use client";
import React, { useState, useRef, useEffect } from "react";
import { ModelProps } from "./types";

export default function VaseModel({ customImage }: ModelProps) {
  const groupRef = useRef<any>();
  const modelRef = useRef<any>();
  const [mounted, setMounted] = useState(false);
  const [scene, setScene] = useState<any>(null);
  const [THREE, setTHREE] = useState<any>(null);

  // Load Three.js and GLTF model
  useEffect(() => {
    const loadThreeAndModel = async () => {
      if (typeof window === "undefined") return;

      try {
        // Dynamic import of Three.js
        const ThreeModule = await import("three");
        setTHREE(ThreeModule);

        // Dynamic import of GLTF loader
        const { GLTFLoader } = await import(
          "three/examples/jsm/loaders/GLTFLoader.js"
        );

        const loader = new GLTFLoader();

        loader.load(
          "/ceramics/scene.gltf",
          (gltf) => {
            const loadedScene = gltf.scene;

            if (loadedScene && ThreeModule) {
              // First, get the bounding box of the original model
              const originalBox = new ThreeModule.Box3().setFromObject(
                loadedScene
              );
              const originalCenter = originalBox.getCenter(
                new ThreeModule.Vector3()
              );
              const originalSize = originalBox.getSize(
                new ThreeModule.Vector3()
              );

              // Calculate appropriate scale - make it smaller for better camera distance
              const maxDimension = Math.max(
                originalSize.x,
                originalSize.y,
                originalSize.z
              );
              let scale = 0.8; // Much smaller default scale

              if (maxDimension < 0.1) {
                scale = 8.0;
              } else if (maxDimension > 10) {
                scale = 0.1;
              } else if (maxDimension > 5) {
                scale = 0.4;
              } else if (maxDimension > 2) {
                scale = 0.6;
              }

              // Apply scale first
              loadedScene.scale.set(scale, scale, scale);

              // After scaling, recalculate the bounding box
              const scaledBox = new ThreeModule.Box3().setFromObject(
                loadedScene
              );
              const scaledCenter = scaledBox.getCenter(
                new ThreeModule.Vector3()
              );
              const scaledSize = scaledBox.getSize(new ThreeModule.Vector3());

              // Center the model at origin (0,0,0) for proper rotation around OrbitControls target
              loadedScene.position.set(
                -scaledCenter.x,
                -scaledCenter.y + scaledSize.y / 2,
                -scaledCenter.z
              );

              // Ensure all meshes are properly configured
              loadedScene.traverse((node: any) => {
                if (node.isMesh) {
                  node.visible = true;
                  node.castShadow = true;
                  node.receiveShadow = true;

                  if (node.material) {
                    node.material.needsUpdate = true;
                    node.material.side = ThreeModule.DoubleSide;
                  }
                }
              });

              setScene(loadedScene);
            }
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            // Fallback to a simple cylinder if model fails to load
            if (ThreeModule) {
              const fallbackGeometry = new ThreeModule.CylinderGeometry(
                0.6,
                0.8,
                2,
                32
              );
              const fallbackMaterial = new ThreeModule.MeshStandardMaterial({
                color: 0xcccccc,
                roughness: 0.1,
                metalness: 0.05,
              });
              const fallbackMesh = new ThreeModule.Mesh(
                fallbackGeometry,
                fallbackMaterial
              );
              fallbackMesh.position.set(0, 1, 0); // Position above ground
              fallbackMesh.castShadow = true;
              fallbackMesh.receiveShadow = true;

              const fallbackGroup = new ThreeModule.Group();
              fallbackGroup.add(fallbackMesh);
              setScene(fallbackGroup);
            }
          }
        );
      } catch (error) {
        console.error("Error loading Three.js or GLTF:", error);
      }
    };

    setMounted(true);
    loadThreeAndModel();
  }, []);

  // Apply custom image texture
  useEffect(() => {
    if (!customImage || !scene || !THREE) return;

    const texture = new THREE.TextureLoader().load(
      customImage,
      (loadedTexture: any) => {
        // Calculate proper scaling based on image dimensions
        const imageAspect =
          loadedTexture.image.width / loadedTexture.image.height;

        // Get model dimensions for proper UV mapping
        const modelBoundingBox = new THREE.Box3().setFromObject(scene);
        const modelSize = modelBoundingBox.getSize(new THREE.Vector3());

        // Calculate optimal texture repeat values
        const circumference = Math.max(modelSize.x, modelSize.z) * Math.PI;
        const height = modelSize.y;
        const modelAspect = circumference / height;

        // Adjust repeats to keep image properly proportioned
        const baseScale = 0.8;
        if (imageAspect > modelAspect) {
          texture.repeat.set(
            baseScale,
            baseScale * (imageAspect / modelAspect)
          );
        } else {
          texture.repeat.set(
            baseScale * (modelAspect / imageAspect),
            baseScale
          );
        }

        texture.needsUpdate = true;
      }
    );

    texture.flipY = false;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    // Get model dimensions for shader
    const modelBoundingBox = new THREE.Box3().setFromObject(scene);
    const modelSize = modelBoundingBox.getSize(new THREE.Vector3());
    const modelCenter = modelBoundingBox.getCenter(new THREE.Vector3());

    // Create enhanced shader material for better texture mapping
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureMap: { value: texture },
        modelCenter: { value: modelCenter },
        modelSize: {
          value: new THREE.Vector3(modelSize.x, modelSize.y, modelSize.z),
        },
        baseColor: { value: new THREE.Color(0xffffff) },
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        varying vec3 vWorldNormal;
        varying vec3 vViewPosition;
        
        void main() {
          vUv = uv;
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          vWorldNormal = normalize(mat3(modelMatrix) * normal);
          vViewPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D textureMap;
        uniform vec3 modelCenter;
        uniform vec3 modelSize;
        uniform vec3 baseColor;
        uniform float time;
        
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        varying vec3 vWorldNormal;
        varying vec3 vViewPosition;
        
        void main() {
          // Improved cylindrical UV mapping
          vec3 localPos = vWorldPosition - modelCenter;
          float angle = atan(localPos.x, localPos.z);
          float u = (angle + 3.14159) / (2.0 * 3.14159);
          float v = (localPos.y + modelSize.y / 2.0) / modelSize.y;
          
          // Smooth the texture mapping
          u = fract(u + v * 0.02);
          v = clamp(v, 0.0, 1.0);
          
          vec4 textureColor = texture2D(textureMap, vec2(u, v));
          
          // Enhanced lighting with multiple sources
          vec3 lightDir1 = normalize(vec3(1.0, 2.0, 1.0));
          vec3 lightDir2 = normalize(vec3(-0.5, 1.0, 0.5));
          
          float NdotL1 = max(0.5, dot(vWorldNormal, lightDir1));
          float NdotL2 = max(0.3, dot(vWorldNormal, lightDir2));
          float lightIntensity = NdotL1 + NdotL2 * 0.4;
          
          // Add ceramic shine
          vec3 viewDir = normalize(-vViewPosition);
          vec3 reflectDir = reflect(-lightDir1, vWorldNormal);
          float specular = pow(max(0.0, dot(viewDir, reflectDir)), 16.0) * 0.3;
          
          vec3 finalColor = textureColor.rgb * lightIntensity + specular;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });

    // Apply shader material to all meshes
    scene.traverse((node: any) => {
      if (node.isMesh) {
        if (!node.userData.originalMaterial) {
          node.userData.originalMaterial = node.material.clone();
        }
        node.material = shaderMaterial;
      }
    });
  }, [customImage, scene, THREE]);

  if (!mounted || !scene) {
    return (
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 2, 32]} />
        <meshStandardMaterial
          color="#cccccc"
          roughness={0.1}
          metalness={0.05}
        />
      </mesh>
    );
  }

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group ref={modelRef} position={[0, 0, 0]}>
        <primitive object={scene} castShadow receiveShadow />
      </group>
    </group>
  );
}
