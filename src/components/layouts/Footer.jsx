const Footer = () => {
  return (
    <div className="bg-base-200">
      <footer className="footer footer-center  text-base-content rounded p-10 container mx-auto">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
        </nav>
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            JobCrafter
          </p>
          <p>
            Developed by{" "}
            <a
              href="https://github.com/mdferdausalam19"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-500 link link-hover"
            >
              Md. Ferdaus Alam
            </a>
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
