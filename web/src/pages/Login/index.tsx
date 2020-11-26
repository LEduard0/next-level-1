import React, { FormEvent, useContext, useState } from "react";
import { PointsContext } from "../../contexts/PointsContext";
import Header from "../../components/Header";
import "./styles.css";

const initialState = () => {
  return {
    email: "",
    password: "",
  };
};

const Login = () => {
  const [values, setValues] = useState(initialState);

  const { authenticated, handleLogin } = useContext(PointsContext);

  console.log(authenticated);

  const handleChange = (event: any) => {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div id="page-login">
      <Header />
      <form onSubmit={handleLogin}>
        <fieldset className="field-group">
          <div className="field">
            <label>Email</label>
            <input
              autoFocus
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </div>
        </fieldset>
        <fieldset className="field-group">
          <div className="field">
            <label>Senha</label>
            <input
              value={values.password}
              onChange={handleChange}
              name="password"
              type="password"
            />
          </div>
        </fieldset>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
