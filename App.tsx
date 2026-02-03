import { useEffect } from "react";
import testFirestore from "./testFirestore";

function App() {
  useEffect(() => {
    // This runs ONCE when the app starts
    testFirestore();
  }, []);

  return (
    <div>
      <h1>Firestore test running</h1>
      <p>Open the browser console to see results</p>
    </div>
  );
}

export default App;


