import { useState } from 'react';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TaskList() {
  const [task, setTask] = useState(''); //create a state variable for input
  const [tasks, setTasks] = useState<Task[]>([]); //to store the individual task from the user
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);
    console.log(event.target.value);
  }

  function handleAddTask() {
    if (task.trim() === '') return;
    const newTask = {
      id: Date.now(),
      title: task,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTask(''); //clear input
  }

  function handleComplete(taskId: number) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  }

  function handleDelete(taskId: number) {
    setTasks((updatedTask) => updatedTask.filter((task) => task.id !== taskId));
  }

  return (
    <div>
      <input
        type='text'
        value={task}
        onChange={handleInputChange}
        placeholder='Enter a task '
      />
      <button onClick={handleAddTask}> Add Task</button>
      <ul>
        {tasks.map((task, _) => (
          <li
            key={task.id}
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {task.title}
            <button onClick={() => handleComplete(task.id)}>complete</button>
            <button onClick={() => handleDelete(task.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
