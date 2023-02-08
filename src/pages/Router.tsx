import { Navigate, Route, Routes } from "react-router-dom";
import { type ReactElement } from "react";
import Layout from "~/components/layout/Layout";
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
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="settings " element={<Settings />} />
        <Route path="editor/:articleSlug" element={<Editor />} />
        <Route path="article/:articleSlug" element={<Article />} />
        <Route path="profile/:username/favorites?" element={<Profile />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  );
}

export default Router;
