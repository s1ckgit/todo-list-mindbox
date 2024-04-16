import { type Dispatch, type SetStateAction } from 'react';
import styles from './Todo.module.css';
import { type todosType, type ITodo } from '@/app/page';

interface TodoProps {
  todo: ITodo,
  setTodos: Dispatch<SetStateAction<todosType>>;
}

const Todo = ({
  todo,
  setTodos
}: TodoProps) => {
  const [value, status] = todo;

  const onClick = () => {
    setTodos((map) => {
      return new Map(map).set(value, status === 'active' ? 'completed' : 'active');
    });
  };

  return (
    <div className={styles.todo}>
      <button role='button' onClick={onClick} className={status === 'active' ? styles.active : styles.completed}/>
      <h2 className={`${styles.name} ${status === 'completed' && styles.completedTodo}`}>{value}</h2>
    </div>
  );
};
export default Todo;
