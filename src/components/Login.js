import React, { useState } from "react";
import { auth } from "../firebase";
import { useHistory } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      window.alert(`Login Successful`);
      history.push("/");
    } catch (err) {
      window.alert(`Invalid Credentials`);
    }
  };
  return (
    <div className="container" style={{
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
      }}>
      <h1>Login Page</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="input-field">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn blue">
          login
        </button>
      </form>
    </div>
  );
}
