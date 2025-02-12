import { useState, useContext } from "react";
import { login } from "../api/auth";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      console.log("Login -> res", res);
      setUser(res.data);
      
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login failed!");
    }
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button">Login</button>
      </form>
    </div>
  );
  
};

export default Login;
