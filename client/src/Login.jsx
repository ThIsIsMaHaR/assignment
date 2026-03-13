import { useState } from 'react';
import { login } from './api';

const Login = ({ setUser }) => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(form);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
    } catch (err) {
      alert("Login failed: " + err.response.data.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <input className="w-full border p-2 mb-4" placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} />
        <input className="w-full border p-2 mb-4" type="password" placeholder="Password" onChange={(e) => setForm({...form, password: e.target.value})} />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
};

export default Login;