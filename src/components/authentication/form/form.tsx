import React, { useState } from 'react'
import styles from "./form.module.css"
import Link from 'next/link'
import { registerUser } from '@/app/API'
import PasswordStrengthBar from 'react-password-strength-bar';

const AuthenticationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    let hasError = false;

    // validate email
    if (!email.trim()) {
      setEmailError('Email cannot be empty');
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

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          Register for free & start organising your job search
        </div>
        <div className={styles.inputsContainer}>
          <div className={styles.inputs}>
            <div className={styles.input}>
              <input 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              {emailError && <p className={styles.error}>{emailError}</p>}
            </div>
            
            <div className={styles.input}>
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              {passwordError && <p className={styles.error}>{passwordError}</p>}
            </div>
            
            {password && <PasswordStrengthBar password={password}/>}
            
          </div>
          <button onClick={handleRegister} className={styles.button}>Register</button>
        </div>
        
        <Link className={styles.textContainer} href="/login">
          <span>Already have an account?</span>
          <span>Log in</span>
        </Link>
      </div>
    </div>
  )
}

export default AuthenticationForm;
