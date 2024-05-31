import { useState } from "react";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../Layout/LoadingSpinner";

const Login = () => {
  const { loading, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithUsernameAndPassword = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch {
      toast.error("Incorrect email or password");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    navigate("/");
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-base-200">
      <div className="card w-fit bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Sign in</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                className="input input-bordered w-full max-w-xs"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary w-full"
              onClick={loginWithUsernameAndPassword}
            >
              Submit
            </button>
          </div>
          <div className="mt-3 text-center">
            <span>
              Need to sign up for an account?{" "}
              <Link to="./signup">Click here.</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
