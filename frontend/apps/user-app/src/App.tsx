import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "@exploresg.frontend/ui";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
