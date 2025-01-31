import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from 'axios'; 
import "../styles/Login.css";
import contactimg from "../assets/about2.jpeg";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Use a single state for username/email
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://dhairya-server-m2he.onrender.com/api/auth/login", {
        identifier, 
        password,
      });
  
      console.log("Login successful:", response.data);
      
      // Store user details in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); 
  
      navigate("/profile"); 
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password.");
    }
  };
  

  return (
    <div className="login-container">
      <div className="image-section">
        <img src={contactimg} alt="Contact Us Banner" className="banner-image" />
      </div>

      <div className="form-section">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>} 
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Username or Email:</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>
        <div className="extra-links">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
