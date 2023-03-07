import { Navigate, Route, Routes } from "react-router-dom";
import { type ReactElement } from "react";
import Layout from "~/components/layout/Layout";
import RequireAuth from "~/components/common/RequireAuth";
import RequireUnauth from "~/components/common/RequireUnauth";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Settings from "./Settings";
import Editor from "./Editor";
import Article from "./Article";
import Profile from "./Profile";

function Router(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="login"
          element={
            <RequireUnauth>
              <Login />
            </RequireUnauth>
          }
        />
        <Route
          path="register"
          element={
            <RequireUnauth>
              <Register />
            </RequireUnauth>
          }
        />
        <Route
          path="settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
        <Route
          path="editor/:articleSlug?"
          element={
            <RequireAuth>
              <Editor />
            </RequireAuth>
          }
        />
        <Route path="article/:articleSlug" element={<Article />} />
        <Route path="profile/:username/favorites?" element={<Profile />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  );
}

export default Router;
