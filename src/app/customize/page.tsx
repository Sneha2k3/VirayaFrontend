"use client";
import dynamic from "next/dynamic";

const CeramicsCustomizer = dynamic(() => import("./CeramicCustomize"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading 3D Customizer...</p>
      </div>
    </div>
  ),
});

export default function Page() {
  return <CeramicsCustomizer />;
}
