// vendors
import { Outlet } from "react-router-dom"
// components
import { Footer, Navbar } from "../components"

export const LayoutRoot = () => {
  return (
    <>
      <Navbar />
      <main className="container py-3">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
