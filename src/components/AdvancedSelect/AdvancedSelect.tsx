'use client';

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import clsx from 'clsx';

import { AdvancedSelectProps, SelectItem } from './types';
import { useAdvancedSelect } from './hooks';
import {
  buttonClasses,
  optionsContainerClasses,
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
      <div className={clsx('relative mt-1 w-80', className)}>
        
        {/* Button */}
        <Listbox.Button className={buttonClasses}>
          <span className="block truncate">
            {selected.length === 0
              ? placeholder
              : `${selected.length}`}
          </span>

          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
          </span>
        </Listbox.Button>

        {/* Dropdown */}
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className={optionsContainerClasses}>
            
            {searchable && (
              <div className="px-2 py-2 space-y-2">
                <input
                  type="text"
                  className="w-full rounded border px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />

                {multiple && (
                  <button
                    type="button"
                    onClick={isAllSelected ? clearAll : selectAll}
                    className="w-full rounded bg-gray-100 py-1 text-sm hover:bg-gray-200"
                  >
                    {isAllSelected ? clearAllLabel : selectAllLabel}
                  </button>
                )}
              </div>
            )}

            <List
              height={260}
              itemCount={flatItems.length}
              itemSize={36}
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
                    className={({ active }) =>
                      optionItemClasses(active)
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={clsx(
                            'block truncate pl-8',
                            selected ? 'font-medium' : 'font-normal',
                            item.disabled && 'opacity-50'
                          )}
                        >
                          {item.label}
                        </span>

                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-blue-600">


<CheckIcon className="h-5 w-5" />
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