export type CeramicType = 'vase' | 'plate' | 'mug';

export interface CeramicItem {
  id: CeramicType;
  name: string;
  description: string;
}

export interface ModelProps {
  customImage: string | null;
}

export interface DropdownProps {
  selectedType: CeramicType;
  onTypeChange: (type: CeramicType) => void;
}

export const CERAMIC_ITEMS: CeramicItem[] = [
  {
    id: 'vase',
    name: 'Traditional Vase',
    description: 'North Devon Plain Jug - Classic ceramic vase with elegant curves'
  },
  {
    id: 'plate',
    name: 'Ceramic Plate',
    description: 'Round ceramic plate - Perfect for custom designs and table settings'
  },
  {
    id: 'mug',
    name: 'Coffee Mug',
    description: 'Classic ceramic mug - Ideal for personal designs and daily use'
  }
];