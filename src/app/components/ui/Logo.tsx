import React from 'react';

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 120" {...props}>
    <defs>
      {/* グラデーション */}
      <linearGradient id="gradN" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f472b6', stopOpacity: 1 }} />{' '}
        {/* ピンク */}
        <stop
          offset="100%"
          style={{ stopColor: '#facc15', stopOpacity: 1 }}
        />{' '}
        {/* 黄色 */}
      </linearGradient>
      <linearGradient id="gradT" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#34d399', stopOpacity: 1 }} />{' '}
        {/* 緑 */}
        <stop
          offset="100%"
          style={{ stopColor: '#60a5fa', stopOpacity: 1 }}
        />{' '}
        {/* 青 */}
      </linearGradient>
      {/* ドロップシャドウ */}
      <filter id="shadow" x="-20%" y="-20%" width="150%" height="150%">
        <feDropShadow
          dx="2"
          dy="4"
          stdDeviation="4"
          floodColor="#000"
          floodOpacity={0.3}
        />
      </filter>
    </defs>
    {/* N */}
    <text
      x="20"
      y="80"
      fontFamily="Comic Sans MS, Arial Rounded MT Bold, sans-serif"
      fontSize="64"
      fontWeight="bold"
      fill="url(#gradN)"
      filter="url(#shadow)"
    >
      N
    </text>
    {/* 択 */}
    <text
      x="110"
      y="80"
      fontFamily="Comic Sans MS, Arial Rounded MT Bold, sans-serif"
      fontSize="48"
      fontWeight="bold"
      fill="url(#gradT)"
      filter="url(#shadow)"
    >
      択
    </text>
  </svg>
);

export default Logo;
