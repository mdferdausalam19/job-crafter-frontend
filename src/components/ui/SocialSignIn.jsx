import { useNavigate } from "react-router";
import useAuth from "../../features/auth/useAuth";
import toast from "react-hot-toast";

const SocialSignIn = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const handleSocialSignIn = (socialProvider) => {
    socialProvider().then((result) => {
      if (result.user) {
        toast.success("Sign in successful! Welcome back!");
        navigate("/");
      }
    });
  };
  return (
    <div>
      <div>
        <button
          onClick={() => handleSocialSignIn(googleSignIn)}
          className="btn"
        >
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialSignIn;
