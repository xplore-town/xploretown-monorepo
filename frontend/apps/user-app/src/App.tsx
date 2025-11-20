import { Button } from "@exploresg.frontend/ui";

const App = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">User App</h1>
      <Button label="Click me" onClick={() => alert("Button clicked!")} />
    </div>
  );
};

export default App;
