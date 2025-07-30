import { useState } from 'react';

export default function TaskList() {
  const [task, setTask] = useState(''); //create a state variable for input
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);
    console.log(event.target.value);
    console.log(event.target);
  }
  return (
    <div>
      <input
        type='text'
        value={task}
        onChange={handleInputChange}
        placeholder='Enter a task '
      />
    </div>
  );
}
