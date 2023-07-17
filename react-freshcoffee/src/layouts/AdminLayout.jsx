import { Outlet, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";

export default function AdminLayout() {

  useAuth({ middleware: 'admin' })

  return (
    <div className="md:flex">

      <div className="flex items-center p-4 bg-amber-500 fixed w-full h-24 md:hidden">
        <Link to={'/'}>
          <div className="flex pt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-coffee" width="36" height="36" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1" />
              <path d="M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
              <path d="M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
              <path d="M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z" />
              <path d="M16.746 16.726a3 3 0 1 0 .252 -5.555" />
            </svg>

            <img src="/img/logo-mobile.png" alt="Imagen Logotipo" className="w-40" />

          </div>

        </Link>
      </div>

      <Sidebar />

      <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3 md:pt-7">
        <Outlet />
      </main>

      <ToastContainer />
    </div>
  )
}
