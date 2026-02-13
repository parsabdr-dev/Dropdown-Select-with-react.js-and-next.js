import { useState, useMemo } from 'react';
import { SelectItem } from './types';

interface UseAdvancedSelectProps {
  items: SelectItem[];
  value?: SelectItem[];
  onChange: (selected: SelectItem[]) => void;
  multiple?: boolean;
  isFilterable?: boolean; 
}

export const useAdvancedSelect = ({
  items,
  value,
  onChange,
  multiple = false,
  isFilterable = false,
}: UseAdvancedSelectProps) => {
  const [query, setQuery] = useState('');

  const selected = useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const flatItems = useMemo(() => {
    if (isFilterable && query) {
      const lowerQuery = query.toLowerCase();
      return items.filter((item) =>
        item.label.toLowerCase().includes(lowerQuery)
      );
    }
    return items;
  }, [items, query, isFilterable]);

  return {
    query,
    setQuery,
    selected,
    flatItems,
  };
};