import './App.css';
import BaseRouter from "./routes/BaseRouter.tsx";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <BaseRouter/>
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        padding: "12px 24px",
                        color: "#222",
                        fontSize: "1.1rem",
                        borderRadius: "10px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        fontWeight: "600",
                        zIndex: 9999,
                        maxWidth: "400px",
                        textAlign: "center",
                    },
                    success: {
                        style: {
                            background: "#D2F6CC",
                            border: "1.5px solid #88C997",
                        },
                    },
                    error: {
                        style: {
                            background: "#FAE6E8",
                            border: "1.5px solid #E4737A",
                        },
                    },
                    duration: 2000,
                }}
            />
        </>
    );
}



export default App;
