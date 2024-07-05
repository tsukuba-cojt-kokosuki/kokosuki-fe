import { Link, Outlet } from "react-router-dom"
import { useState, useEffect } from 'react';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <div className="bg-background min-h-screen">
        <header className="relative z-50">
          <div className="flex w-full justify-between bg-neutral-600 pl-4 pr-4 md:pl-8 md:pr-8 pt-3 pb-3">
            <div className="flex items-center">
              <Link className="font-bold text-xl md:text-2xl flex-initial text-white" to="/">
                Kokosuki
              </Link>
            </div>
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-white focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            <nav className="hidden md:block">
              <ul className="font-semibold flex gap-10 items-center">
                <li><Link to="list" className="text-white">クロスフェード一覧</Link></li>
                <li>
                  <Link to="create" className="block pl-3 pr-3 pt-1 pb-1 rounded-lg bg-background text-white">
                    新規作成
                  </Link>
                </li>
                <li><Link to="login" className="text-white">ログイン</Link></li>
              </ul>
            </nav>
          </div>
          <div className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'} z-40`} onClick={toggleMenu}></div>
          <nav className={`fixed right-0 top-0 bottom-0 w-full bg-neutral-600 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
            <div className="flex justify-end py-3 px-4">
              <button onClick={toggleMenu} className="text-white focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="font-semibold flex flex-col gap-4 p-4">
              <li><Link to="list" className="text-white block py-2 text-center text-xl" onClick={toggleMenu}>クロスフェード一覧</Link></li>
              <li>
                <Link to="create" className="text-white block py-2 px-3 bg-background rounded-lg text-center text-xl" onClick={toggleMenu}>
                  新規作成
                </Link>
              </li>
              <li><Link to="login" className="text-white block py-2 text-center text-xl" onClick={toggleMenu}>ログイン</Link></li>
            </ul>
          </nav>
        </header>
        <main className="container p-8">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default Layout