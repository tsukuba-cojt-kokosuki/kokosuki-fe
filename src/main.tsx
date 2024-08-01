import { SWRConfig } from "swr"
import "@fontsource-variable/inter"
import "@fontsource-variable/noto-sans-jp"
import { createRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Toaster } from "sonner"
import { UserContextProvider } from "./components/user-context"
import "./index.css"
import { fetch } from "./lib/api/fetch"
import { setupMsw } from "./mocks/setup"
import Create from "./pages/create/page"
import Edit from "./pages/edit/page"
import Index from "./pages/index/page"
import Layout from "./pages/layout"
import List from "./pages/list/page"
import NotFound from "./pages/not-found"
import Play from "./pages/play/page"

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
      {
        path: "play/:id",
        element: <Play />,
        errorElement: <NotFound />,
      },
      {
        path: "edit/:id",
        element: <Edit />,
        errorElement: <NotFound />,
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

        const res = await fetch(url)
        return await res.json()
      },
    }}
  >
    <UserContextProvider>
      <RouterProvider router={router} />
      <Toaster />
    </UserContextProvider>
  </SWRConfig>,
)
