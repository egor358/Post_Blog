import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./Layout .jsx";
import { PostTitleRouterPage } from "./components/routerPages/PostTitleRouterPage.jsx";
import { CreatePost } from "./components/routerPages/CreatePost.jsx";
import { EditPage } from "./components/edit/EditPage.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "post/:id",
        element: <PostTitleRouterPage />,
      },

      {
        path: "Create_text",
        element: <CreatePost />,
      },
      {
        path:"edit/:id",
        element:<EditPage/>
      }
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
