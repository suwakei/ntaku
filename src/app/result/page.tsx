"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '@mui/material';
import styles from '../page.module.css';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const resultValue = searchParams.get('value');

  return (
    <div className={styles.resultContainer}>
      <h2>結果は...</h2>
      <p className={styles.resultText}>{resultValue || '結果がありません'}</p>
      <Button variant="contained" onClick={() => router.push('/')}>もう一度</Button>
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
