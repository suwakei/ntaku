import Link from 'next/link';
import styles from './Header.module.css';
import Logo from '@/app/components/ui/Logo.tsx';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        <Logo className={styles.logo} />
      </Link>
    </header>
  );
}
