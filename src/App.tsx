import { type ReactElement } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import Router from "./pages/Router";

function App(): ReactElement {
  return (
    <HashRouter>
      <Router />
    </HashRouter>
  );
}

export default App;
