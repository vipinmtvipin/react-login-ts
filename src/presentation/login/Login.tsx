import slsImg from "../../assets/sls_logo_white.svg";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import styles from "./Login.module.css";
import React, { useState, useCallback } from "react";
import { useLogin } from "../login/hooks/useLogin";
import { useLoginValidation } from "../login/hooks/useLoginValidation";
import { LoginRequest } from "../../data/model/LoginRequest";
import { toast } from "react-toastify";
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

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error} = useLogin();
  const { errors, validate, validateField } = useLoginValidation();

  const handleFieldBlur = useCallback(
    (field: "username" | "password") => {
      validateField(field, field === "username" ? username : password);
    },
    [username, password, validateField]
  );

  const handleLogin = useCallback(async () => {
    try {
    
      const isValid = validate(username, password);
      if (!isValid) return;

      const loginRequest: LoginRequest = {
        username: username.trim(),
        password: password,
      };

      const user = await login(loginRequest);

      setPassword("");
      setUsername("");
      console.log("Login Success", user!.id);
      toast.success(`Login successful - ID: ${user!.id}`);
    } catch (err) {
      console.error("Login failed", err);
      if (error) {
        toast.error(error);
      }
    }
  }, [username, password, validate, login, error]);

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
            onBlur={() => handleFieldBlur("username")}
            placeholder="Enter your username"
            name="username"
            error={errors.username}
            prefixIcon={<FiUser />}
          />

          <div className={styles.spacer} />

          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleFieldBlur("password")}
            placeholder="Enter your password"
            name="password"
            error={errors.password}
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

          <Button
            type="button"
            children={<div>Sign in</div>}
            loading={loading}
            onClick={handleLogin}
          />
        </div>
      </div>

      <div className={styles.footer}>
        <p>All rights reserved to STC Channels 2025 ©</p>
        <p>App Version: 4.0.45 (454)</p>
      </div>
    </div>
  );
};

export default LoginPage;
