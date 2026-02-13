import { useMemo, useState } from 'react';
import { SelectItem } from './types';
import { filterItems, groupItems, areAllSelected } from './utils';

interface UseAdvancedSelectParams {
  items: SelectItem[];
  value?: SelectItem[];
  onChange: (selected: SelectItem[]) => void;
  multiple: boolean;
}

export const useAdvancedSelect = ({
  items,
  value = [],
  onChange,
  multiple,
}: UseAdvancedSelectParams) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<SelectItem[]>(value);

  const filteredItems = useMemo(() => filterItems(items, query), [items, query]);
  const groupedItems = useMemo(() => groupItems(filteredItems), [filteredItems]);
  const flatItems = useMemo(
    () => Object.values(groupedItems).flat(),
    [groupedItems]
  );

  const isAllSelected = areAllSelected(filteredItems, selected);

  const toggleItem = (item: SelectItem) => {
    if (!multiple) {
      setSelected([item]);
      onChange([item]);
      return;
    }

    const exists = selected.some(s => s.id === item.id);
    const newSelected = exists
      ? selected.filter(s => s.id !== item.id)
      : [...selected, item];

    setSelected(newSelected);
    onChange(newSelected);
  };

  const selectAll = () => {
    setSelected(filteredItems);
    onChange(filteredItems);
  };

  const clearAll = () => {
    setSelected([]);
    onChange([]);
  };

  return {
    query,
    setQuery,
    selected,
    filteredItems,
    groupedItems,
    flatItems,
    isAllSelected,
    toggleItem,
    selectAll,
    clearAll,
  };
};
