"use client";
import React, { useState, useRef, useEffect } from "react";
import { ModelProps } from "./types";

export default function MugModel({ customImage }: ModelProps) {
  const groupRef = useRef<any>();
  const mugBodyRef = useRef<any>();
  const mugInteriorRef = useRef<any>();
  const handleRef = useRef<any>();
  const [mounted, setMounted] = useState(false);
  const [THREE, setTHREE] = useState<any>(null);

  useEffect(() => {
    const loadThree = async () => {
      if (typeof window === "undefined") return;

      try {
        const ThreeModule = await import("three");
        setTHREE(ThreeModule);
        setMounted(true);
      } catch (error) {
        console.error("Error loading Three.js:", error);
      }
    };

    loadThree();
  }, []);

  // Apply custom image texture
  useEffect(() => {
    if (!customImage || !mugBodyRef.current || !THREE) return;

    const texture = new THREE.TextureLoader().load(
      customImage,
      (loadedTexture: any) => {
        const imageAspect =
          loadedTexture.image.width / loadedTexture.image.height;

        // Calculate proper wrapping for mug circumference
        const circumference = 2 * Math.PI * 1.3; // average radius
        const height = 3.0;
        const mugAspect = circumference / height;

        // Adjust texture scaling
        const scale = 0.9;
        if (imageAspect > mugAspect) {
          texture.repeat.set(scale, scale * (imageAspect / mugAspect));
        } else {
          texture.repeat.set(scale * (mugAspect / imageAspect), scale);
        }

        texture.offset.set(0, 0.1); // Slight vertical offset
        texture.needsUpdate = true;
      }
    );

    texture.flipY = false;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    // Enhanced shader for realistic ceramic look
    const mugMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureMap: { value: texture },
        baseColor: { value: new THREE.Color(0xffffff) },
        glossiness: { value: 0.3 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldNormal;
        varying vec3 vWorldPosition;
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
        uniform vec3 baseColor;
        uniform float glossiness;
        
        varying vec2 vUv;
        varying vec3 vWorldNormal;
        varying vec3 vWorldPosition;
        varying vec3 vViewPosition;
        
        void main() {
          // Cylindrical UV mapping for better wrapping
          float angle = atan(vWorldPosition.x, vWorldPosition.z);
          float u = (angle + 3.14159) / (2.0 * 3.14159);
          float v = (vWorldPosition.y + 1.5) / 3.0;
          
          vec2 mappedUV = vec2(u, v);
          vec4 textureColor = texture2D(textureMap, mappedUV);
          
          // Enhanced lighting with multiple light sources
          vec3 lightDir1 = normalize(vec3(1.0, 2.0, 1.0));
          vec3 lightDir2 = normalize(vec3(-0.5, 1.0, 0.5));
          
          float NdotL1 = max(0.4, dot(vWorldNormal, lightDir1));
          float NdotL2 = max(0.2, dot(vWorldNormal, lightDir2));
          float lightIntensity = NdotL1 + NdotL2 * 0.5;
          
          // Ceramic glossy reflection
          vec3 viewDir = normalize(-vViewPosition);
          vec3 reflectDir = reflect(-lightDir1, vWorldNormal);
          float specular = pow(max(0.0, dot(viewDir, reflectDir)), 32.0);
          
          // Subsurface scattering effect for ceramic
          float rim = 1.0 - abs(dot(vWorldNormal, viewDir));
          rim = pow(rim, 2.0) * 0.1;
          
          vec3 finalColor = textureColor.rgb * lightIntensity;
          finalColor += specular * glossiness * vec3(1.0, 1.0, 1.0);
          finalColor += rim * vec3(0.9, 0.95, 1.0);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });

    if (mugBodyRef.current) {
      mugBodyRef.current.material = mugMaterial;
    }
  }, [customImage, THREE, mounted]);

  if (!mounted || !THREE) {
    return (
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.0, 2.8, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    );
  }

  // Create realistic handle geometry
  const createRealisticHandle = () => {
    const points = [
      new THREE.Vector3(1.4, 1.0, 0),
      new THREE.Vector3(1.8, 0.8, 0),
      new THREE.Vector3(1.9, 0.4, 0),
      new THREE.Vector3(1.9, 0.0, 0),
      new THREE.Vector3(1.9, -0.4, 0),
      new THREE.Vector3(1.8, -0.8, 0),
      new THREE.Vector3(1.4, -1.0, 0),
    ];

    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeometry = new THREE.TubeGeometry(curve, 32, 0.12, 12, false);
    return tubeGeometry;
  };

  // Ceramic materials
  const ceramicMaterial = new THREE.MeshStandardMaterial({
    color: 0xfafafa,
    roughness: 0.05,
    metalness: 0.02,
    clearcoat: 0.1,
    clearcoatRoughness: 0.1,
  });

  const interiorMaterial = new THREE.MeshStandardMaterial({
    color: 0xf8f8f8,
    roughness: 0.08,
    metalness: 0.01,
    side: THREE.BackSide,
  });

  const bottomMaterial = new THREE.MeshStandardMaterial({
    color: 0xf0f0f0,
    roughness: 0.3,
    metalness: 0.0,
  });

  const handleMaterial = new THREE.MeshStandardMaterial({
    color: 0xfafafa,
    roughness: 0.06,
    metalness: 0.02,
    clearcoat: 0.08,
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0, Math.PI / 6, 0]}>
      {/* Main mug body - slightly tapered like real mugs, open top */}
      <mesh ref={mugBodyRef} position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry
          args={[1.4, 1.2, 3.0, 64, 1, false, 0, Math.PI * 2]}
        />
        <primitive object={ceramicMaterial} attach="material" />
      </mesh>

      {/* Mug interior - hollow from top */}
      <mesh
        ref={mugInteriorRef}
        position={[0, 0.05, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry
          args={[1.35, 1.15, 2.85, 64, 1, false, 0, Math.PI * 2]}
        />
        <primitive object={interiorMaterial} attach="material" />
      </mesh>

      {/* Interior bottom only */}
      <mesh
        position={[0, -1.35, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[1.15, 32]} />
        <meshStandardMaterial
          color={0xf5f5f5}
          roughness={0.1}
          metalness={0.01}
        />
      </mesh>

      {/* Exterior bottom of mug */}
      <mesh
        position={[0, -1.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[1.2, 64]} />
        <primitive object={bottomMaterial} attach="material" />
      </mesh>

      {/* Realistic handle */}
      <mesh ref={handleRef} position={[0, 0, 0]} castShadow receiveShadow>
        <primitive object={createRealisticHandle()} />
        <primitive object={handleMaterial} attach="material" />
      </mesh>

      {/* Handle attachment points - more organic */}
      <mesh position={[1.35, 0.9, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <primitive object={ceramicMaterial} attach="material" />
      </mesh>
      <mesh position={[1.35, -0.9, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <primitive object={ceramicMaterial} attach="material" />
      </mesh>
    </group>
  );
}
