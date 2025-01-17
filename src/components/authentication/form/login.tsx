import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    // Call NextAuth's signIn method with 'credentials' provider
    const result = await signIn('credentials', {
      redirect: false, // Don't automatically redirect
      email,
      password,
    });

    if (result?.error) {
      setMessage(result.error); // Handle error message if login fails
    } else {
      setMessage('Login successful!');
      router.push('/'); // Redirect after login success
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
    </div>
  );
};

export default Login;
