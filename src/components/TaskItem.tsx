import { useState } from 'react';
import type { Task } from '../Types/taskType';

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
};
export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    onEdit(task.id, editTitle); //call from the parent function to update the task ;
    setIsEditing(false); //Turn off editing mode
  };
  return (
    <div>
      {isEditing ? (
        <>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <button onClick={handleSave}>save</button>
        </>
      ) : (
        <>
          <span onClick={() => onToggle(task.id)}>{task.title}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </>
      )}
    </div>
  );
}
