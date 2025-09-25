import { NextResponse } from 'next/server';

type TextAreaItem = {
  id: number;
  value: string;
};

export async function POST(request: Request) {
  try {
    const data: TextAreaItem[] = await request.json();

    // データが空、または配列でない場合はエラー
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ message: '有効なデータがありません。' }, { status: 400 });
    }

    // 受け取ったデータの中からランダムに1つ選ぶ
    const randomIndex = Math.floor(Math.random() * data.length);
    const selectedItem = data[randomIndex];

    console.log('Received data:', data);
    console.log('Selected item:', selectedItem);

    // 選んだ内容をクライアントに返す
    return NextResponse.json({ selected: selectedItem });
  } catch (error) {
    return NextResponse.json({ message: 'データの処理中にエラーが発生しました。' }, { status: 500 });
  }
}
