import React from 'react';
import { useTheme } from './ThemeContext';
import styles from './ThemeSwitcher.module.css';
import sun from '../assets/sun.png';
import moon from '../assets/moon.png';

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
          <img
            src={sun}
            alt="Sun icon"
            className={`${styles.icon} ${styles.sunIcon}`}
          />
          <img
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
