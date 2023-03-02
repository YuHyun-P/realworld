import { type ReactElement } from "react";
import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Router from "./pages/Router";

function App(): ReactElement {
  return (
    <RecoilRoot>
      <HashRouter>
        <Router />
      </HashRouter>
    </RecoilRoot>
  );
}

export default App;
