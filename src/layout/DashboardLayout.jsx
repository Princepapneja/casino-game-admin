import { useEffect, useState } from 'react'
import useGlobal from '../hooks/useGlobal'
import { Outlet } from 'react-router-dom';
import apiHandler from '../functions/apiHandler';
import SideBar from '../components/header-footer/SideBar';
import DashBoardHeader from '../components/header-footer/dashBoardHeader';
import ChangePass from '../components/auth/ChangePass';
import { useNavigate } from 'react-router-dom';


const DashboardLayout = () => {
  const context = useGlobal()
  const navigate = useNavigate()
  const { height, sideBarOpen, user, setUser, setCounts, token, render } = context

  const fetchDetails = async () => {
    const { data } = await apiHandler.get("me")
    if (data?.data?.access === "blocked") {
      localStorage.removeItem("token")
      navigate("/")
    }
    setUser(data.data)
    // navigate("/dashboard")
  }

  const fetchCounts = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const { data } = await apiHandler.get(`counts/${currentYear}`);
      setCounts(data.data);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  }

  useEffect(() => {
    if (!token) return;
    fetchDetails()
    fetchCounts()
  }, [token, render])

  return (
    <>
      <div className='flex  bg-background'>
        <SideBar />
        {user?.systemGeneratedPass &&
          <ChangePass initialValue={user?.systemGeneratedPass} />
        }
        <div className={`w-screen md:w-[calc(100vw-230px)] `} >
          <DashBoardHeader />
          <div className={`main p-4 space-y-8 overflow-y-auto ${sideBarOpen && "blur"} duration-500 `} style={{ height: `calc(100vh - ${height}px)` }}>
            <Outlet context={context} />
          </div>
        </div>
      </div>

    </>
  )
}

export default DashboardLayout