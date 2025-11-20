import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "@exploresg.frontend/ui";

const userLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];
const App = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar logo="logo" links={userLinks} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
