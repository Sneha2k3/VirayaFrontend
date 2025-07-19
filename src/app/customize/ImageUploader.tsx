"use client";
import React from "react";
import { Trash2, Upload } from "lucide-react";

interface ImageUploaderProps {
  image: string | null;
  onImageChange: (image: string | null) => void;
}

export default function ImageUploader({
  image,
  onImageChange,
}: ImageUploaderProps) {
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        onImageChange(reader.result as string);
      };
    }
  };

  const removeImage = () => {
    onImageChange(null);
  };

  return (
    <div className="w-full md:w-auto md:flex-shrink-0 space-y-4 md:max-w-sm">
      {!image ? (
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition duration-300">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 text-blue-500 mb-2" />
              <p className="mb-2 text-sm text-blue-500 font-medium">
                Click to upload your design
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max 5MB)</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onFileChange}
            />
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-2">
            <img
              src={image}
              alt="Your uploaded design"
              className="w-full h-40 object-contain rounded"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={removeImage}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
            >
              <Trash2 className="mr-2 w-4 h-4" /> Remove Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
