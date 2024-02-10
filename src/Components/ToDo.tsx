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
}

export default function ToDo() {
    const [todos, setTodos] = useState<todo[]>([]);
    const [filter, setFilter] = useState<string>("all");
    const [todo, setTodo] = useState<todo>({ task: "", done: false });

    // add to database
    const handleAddTask = async (event: React.FormEvent) => {
        event?.preventDefault();
        if (todo.task === "") return;
        try {
            const docRef = await addDoc(collection(db, "todos"), {
                task: todo.task,
                done: todo.done,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setTodo({ task: "", done: false });
    };

    // get from database
    useEffect(() => {
        const q = query(collection(db, "todos"));
        onSnapshot(q, (querySnapshot) => {
            let newTodos: todo[] = [];

            querySnapshot.forEach((doc) => {
                newTodos.push({
                    id: doc.id,
                    task: doc.data().task,
                    done: doc.data().done,
                });
            });

            if (filter === "done") {
                setTodos(newTodos.filter((todo) => todo.done === true));
            } else if (filter === "undone") {
                setTodos(newTodos.filter((todo) => todo.done === false));
            } else {
                setTodos(newTodos);
            }
        });
    }, [filter]);

    // delete from database
    const handleDeleteTodo = async (id: string) => {
        const toDoToDelete = todos.find((todo) => todo.id === id) as todo;
        if (!toDoToDelete.id) return;
        await deleteDoc(doc(db, "todos", toDoToDelete.id));
    };

    // update from database
    const handleCheckboxChange = async (id: string) => {
        const toDoToChange = todos.find((todo) => todo.id === id) as todo;
        if (!toDoToChange.id) return;
        const toDoRef = doc(db, "todos", toDoToChange.id);
        await updateDoc(toDoRef, {
            done: !toDoToChange.done,
        });
    };

    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const filter = e.target.value;
        setFilter(filter);

        if (filter === "all") {
            setTodos(todos);
        } else if (filter === "done") {
            setTodos(todos.filter((todo) => todo.done === true));
        } else if (filter === "undone") {
            setTodos(todos.filter((todo) => todo.done === false));
        }
    };

    return (
        <main className="w-full p-3 flex flex-col space-y-5 items-center">
            <h1 className="text-5xl font-serif font-bold uppercase p-3">
                tododo
            </h1>
            <div className="flex flex-col space-y-5 w-full max-w-[600px] ">
                <div className="flex flex-col space-y-5">
                    <AddTask
                        todo={todo}
                        setTodo={setTodo}
                        handleAddTask={handleAddTask}
                    />
                    <TaskList
                        todos={todos}
                        handleFilter={handleFilter}
                        handleCheckboxChange={handleCheckboxChange}
                        handleDeleteTask={handleDeleteTodo}
                    />
                </div>
            </div>
        </main>
    );
}
