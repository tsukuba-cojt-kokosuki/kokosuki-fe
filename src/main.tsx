import { SWRConfig } from "swr"
import "@fontsource-variable/inter"
import "@fontsource-variable/noto-sans-jp"
import { createRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./index.css"
import { setupMsw } from "./mocks/setup"
import Create from "./pages/create/page"
import Index from "./pages/index/page"
import Layout from "./pages/layout"
import List from "./pages/list/page"
import { UserContextProvider } from "./pages/user-context"

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
      fetcher: async (urlOrPathname: string) => {
        const url = urlOrPathname.startsWith("http")
          ? urlOrPathname
          : `${import.meta.env.VITE_BACKEND_URL ?? "https://kokosuki-be-prod.tsukuba-cojt-kokosuki.workers.dev"}${urlOrPathname}`
        const host = new URL(url).host

        const res = await fetch(url, {
          credentials:
            host.endsWith("kokosuki-be-prod.tsukuba-cojt-kokosuki.workers.dev") ||
            host.endsWith("localhost:8787")
              ? "include"
              : "same-origin",
        })
        return await res.json()
      },
    }}
  >
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </SWRConfig>,
)
