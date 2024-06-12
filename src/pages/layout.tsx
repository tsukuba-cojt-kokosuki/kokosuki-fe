import { Outlet, Link } from "react-router-dom"

const Layout = () => {
  return (
    <>
    <div className="bg-stone-700 text-slate-100 h-dvh">
      <header className="flex w-full justify-between bg-stone-500 text-slate-100 pl-8 pr-8 pt-3 pb-3">
        <div className="flex items-center">
          <Link className="font-bold text-2xl flex-initial ..." to="/">Kokosuki</Link>
        </div>
        <ul className="font-semibold flex gap-10 items-center">
          <li> <Link to="list" className="block">クロスフェード一覧</Link></li>
          <li>
            <Link to="create" className="block pl-3 pr-3 pt-1 pb-1 rounded-lg bg-stone-700">新規作成</Link>
          </li>
          <li> <Link to="login">ログイン</Link></li>
        </ul>
      </header>

      <main className="container bg-stone-700 text-slate-100" >
        <Outlet />
      </main>

      <footer>
      </footer>
    </div>
    </>
  )
}

export default Layout
