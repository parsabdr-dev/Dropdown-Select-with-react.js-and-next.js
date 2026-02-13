export type Theme = 'white' | 'gray-10' | 'gray-90' | 'gray-100';
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
  searchable?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  theme?: Theme;
  variant?: Variant;
  label?: string;
}