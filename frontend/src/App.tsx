import { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { RedirectRoute } from "./components/RedirectRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import CreateTaskPage from "./pages/CreateTaskPage";
import TaskSingle from "./pages/TaskSingle";
import UpdateTaskPage from "./pages/UpdateTaskPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* подстановочный путь */}
        <Route path="/" element={<Home />} />
        <Route path="/tasks/:id" element={<TaskSingle />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/tasks/create" element={<CreateTaskPage />} />
          <Route path="/tasks/update/:id" element={<UpdateTaskPage />} />
        </Route>
        <Route element={<RedirectRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
