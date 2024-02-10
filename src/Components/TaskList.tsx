import TaskListItem from "./TaskListItem";
import { todo } from "./ToDo";

export interface TaskListProps {
    todos: todo[];
    handleFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleCheckboxChange: (id: string) => void;
    handleDeleteTask: (id: string) => void;
}

export default function TaskList({
    todos,
    handleFilter,
    handleCheckboxChange,
    handleDeleteTask,
}: TaskListProps) {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-2xl underline uppercase self-center">
                    todos:
                </h3>
                <select
                    onChange={handleFilter}
                    className="px-2 py-1 rounded-md bg-white text-black"
                >
                    <option value="all">Alle</option>
                    <option value="done">Erledigte</option>
                    <option value="undone">Unerledigte</option>
                </select>
            </div>
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
        </div>
    );
}
