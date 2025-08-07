import { useState } from 'react';

type TaskInputProps = {
  onAddTask: (title: string) => void;
};

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [task, setTask] = useState('');
  const handleAdd = () => {
    if (task.trim()) {
      onAddTask(task.trim()); //calling the function from the parent
      setTask('');
    }
  };
  return (
    <div>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        placeholder='Enter a task'
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
