import { createRoot } from "react-dom/client"
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom"
import "./index.css"
import Edit from "./pages/edit"
import Index from "./pages/index"
import List from "./pages/list"
import Play from "./pages/play"
import Top from "./pages/top"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "top",
    element: <Top />,
  },
  {
    path: "edit",
    element: <Edit />,
  },
  {
    path: "list",
    element: <List />,
  },
  {
    path: "play",
    element: <Play />,
  },
])

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />)
