import '../css/topBar.css';

const TopBar = (props) => {
  const logout = () => {
    props.setVisibilityLogin(true);
    props.setShowSideBar(false);
  };
  const openLogin = () => {
    props.setVisibilityLogin(true);
    props.setVisibilityRegister(false);
  };
  const openRegister = () => {
    props.setVisibilityLogin(false);
    props.setVisibilityRegister(true);
  };
  return (
    <section className="top-bar-container">
      <i className="fas fa-star"></i>

      {props.visibleLogin || props.visibleRegister ? (
        <section className="login-register-container">
          <p className="login-title" onClick={openLogin}>
            Login
          </p>
          <p className="register-title" onClick={openRegister}>
            Register
          </p>
        </section>
      ) : (
        <section className="logout-my-profile-container">
          <p className="logout-title" onClick={logout}>
            Logout
          </p>
          <p className="my-profile-title">My profile</p>
        </section>
      )}
    </section>
  );
};

export default TopBar;
