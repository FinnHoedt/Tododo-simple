import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import Google from "../assets/google_icon.png";

interface SignInProps {
    setUser: React.Dispatch<React.SetStateAction<String | null>>;
}

export default function SignIn({ setUser }: SignInProps) {
    const login = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user?.uid);

            if (user?.uid) localStorage.setItem("userId", user?.uid);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="w-full mt-20 flex items-center justify-center">
            <button
                onClick={login}
                className="flex justify-center w-1/3 items-center px-3 m-2 py-2 bg-gray-200 bg-opacity-75 rounded-md border-2 shadow-md border-gray-600 font-bold text-3xl"
            >
                <h1>Login</h1>
                <img className="w-12 h-12" src={Google} alt="Google" />
            </button>
        </div>
    );
}
