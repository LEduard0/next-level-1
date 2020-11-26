import React from "react";
import "./App.css";

import Routes from "./routes";
import { AuthProvider } from "./contexts/PointsContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes />
      </div>
    </AuthProvider>
  );
}

export default App;
