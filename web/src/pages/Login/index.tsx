import React, { FormEvent, useContext, useState } from "react";
import Pointscontext from "../../contexts/PointsContext";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import "./styles.css";

const initialState = () => {
  return {
    email: "",
    password: "",
  };
};

const validateLogin = ({ email, password }: any) => {
  if (email === "admin" && password === "admin") {
    return { token: "1234" };
  }
  return alert("Usuario ou senha inválido");
};

const Login = () => {
  const [values, setValues] = useState(initialState);
  const { setToken } = useContext(Pointscontext);
  const history = useHistory();

  const handleChange = (event: any) => {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { token }: any = validateLogin(values);

    if (token) {
      setToken(token);
      return history.push("/");
    }
    setValues(initialState);
  };

  return (
    <div id="page-login">
      <Header />
      <form onSubmit={handleSubmit}>
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
