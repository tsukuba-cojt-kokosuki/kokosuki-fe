import React from "react"
import ReactDOM, { createRoot } from "react-dom/client"
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom"
import App from "./App.tsx"
import "./index.css"
import Edit from "./pages/edit"
import List from "./pages/list"
import Play from "./pages/play"
import Top from "./pages/top"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Link to="top">toplink</Link>
        <br />
        <Link to="edit">editlink</Link>
        <br />
        <Link to="list">listlink</Link>
        <br />
        <Link to="play">playlink</Link>
      </div>
    ),
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
