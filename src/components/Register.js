import '../css/register.css';

const Register = (props) => {
  const loginRedirect = () => {
    props.setVisibilityRegister(false);
    props.setVisibilityLogin(true);
  };
  const registerValidation = () => {
    props.setVisibilityRegister(false);
    props.setShowSideBar(true);
  };
  return (
    <section className="register-container">
      <h1 className="uTeam-register-title">uTeam - Register</h1>
      <section className="name-input-title-container">
        <p className="name-input-title">Name</p>
        <input className="name-input" type="text" placeholder="Name"></input>
      </section>
      <section className="email-input-title-container">
        <p className="email-input-title">Email</p>
        <input className="email-input" type="text" placeholder="Email"></input>
      </section>
      <section className="password-input-title-container">
        <p className="password-input-title">Password</p>
        <input className="password-input" type="text" placeholder="Password"></input>
      </section>
      <section className="profile-photo-input-title-container">
        <p className="profile-photo-input-title">Profile Photo</p>
        <label htmlFor="file-upload" className="custom-file-upload">
          <p className="upload-file-placeholder">Upload file</p>
          <div className="choose-file-button">Choose file</div>
        </label>
        <input id="file-upload" type="file" />
      </section>
      <section className="question-and-login-button">
        <p className="question" onClick={loginRedirect}>
          Already have an account?
        </p>
        <button className="register-button" onClick={registerValidation}>
          Register
        </button>
      </section>
    </section>
  );
};

export default Register;
