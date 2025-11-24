import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "@exploresg.frontend/ui";

const adminLinks = [
  { label: "Dashboard", href: "/" },
  { label: "Users", href: "/users" },
  { label: "Settings", href: "/settings" },
];

const App = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        links={adminLinks}
        isAuthenticated={false}
        onLogin={() => console.log("Login clicked")}
        profileMenuItems={[]}
      />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
