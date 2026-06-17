import slsImg from "../../assets/sls_logo_white.svg";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

import React, { useState } from "react";
import {
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
  FiGlobe,
  FiTruck,
  FiBox,
  FiBarChart2,
} from "react-icons/fi";

import styles from "./Login.module.css";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
              <div className={styles.featureIcon}>
                <FiBox />
              </div>
              <span>Real-time Order Tracking</span>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <FiTruck />
              </div>
              <span>Fleet Management</span>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <FiBarChart2 />
              </div>
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
            placeholder="Enter your username"
            name="username"
            prefixIcon={<FiUser />}
          />

          <div className={styles.spacer} />

          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            name="password"
            prefixIcon={<FiLock />}
            suffixIcon={showPassword ? <FiEyeOff /> : <FiEye />}
            onSuffixClick={() => setShowPassword(!showPassword)}
          />

          <div className={styles.loginOptions}>
            <label className={styles.rememberMe}>
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <button className={styles.forgotBtn}>Forget Password</button>
          </div>

          <Button type="button" children={<div>Sign in</div>} />
        </div>
      </div>

      <div className={styles.footer}>
        <p>All rights reserved to STC Channels 2025 ©</p>
        <p>App Version: 4.0.45 (454)</p>
      </div>
    </div>
  );
};

export default Login;
