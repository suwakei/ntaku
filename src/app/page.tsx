"use client";

import styles from "./page.module.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, IconButton } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import toast, { Toaster } from 'react-hot-toast';

type TextAreaItem = {
  id: number;
  value: string;
};

export default function Home() {
  const router = useRouter();
  const [textAreas, setTextAreas] = useState<TextAreaItem[]>([
    { id: 1, value: "" },
    { id: 2, value: "" },
  ]);

  const addTextArea = () => {
    const newTextArea = { id: Date.now(), value: "" };
    setTextAreas([...textAreas, newTextArea]);
  };

  const removeTextArea = (idToRemove: number) => {
    if (textAreas.length <= 2) {
      toast.error("テキストエリアは2つ未満にはできません。");
    } else {
      setTextAreas(textAreas.filter((textArea) => textArea.id !== idToRemove));
    }
  };

  const handleTextChange = (id: number, target: HTMLTextAreaElement) => {
    // 高さを自動調整
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;

    setTextAreas(
      textAreas.map((textArea) =>
        textArea.id === id ? { ...textArea, value: target.value } : textArea
      )
    );
  };

  const handleSubmit = async () => {
    // 各テキストエリアの値の前後の空白を削除
    const trimmedTextAreas = textAreas.map((textArea) => ({
      ...textArea,
      value: textArea.value.trim(),
    }));

    // 値が空のテキストエリアがあるかチェック
    const hasEmptyValue = trimmedTextAreas.some(
      (textArea) => textArea.value === ""
    );

    if (hasEmptyValue) {
      toast.error("空欄の選択肢があります。入力してください。");
      return; // 空の項目があれば、ここで処理を中断
    }

    const toastId = toast.loading("送信中...");
    try {
      const response = await fetch('/api/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trimmedTextAreas),
      });

      if (!response.ok) {
        throw new Error('サーバーとの通信に失敗しました。');
      }

      const result = await response.json();
      if (result.selected && result.selected.value) {
        toast.dismiss(toastId);
        router.push(`/result?value=${encodeURIComponent(result.selected.value)}`);
      } else {
        throw new Error('有効なレスポンスがありませんでした。');
      }
      console.log('API Response (Selected):', result.selected);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '不明なエラーが発生しました。', { id: toastId });
    }
  };

  return (
    <main className={styles.main}>
      <Toaster position="top-center" />
      <div className={styles.container}>
        <>
          {textAreas.map((textArea) => (
            <div key={textArea.id} className={styles.textAreaWrapper}>
              <textarea
                className={styles.textarea}
                rows={1}
                value={textArea.value}
                onChange={(e) => handleTextChange(textArea.id, e.target)}
              />
              <IconButton
                aria-label="remove textarea"
                onClick={() => removeTextArea(textArea.id)}
                sx={{
                  backgroundColor: 'error.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'error.dark',
                  },
                }}
              >
                <RemoveIcon />
              </IconButton>
            </div>
          ))}
          <div className={styles.actions}>
            <IconButton
              aria-label="add textarea"
              onClick={addTextArea}
              sx={{ backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}
            ><AddIcon /></IconButton>
            <Button variant="contained" onClick={handleSubmit}>決める！</Button>
          </div>
        </>
      </div>
    </main>
  );
}
