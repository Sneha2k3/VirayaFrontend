"use client";
import React from "react";
import { ChevronDown } from "lucide-react";
import { CeramicType, CERAMIC_ITEMS, DropdownProps } from "./types";

export default function CeramicDropdown({
  selectedType,
  onTypeChange,
}: DropdownProps) {
  const selectedItem = CERAMIC_ITEMS.find((item) => item.id === selectedType);

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Ceramic Type
      </label>
      <div className="relative">
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value as CeramicType)}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
        >
          {CERAMIC_ITEMS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      {selectedItem && (
        <p className="mt-2 text-sm text-gray-600">{selectedItem.description}</p>
      )}
    </div>
  );
}
