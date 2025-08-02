import { useEffect, useState } from 'react';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TaskList() {
  const [task, setTask] = useState(''); //create a state variable for input
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    try {
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {}
  });
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState<number | null>(null); // track which task is being edited
  const [editTitle, setEditTitle] = useState(''); //store the tempory title

  // save to localStorage whenever tasks change

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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

  // start editing
  function handleStarEditing(taskId: number, currentTitle: string) {
    setEditingId(taskId); //start editing this task
    setEditTitle(currentTitle); //pre-fill input with current title
  }

  // update te input
  function handleEditedTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEditTitle(event.target.value);
  }

  // save Edited task

  function handleSaveEdit() {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingId ? { ...task, title: editTitle } : task
      )
    );
    setEditingId(null);
    setEditTitle('');
  }

  const filterTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter == 'completed') return task.completed;
    return true; //for 'all'
  });

  return (
    <div>
      <input
        type='text'
        value={task}
        onChange={handleInputChange}
        placeholder='Enter a task '
      />
      <button onClick={handleAddTask}> Add Task</button>
      <p>Loaded tasks: {tasks.length}</p>
      <ul>
        {filterTasks.map((task, _) => (
          <li
            key={task.id}
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {editingId === task.id ? (
              <>
                <input
                  type='text'
                  value={editTitle}
                  onChange={handleEditedTitleChange}
                />
                <button onClick={handleSaveEdit}>Save</button>
              </>
            ) : (
              <>
                {task.title}
                <button onClick={() => handleComplete(task.id)}>
                  complete
                </button>
                <button onClick={() => handleDelete(task.id)}>delete</button>
                <button
                  onClick={() => {
                    setEditingId(task.id);
                    setEditTitle(task.title);
                  }}
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('active')}>Active</button>
      <button onClick={() => setFilter('completed')}>Completed</button>
    </div>
  );
}
