import { useContext, useState } from "react"
import { CircleUserRound, Menu, X } from "lucide-react"
import { Link, Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { UserContext } from "./user-context"

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <header className="relative z-50 flex items-center justify-between w-full px-4 lg:px-6 h-14 bg-neutral-600">
          <div className="flex items-center">
            <Link
              className="flex-initial text-xl font-bold text-white lg:text-2xl"
              to="/"
            >
              Kokosuki
            </Link>
          </div>
          <div className="lg:hidden">
            <Button
              onClick={handleToggleMenu}
              variant="ghost"
              className="p-0"
            >
              <Menu />
            </Button>
          </div>
          <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${isMenuOpen ? "opacity-50" : "opacity-0"} z-40 lg:hidden pointer-events-none`}
            onClick={handleToggleMenu}
          />
          <nav
            className={`fixed inset-0 lg:block h-dvh w-dvw lg:w-auto bg-neutral-600 lg:inset-auto lg:static lg:h-fit lg:translate-x-0 ${isMenuOpen ? "block translate-x-0" : "block translate-x-full"} transition-transform duration-300 ease-in-out z-50`}
          >
            <div className="flex items-center w-full h-14 lg:hidden">
              <Button
                onClick={handleToggleMenu}
                variant="ghost"
                className="ml-auto"
              >
                <X />
              </Button>
            </div>
            <ul className="flex flex-col items-center gap-6 px-8 py-3 text-xl font-semibold lg:gap-6 lg:flex-row lg:px-0 lg:text-base lg:py-0">
              <li>
                <Link
                  to="list"
                  className="text-white"
                  onClick={handleToggleMenu}
                >
                  マイ クロスフェード
                </Link>
              </li>
              <li>
                <Link
                  to="create"
                  className="block pt-1 pb-1 pl-3 pr-3 text-white rounded-lg bg-background"
                  onClick={handleToggleMenu}
                >
                  新規作成
                </Link>
              </li>
              <li>
                <User />
              </li>
            </ul>
          </nav>
        </header>
        <main className="container z-0 px-6 py-3 lg:p-8">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default Layout

const User = () => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ?? "https://kokosuki-be-prod.tsukuba-cojt-kokosuki.workers.dev"
  const user = useContext(UserContext)

  return (
    <>
      {user.id === null ? (
        <a
          href={`${backendUrl}/login?redirect_to=${window.location.origin}`}
          className="flex gap-2"
        >
          <CircleUserRound />
          ログイン
        </a>
      ) : (
        <div className="flex items-center gap-2">
          <CircleUserRound />
          <div>{user.name}</div>
        </div>
      )}
    </>
  )
}
