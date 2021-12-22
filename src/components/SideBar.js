import '../css/sideBar.css';

const SideBar = () => {
  return (
    <section className="side-bar-container">
      <section className="side-bar-content">
        <section className="menu-title">Menu</section>
        <section className="side-bar-items">
          <section className="arrow-and-title-container">
            <i className="fas fa-chevron-right"></i>
            <p className="pending-for-approval-title title">Pending for approval</p>
          </section>
          <section className="arrow-and-title-container">
            <i className="fas fa-chevron-right"></i>
            <p className="team-title title">Team</p>
          </section>
          <section className="arrow-and-title-container">
            <i className="fas fa-chevron-right"></i>
            <p className="questions-title title">Questions</p>
          </section>
          <section className="arrow-and-title-container">
            <i className="fas fa-chevron-right"></i>
            <p className="company-info-title title">Company Info </p>
          </section>
          <section className="arrow-and-title-container">
            <i className="fas fa-chevron-right"></i>
            <p className="my-profile-title title">My profile</p>
          </section>
        </section>
      </section>
    </section>
  );
};

export default SideBar;
