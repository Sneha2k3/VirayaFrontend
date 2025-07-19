//@ts-nocheck
"use client";
import React, { useState, useRef, useEffect } from "react";
import { ModelProps } from "./types";

export default function PlateModel({ customImage }: ModelProps) {
  const groupRef = useRef<any>();
  const plateTopRef = useRef<any>();
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

  // Apply custom image texture to the plate surface
  useEffect(() => {
    if (!customImage || !plateTopRef.current || !THREE) return;

    const texture = new THREE.TextureLoader().load(
      customImage,
      (loadedTexture: any) => {
        const imageAspect =
          loadedTexture.image.width / loadedTexture.image.height;

        // Scale texture to fit nicely on the plate
        const scale = 0.8;
        if (imageAspect > 1) {
          texture.repeat.set(scale, scale / imageAspect);
          texture.offset.set((1 - scale) / 2, (1 - scale / imageAspect) / 2);
        } else {
          texture.repeat.set(scale * imageAspect, scale);
          texture.offset.set((1 - scale * imageAspect) / 2, (1 - scale) / 2);
        }
        texture.needsUpdate = true;
      }
    );

    texture.flipY = false;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    // Material with custom image
    const plateMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });

    if (plateTopRef.current) {
      plateTopRef.current.material = plateMaterial;
    }
  }, [customImage, THREE, mounted]);

  if (!mounted || !THREE) {
    return (
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.2, 32]} />
        <meshStandardMaterial color="#e8e8e8" />
      </mesh>
    );
  }

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      {/* Simple curved plate */}
      <mesh
        ref={plateTopRef}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <sphereGeometry
          args={[2.5, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.4]}
        />
        <meshStandardMaterial
          color={customImage ? 0xffffff : 0xf0f0f0}
          roughness={0.1}
          metalness={0.02}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
