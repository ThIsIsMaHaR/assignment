import { useState, useEffect } from 'react';
import { login, register, getTasks, createTask } from './api';

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')));
  const [tasks, setTasks] = useState([]);
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [taskTitle, setTaskTitle] = useState('');

  useEffect(() => { if (user) loadTasks(); }, [user]);

  const loadTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (err) { console.error("Failed to load tasks"); }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const { data } = isLogin ? await login(form) : await register(form);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    }
  };

  if (!user) return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          {!isLogin && (
            <input 
              className="border p-3 rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="Full Name" 
              required
              onChange={e => setForm({...form, name: e.target.value})} 
            />
          )}
          <input 
            className="border p-3 rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" 
            type="email" 
            placeholder="Email Address" 
            required
            onChange={e => setForm({...form, email: e.target.value})} 
          />
          <input 
            className="border p-3 rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" 
            type="password" 
            placeholder="Password" 
            required
            onChange={e => setForm({...form, password: e.target.value})} 
          />
          <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-blue-600 font-bold hover:underline"
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-10">
      <header className="flex justify-between items-center mb-10 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
          <p className="text-gray-500">Logged in as: <span className="font-semibold">{user.name}</span> ({user.role})</p>
        </div>
        <button 
          onClick={() => { localStorage.clear(); setUser(null); }} 
          className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition"
        >
          Logout
        </button>
      </header>
      
      <section className="bg-white p-6 rounded-xl shadow-sm border mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Add New Task</h2>
        <div className="flex gap-2">
          <input 
            className="border p-3 flex-1 rounded-lg outline-none focus:ring-2 focus:ring-green-500" 
            value={taskTitle} 
            onChange={e => setTaskTitle(e.target.value)} 
            placeholder="What needs to be done?" 
          />
          <button 
            onClick={async () => { if(!taskTitle) return; await createTask({title: taskTitle}); setTaskTitle(''); loadTasks(); }} 
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition"
          >
            Add Task
          </button>
        </div>
      </section>

      <div className="grid gap-4">
        <h2 className="text-xl font-bold text-gray-800">Your Tasks</h2>
        {tasks.length === 0 && <p className="text-gray-400 italic">No tasks found. Start by adding one!</p>}
        {tasks.map(t => (
          <div key={t._id} className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center hover:shadow-md transition">
            <div>
              <h3 className="font-bold text-gray-800">{t.title}</h3>
              <p className="text-xs text-gray-400 capitalize">{t.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}