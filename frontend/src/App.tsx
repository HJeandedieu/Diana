import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Memories from "./pages/Memories";
import LandingPage from "./pages/landing/LandingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/memories" element={<Memories />} />
      <Route path="/home" element={<LandingPage />} />
    </Routes>
  );
}
