import React from "react";
import { todo } from "./ToDo";
import Trash from "../assets/Trash.svg";

interface TaskListItemProps {
    todo: todo;
    handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDeleteTask: () => void;
}

export default function TaskListItem({
    todo,
    handleCheckboxChange,
    handleDeleteTask,
}: TaskListItemProps) {
    return (
        <li className="flex justify-between items-center ml-3">
            <div className="flex items-center space-x-2">
                <input
                    className="min-h-6 min-w-6 rounded-md border-2 border-gray-500 hover:border-gray-600 hover:border-4 transition duration-300 ease-in-out"
                    type="checkbox"
                    checked={todo.done}
                    onChange={handleCheckboxChange}
                />
                <p
                    className={`font-bold sm:text-lg md:text-xl 
                        ${
                            todo.done
                                ? "text-gray-500 opacity-50"
                                : "text-gray-800"
                        }`}
                >
                    {todo.task}
                </p>
            </div>
            <button
                className="w-9 h-9 rounded-md bg-gray-200 text-white hover:bg-gray-300 hover:scale-105 transition duration-300 ease-in-out"
                onClick={handleDeleteTask}
            >
                <img src={Trash} className="w-5 h-5 m-auto" alt="trash icon" />
            </button>
        </li>
    );
}
