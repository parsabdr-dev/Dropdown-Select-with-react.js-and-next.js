import { SelectItem } from './types';

/**
 * فیلتر کردن آیتم‌ها بر اساس متن جستجو
 */
export const filterItems = (items: SelectItem[], query: string): SelectItem[] => {
  if (!query.trim()) return items;
  const lower = query.toLowerCase();
  return items.filter(item => item.label.toLowerCase().includes(lower));
};

/**
 * گروه‌بندی آیتم‌ها بر اساس فیلد group
 */
export const groupItems = (items: SelectItem[]): Record<string, SelectItem[]> => {
  return items.reduce<Record<string, SelectItem[]>>((acc, item) => {
    const key = item.group || 'Others';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
};

/**
 * بررسی اینکه آیا همه آیتم‌ها انتخاب شده‌اند یا نه
 */
export const areAllSelected = (items: SelectItem[], selected: SelectItem[]): boolean => {
  return items.length > 0 && items.every(item => selected.some(s => s.id === item.id));
};
