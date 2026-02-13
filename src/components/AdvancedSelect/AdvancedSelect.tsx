'use client';

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import clsx from 'clsx';

import { AdvancedSelectProps, SelectItem } from './types';
import { useAdvancedSelect } from './hooks';
import {
  themeStyles,
  variantStyles,
  optionItemClasses,
} from './styles';

export default function AdvancedSelect({
  items,
  value,
  onChange,
  placeholder = 'Select...',
  searchable = true,
  multiple = true,
  disabled = false,
  className,
  selectAllLabel = 'Select all',
  clearAllLabel = 'Clear all',
  theme = 'light',
  variant = 'default'
}: AdvancedSelectProps) {
  const {
    query,
    setQuery,
    selected,
    flatItems,
    isAllSelected,
    selectAll,
    clearAll,
  } = useAdvancedSelect({
    items,
    value,
    onChange,
    multiple,
  });

  return (
    <Listbox value={selected} onChange={onChange} multiple={multiple} disabled={disabled}>
      <div className={clsx('relative mt-1', className, variant === 'inline' ? 'inline-block' : 'w-full')}>
        
        {/* Button */}
        <Listbox.Button className={clsx(
          'relative cursor-pointer py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all',
          themeStyles[theme],
          variantStyles[variant]
        )}>
          <span className="block truncate text-sm">
            {selected.length === 0
              ? placeholder
              : multiple ? `${selected.length} items selected` : selected[0].label}
          </span>

          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 opacity-50" />
          </span>
        </Listbox.Button>

        {/* Dropdown */}
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className={clsx(
            'absolute z-10 mt-1 max-h-80 w-full overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border-t-0 border',
            themeStyles[theme],
            variant === 'fluid' ? 'rounded-none' : 'rounded-md'
          )}>
            
            {searchable && (
              <div className="p-2 space-y-2 border-b border-gray-500/20">
                <input
                  type="text"
                  className={clsx(
                    "w-full rounded border px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent",
                    theme === 'dark' || theme === 'gray-90' ? 'border-gray-600' : 'border-gray-300'
                  )}
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />

                {multiple && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={selectAll}
                      className="flex-1 rounded bg-blue-600 py-1 text-xs text-white hover:bg-blue-700"
                    >
                      {selectAllLabel}
                    </button>
                    <button
                      type="button"
                      onClick={clearAll}
                      className="flex-1 rounded bg-gray-500/20 py-1 text-xs hover:bg-gray-500/30"
                    >
                      {clearAllLabel}
                    </button>
                  </div>
                )}
              </div>
            )}

            <List
              height={260}
              itemCount={flatItems.length}
              itemSize={40}
              width="100%"
            >
              {({ index, style }: ListChildComponentProps) => {
                const item: SelectItem = flatItems[index];


return (
                  <Listbox.Option
                    key={item.id}
                    value={item}
                    disabled={item.disabled}
                    style={style}
                    className={({ active }) => optionItemClasses(active, theme)}
                  >
                    {({ selected }) => (
                      <>
                        <div className="flex flex-col">
                           {item.group && (index === 0 || flatItems[index-1].group !== item.group) && (
                             <span className="text-[10px] uppercase tracking-widest opacity-40 mb-1">
                               {item.group}
                             </span>
                           )}
                           <span className={clsx(
                              'block truncate',
                              selected ? 'font-semibold text-blue-500' : 'font-normal',
                              item.disabled && 'opacity-30'
                            )}>
                              {item.label}
                           </span>
                        </div>

                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <CheckIcon className="h-4 w-4" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                );
              }}
            </List>

          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}