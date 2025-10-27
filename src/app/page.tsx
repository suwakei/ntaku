'use client';

import styles from './page.module.css';
import { useState } from 'react';
import axios from 'axios';
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
    { id: 1, value: '' },
    { id: 2, value: '' },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addTextArea = () => {
    const newTextArea = { id: Date.now(), value: '' };
    setTextAreas([...textAreas, newTextArea]);
  };

  const removeTextArea = (idToRemove: number) => {
    if (textAreas.length <= 2) {
      toast.error('テキストエリアは2つ未満にはできません。');
    } else {
      setTextAreas(textAreas.filter((textArea) => textArea.id !== idToRemove));
    }
  };

  const handleTextChange = (id: number, target: HTMLTextAreaElement) => {
    // 高さを自動調整
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;

    setTextAreas(
      textAreas.map((textArea) =>
        textArea.id === id ? { ...textArea, value: target.value } : textArea
      )
    );
  };

  const handleSubmit = async () => {
    // 処理中の場合、何もしない
    if (isProcessing) {
      return;
    }

    // 各テキストエリアの値の前後の空白を削除
    const trimmedTextAreas = textAreas.map((textArea) => ({
      ...textArea,
      value: textArea.value.trim(),
    }));

    // 値が空のテキストエリアがあるかチェック
    const hasEmptyValue = trimmedTextAreas.some(
      (textArea) => textArea.value === ''
    );

    if (hasEmptyValue) {
      toast.error('空欄の選択肢があります。入力してください。');
      // エラートーストは2秒間表示されるので、2秒後にフラグを解除
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
      }, 2000);
      return; // 空の項目があれば、ここで処理を中断
    }

    setIsProcessing(true);
    const toastId = toast.loading('選択中...');
    try {
      const response = await axios.post('/api/answer', trimmedTextAreas);

      const result = response.data;
      if (result.selected && result.selected.value) {
        toast.dismiss(toastId);
        router.push(
          `/result?value=${encodeURIComponent(result.selected.value)}`
        );
      } else {
        throw new Error('有効なレスポンスがありませんでした。');
      }
      console.log('API Response (Selected):', result.selected);
    } catch (error) {
      toast.error(
        axios.isAxiosError(error) && error.response
          ? `エラー: ${error.response.status}`
          : '不明なエラーが発生しました。',
        { id: toastId }
      );
      // エラー時も2秒後にフラグを解除
      setTimeout(() => {
        setIsProcessing(false);
      }, 2000);
    }
  };

  return (
    <main className={styles.main}>
      <Toaster position="top-center" />
      <div className={styles.header}>
        <h1 className={styles.title}>優柔不断の、最終兵器。</h1>
        <p className={styles.description}>
          N択は、選択肢を入力し「決める！」ボタンを押して、
          ランダムに結果を選んでくれるシンプルなツールです。
          迷ったときのご飯選びやチーム分けなどにご利用ください！
        </p>
      </div>
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
            <Button
              variant="outlined"
              onClick={addTextArea}
              startIcon={<AddIcon />}
              sx={{
                color: 'black',
                borderRadius: '9999px',
                borderColor: 'white',
                backgroundColor: 'rgba(141, 238, 255, 0.73)',
                padding: '8px 22px',
                fontSize: '1rem',
                '&:hover': {
                  color: 'black',
                  borderColor: 'white',
                  backgroundColor: 'rgba(83, 223, 248, 0.73)',
                },
              }}
            >
              選択肢を増やす
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isProcessing}
              sx={{
                color: 'rgb(255, 255, 255)',
                borderRadius: '9999px',
                borderColor: 'white',
                backgroundColor: 'rgba(255, 51, 0, 0.73)',
                padding: '12px 60px',
                fontSize: '1rem',
                '&:hover': {
                  color: 'rgb(255, 255, 255)',
                  borderColor: 'rgb(255, 255, 255)',
                  backgroundColor: 'rgba(255, 0, 0, 0.73)',
                },
              }}
            >
              決める！
            </Button>
          </div>
        </>
      </div>
    </main>
  );
}
