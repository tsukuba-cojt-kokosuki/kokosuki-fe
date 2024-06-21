import { SWRConfig } from "swr"
import { createRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./index.css"
import { setupMsw } from "./mocks/setup"
import Create from "./pages/create/page"
import Index from "./pages/index/page"
import Layout from "./pages/layout"
import List from "./pages/list/page"
import Login from "./pages/login/pages"

await setupMsw()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Index />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "list",
        element: <List />,
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <SWRConfig
    value={{
      refreshInterval: 15000,
      fetcher: async (url: string) => {
        const res = await fetch(url)
        return await res.json()
      },
    }}
  >
    <RouterProvider router={router} />
  </SWRConfig>,
)
