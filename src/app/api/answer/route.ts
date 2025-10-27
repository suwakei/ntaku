import { NextResponse } from 'next/server';
import { selectRandomItem } from '@/lib/selection';
import type { TextAreaItem } from '@/types/types';
import {
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR,
} from '@/constants/const';

export async function POST(request: Request) {
  try {
    const data: TextAreaItem[] = await request.json();

    // データが空、または配列でない場合はエラー
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { message: '有効なデータがありません。' },
        { status: HTTP_BAD_REQUEST }
      );
    }

    const selectedItem = selectRandomItem(data);

    if (!selectedItem) {
      // selectRandomItemのデータが空の場合
      return NextResponse.json(
        { message: '選択できるアイテムがありません。' },
        { status: HTTP_BAD_REQUEST }
      );
    }

    console.log('Received data:', data);
    console.log('Selected item:', selectedItem);

    return NextResponse.json({ selected: selectedItem });
  } catch (error) {
    return NextResponse.json(
      { message: 'データの処理中にエラーが発生しました。' },
      { status: HTTP_INTERNAL_SERVER_ERROR }
    );
  }
}
