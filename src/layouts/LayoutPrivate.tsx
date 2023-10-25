// vendors
import { Outlet, Navigate } from "react-router-dom"
// context
import { useUserContext } from "../context/UserContext";
// import { Footer, Navbar } from "../components";

export const LayoutPrivate = () => {

  const { user } = useUserContext();
  
  return (
    <>
      { user ? <Outlet /> : <Navigate to="/login" /> }
    </>
  )
}
