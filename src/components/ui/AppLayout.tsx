import { Outlet } from "react-router-dom"
import Header from "@/components/Header/Header"
import {Toaster} from "@/components/ui/toaster"

function AppLayout() {
    return (
    <div className="min-h-screen flex flex-col">
        <Header/>
        <div className="flex-1 px-8 py-12">
        <main className=" max-w-7xl mx-auto ">
            <Outlet/>
        </main>
        <Toaster/>
       </div>
    </div>
    )
}

export default AppLayout
