import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup.tsx";
import Signin from "./pages/Signin.tsx";
import Welcome from "./pages/Welcome.tsx";
import NoPageMatch from "./pages/NoPageMatch.tsx";
import ProtectedRoute from "./protectedRoute.tsx";
import { AuthProvider } from "./context/authContext.tsx";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Signin />} />
            <Route
              path="/home"
              element={<ProtectedRoute element={<Welcome />} />}
            />
            <Route path="*" element={<NoPageMatch />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
