import { Button } from "@exploresg.frontend/ui";

const App = () => {
  return (
    <div className="p-8">
      <h1 className="mb-4 bg-amber-50 p-2 text-3xl font-bold">User App</h1>
      <Button label="Click me" onClick={() => alert("Button clicked!")} />
    </div>
  );
};

export default App;
