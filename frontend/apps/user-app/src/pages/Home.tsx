// import { useAppSelector, useAppDispatch } from "../store/hooks";
// import { setUser, clearUser } from "../store/slices/userSlice";
// import { useTheme } from "../context/useTheme";
// import { Button } from "@exploresg.frontend/ui";

const Home = () => {
  // const dispatch = useAppDispatch();
  // const user = useAppSelector((state) => state.user);
  // const { theme, toggleTheme } = useTheme();

  // const handleLogin = () => {
  //   dispatch(setUser({ name: "John Doe", email: "john@example.com" }));
  // };

  // const handleLogout = () => {
  //   dispatch(clearUser());
  // };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <p className="mt-4 text-gray-600">Welcome to XploreTown User App</p>

      <div className="mt-8 space-y-4">
        {/* Redux Example */}
        {/* <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold">Redux State</h2>
          {user.isAuthenticated ? (
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <Button label="Logout" onClick={handleLogout} />
            </div>
          ) : (
            <div>
              <p>Not logged in</p>
              <Button label="Login" onClick={handleLogin} />
            </div>
          )}
        </div> */}

        {/* Context Example */}
        {/* <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold">Context State</h2>
          <p>Current theme: {theme}</p>
          <Button label="Toggle Theme" onClick={toggleTheme} />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
