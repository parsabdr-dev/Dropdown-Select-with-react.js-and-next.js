'use client';

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid';
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
  
  const isMultiple = variant.includes('multiselect');
  const isFilterable = variant.includes('filterable');
  const isFluid = variant.includes('fluid');

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

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  return (
    <div className={clsx("flex flex-col w-full font-sans", variant === 'inline' && "flex-row items-center gap-4")}>
      {!isFluid && <label className="text-[12px] text-gray-500 mb-1">{label}</label>}
      
      <Listbox value={selected} onChange={onChange} multiple={isMultiple} disabled={disabled}>
        <div className="relative">
          <Listbox.Button className={clsx(getVariantClasses(variant), themeStyles[theme])}>
            <div className="flex items-center gap-2 overflow-hidden flex-1">
              {isFluid && <span className="absolute top-1 text-[10px] text-gray-500">{label}</span>}
              
              {/* بخش شمارنده (Badge) برای Multiselect */}
              {isMultiple && selected.length > 0 && (
                <div className="flex items-center bg-black text-white rounded-full px-2 py-0.5 text-[11px] font-bold">
                  {selected.length}
                  <XMarkIcon 
                    className="h-3 w-3 ml-1 cursor-pointer hover:text-red-400" 
                    onClick={clearSelection}
                  />
                </div>
              )}

              <span className="block truncate text-sm">
                {selected.length === 0 
                  ? placeholder 
                  : isMultiple ? placeholder : selected[0].label}
              </span>
            </div>
            <ChevronDownIcon className="h-5 w-5 opacity-50 shrink-0" />
          </Listbox.Button>

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className={clsx(
              "absolute z-50 mt-px w-full overflow-hidden shadow-lg border focus:outline-none",
              themeStyles[theme]
            )}>
              {isFilterable && (
                <div className="p-2 border-b border-gray-500/10">
                  <input
                    className="w-full bg-transparent border-none text-sm p-1 focus:ring-0 outline-none"
                    placeholder="Filter..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                  />
                </div>
              )}

              <List height={240} itemCount={flatItems.length} itemSize={40} width="100%">
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
                      {isMultiple && (
                        <div className={clsx(
                          "w-4 h-4 border flex items-center justify-center transition-colors",
                          isItemSelected ? "bg-blue-600 border-blue-600" : "border-gray-400 bg-transparent"
                        )}>
                          {isItemSelected && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      )}
                      <span className={clsx("truncate", isItemSelected && !isMultiple ? "font-semibold" : "font-normal")}>
                        {item.label}
                      </span>
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