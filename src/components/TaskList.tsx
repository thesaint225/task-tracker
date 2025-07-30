import { useState } from 'react';

type Task = {
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
    setTasks([...tasks, { title: task, completed: false }]);
    setTask(''); //clear input
  }

  function handleComplete(index: number) {
    const updatedTask = tasks.map((t, i) =>
      i == index ? { ...t, completed: true } : t
    );
    setTasks(updatedTask);
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
        {tasks.map((t, index) => (
          <li key={index}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}
