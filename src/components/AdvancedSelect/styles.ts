import { Theme, Variant } from './types';

export const themeStyles: Record<Theme, string> = {
  'white': 'bg-white text-gray-900 border-gray-300',
  'gray-10': 'bg-[#f4f4f4] text-gray-900 border-gray-200',
  'gray-90': 'bg-[#393939] text-white border-gray-700',
  'gray-100': 'bg-[#161616] text-white border-gray-800',
};

export const getVariantClasses = (variant: Variant) => {
  const base = "relative flex items-center justify-between px-4 transition-all duration-75 border";
  
  const variants: Record<string, string> = {
    'dropdown': `${base} h-10 w-full rounded-none`,
    'inline': `${base} h-10 w-auto min-w-[160px] border-none !bg-transparent`,
    'fluid': `${base} h-14 w-full border-x-0 border-t-0 border-b rounded-none pt-4`,
    'fluid-condensed': `${base} h-10 w-full border-x-0 border-t-0 border-b rounded-none pt-2`,
    'multiselect': `${base} h-10 w-full rounded-none`,
    'filterable-multiselect': `${base} h-10 w-full rounded-none`,
    'fluid-multiselect': `${base} h-14 w-full border-x-0 border-t-0 border-b rounded-none pt-4`,
  };

  return variants[variant] || variants['dropdown'];
};

export const optionItemClasses = (active: boolean, selected: boolean, theme: Theme) => {
  const isDark = theme === 'gray-90' || theme === 'gray-100';
  const activeBg = isDark ? 'bg-[#4c4c4c]' : 'bg-[#e5e5e5]';
  const selectedBg = isDark ? 'bg-[#353535]' : 'bg-[#f4f4f4]';
  
  return `relative cursor-pointer select-none py-3 px-4 text-sm transition-colors ${
    active ? activeBg : selected ? selectedBg : ''
  } ${isDark ? 'text-white' : 'text-gray-900'}`;
};