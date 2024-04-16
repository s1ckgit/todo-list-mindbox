'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Form.module.css';
import { type todosType } from '@/app/page';

interface FormProps {
  setTodos: (todos: todosType) => void;
  todos: todosType;
}

const Form = ({
  setTodos,
  todos
}: FormProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue === '') return;

    const newTodos = new Map(todos).set(inputValue, 'active');

    setTodos(newTodos);
    setInputValue('');
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input placeholder='Что планируем?' value={inputValue} onChange={onChange} className={styles.input}/>
      <button className={styles.submit} type="submit">TODO</button>
    </form>
  );
};
export default Form;
