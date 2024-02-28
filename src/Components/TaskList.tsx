import TaskListItem from "./TaskListItem";
import { todo } from "./ToDo";
import TaskLoaderComponent from "./TaskLoaderComponent";
import WhiteTrash from "../assets/Trash_white.svg";
import React from "react";

export interface TaskListProps {
    todos: todo[];
    setFilter: (filter: string) => void;
    handleCheckboxChange: (id: string) => void;
    deleteDoneTodos: () => void;
    handleDeleteTask: (id: string) => void;
    isLoading: boolean;
}

export default function TaskList({
    todos,
    setFilter,
    handleCheckboxChange,
    deleteDoneTodos,
    handleDeleteTask,
    isLoading,
}: TaskListProps) {
    function handleFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setFilter(e.target.value);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-2xl underline uppercase self-center">
                    todos:
                </h3>
                <div className="flex items-center space-x-5">
                    <select
                        onChange={handleFilterChange}
                        className="px-2 py-[6px] rounded-md bg-white text-black font-bold border-2 border-gray-600"
                    >
                        <option value="all">All</option>
                        <option value="done">Done</option>
                        <option value="undone">Ongoing</option>
                    </select>
                    <button
                        onClick={deleteDoneTodos}
                        className="w-9 h-9 rounded-md bg-[#397367] border-2 text-white hover:bg-[#469c68d2] hover:scale-105 transition duration-300 ease-in-out"
                    >
                        <img
                            src={WhiteTrash}
                            className="w-5 h-5 m-auto"
                            alt="trash icon"
                        />
                    </button>
                </div>
            </div>
            <div></div>
            {isLoading ? (
                <div className="flex mt-20 justify-center">
                    <TaskLoaderComponent />
                </div>
            ) : (
                <ul className="space-y-2">
                    {todos.map((todo, index) => (
                        <TaskListItem
                            key={index}
                            todo={todo}
                            handleCheckboxChange={() =>
                                handleCheckboxChange(todo.id as string)
                            }
                            handleDeleteTask={() =>
                                handleDeleteTask(todo.id as string)
                            }
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
