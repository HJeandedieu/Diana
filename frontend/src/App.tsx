import { Routes, Route } from "react-router";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ChatScreen from "./pages/ChatScreen";
import MemoriesScreen from "./pages/MemoriesScreen";
import LandingScreen from "./pages/landing/LandingScreen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/memories" element={<MemoriesScreen />} />
      <Route path="/home" element={<LandingScreen />} />
    </Routes>
  );
}
