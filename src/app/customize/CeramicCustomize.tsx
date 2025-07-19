"use client";
import { toast } from 'sonner';
import React, { useState, useRef, useEffect, Suspense,useCallback } from "react";
import { Trash2, Upload } from "lucide-react";
import dynamic from "next/dynamic";
import { CeramicType, CERAMIC_ITEMS } from "./types";
import CeramicDropdown from "./CeramicDropdown";
import ImageUploader from "./ImageUploader";
import { Button } from '@nextui-org/react';
import { FiShoppingCart } from 'react-icons/fi';
import {v4 as v4uuid} from 'uuid';

// Safe dynamic imports for React Three Fiber
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

const CeramicsScene = dynamic(() => import("./CeramicScene"), {
  ssr: false,
});

export default function CeramicsCustomizer() {
  const [image, setImage] = useState<string | null>(null);
  const [ceramicType, setCeramicType] = useState<CeramicType>("plate"); // Default to plate
  const [mounted, setMounted] = useState(false);
  const [cart,setCart] = useState<any[]>([]);
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(()=> {
    //[LOOK] 
    try {
      const lCart = JSON.parse(localStorage.getItem("cart") || "[]");
      if(lCart)
        setCart(lCart);
    }catch(err) {
      console.error("Error parsing cart from localStorage:", err);
      setCart([]);
      toast.error("Error loading cart from localStorage. Please try again.");
    }
  },[])

  const handleCart = useCallback((product: any) => { 
    product = {
        _id : v4uuid(),
        img:image,
        price : 200,
        quantity : 1,
        type : ceramicType,
        title : CERAMIC_ITEMS.find(item => item.id === ceramicType)?.name || "Custom Ceramic"
    }
    console.log("log");
    console.log(product);
    const updatedCart = [...cart || [], product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }, [cart,image,ceramicType]);

  const addToCart = useCallback((product: any) => { 
   if(!image) {
        toast.error("No custom image set? wtf do you wanna customize? are you serious?");
        return;
    }
    handleCart(product);
    toast.success(`Customized product added to cart!`);
  }, [handleCart,image]);

  const handleImageChange = (newImage: string | null) => {
    setImage(newImage);
  };

  const handleTypeChange = (newType: CeramicType) => {
    setCeramicType(newType);
  };

  const getSelectedItem = () => {
    return (
      CERAMIC_ITEMS.find((item) => item.id === ceramicType) || CERAMIC_ITEMS[0]
    );
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading 3D Customizer...</p>
        </div>
      </div>
    );
  }

  const selectedItem = getSelectedItem();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col">
            <div className="w-full p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                <div className="flex-1 md:max-w-xl">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Custom Ceramic Designer
                  </h2>
                  <div className="h-1 w-20 bg-blue-500 mb-4"></div>

                  {/* Ceramic Type Selector */}
                  <CeramicDropdown
                    selectedType={ceramicType}
                    onTypeChange={handleTypeChange}
                  />

                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {selectedItem.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedItem.description}
                    </p>
                    <p className="text-gray-600 mt-2">
                      Upload your custom image and see it applied to your
                      selected ceramic piece. Your design will wrap around the
                      surface beautifully.
                    </p>
                  </div>
                </div>

                {/* Image Upload Section */}
                <div className="w-full md:w-auto md:flex-shrink-0">
                  <ImageUploader
                    image={image}
                    onImageChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            {/* 3D Viewer Section */}
            <div className="w-full p-6 border-t border-gray-200">
              <div className="relative w-full">
                <div>
                  <Button
                    variant="light"
                    className="bg-primary text-white border border-primary rounded-md"
                    onPress={() => addToCart({})}
                  >
                    <FiShoppingCart className="mr-2" />
                    Add to Cart
                  </Button>
                </div>
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    3D Preview
                  </h3>
                  <p className="text-gray-500">
                    Drag to rotate your {selectedItem.name.toLowerCase()} and
                    see your design from all angles
                  </p>
                </div>

                <div className="w-full h-[600px] rounded-lg overflow-hidden border-2 border-blue-500 bg-gradient-to-b from-gray-50 to-gray-100">
                  <Canvas
                    shadows
                    camera={{
                      position: [0, 0, 7],
                      fov: 45,
                      near: 0.1,
                      far: 1000,
                    }}
                    gl={{ antialias: true, preserveDrawingBuffer: true }}
                    dpr={[1, 2]}
                  >
                    <CeramicsScene
                      customImage={image}
                      ceramicType={ceramicType}
                    />
                  </Canvas>

                </div>

                {/* Instructions */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-700 mb-1">
                      Rotate
                    </div>
                    <div>Click and drag to rotate your ceramic piece</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="font-semibold text-green-700 mb-1">
                      Zoom
                    </div>
                    <div>Use mouse wheel to zoom in and out</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="font-semibold text-purple-700 mb-1">
                      Switch
                    </div>
                    <div>Change ceramic type using the dropdown above</div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-700 mb-1">
                      Rotate
                    </div>
                    <div>Click and drag to rotate your ceramic piece</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="font-semibold text-green-700 mb-1">
                      Zoom
                    </div>
                    <div>Use mouse wheel to zoom in and out</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="font-semibold text-purple-700 mb-1">
                      Switch
                    </div>
                    <div>Change ceramic type using the dropdown above</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
