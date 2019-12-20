import React from "react";

import useForm from "../hooks/useForm";

const Login = props => {
  const { handleChanges, handleLoginSubmit, values } = useForm(submit);

  function submit() {
    props.history.push("/bubbles");
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLoginSubmit}>
        <label>User Name:</label>
        <input
          type="text"
          name="username"
          placeholder="User Name"
          value={values.username}
          onChange={handleChanges}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChanges}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
