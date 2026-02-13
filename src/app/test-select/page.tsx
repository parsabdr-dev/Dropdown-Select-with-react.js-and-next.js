'use client';

import { useState } from 'react';
import AdvancedSelect from '@/components/AdvancedSelect/AdvancedSelect';
import { Theme, Variant, SelectItem } from '@/components/AdvancedSelect/types';
import clsx from 'clsx';

const mockItems: SelectItem[] = Array.from({ length: 100 }).map((_, i) => ({
  id: i,
  label: `Option ${i + 1}`,
  value: `opt-${i}`,
}));

export default function CarbonDemoPage() {
  const [theme, setTheme] = useState<Theme>('gray-10');
  const [variant, setVariant] = useState<Variant>('fluid');
  const [selected, setSelected] = useState<SelectItem[]>([]);

  const themes: { label: string; value: Theme }[] = [
    { label: 'White', value: 'white' },
    { label: 'Gray 10', value: 'gray-10' },
    { label: 'Gray 90', value: 'gray-90' },
    { label: 'Gray 100', value: 'gray-100' },
  ];

  const variants: { label: string; value: Variant }[] = [
    { label: 'Dropdown', value: 'dropdown' },
    { label: 'Inline dropdown', value: 'inline' },
    { label: 'Fluid dropdown', value: 'fluid' },
    { label: 'Fluid condensed dropdown', value: 'fluid-condensed' },
    { label: 'Multiselect', value: 'multiselect' },
    { label: 'Filterable multiselect', value: 'filterable-multiselect' },
    { label: 'Fluid multiselect', value: 'fluid-multiselect' },
  ];

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white shadow-sm border border-gray-200">
        
        {/* Header مشابه سایت Carbon */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl mb-8">Live demo</h1>
          
          <div className="grid grid-cols-2 gap-8 mb-12">
            {/* Theme Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Theme selector</label>
              <select 
                value={theme} 
                onChange={(e) => setTheme(e.target.value as Theme)}
                className="h-10 border border-gray-300 px-2 bg-white outline-none focus:border-blue-600"
              >
                {themes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>

            {/* Variant Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Variant selector</label>
              <select 
                value={variant} 
                onChange={(e) => setVariant(e.target.value as Variant)}
                className="h-10 border border-gray-300 px-2 bg-white outline-none focus:border-blue-600"
              >
                {variants.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
              </select>
            </div>
          </div>

          {/* محوطه نمایش کامپوننت اصلی */}
          <div className={clsx(
            "p-20 border border-dashed border-gray-300 flex items-center justify-center transition-colors",
            theme === 'gray-90' || theme === 'gray-100' ? "bg-[#161616]" : "bg-white"
          )}>
            <div className="w-full max-w-md">
              <AdvancedSelect
                label="Label"
                placeholder="Choose an option"
                items={mockItems}
                theme={theme}
                variant={variant}
                onChange={setSelected}
                value={selected}
              />
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}