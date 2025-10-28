'use client'; // Material-UIのコンポーネントを使用するため

import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import XIcon from '@mui/icons-material/X';
import { Button } from '@mui/material';
import { environments } from '@/envs';

export default function Header() {
  // Xで共有するためのURLを生成 (アプリ全体に関する情報)
  const shareText =
    'N択 - 迷った時の最終兵器！ランダム選択アプリを使ってみよう！';
  const hashtags = 'N択,運試し,優柔不断'; // 複数のハッシュタグをカンマ区切りで指定

  const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(environments.APP_URL)}&hashtags=${encodeURIComponent(hashtags)}`;

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        <Image
          src="/ntakuLogo.png"
          alt="N択 ロゴ"
          width={120}
          height={90}
          priority
        />
      </Link>
      <Button
        component="a" // ボタンをaタグとして機能させる
        href={twitterIntentUrl}
        target="_blank" // 新しいタブで開く
        rel="noopener noreferrer"
        variant="outlined"
        startIcon={<XIcon />} // Xアイコンをボタンの左に配置
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
        ポスト
      </Button>
    </header>
  );
}
