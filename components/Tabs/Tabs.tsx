'use client';

import * as T from '@radix-ui/react-tabs';

import styles from './Tabs.module.css';
import { type todosType } from '@/app/page';
import { type Dispatch, type SetStateAction } from 'react';
import Todo from '../Todo/Todo';

interface TabsProps {
  todos: todosType,
  setTodos: Dispatch<SetStateAction<todosType>>;
}

const Tabs = ({
  todos,
  setTodos
}: TabsProps) => {

  const itemsLeft = Array.from(todos.values()).filter((value) => value === 'active').length;

  const onClear = () => {
    setTodos((map) => {
      const arr = Array.from(map).filter((todo) => todo[1] === 'active');
      return new Map(arr);
    });
  };

  return (
    <T.Root defaultValue='all' className={styles.root}>
        <T.List className={styles.list}>
          <div className={styles.triggers}>
            <T.Trigger className={styles.trigger} value='all'>
              All
            </T.Trigger>
            <T.Trigger className={styles.trigger} value='active'>
              Active
            </T.Trigger>
            <T.Trigger className={styles.trigger} value='completed'>
              Completed
            </T.Trigger>
          </div>
          <button onClick={onClear} className={styles.clear}>Clear completed</button>
          <p className={styles.left}>{itemsLeft} items left</p>
        </T.List>
        <T.Content className={styles.content} value='all'>
          <ul className={styles.ul}>
            {Array.from(todos).toReversed().map((todo, i) => (
            <li key={i}>
              <Todo todo={todo} setTodos={setTodos} />
            </li>
            ))}
          </ul>
        </T.Content>
        <T.Content className={styles.content} value='active'>
          <ul className={styles.ul}>
            {Array.from(todos).toReversed().map(([value, status] , i) => {
              if (status === 'active') {
                return (
                  <li key={i}>
                    <Todo todo={[value, status]} setTodos={setTodos} />
                  </li>
                );
              } else {
                return null;
              }
            }
            )}
          </ul>
        </T.Content>
        <T.Content className={styles.content} value='completed'>
          <ul className={styles.ul}>
            {Array.from(todos).toReversed().map(([value, status], i) => {
              if (status === 'completed') {
                return (
                  <li key={i}>
                    <Todo todo={[value, status]} setTodos={setTodos} />
                  </li>
                );
              } else {
                return null;
              }
            }
            )}
          </ul>
        </T.Content>
    </T.Root>
  );
};
export default Tabs;
