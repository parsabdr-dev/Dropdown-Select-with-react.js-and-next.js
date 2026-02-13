import { Theme, Variant } from './types';

export const themeStyles: Record<Theme, string> = {
  'light': 'bg-white text-gray-900 border-gray-300',
  'gray-10': 'bg-[#f4f4f4] text-gray-900 border-gray-200',
  'gray-90': 'bg-[#393939] text-white border-gray-700',
  'dark': 'bg-[#161616] text-white border-gray-800',
};

export const variantStyles: Record<Variant, string> = {
  'default': 'w-full max-w-md rounded-lg border',
  'fluid': 'w-full border-b-2 border-x-0 border-t-0 rounded-none',
  'inline': 'inline-flex w-auto min-w-[200px] rounded-lg border',
};

export const optionItemClasses = (active: boolean, theme: Theme) => {
  const activeStyles = theme === 'dark' || theme === 'gray-90' ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-900';
  return `relative cursor-pointer select-none py-2 pl-10 pr-4 transition-colors ${
    active ? activeStyles : ''
  }`;
};