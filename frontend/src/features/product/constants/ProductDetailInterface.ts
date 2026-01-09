export interface VariationOption {
  id: number;
  value: string;
}

export interface Variation {
  id: number;
  name: string;
  variation_option: VariationOption[];
}

export interface Model {
  id: number;
  name: string;
  price: number;
  sku: string;
}

export interface ProductData {
  id: number;
  title: string;
  description: string;
  brand_id: number | null;
  brand_name: string | null;
  models: Model[];
  variations: Variation[];
}

export interface SelectedVariation {
  optionId: number;
  value: string;
}

export interface SelectedVariations {
  [key: number]: SelectedVariation;
}
