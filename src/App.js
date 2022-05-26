import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRouter from "./components/PrivateRouter";
import routers from "./routers/router";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {routers.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.private === true ? (
                  <PrivateRouter>{route.element}</PrivateRouter>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
