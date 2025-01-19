import React, { useState } from 'react'
import styles from "./form.module.css"
import Link from 'next/link'
import { registerUser } from '@/app/API'
import PasswordStrengthBar from 'react-password-strength-bar';
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { Icon } from '@mui/material';


const AuthenticationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('password');
  const [passwordFocused, setPasswordFocused] = useState(false);


  const handleRegister = async () => {
    let hasError = false;

    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!email.trim()) {
      setEmailError('Email cannot be empty');
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    } else {
      setEmailError('');
    }

    // validate password
    if (!password.trim()) {
      setPasswordError('Password cannot be empty');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (hasError) {
      return;
    }

    try {
      const response = await registerUser({ email, password });
      setMessage(response.message);
    } catch (error: any) {
      setMessage(error.message || 'An error occurred');
    }
  };

  const handleToggle = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
    setType('password');
  };

  return (
      <div className={styles.container}>
        <div className={styles.inputsContainer}>
          <div className={styles.inputs}>
            <div className={styles.input}>
              <div className={styles.inputWrapper}>
                <span>Email</span>
                <input 
                type='email'
                  placeholder="Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              {emailError && <p className={styles.error}>{emailError}</p>}
            </div>
            
            <div className={styles.input}>
              <div className={styles.inputWrapper}>
                <span>Password</span>
                <input
                  type={type}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                />
                {passwordFocused && (
                  <button
                    type="button"
                    className={styles.iconButton}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleToggle}
                  >
                    {type === 'password' ? <IoMdEye className={styles.passwordIcon} /> : <IoMdEyeOff className={styles.passwordIcon} />}
                  </button>
                )}
              </div>
              {passwordError && <p className={styles.error}>{passwordError}</p>}
            </div>

            
            {password && <PasswordStrengthBar password={password}/>}
            
          </div>
          <button onClick={handleRegister} className={styles.button}>Register</button>
        </div>
      </div>
  )
}

export default AuthenticationForm;
