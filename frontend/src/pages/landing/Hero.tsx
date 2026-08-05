import Button from "../../components/ui/Button";
import landing from "../../assets/login.svg";

const hero = () => {
  return (
    <section>
      {/* LEFT CONTENT */}
      <div>
        <h1>Diana AI</h1>
        <h2>Intelligence that understands</h2>
        <h3>Answers that aspire</h3>
        <p>
          Diana Al combines advanced technology with human-like understanding to
          help you learn, create, and achieve more every day.
        </p>

        <div>
          <Button className="register">Get Started</Button>
          <Button className="Login">Login</Button>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div>
        <img src={landing} />
      </div>
    </section>
  );
};

export default hero;
