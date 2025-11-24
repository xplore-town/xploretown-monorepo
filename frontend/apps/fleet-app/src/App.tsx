import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "@exploresg.frontend/ui";

const fleetLinks = [
  { label: "Fleet", href: "/" },
  { label: "Vehicles", href: "/vehicles" },
  { label: "Drivers", href: "/drivers" },
];

const App = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        links={fleetLinks}
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
