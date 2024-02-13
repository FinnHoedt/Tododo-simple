import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    updateDoc,
} from "firebase/firestore";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

export interface todo {
    id?: string;
    task: string;
    done: boolean;
    timestamp?: Date;
}

interface ToDoProps {
    user: String | null;
}

export default function ToDo({ user }: ToDoProps) {
    const [allTodos, setAllTodos] = useState<todo[]>([]);
    const [todos, setTodos] = useState<todo[]>([]);
    const [filter, setFilter] = useState<string>("all");
    const [todo, setTodo] = useState<todo>({ task: "", done: false });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // add to database
    const handleAddTask = async (event: React.FormEvent) => {
        event?.preventDefault();
        if (todo.task === "") return;
        console.log(user);
        try {
            const docRef = await addDoc(collection(db, `todos/${user}/tasks`), {
                task: todo.task,
                done: todo.done,
                timestamp: new Date(),
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setTodo({ task: "", done: false });
    };

    // get from database
    useEffect((): void => {
        setIsLoading(true);

        const q = query(collection(db, `todos/${user}/tasks`));
        onSnapshot(q, (querySnapshot) => {
            let newTodos: todo[] = [];

            querySnapshot.forEach((doc) => {
                newTodos.push({
                    id: doc.id,
                    task: doc.data().task,
                    done: doc.data().done,
                    timestamp: doc.data().timestamp.toDate(),
                });
            });

            newTodos.sort(
                (a, b) => a.timestamp?.getTime()! - b.timestamp?.getTime()!
            );

            setAllTodos(newTodos);
            setIsLoading(false);
        });
    }, [user]);

    // filter todos
    useEffect(() => {
        if (filter === "done") {
            setTodos(allTodos.filter((todo) => todo.done === true));
        } else if (filter === "undone") {
            setTodos(allTodos.filter((todo) => todo.done === false));
        } else {
            setTodos(allTodos);
        }
    }, [allTodos, filter]);

    // delete from database
    const handleDeleteTodo = async (id: string) => {
        const toDoToDelete = todos.find((todo) => todo.id === id) as todo;
        if (!toDoToDelete.id) return;
        await deleteDoc(doc(db, `todos/${user}/tasks`, toDoToDelete.id));
    };

    // update from database
    const handleCheckboxChange = async (id: string) => {
        const toDoToChange = todos.find((todo) => todo.id === id) as todo;
        if (!toDoToChange.id) return;
        const toDoRef = doc(db, `todos/${user}/tasks`, toDoToChange.id);
        await updateDoc(toDoRef, {
            done: !toDoToChange.done,
        });
    };

    return (
        <main className="w-full p-3 flex flex-col space-y-5 items-center">
            <div className="flex flex-col space-y-5 w-full max-w-[600px] ">
                <div className="flex flex-col space-y-5">
                    <AddTask
                        todo={todo}
                        setTodo={setTodo}
                        handleAddTask={handleAddTask}
                    />
                    <TaskList
                        todos={todos}
                        setFilter={setFilter}
                        handleCheckboxChange={handleCheckboxChange}
                        handleDeleteTask={handleDeleteTodo}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </main>
    );
}
