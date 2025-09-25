"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import DOMPurify from 'dompurify';
import { Button } from '@mui/material';
import styles from '../page.module.css';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const unsafeResultValue = searchParams.get('value');

  const resultValue = unsafeResultValue ? DOMPurify.sanitize(unsafeResultValue) : '結果がありません';

  return (
    <div className={styles.resultContainer}>
      <h2>結果は...</h2>
      <p className={styles.resultText}>{resultValue}</p>
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
