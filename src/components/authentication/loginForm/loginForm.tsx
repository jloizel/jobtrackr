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
  const [type, setType] = useState('password');
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });
      setMessage('Login successful!');
      setIsLoggedIn(true);
      router.push('/');
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
        <div className={styles.input}>
          <div className={styles.inputWrapper}>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.input}>
          <div className={styles.inputWrapper}>
            <span>Password</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button onClick={handleLogin}>Login</button>
        {message && <p>{message}</p>}
        {isLoggedIn && (
          <p>Welcome back! You are logged in.</p>
        )}
      </div>
    </div>
  );
};

export default Login;
