import LoginButton from "./components/auth/LoginButton";
import LogoutButton from "./components/auth/LogoutButton";
import Profile from "./components/auth/Profile";

const App = () => {
  return (
    <div>
      <div>
        <h5>Login</h5>
        <LoginButton />
      </div>
      <div>
        <h5>Logout</h5>
        <LogoutButton />
      </div>
      <div>
        <h5>Profile</h5>
        <Profile />
      </div>
    </div>
  );
};

export default App;
