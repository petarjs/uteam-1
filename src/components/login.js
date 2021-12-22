import '../css/login.css';

const Login = (props) => {
  const loginValidation = () => {
    props.setVisibilityLogin(false);
    props.setShowSideBar(true);
  };

  const openRegister = () => {
    props.setVisibilityLogin(false);
    props.setVisibilityRegister(true);
  };
  return (
    <section className="login-container">
      <h1 className="uTeamLoginTitle">uTeam - Login</h1>
      <section className="email-input-title-container">
        <p className="email-input-title">Email</p>
        <input className="email-input" type="text" placeholder="Email"></input>
      </section>
      <section className="password-input-title-container">
        <p className="password-input-title">Password</p>
        <input className="password-input" type="text" placeholder="Password"></input>
      </section>
      <section className="question-and-login-button">
        <p className="question" onClick={openRegister}>
          Don't have an account?
        </p>
        <button className="login-button" onClick={loginValidation}>
          Login
        </button>
      </section>
    </section>
  );
};

export default Login;
