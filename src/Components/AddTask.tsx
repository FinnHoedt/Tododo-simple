import React from "react";
import { todo } from "./ToDo";

interface AddTaskProps {
    todo: todo;
    setTodo: (todo: todo) => void;
    handleAddTask: (event: React.FormEvent) => void;
}

export default function AddTask({
    todo,
    setTodo,
    handleAddTask,
}: AddTaskProps) {
    return (
        <form onSubmit={handleAddTask} className="flex flex-col space-y-2">
            <label className="font-bold text-2xl" htmlFor="task">
                Task:
            </label>
            <input
                className="text-black px-3 py-1 rounded-md border-2 border-gray-500"
                placeholder="Task..."
                type="text"
                id="task"
                value={todo.task}
                onChange={(e) => setTodo({ ...todo, task: e.target.value })}
            />
            <button
                className="bg-white text-black p-2 rounded-md border border-gray-500 shadow-none hover:shadow-md hover:bg-gray-200 transition duration-300 ease-in-out"
                type="submit"
            >
                Add to List
            </button>
        </form>
    );
}
