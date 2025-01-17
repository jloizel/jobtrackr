import { registerUser } from '@/app/API';
import { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await registerUser({ email, password });
      setMessage(response.message);
    } catch (error: any) {
      setMessage(error.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
