import ToDo from "./Components/ToDo";
import SignIn from "./Components/SignIn";
import SignOut from "./Components/SignOut";
import { useState } from "react";

function App() {
    const [user, setUser] = useState<String | null>(
        localStorage.getItem("userId")
    );

    return (
        <>
            <div
                className="mt-5 grid"
                style={{ gridTemplateColumns: "1fr auto 1fr" }}
            >
                <h1 className="font-bold col-start-2 text-4xl md:text-5xl text-center font-serif">
                    ToDoDo
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
