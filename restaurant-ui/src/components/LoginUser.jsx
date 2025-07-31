import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

export default function LoginUser() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    UserService.loginUser(credentials)
      .then((res) => {
        const user = res.data;
        localStorage.setItem("loggedUser", JSON.stringify(user));
        alert("Login successful!");
        navigate("/");
      })
      .catch((error) => {
        alert("Invalid email or password");
        console.error(error);
      });
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="Email" className="input" required />
        <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" className="input" required />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Login</button>
      </form>
    </div>
  );
}
