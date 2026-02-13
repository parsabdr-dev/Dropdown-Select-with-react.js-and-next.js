'use client';

import { useState } from 'react';
import AdvancedSelect from '@/components/AdvancedSelect/AdvancedSelect';
import type { SelectItem } from '@/components/AdvancedSelect/types';

export default function TestSelectPage() {
  const [value, setValue] = useState<SelectItem[]>([]);

const items: SelectItem[] = Array.from({ length: 1000 }, (_, i) => {
  return {
    id: i,
    label:` Option ${i}`,
    value: `option-${i}`,
    group:
      i % 3 === 0
        ? 'Group A'
        : i % 3 === 1
        ? 'Group B'
        : 'Group C',
     disabled: i % 50 === 0,
  };
});

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-xl font-bold">Advanced Select Demo</h1>

      <AdvancedSelect
        items={items}
        value={value}
        onChange={setValue}
        placeholder="Choose options..."
        searchable
        multiple
      />
    </div>
  );
}