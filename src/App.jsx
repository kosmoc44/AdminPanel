import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './scss/main.scss';
import Home from "./components/Home";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import New from "./pages/New.jsx";
import { userInputs } from "./formSource.jsx";
import EditUser from "./components/EditUser.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/new" element={<ProtectedRoute element={<New inputs={userInputs} />} />} />
        <Route path="/edit/:id" element={<ProtectedRoute element={<EditUser />} />} /> {/* Добавляем маршрут редактирования */}
        <Route path="*" element={<Navigate to="/login" />} /> {/* Перенаправление на страницу входа по умолчанию */}
      </Routes>
    </AuthProvider>
  );
}

export default App;