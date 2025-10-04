import type { TextAreaItem } from '@/types';

/**
 * 配列からランダムに1つのアイテムを選択します。
 * @param items - アイテムの配列
 * @returns ランダムに選択されたアイテム、またはアイテムがない場合はnull
 */
export function selectRandomItem(items: TextAreaItem[]): TextAreaItem | null {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}
