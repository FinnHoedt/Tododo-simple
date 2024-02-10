import { auth } from "../firebase";

interface SignOutProps {
    setUser: React.Dispatch<React.SetStateAction<String | null>>;
}

export default function SignOut({ setUser }: SignOutProps) {
    function logout() {
        try {
            setUser(null);
            localStorage.removeItem("userId");
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <button
            onClick={logout}
            className="flex justify-center w-fit items-center px-3 py-2 bg-gray-200 bg-opacity-75 rounded-md border-2 hover:shadow-md border-gray-600 font-bold transition duration-150 ease-in-out"
        >
            <h1>Logout</h1>
        </button>
    );
}
