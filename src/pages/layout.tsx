import { Link, Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
      <div className="bg-background h-fit">
        <header className="flex w-full justify-between bg-neutral-600 pl-8 pr-8 pt-3 pb-3">
          <div className="flex items-center">
            <Link
              className="font-bold text-2xl flex-initial"
              to="/"
            >
              Kokosuki
            </Link>
          </div>
          <ul className="font-semibold flex gap-10 items-center">
            <li>
              <Link to="list">クロスフェード一覧</Link>
            </li>
            <li>
              <Link
                to="create"
                className="block pl-3 pr-3 pt-1 pb-1 rounded-lg bg-background"
              >
                新規作成
              </Link>
            </li>
            <li>
              <Link to="login">ログイン</Link>
            </li>
          </ul>
        </header>

        <main className="container p-8">
          <Outlet />
        </main>
        </div>
    </>
  )
}

export default Layout
