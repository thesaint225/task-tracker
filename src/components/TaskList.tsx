import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage ';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TaskList() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<filterType>('all');

  const filterTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'complete') return task.completed;
  });

  const handleAddTask = (title: string) => {
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleToggle = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, complete: !task.completed } : task
      )
    );
  };

  return <div></div>;
}
