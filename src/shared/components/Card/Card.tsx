import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * `Card` — generic container with consistent shadow and border-radius.
 * Accepts an optional `className` for feature-specific overrides.
 */
const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={[styles.card, className].filter(Boolean).join(' ')}>
    {children}
  </div>
);

export default Card;
