import React, { useState } from "react";
import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: any) {
    event.preventDefault();
  }

  return (
    <div id="page-login">
      <form onSubmit={handleSubmit}>
        <fieldset className="field-group">
          <div className="field">
            <label>Email</label>
            <input
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </fieldset>
        <fieldset className="field-group">
          <div className="field">
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
        </fieldset>
        <button disabled={!validateForm()} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
