export type Theme = 'light' | 'gray-10' | 'gray-90' | 'dark';
export type Variant = 'default' | 'fluid' | 'inline';

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
  selectAllLabel?: string;
  clearAllLabel?: string;
  theme?: Theme; 
  variant?: Variant; 
}