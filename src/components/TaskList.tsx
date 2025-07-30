import { useState } from 'react';

export default function TaskList() {
  const [task, setTask] = useState(''); //create a state variable for input
  const [tasks, setTasks] = useState<string[]>([]); //to store the individual task from the user
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);
    console.log(event.target.value);
  }

  function handleAddTask() {
    if (task.trim() === '') return;
    setTasks([...tasks, task]);
    setTask(''); //clear input
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
          <li key={index}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
