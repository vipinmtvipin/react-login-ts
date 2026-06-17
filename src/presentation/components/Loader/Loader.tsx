import React from 'react';
import styles from './Loader.module.css';

export interface LoaderProps {
  label?: string;
}

const Loader: React.FC<LoaderProps> = ({ label = 'Loading' }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner} aria-label={label} role="status" />
    </div>
  );
};

export default Loader;
