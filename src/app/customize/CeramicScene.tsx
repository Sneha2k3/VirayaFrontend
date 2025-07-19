"use client";
import React, { useState, useRef, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { CeramicType } from "./types";
import VaseModel from "./VaseModal";
import PlateModel from "./PlateModal";
import MugModel from "./MugModal";

// Safe dynamic imports for React Three Fiber
const OrbitControls = dynamic(
  () => import("@react-three/drei").then((mod) => mod.OrbitControls),
  { ssr: false }
);

const Environment = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Environment),
  { ssr: false }
);

const Html = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Html),
  { ssr: false }
);

interface CeramicsSceneProps {
  customImage: string | null;
  ceramicType: CeramicType;
}

// Loading component
function ModelLoader() {
  const [Html, setHtml] = useState<any>(null);

  useEffect(() => {
    const loadHtml = async () => {
      try {
        const { Html: HtmlComponent } = await import("@react-three/drei");
        setHtml(() => HtmlComponent);
      } catch (error) {
        console.error("Error loading Html component:", error);
      }
    };
    loadHtml();
  }, []);

  if (!Html) {
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    );
  }

  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" />
      <Html position={[0, 0, 0.6]}>
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
          <p>Loading model...</p>
        </div>
      </Html>
    </mesh>
  );
}

// Model selector component
function CeramicModelSelector({
  ceramicType,
  customImage,
}: {
  ceramicType: CeramicType;
  customImage: string | null;
}) {
  switch (ceramicType) {
    case "vase":
      return <VaseModel customImage={customImage} />;
    case "plate":
      return <PlateModel customImage={customImage} />;
    case "mug":
      return <MugModel customImage={customImage} />;
    default:
      return <VaseModel customImage={customImage} />;
  }
}

export default function CeramicsScene({
  customImage,
  ceramicType,
}: CeramicsSceneProps) {
  const controlsRef = useRef<any>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && controlsRef.current) {
      // Set the target to the center of the scene
      controlsRef.current.target.set(0, 0, 0);
      // Update the controls after changing settings
      controlsRef.current.update();
    }
  }, [mounted]);

  if (!mounted) return null;

  // Adjust camera position based on ceramic type
  const getCameraSettings = () => {
    switch (ceramicType) {
      case "plate":
        return { position: [2, 3, 5], minDistance: 3, maxDistance: 10 };
      case "mug":
        return { position: [3, 2, 5], minDistance: 2, maxDistance: 8 };
      case "vase":
      default:
        return { position: [0, 0, 7], minDistance: 3, maxDistance: 12 };
    }
  };

  const cameraSettings = getCameraSettings();

  return (
    <>
      {/* Gradient background for better depth perception */}
      <color attach="background" args={["#f5f5f5"]} />

      {/* Fog for depth */}
      <fog attach="fog" args={["#f5f5f5", 10, 50]} />

      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        minDistance={cameraSettings.minDistance}
        maxDistance={cameraSettings.maxDistance}
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={0.5}
        autoRotate={false}
        target={[0, 0, 0]}
        makeDefault
      />

      {/* Enhanced lighting setup for ceramics */}

      {/* Soft ambient light */}
      <ambientLight intensity={0.4} color="#ffffff" />

      {/* Main key light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Fill light from the opposite side */}
      <directionalLight position={[-3, 5, 3]} intensity={0.8} color="#f0f8ff" />

      {/* Rim light for definition */}
      <directionalLight position={[0, 2, -5]} intensity={0.6} color="#fff8e1" />

      {/* Top light for plate surfaces */}
      <directionalLight position={[0, 10, 0]} intensity={0.7} color="#ffffff" />

      {/* Additional spot lights for ceramic highlights */}
      <spotLight
        position={[4, 6, 4]}
        angle={0.4}
        penumbra={0.5}
        intensity={1.2}
        color="#ffffff"
        castShadow
      />

      <spotLight
        position={[-4, 6, 4]}
        angle={0.4}
        penumbra={0.5}
        intensity={0.8}
        color="#f8f8ff"
      />

      {/* Ground plane for shadows and context */}
      <mesh
        position={[0, -2.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#e8e8e8"
          transparent
          opacity={0.6}
          roughness={0.8}
        />
      </mesh>

      {/* Invisible walls for ambient occlusion effect */}
      <mesh position={[0, 0, -8]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#f0f0f0" transparent opacity={0.1} />
      </mesh>

      <Suspense fallback={<ModelLoader />}>
        <CeramicModelSelector
          ceramicType={ceramicType}
          customImage={customImage}
        />
        <Environment
          preset="studio"
          background={false}
          backgroundIntensity={0.3}
        />
      </Suspense>
    </>
  );
}
