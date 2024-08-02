'use client';
import React from 'react';
import { useTheme } from './ThemeContext';
import Image from 'next/image';
import styles from './ThemeSwitcher.module.css';
import sun from '../../../public/sun.png';
import moon from '../../../public/moon.png';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={styles.switcherWrapper}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={handleChange}
        />
        <span className={styles.slider}>
          <Image
            src={sun}
            alt="Sun icon"
            className={`${styles.icon} ${styles.sunIcon}`}
          />
          <Image
            src={moon}
            alt="Moon icon"
            className={`${styles.icon} ${styles.moonIcon}`}
          />
        </span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
