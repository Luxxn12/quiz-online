import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "user" && password === "password") {
      const user = { username };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/quiz');
    } else {
      alert('Masukkan username dan password!');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit}  className="p-6 w-96 bg-white rounded shadow-md">
      <h2 className="mb-4 text-xl font-bold">Login Kuis</h2>
        <div className="mb-4">
          <label className="mb-1">Username:</label><br/>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
            placeholder='Username'
          />
        </div>
        <div className="mb-4">
          <label className="mb-1">Password:</label><br/>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
            placeholder='Password'
          />
        </div>
        <button type="submit" className="w-full px-3 py-2 text-white bg-blue-500 rounded">Masuk</button>
      </form>
    </div>
  );
};

export default Login;
