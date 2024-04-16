'use client';

import Tabs from "@/components/Tabs/Tabs";
import styles from "./page.module.css";
import { useState } from "react";
import Form from "@/components/Form/Form";

export type ITodo = [value: string, status: 'active' | 'completed']; 

export type todosType = Map<ITodo[0], ITodo[1]>;

export default function Home() {
  const [todos, setTodos] = useState<todosType>(new Map());

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>TODOS</h1>
      <Form todos={todos} setTodos={setTodos}/>
      <Tabs setTodos={setTodos} todos={todos}/>
    </main>
  );
}
