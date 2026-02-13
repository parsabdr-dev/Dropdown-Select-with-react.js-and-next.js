export type Theme = 'white' | 'gray-10' | 'gray-90' | 'dark';
export type Variant = 
  | 'dropdown' 
  | 'inline' 
  | 'fluid' 
  | 'fluid-condensed' 
  | 'multiselect' 
  | 'filterable-multiselect' 
  | 'fluid-multiselect';

export interface SelectItem {
  id: string | number;
  label: string;
  value: string;
  group?: string;
  disabled?: boolean;
}

export interface AdvancedSelectProps {
  items: SelectItem[];
  value?: SelectItem[];
  onChange: (selected: SelectItem[]) => void;
  placeholder?: string;
  theme?: Theme;
  variant?: Variant;
  label?: string;
  disabled?: boolean;
}