import logo from "./logo.svg"
import "./App.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<h1>Home page</h1>}></Route>
                    <Route path="/login" element={<h1>Login page</h1>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
