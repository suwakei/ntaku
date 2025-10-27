'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import DOMPurify from 'dompurify';
import { Button } from '@mui/material';
import XIcon from '@mui/icons-material/X';
import styles from '../page.module.css';
import { APP_URL } from '@/constants/const';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const unsafeResultValue = searchParams.get('value');

  const resultValue = unsafeResultValue
    ? DOMPurify.sanitize(unsafeResultValue)
    : '結果がありません';

  // Xで共有するためのURLを生成
  const shareText = `N択で「${resultValue}」に決まりました！`;
  const hashtags = 'N択,二択,三択,運試し';

  const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(APP_URL)}&hashtags=${encodeURIComponent(hashtags)}`;

  return (
    <div className={styles.resultContainer}>
      <h2 className={styles.resultTitle}>今回はこれに決まり！</h2>
      <p className={styles.resultText}>{resultValue}</p>
      <p className={styles.resultSubtext}>
        この選択が、素晴らしい一日をもたらしますように！
      </p>
      <div className={styles.actions}>
        <Button
          variant="contained"
          onClick={() => router.push('/')}
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
          もう一度
        </Button>
        <Button
          component="a"
          href={twitterIntentUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          startIcon={<XIcon />}
          sx={{
            borderRadius: '9999px',
            color: 'rgb(255, 255, 255)',
            borderColor: 'rgb(255, 255, 255)',
            backgroundColor: 'rgb(0, 0, 0)',
            '&:hover': {
              color: 'rgb(255, 255, 255)',
              borderColor: 'rgb(255, 255, 255)',
              backgroundColor: 'rgb(65, 64, 64)',
            },
          }}
        >
          結果をポスト
        </Button>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <main className={styles.main}>
      <Suspense fallback={<div>読み込み中...</div>}>
        <ResultContent />
      </Suspense>
    </main>
  );
}
