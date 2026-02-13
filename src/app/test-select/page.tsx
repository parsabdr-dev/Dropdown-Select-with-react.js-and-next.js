'use client';

import { useState } from 'react';
import AdvancedSelect from '@/components/AdvancedSelect/AdvancedSelect';
import { SelectItem } from '@/components/AdvancedSelect/types';

const mockItems: SelectItem[] = Array.from({ length: 1000 }).map((_, i) => ({
  id: i,
  label: `Option ${i}`,
  value: `opt-${i}`,
  group: i < 500 ? 'Group A' : 'Group B',
  disabled: i % 10 === 0
}));

export default function Home() {
  const [selected, setSelected] = useState<SelectItem[]>([]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gray-50 p-20 dark:bg-black">
      <div className="w-full max-w-2xl space-y-12">
        
        <div>
          <h2 className="mb-4 text-sm font-mono text-gray-500">Theme: Gray 10 | Variant: Fluid</h2>
          <AdvancedSelect
            items={mockItems}
            onChange={setSelected}
            theme="gray-10"
            variant="fluid"
            placeholder="Choose an option"
            multiple
          />
        </div>

        <div>
          <h2 className="mb-4 text-sm font-mono text-gray-500">Theme: Dark | Variant: Default</h2>
          <AdvancedSelect
            items={mockItems}
            onChange={setSelected}
            theme="dark"
            variant="default"
            placeholder="Select from dark menu"
          />
        </div>

      </div>
    </div>
  );
}