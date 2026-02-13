export const buttonClasses =
  'relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500';

export const optionsContainerClasses =
  'absolute z-10 mt-1 max-h-80 w-full overflow-hidden rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm';

export const optionItemClasses = (active: boolean) =>
  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
    active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
  }`;
