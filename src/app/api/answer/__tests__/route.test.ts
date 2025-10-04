import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from '@/app/api/answer/route';
import { NextResponse } from 'next/server';
import {
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR,
} from '@/app/constants/const';
import type { TextAreaItem } from '@/types';

// NextResponse.json をモック化
vi.mock('next/server', async () => {
  const actual = await vi.importActual('next/server');
  return {
    ...actual,
    NextResponse: {
      ...actual.NextResponse,
      json: vi.fn().mockImplementation((body, init) => ({
        body,
        status: init?.status ?? 200,
        headers: new Headers(init?.headers),
      })),
    },
  };
});

const mockNextResponseJson = NextResponse.json as vi.Mock;

describe('POST /api/answer', () => {
  let mathRandomSpy: vi.SpyInstance;

  beforeEach(() => {
    // Math.random() が常に 0.5 を返すように設定
    // これにより、配列の中間にある要素が選ばれることを期待できます
    mathRandomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.5);
    mockNextResponseJson.mockClear();
  });

  afterEach(() => {
    mathRandomSpy.mockRestore();
  });

  it('有効なデータ配列を受け取った場合、ランダムに選択されたアイテムを返す', async () => {
    const testData: TextAreaItem[] = [
      { id: 1, value: '選択肢1' },
      { id: 2, value: '選択肢2' },
      { id: 3, value: '選択肢3' },
    ];

    // Math.random() が 0.5 を返すので、randomIndex は floor(0.5 * 3) = 1 になる
    const expectedSelectedItem = testData[1];

    const request = new Request('http://localhost/api/answer', {
      method: 'POST',
      body: JSON.stringify(testData),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);

    expect(mockNextResponseJson).toHaveBeenCalledWith({
      selected: expectedSelectedItem,
    });
    expect(response.status).toBe(200);
  });

  it('空の配列を受け取った場合、400エラーを返す', async () => {
    const request = new Request('http://localhost/api/answer', {
      method: 'POST',
      body: JSON.stringify([]),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);

    expect(mockNextResponseJson).toHaveBeenCalledWith(
      { message: '有効なデータがありません。' },
      { status: HTTP_BAD_REQUEST }
    );
    expect(response.status).toBe(HTTP_BAD_REQUEST);
  });

  it('不正なJSONデータを受け取った場合、500エラーを返す', async () => {
    const request = new Request('http://localhost/api/answer', {
      method: 'POST',
      body: 'invalid-json',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);

    expect(mockNextResponseJson).toHaveBeenCalledWith(
      { message: 'データの処理中にエラーが発生しました。' },
      { status: HTTP_INTERNAL_SERVER_ERROR }
    );
    expect(response.status).toBe(HTTP_INTERNAL_SERVER_ERROR);
  });
});
