'use client';

import { Fragment, useEffect } from 'react';
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
  
  // تشخیص ویژگی‌ها بر اساس Variant
  const isMultiple = variant.includes('multiselect');
  const isFilterable = variant === 'filterable-multiselect'; // فیلتر فقط برای این گزینه فعال است
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
    isFilterable: isFilterable, // پاس دادن وضعیت فیلتر به هوک
  });

  // هر وقت variant عوض شد، متن سرچ را پاک کن (حل مشکل تداخل سرچ)
  useEffect(() => {
    setQuery('');
  }, [variant, setQuery]);

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
              {isFluid && <span className="absolute top-3 text-[10px] text-gray-500">{label}</span>}
              
              {/* --- بخش نمایش تعداد یا متن انتخاب شده --- */}
              
              {/* حالت 1: مولتی سلکت است و آیتم انتخاب شده داریم */}
              {isMultiple && selected.length > 0 && (
                <div className="flex items-center bg-gray-200 text-gray-800 rounded-full px-2 py-0.5 text-[12px] font-bold z-10">
                  {selected.length}
                  <div 
                    onClick={clearSelection}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5 cursor-pointer"
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </div>
                </div>
              )}

              {/* متن اصلی باکس */}
              <span className={clsx(
                "block truncate text-sm flex-1 text-left",
                isFluid && "pt-4" // فاصله برای حالت Fluid
              )}>
                {/* اگر مولتی سلکت بود همیشه پلیس‌هولدر را نشان بده (چون تعداد را در بج نشان دادیم) */}
                {/* اگر سینگل سلکت بود و انتخاب شده بود، لیبل را نشان بده، وگرنه پلیس‌هولدر */}
                {isMultiple 
                  ? placeholder 
                  : (selected.length > 0 ? selected[0].label : placeholder)
                }
              </span>

            </div>
            <ChevronDownIcon className="h-5 w-5 opacity-50 shrink-0" />
          </Listbox.Button>

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className={clsx(
              "absolute z-50 mt-px w-full overflow-hidden shadow-lg border focus:outline-none",
              themeStyles[theme]
            )}>
              {/* اینپوت فیلتر فقط اگر isFilterable باشد رندر می‌شود */}
              {isFilterable && (
                <div className="p-2 border-b border-gray-500/10">


<input
                    className={clsx(
                      "w-full border-none text-sm p-2 focus:ring-0 outline-none",
                      theme === 'dark' || theme === 'gray-90' ? "bg-[#393939] text-white" : "bg-white text-gray-900"
                    )}
                    placeholder="Filter..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                    // جلوگیری از بسته شدن لیست هنگام کلیک روی اینپوت
                    onClick={(e) => e.stopPropagation()} 
                  />
                </div>
              )}

              <List 
                height={240} 
                itemCount={flatItems.length} 
                itemSize={40} 
                width="100%"
                className="custom-scrollbar" // کلاس اختیاری برای اسکرول بار
              >
                {({ index, style }) => {
                  const item = flatItems[index];
                  // بررسی اینکه آیا این آیتم در لیست انتخاب شده‌ها هست یا نه
                  const isItemSelected = selected.some(s => s.id === item.id);
                  
                  return (
                    <Listbox.Option
                      key={item.id}
                      value={item}
                      style={style}
                      className={({ active }) => optionItemClasses(active, isItemSelected && !isMultiple, theme)}
                    >
                      {/* --- چک باکس مربعی برای حالت‌های Multiselect --- */}
                      {isMultiple && (
                        <div className={clsx(
                          "w-4 h-4 border flex items-center justify-center transition-all mr-2 shrink-0",
                          // اگر انتخاب شده: سیاه شو. اگر نه: بردر معمولی
                          isItemSelected 
                            ? "bg-black border-black" 
                            : "border-gray-500 bg-transparent"
                        )}>
                          {isItemSelected && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      )}

                      <span className={clsx(
                        "truncate", 
                        // بولد شدن متن اگر انتخاب شده باشد (فقط در سینگل سلکت یا برای زیبایی)
                        isItemSelected ? "font-semibold" : "font-normal"
                      )}>
                        {item.label}
                      </span>
                      
                      {/* تیک برای حالت Single Select (اختیاری، طبق استاندارد کربن معمولا فقط هایلایت کافیه ولی تیک هم خوبه) */}
                      {!isMultiple && isItemSelected && (
                        <svg className="w-4 h-4 text-blue-600 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
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