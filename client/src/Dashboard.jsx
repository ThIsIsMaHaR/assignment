import { useEffect, useState } from 'react';
import { fetchTasks, createTask, deleteTask } from './api';
import { LogOut, Trash2 } from 'lucide-react';

const Dashboard = ({ user, setUser }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const { data } = await fetchTasks();
    setTasks(data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await createTask(newTask);
    setNewTask({ title: '', description: '' });
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user.name} ({user.role})</h1>
        <button onClick={logout} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded"><LogOut size={18}/> Logout</button>
      </div>

      <form onSubmit={handleCreate} className="mb-8 flex gap-4">
        <input className="border p-2 flex-1" placeholder="Task Title" value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})} required />
        <button className="bg-green-600 text-white px-6 py-2 rounded">Add Task</button>
      </form>

      <div className="grid gap-4">
        {tasks.map(task => (
          <div key={task._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p className="text-gray-500 text-sm">Created by: {task.user?.name || 'You'}</p>
            </div>
            <button onClick={() => handleDelete(task._id)} className="text-red-500"><Trash2/></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;