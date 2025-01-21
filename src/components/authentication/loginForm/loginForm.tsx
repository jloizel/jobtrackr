import { loginUser } from '@/app/API';
import { useContext, useState } from 'react';
import { useRouter } from "next/navigation";
import { AuthContext } from '@/providers/AuthProvider';
import styles from "./loginForm.module.css"
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

const Login = () => {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [type, setType] = useState('password');
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [disableButton, setDisabledButton] = useState(true);

  const handleLogin = async () => {
    let hasError = false;
  
    // validate email format
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
      const response = await loginUser({ email, password });
      setMessage('Login successful!');
      setIsLoggedIn(true);

      // save email to local storage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);

      router.push('/');
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred');
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
        <div className={styles.submitButtonContainer}>
          <button onClick={handleLogin} className={styles.button}>Login</button>
          {message && <span className={styles.message}>{message}</span>}
          {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
        </div>
      </div>
    </div>
  );
};

export default Login;
