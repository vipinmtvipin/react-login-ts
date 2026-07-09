import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
  FiGlobe,
  FiTruck,
  FiBox,
  FiBarChart2,
} from 'react-icons/fi';

import Button from '../../../../shared/components/Button/Button';
import Input from '../../../../shared/components/Input/Input';
import { useLogin } from '../hooks/useLogin';
import { useLoginValidation } from '../hooks/useLoginValidation';
import { ROUTES } from '../../../../app/routes/RouteConstants';
import slsImg from '../../../../assets/sls_logo_white.svg';
import styles from './LoginPage.module.css';
import env from '../../../../app/config/env';

/**
 * `LoginPage`
 *
 * Presentation-only component responsible for rendering the login form and
 * coordinating user interactions.
 *
 * ## Responsibilities
 * - Render UI.
 * - Delegate validation to `useLoginValidation`.
 * - Delegate authentication to `useLogin` (which calls `AuthContext`).
 * - Navigate to the home screen on success.
 * - Display toast notifications.
 *
 * ## What does NOT belong here
 * - Business logic (in use cases).
 * - Network calls (in data sources).
 * - Token handling (in repositories / storage).
 */
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { handleLogin, loading, error } = useLogin();
  const { errors, validate, validateField } = useLoginValidation();

  const handleFieldBlur = useCallback(
    (field: 'username' | 'password') => {
      validateField(field, field === 'username' ? username : password);
    },
    [username, password, validateField],
  );

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(async () => {
    const isValid = validate(username, password);
    if (!isValid) return;

    const success = await handleLogin({
      username: username.trim(),
      password,
    });

    if (success) {
      setUsername('');
      setPassword('');
      toast.success('Login successful! Welcome back.');
      navigate(ROUTES.HOME, { replace: true });
    } else if (error) {
      toast.error(error);
    }
  }, [username, password, validate, handleLogin, error, navigate]);

  return (
    <div className={styles.loginPage}>
      <div className={styles.languageSwitch}>
        <FiGlobe />
        <span>AR</span>
      </div>

      <div className={styles.loginContainer}>
        {/* Left Panel */}
        <div className={styles.brandingPanel}>
          <img src={slsImg} alt="Logo" className={styles.companyLogo} />

          <h1 className={styles.systemTitle}>
            Logistics Management <br /> System
          </h1>

          <div className={styles.divider} />

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}><FiBox /></div>
              <span>Real-time Order Tracking</span>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}><FiTruck /></div>
              <span>Fleet Management</span>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}><FiBarChart2 /></div>
              <span>Advanced Analytics</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <div className={styles.headerLine} />
            <div>
              <h2>Sign in</h2>
              <p>Welcome back! Please sign in to continue.</p>
            </div>
          </div>

          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => handleFieldBlur('username')}
            placeholder="Enter your username"
            name="username"
            error={errors.username}
            prefixIcon={<FiUser />}
          />

          <div className={styles.spacer} />

          <Input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleFieldBlur('password')}
            placeholder="Enter your password"
            name="password"
            error={errors.password}
            prefixIcon={<FiLock />}
            suffixIcon={showPassword ? <FiEyeOff /> : <FiEye />}
            onSuffixClick={handleTogglePassword}
          />

          <div className={styles.loginOptions}>
            <label className={styles.rememberMe}>
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <button className={styles.forgotBtn} type="button">
              Forgot Password
            </button>
          </div>

          <Button
            type="button"
            loading={loading}
            onClick={handleSubmit}
          >
            Sign in
          </Button>
        </div>
      </div>

      <div className={styles.footer}>
        <p>All rights reserved to STC Channels 2025 ©</p>
        <p>App Version: {env.appVersion}</p>
      </div>
    </div>
  );
};

export default LoginPage;
