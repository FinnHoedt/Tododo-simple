import ToDo from "./Components/ToDo";
import SignIn from "./Components/SignIn";
import SignOut from "./Components/SignOut";
import { useEffect, useState } from "react";

function App() {
    const [user, setUser] = useState<String | null>(
        localStorage.getItem("userId")
    );

    useEffect(() => {
        document.title = "Tododo";
    }, []);

    return (
        <>
            <div
                className="mt-5 grid mb-5"
                style={{ gridTemplateColumns: "1fr auto 1fr" }}
            >
                <h1 className="font-bold col-start-2 text-4xl md:text-5xl text-center font-serif">
                    {user ? "Tododo" : "Welcome to Tododo!"}
                </h1>
                {user && (
                    <div className="flex justify-end mr-3">
                        <SignOut setUser={setUser} />
                    </div>
                )}
            </div>

            {user ? <ToDo user={user} /> : <SignIn setUser={setUser} />}
        </>
    );
}

export default App;
