import TaskListItem from "./TaskListItem";
import { todo } from "./ToDo";
import TaskLoaderComponent from "./TaskLoaderComponent";

export interface TaskListProps {
    todos: todo[];
    setFilter: (filter: string) => void;
    handleCheckboxChange: (id: string) => void;
    handleDeleteTask: (id: string) => void;
    isLoading: boolean;
}

export default function TaskList({
    todos,
    setFilter,
    handleCheckboxChange,
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
                <select
                    onChange={handleFilterChange}
                    className="px-2 py-1 rounded-md bg-white text-black"
                >
                    <option value="all">Alle</option>
                    <option value="done">Erledigte</option>
                    <option value="undone">Unerledigte</option>
                </select>
            </div>
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
