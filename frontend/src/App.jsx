
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Home from "./pages/Home/home";
import Survey from "./pages/Survey/page";
import Result from "./pages/Result/page";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Manage from "./Admin/Manage/page";
import Member from "./pages/Member/Page";
import Profile from "./Admin/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/results" element={<Result />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/members" element={<Member />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;