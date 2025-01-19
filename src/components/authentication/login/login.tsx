import { loginUser } from '@/app/API';
import { useContext, useState } from 'react';
import { useRouter } from "next/navigation";
import { AuthContext } from '@/providers/AuthProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); 

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

  return (
    <div>
      <h1>Login</h1>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
      {isLoggedIn && (
        <p>Welcome back! You are logged in.</p>
      )}
    </div>
  );
};

export default Login;
