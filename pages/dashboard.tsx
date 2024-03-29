
import { useRouter } from "next/router";
import React from "react"
import { useAuth } from "../context/AuthContext";
import Link from "next/link";




const Dashboard = ({ children }: { children: React.ReactNode }) => {

  const { user, logout } = useAuth();
  const router = useRouter();
  console.log("printing route")
  console.log(router.pathname);
  // min-h-screen 
  return (
    <div className="relative  m-auto h-screen flex flex-row   bg-gray-100">
      <div className="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-3xl uppercase text-indigo-500">Logo</h1>
        </div>
        <ul className="flex flex-col py-4">
          <li>
            <Link href="/dashboardPage">
              <a className={router.pathname === "/dashboardPage" ? "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-800 " : "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"}>
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-home"></i></span>
                <span className="text-sm font-medium">Dashboard</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/addClients">
              <a href="#" className={router.pathname === "/addClients" ? "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-800 " : "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"}>
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className='bx bx-clipboard'></i></span>
                <span className="text-sm font-medium">Register</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/datatable">
              <a className={router.pathname === "/datatable" ? "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-800 " : "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"}>
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className='bx bx-user'></i></span>
                <span className="text-sm font-medium">Clients</span>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/orderPage">
              <a className={router.pathname === "/orderPage" ? "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-800 " : "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"}>
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-shopping-bag"></i></span>
                <span className="text-sm font-medium">Orders</span>
              </a>
            </Link>
          </li>
          <li>
            <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-chat"></i></span>
              <span className="text-sm font-medium">Chats</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className='bx bx-wallet' ></i></span>
              <span className="text-sm font-medium">Finance</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-bell"></i></span>
              <span className="text-sm font-medium">Notifications</span>
              <span className="ml-auto mr-6 text-sm bg-indigo-100 rounded-full px-3 py-px text-indigo-500">5</span>
            </a>
          </li>
          <button
            onClick={
              () => {
                logout()

                router.push('/')

              }
            }

          >
            <li>
              <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-log-out"></i></span>
                <span className="text-sm font-medium">Logout</span>
              </a>
            </li>
          </button>
        </ul>

      </div>
      
       {/* Main Page */}
      <div className="m-5 flex-auto w-96 overflow-auto ">
        {children}
      </div>
    </div>

  );
}

export default Dashboard;