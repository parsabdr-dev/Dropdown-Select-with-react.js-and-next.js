'use client';

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { FixedSizeList as List } from 'react-window';

import { AdvancedSelectProps } from './types';
import { useAdvancedSelect } from './hooks';
import { themeStyles, getVariantClasses, optionItemClasses } from './styles';

export default function AdvancedSelect({
  items,
  value,
  onChange,
  placeholder = 'Choose an option',
  theme = 'white',
  variant = 'dropdown',
  label = 'Label',
  disabled = false,
}: AdvancedSelectProps) {
  
  // تنظیم خودکار قابلیت‌ها بر اساس نوع Variant
  const isMultiple = variant.includes('multiselect');
  const isFilterable = variant.includes('filterable');

  const {
    query,
    setQuery,
    selected,
    flatItems,
  } = useAdvancedSelect({
    items,
    value,
    onChange,
    multiple: isMultiple,
  });

  const isFluid = variant.includes('fluid');

  return (
    <div className={clsx("flex flex-col w-full", variant === 'inline' && "flex-row items-center gap-4")}>
      {!isFluid && <label className="text-xs text-gray-500 mb-2">{label}</label>}
      
      <Listbox value={selected} onChange={onChange} multiple={isMultiple} disabled={disabled}>
        <div className="relative">
          <Listbox.Button className={clsx(getVariantClasses(variant), themeStyles[theme])}>
            <div className="flex flex-col items-start overflow-hidden">
              {isFluid && <span className="absolute top-1 text-[10px] text-gray-500">{label}</span>}
              <span className="block truncate text-sm">
                {selected.length === 0 
                  ? placeholder 
                  : isMultiple ? `${selected.length} items selected` : selected[0].label}
              </span>
            </div>
            <ChevronDownIcon className="h-5 w-5 opacity-50" />
          </Listbox.Button>

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className={clsx(
              "absolute z-50 mt-0 w-full overflow-hidden shadow-md border focus:outline-none",
              themeStyles[theme]
            )}>
              {isFilterable && (
                <div className="p-2 border-b border-gray-500/10">
                  <input
                    className="w-full bg-transparent border-none text-sm p-1 focus:ring-0 outline-none"
                    placeholder="Filter..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              )}

              <List height={200} itemCount={flatItems.length} itemSize={40} width="100%">
                {({ index, style }) => {
                  const item = flatItems[index];
                  const isItemSelected = selected.some(s => s.id === item.id);
                  
                  return (
                    <Listbox.Option
                      key={item.id}
                      value={item}
                      style={style}
                      className={({ active }) => optionItemClasses(active, isItemSelected, theme)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={clsx("truncate", isItemSelected ? "font-semibold" : "font-normal")}>
                          {item.label}
                        </span>
                        {isItemSelected && <CheckIcon className="h-4 w-4 text-blue-600" />}
                      </div>
                    </Listbox.Option>
                  );
                }}
              </List>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}